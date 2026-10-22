"use client";
import { useState, type ReactNode } from "react";
import { Info, ArrowUpRight } from "lucide-react";
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
export function Architecture3D({type,zones,active,onSelect,selector}:{type:ViewType;zones:Zone[];active:number;onSelect:(index:number)=>void;selector?:ReactNode}){
 const [failedUrl,setFailedUrl]=useState("");
 const [help,setHelp]=useState(false);
 const photo=PHOTOS[type];
 return <section className="kp-explorer" aria-label={`${type} photographic infrastructure explorer`}>
   <div className="kp-scene">
     <img key={type} src={failedUrl===photo.url?"/images/sol_noc.jpg":photo.url} alt={photo.alt} className="kp-scene-photo" style={{objectPosition:photo.focal||"center"}} onError={()=>setFailedUrl(photo.url)} decoding="async" loading="lazy"/>
     <div className="kp-scene-shade" aria-hidden="true"/>
     {selector&&<div className="kp-scene-tabs" aria-label="Choose a solution environment">{selector}</div>}
     <div className="kp-photo-overline"><span className="kp-pulse"/> KABO / INFRASTRUCTURE EXPLORER <span className="kp-photo-count">08 SYSTEMS</span></div>
     <button className="kp-guide-trigger" type="button" onClick={()=>setHelp(v=>!v)} aria-expanded={help}><Info size={16}/> How to explore</button>
     {help&&<p className="kp-help-copy">Choose an environment, then touch any numbered glass hotspot. Learn what the system does, what KABO can supply, and how to discuss your requirements.</p>}
     <div className="kp-scene-intro"><span>IN CONTEXT / FIELD REFERENCE</span><strong>{photo.subject}</strong></div>
     <div className="kp-map-points" role="group" aria-label="Interactive infrastructure hotspots">
       {zones.map((item,index)=><button type="button" key={item.id} className={`kp-map-point ${active===index?"is-active":""}`} style={{left:`${item.left}%`,top:`${item.top}%`}} onClick={()=>onSelect(index)} aria-haspopup="dialog" aria-label={`Inspect ${item.name}: ${item.caption}`}><span>{item.number}</span><strong>{item.name}</strong><ArrowUpRight size={13}/></button>)}
     </div>
     <div className="kp-mobile-hotspots" role="group" aria-label="Inspect a technology layer">{zones.map((item,index)=><button type="button" key={item.id} className={`kp-hotspot-chip ${active===index?"is-active":""}`} onClick={()=>onSelect(index)} aria-haspopup="dialog"><span>{item.number}</span><strong>{item.name}</strong><ArrowUpRight size={12}/></button>)}</div>
     <div className="kp-photo-credit">{photo.credit} · Not a KABO customer installation</div>
   </div>
 </section>;
}
