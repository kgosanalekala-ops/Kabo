"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Cpu, Layers3, MoveUpRight, Router, ShieldCheck, Waypoints, X } from "lucide-react";
import { NetworkScene, type SceneKey } from "./network-scene";
import { SceneArt } from "./scene-art";
import { Architecture3D } from "./architecture-3d";
import type { Domain } from "./vision-data";

export type ViewType = "campus"|"compute"|"security"|"workplace"|"widearea";
type Zone={id:string;number:string;name:string;caption:string;details:string;left:number;top:number};
const VIEWS:{type:ViewType;name:string;label:string;intro:string;zones:Zone[]}[]=[
 {type:"campus",name:"Connected campus",label:"CAMPUS / LIVE TOPOLOGY",intro:"Explore an end-to-end campus from identity-aware Wi-Fi through switching to a resilient core and data services.",zones:[
  {id:"campus",number:"01",name:"Campus access",caption:"People, workspaces and wireless",details:"Enterprise switching, wireless access and segmentation can be planned around building density, identity and application demands.",left:34,top:50},
  {id:"compute",number:"02",name:"Core services",caption:"Data centre and shared platforms",details:"Resilient network core, shared services, compute and central operations anchor the campus architecture.",left:62,top:34},
  {id:"network",number:"03",name:"WAN fabric",caption:"Connected branch edge",details:"Site traffic is routed across resilient underlay and policy-based overlays to cloud and distant facilities.",left:52,top:69},
  {id:"security",number:"04",name:"Electronic security",caption:"Access, video and sensors",details:"IP surveillance and access control can ride a segmented, appropriately sized network with policy and retention controls.",left:18,top:70},
  {id:"edge",number:"05",name:"Field connectivity",caption:"Distributed facilities",details:"Edge and IoT assets extend visibility beyond the main buildings, with location-specific connectivity and security.",left:79,top:69}]},
 {type:"compute",name:"AI & data centre",label:"COMPUTE / WORKLOAD PATH",intro:"Inspect the engineered layers from source data to accelerated compute, with resilience and operations around the workload.",zones:[
  {id:"data",number:"01",name:"Data platforms",caption:"Sources & governed storage",details:"Design throughput, capacity, sovereignty, permissions and data protection around the workload.",left:18,top:56},
  {id:"fabric",number:"02",name:"High-speed fabric",caption:"Ethernet & transport",details:"East-west traffic and storage connectivity inform network fabrics, latency targets and interface selection.",left:38,top:37},
  {id:"gpu",number:"03",name:"AI-ready compute",caption:"CPU, GPU and memory",details:"Accelerator selection follows actual model size, inference/training requirements and budget—not marketing claims.",left:61,top:47},
  {id:"recover",number:"04",name:"Data resilience",caption:"Backup & recoverability",details:"Recovery objectives, immutable copies and verified restores are essential parts of the final solution.",left:79,top:62}]},
 {type:"security",name:"Secure environment",label:"SECURITY / CONVERGED CONTROL",intro:"Follow a monitored environment from cameras and access readers through secure network transport to control-room operations.",zones:[
  {id:"camera",number:"01",name:"IP surveillance",caption:"Cameras & video streams",details:"Coverage plans, camera placement and power/network budgets need to match the physical environment.",left:20,top:38},
  {id:"access",number:"02",name:"Electronic access",caption:"Readers & door control",details:"Controlled access combines identity, event logging, controllers and fail-safe operational policies.",left:42,top:62},
  {id:"network",number:"03",name:"Secure transport",caption:"Segmentation & recording",details:"Separate physical-security traffic, size recording storage and apply permissions and retention policy.",left:63,top:40},
  {id:"room",number:"04",name:"Control-room view",caption:"Monitoring & response",details:"Operators need integrated monitoring, alerts, incident context and resilient display/recording infrastructure.",left:83,top:66}]},
 {type:"widearea",name:"Multi-site fabric",label:"WAN / SITE CONNECTIVITY",intro:"Connect branches and remote facilities with resilient underlays, secure overlays and centralised policy.",zones:[
  {id:"branch",number:"01",name:"Branch networks",caption:"Local users and devices",details:"Standard branch designs start with consistent VLANs, secure wireless, local survivability and edge equipment.",left:22,top:61},
  {id:"edge",number:"02",name:"SD-WAN edge",caption:"Encryption & application policy",details:"Encrypted tunnels, health checks and application-aware routing adapt to multiple carrier links.",left:43,top:36},
  {id:"cloud",number:"03",name:"Cloud connectivity",caption:"SaaS and hybrid resources",details:"Secure egress, SaaS optimisation and cloud on-ramps minimise complexity across regions.",left:64,top:51},
  {id:"ops",number:"04",name:"Visibility",caption:"Monitoring & assurance",details:"Centralised visibility exposes application health, site readiness and performance problems.",left:82,top:31}]},
 {type:"workplace",name:"Document workflow",label:"WORKPLACE / DOCUMENT LIFECYCLE",intro:"A complete business document journey, from capture through governance to secure output and retention.",zones:[
  {id:"capture",number:"01",name:"Capture",caption:"Scanning & ingestion",details:"Scan profiles and metadata help route paper-based and digital records into the right process.",left:19,top:51},
  {id:"workflow",number:"02",name:"Workflow",caption:"Review & approval",details:"Role-aware routing, access controls and exceptions streamline business processes.",left:40,top:33},
  {id:"store",number:"03",name:"Secure records",caption:"Search & retention",details:"Retention, indexing, auditability and permissions matter more than the printer alone.",left:63,top:52},
  {id:"output",number:"04",name:"Output",caption:"Print & distribute",details:"Business multifunction devices can support secure release, controlled print and managed consumables.",left:82,top:34}]}
];
export function ArchitectureStudio({ initial="campus", onQuote }: {initial?:ViewType;onQuote?:(type:ViewType)=>void}) {
 const [type,setType]=useState<ViewType>(initial);
 const [zone,setZone]=useState(0);
 const [open,setOpen]=useState(false);
 const tabsRef=useRef<HTMLDivElement>(null);
 const dialogRef=useRef<HTMLElement>(null);
 const closeRef=useRef<HTMLButtonElement>(null);
 const motionPref=useReducedMotion();
 const view=VIEWS.find(v=>v.type===type)||VIEWS[0];
 const active=view.zones[Math.min(zone,view.zones.length-1)];
 const setView=(key:ViewType)=>{setType(key);setZone(0);setOpen(false)};
 const onTabKeyDown=(event:KeyboardEvent<HTMLButtonElement>,index:number)=>{
  const last=VIEWS.length-1;
  const next=event.key==="ArrowRight"?(index+1)%VIEWS.length:
   event.key==="ArrowLeft"?(index+last)%VIEWS.length:
   event.key==="Home"?0:event.key==="End"?last:-1;
  if(next<0)return;
  event.preventDefault();
  setView(VIEWS[next].type);
  tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
 };
 useEffect(()=>{
  if(!open)return;
  const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
  closeRef.current?.focus();
  const onKey=(event:globalThis.KeyboardEvent)=>{
   if(event.key==="Escape"){event.preventDefault();setOpen(false);return;}
   if(event.key!=="Tab")return;
   const focusable=Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')||[]);
   if(!focusable.length)return;
   const first=focusable[0],last=focusable[focusable.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  };
  document.addEventListener("keydown",onKey);
  return()=>{document.removeEventListener("keydown",onKey);previous?.focus();};
 },[open]);
 return <div className="vf-architecture" id="architecture-studio">
  <div className="vf-arch-tabs" role="tablist" aria-label="Select an architecture" ref={tabsRef}>
   {VIEWS.map((v,i)=><button key={v.type} id={`vf-arch-tab-${v.type}`} role="tab" tabIndex={type===v.type?0:-1} aria-controls="vf-arch-panel" aria-selected={type===v.type} className={type===v.type?"active":""} onKeyDown={e=>onTabKeyDown(e,i)} onClick={()=>setView(v.type)}><span>0{i+1}</span>{v.name}</button>)}
  </div>
  <div className="vf-arch-frame">
   <div className="vf-arch-mast"><span><span className="vf-pulse"/> KABO SYSTEMS INTELLIGENCE / INTERACTIVE MODEL</span><span>{view.label} <span className="vf-mono">// 2026</span></span></div>
   <AnimatePresence mode="wait" initial={false}>
    <motion.div key={type} id="vf-arch-panel" role="tabpanel" aria-labelledby={`vf-arch-tab-${type}`} initial={motionPref?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={motionPref?{opacity:0}:{opacity:0,y:-10}} transition={{duration:0.38}}>
     <div className="vf-arch-context"><p>SCENE / {String(VIEWS.indexOf(view)+1).padStart(2,"0")}</p><h3>{view.name}</h3><span>{view.intro}</span></div>
     <Architecture3D type={type} zones={view.zones} active={zone} onSelect={i=>{setZone(i);setOpen(true)}}/>
    </motion.div>
   </AnimatePresence>
   <div className="vf-arch-inspector" aria-live="polite" aria-atomic="true"><div className="vf-arch-identified"><motion.span key={type+"-"+active.number} className="vf-arch-indicator" initial={motionPref?false:{opacity:.4,scale:.89}} animate={{opacity:1,scale:1}} transition={{duration:.28}}>{active.number}</motion.span><div><p>SELECTED LAYER</p><motion.h4 key={type+"-"+active.name} initial={motionPref?false:{opacity:0,y:7}} animate={{opacity:1,y:0}} transition={{duration:.28}}>{active.name}</motion.h4></div></div><motion.p key={type+"-"+active.number+"-detail"} initial={motionPref?false:{opacity:0,y:7}} animate={{opacity:1,y:0}} transition={{duration:.32}}>{active.details}</motion.p><div className="vf-arch-actions"><button onClick={()=>setOpen(true)}>Inspect layer <MoveUpRight size={15}/></button><button onClick={()=>onQuote?.(type)}>Discuss this architecture <ArrowUpRight size={15}/></button></div></div>
  </div>
  {open&&<div className="vf-overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}><section className="vf-dialog" role="dialog" aria-modal="true" aria-labelledby="vf-zone-heading" ref={dialogRef}><div className="vf-dialog-kicker">ARCHITECTURE / {view.name.toUpperCase()} / {active.number}</div><button className="vf-dialog-close" ref={closeRef} onClick={()=>setOpen(false)} aria-label="Close layer details"><X size={22}/></button><h3 id="vf-zone-heading">{active.name}</h3><p>{active.details}</p><div className="vf-dialog-note"><CheckCircle2 size={17}/> Illustrative design only. Final architecture follows customer discovery and validation.</div><button className="vf-btn-primary" onClick={()=>{setOpen(false);onQuote?.(type)}}>Request a solution discussion <ArrowUpRight size={17}/></button></section></div>}
 </div>
}