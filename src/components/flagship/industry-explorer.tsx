"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { VERTICALS } from "./vision-data";
type Industry = (typeof VERTICALS)[number];
const LAYERS: Record<string,string[]> = {
 "Government & public sector":["Secure departmental and municipal connectivity","Workstation, endpoint and records infrastructure","Resilient data centre and continuity options","Site security, access control and monitoring"],
 "Healthcare":["Clinical and administrative wired/wireless access","Availability planning for connected facilities","Secure storage, backup and recoverability","Endpoints, printers, scanning and document workflows"],
 "Banking & financial services":["Segmented infrastructure and secure branch WAN","Data protection and recovery considerations","Controlled access and security monitoring","Business endpoints and document workflows"],
 "Mining & industrial":["Distributed site and field connectivity","Environmental and remote equipment considerations","Operations network segregation and monitored access","Ruggedised endpoints and facility surveillance"],
 "Education & campuses":["High-density Wi-Fi and campus switching","Fibre backbone and resilient core","End-user computing for teaching and administration","Security and document management"],
 "Retail & logistics":["Multi-site WAN and centralised visibility","Warehousing and retail endpoint connectivity","Video surveillance and electronic access","Print, labels, scanning and continuity"]
};
export function IndustryExplorer({onEnquire}:{onEnquire:(industry:string)=>void}){
 const [open,setOpen]=useState<number|null>(null);
 const close=useRef<HTMLButtonElement>(null);
 const previous=useRef<HTMLElement|null>(null);
 useEffect(()=>{if(open===null)return;previous.current=document.activeElement instanceof HTMLElement?document.activeElement:null;const overflow=document.body.style.overflow;document.body.style.overflow="hidden";close.current?.focus();const key=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(null);if(e.key==="Tab"){const dialog=document.querySelector<HTMLElement>(".vf-industry-modal");if(!dialog)return;const targets=Array.from(dialog.querySelectorAll<HTMLElement>("button,a[href]"));const first=targets[0],last=targets[targets.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}};window.addEventListener("keydown",key);return()=>{window.removeEventListener("keydown",key);document.body.style.overflow=overflow;previous.current?.focus()}},[open]);
 const selected:Industry|null=open===null?null:VERTICALS[open];
 return <><div className="vf-industry-grid">{VERTICALS.map((v,i)=><button key={v.title} className="vf-industry-tile" onClick={()=>setOpen(i)} aria-haspopup="dialog"><div className="vf-industry-image" style={{backgroundImage:`url('${v.image}')`}}/><span>0{i+1}</span><div><h3>{v.title}</h3><p>{v.desc}</p><small>Explore systems and considerations</small></div><ArrowUpRight size={20}/></button>)}</div>
 {selected&&<div className="vf-industry-modal-shade" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(null)}}><section className="vf-industry-modal" role="dialog" aria-modal="true" aria-label={selected.title+" infrastructure considerations"}><div className="vf-industry-modal-image" style={{backgroundImage:`linear-gradient(0deg,rgba(4,23,35,.75),transparent 70%),url('${selected.image}')`}}><span>INDUSTRY SYSTEMS / {String(open!+1).padStart(2,"0")}</span><button ref={close} onClick={()=>setOpen(null)} aria-label="Close industry details"><X size={22}/></button></div><div className="vf-industry-modal-body"><h2>{selected.title}</h2><p>{selected.desc} These are representative requirements to discuss; a final solution depends on the specific site, scope and assessment.</p><h3>Technology systems to consider</h3><ul>{(LAYERS[selected.title]||[]).map(item=><li key={item}>{item}</li>)}</ul><div className="vf-industry-modal-actions"><button onClick={()=>{setOpen(null);onEnquire(selected.title.toLowerCase().replace(/[^a-z0-9]+/g,"-"))}}>Discuss requirements <ArrowUpRight size={17}/></button><button onClick={()=>setOpen(null)}>Return to industries</button></div></div></section></div>}</>;
}
