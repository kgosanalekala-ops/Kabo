"use client";
import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from "react";
import { Info, ArrowUpRight, Expand, X } from "lucide-react";
import type { ViewType } from "./architecture-studio";

type Zone={id:string;name:string;caption:string;number:string;left:number;top:number};
type Photo={url:string;alt:string;credit:string;subject:string;focal?:string};
const PHOTOS:Record<ViewType,Photo>={
 campus:{url:"/images/architecture/campus.webp",alt:"Photorealistic concept illustration of a connected landscaped campus and its buildings",credit:"KABO approved infrastructure concept artwork",subject:"Connected campus • Buildings, wireless, and protected campus infrastructure",focal:"center 50%"},
 compute:{url:"/images/architecture/compute.webp",alt:"Detailed concept illustration of accelerated compute and connected data infrastructure",credit:"KABO approved infrastructure concept artwork",subject:"Intelligent compute • High-speed fabrics and data platforms"},
 datacentre:{url:"/images/architecture/datacentre.webp",alt:"Detailed data centre concept illustration featuring server racks and technical infrastructure",credit:"KABO approved infrastructure concept artwork",subject:"Data centre • Compute, storage, power and cooling"},
 security:{url:"/images/architecture/security.webp",alt:"Detailed physical security system illustration featuring enterprise access and surveillance",credit:"KABO approved infrastructure concept artwork",subject:"Electronic security • Cameras, monitoring and controlled access"},
 widearea:{url:"/images/architecture/widearea.webp",alt:"Detailed connected regions and branch networking infrastructure concept illustration",credit:"KABO approved infrastructure concept artwork",subject:"Wide-area connectivity • Regional branches and resilient links"},
 document:{url:"/images/architecture/document.webp",alt:"Detailed enterprise print and digital document workflow concept illustration",credit:"KABO approved infrastructure concept artwork",subject:"Document solutions • Capture, workflows and secure output"},
 resilience:{url:"/images/architecture/resilience.webp",alt:"Detailed infrastructure resilience concept illustration showing backup and recovery systems",credit:"KABO approved infrastructure concept artwork",subject:"Resilience • Availability, protected data and recovery"},
 workplace:{url:"/images/architecture/workplace.webp",alt:"Detailed modern enterprise workplace and digital collaboration concept illustration",credit:"KABO approved infrastructure concept artwork",subject:"Digital workplace • Devices, connectivity and collaboration"}

};
export function Architecture3D({type,zones,active,onSelect,onSwipe,selector}:{type:ViewType;zones:Zone[];active:number;onSelect:(index:number)=>void;onSwipe?:(direction:"next"|"previous")=>void;selector?:ReactNode}){
 const [failedUrl,setFailedUrl]=useState("");
 const [help,setHelp]=useState(false);
 const [expanded,setExpanded]=useState(false);
 const expandedDialog=useRef<HTMLDivElement>(null);
 const expandTrigger=useRef<HTMLButtonElement>(null);
 const touchStart=useRef<{x:number;y:number}|null>(null);
 const startSwipe=(event:TouchEvent<HTMLDivElement>)=>{
  if(event.touches.length!==1||event.target instanceof Element&&event.target.closest("button,a,input,textarea,select,[role='tab']")){touchStart.current=null;return;}
  touchStart.current={x:event.touches[0].clientX,y:event.touches[0].clientY};
 };
 const finishSwipe=(event:TouchEvent<HTMLDivElement>)=>{
  const start=touchStart.current;touchStart.current=null;
  if(!start||event.changedTouches.length!==1)return;
  const dx=event.changedTouches[0].clientX-start.x,dy=event.changedTouches[0].clientY-start.y;
  if(Math.abs(dx)>=55&&Math.abs(dx)>=Math.abs(dy)*1.35)onSwipe?.(dx<0?"next":"previous");
 };
 const photo=PHOTOS[type];
 useEffect(()=>{
  if(!expanded)return;
  const prior=document.body.style.overflow;
  document.body.style.overflow="hidden";
  const onKey=(event:KeyboardEvent)=>{
   if(event.key==="Escape"){event.preventDefault();setExpanded(false);}
   else if(event.key==="Tab"){
    const controls=expandedDialog.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href]');
    if(!controls?.length)return;
    const first=controls[0],last=controls[controls.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
   }
  };
  document.addEventListener("keydown",onKey);
  expandedDialog.current?.querySelector<HTMLButtonElement>("button")?.focus();
  return()=>{document.body.style.overflow=prior;document.removeEventListener("keydown",onKey);expandTrigger.current?.focus();};
 },[expanded]);
 return <section className="kp-explorer" aria-label={`${type} photographic infrastructure explorer`}>
   {selector&&<div className="kp-scene-tabs" aria-label="Choose a solution environment">{selector}</div>}
   <div className="kp-scene" onTouchStart={startSwipe} onTouchEnd={finishSwipe} onTouchCancel={()=>{touchStart.current=null;}}>
     <img key={type} src={failedUrl===photo.url?"/images/sol_noc.jpg":photo.url} alt={photo.alt} className="kp-scene-photo" style={{objectPosition:photo.focal||"center"}} onError={()=>setFailedUrl(photo.url)} decoding="async" loading="lazy"/>
     <div className="kp-scene-shade" aria-hidden="true"/>
     <div className="kp-photo-overline"><span className="kp-pulse"/> KABO / INFRASTRUCTURE EXPLORER <span className="kp-photo-count">08 SYSTEMS</span></div>
     <div className="kp-map-points" role="group" aria-label="Interactive infrastructure hotspots">
       {zones.map((item,index)=><button type="button" key={item.id} className={`kp-map-point ${active===index?"is-active":""}`} style={{left:`${item.left}%`,top:`${item.top}%`}} onClick={()=>onSelect(index)} aria-haspopup="dialog" aria-label={`Inspect ${item.name}: ${item.caption}`}><span>{item.number}</span><strong>{item.name}</strong><ArrowUpRight size={13}/></button>)}
     </div>
   </div>
   <div className="kp-scene-details">
     <div className="kp-scene-intro"><span>IN CONTEXT / FIELD REFERENCE</span><strong>{photo.subject}</strong></div>
     <div className="kp-scene-controls"><button className="kp-guide-trigger" type="button" onClick={()=>setHelp(v=>!v)} aria-expanded={help}><Info size={16}/> How to explore</button><button className="kp-expand-trigger" type="button" ref={expandTrigger} onClick={()=>setExpanded(true)} aria-haspopup="dialog"><Expand size={15}/> Inspect full image</button></div>
     {help&&<p className="kp-help-copy">All eight environments are visible above. Choose one, then select a numbered technology layer below. On touch devices, swipe the scene left or right to change environments; swipe up or down to scroll.</p>}
     <div className="kp-mobile-hotspots" role="group" aria-label="Inspect a technology layer">{zones.map((item,index)=><button type="button" key={item.id} className={`kp-hotspot-chip ${active===index?"is-active":""}`} onClick={()=>onSelect(index)} aria-haspopup="dialog"><span>{item.number}</span><strong>{item.name}</strong><ArrowUpRight size={12}/></button>)}</div>
     <div className="kp-scene-meta"><div className="kp-photo-credit">{photo.credit} · Not a KABO customer installation</div><span className="kp-swipe-hint" aria-hidden="true">← SWIPE TO EXPLORE →</span></div>
   </div>
   {expanded&&<div className="kp-expanded-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setExpanded(false);}}><div className="kp-expanded-dialog" ref={expandedDialog} role="dialog" aria-modal="true" aria-label={`Expanded ${type} architecture illustration`}><div className="kp-expanded-bar"><strong>{photo.subject}</strong><button type="button" onClick={()=>setExpanded(false)} aria-label="Close expanded scene"><X size={22}/></button></div><div className="kp-expanded-scroll"><img src={photo.url} alt={photo.alt}/></div><p>Drag horizontally to inspect the image on a small screen. Select a technology layer in the main scene to read its details.</p></div></div>}
 </section>;
}
