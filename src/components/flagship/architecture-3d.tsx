"use client";
import { useState, type ReactNode } from "react";
import { Info, ArrowUpRight } from "lucide-react";
import type { ViewType } from "./architecture-studio";

type Zone={id:string;name:string;caption:string;number:string;left:number;top:number};
type Photo={url:string;alt:string;credit:string;subject:string;focal?:string};
const PHOTOS:Record<ViewType,Photo>={
  campus:{url:"https://northwoodoffice-assets.imgix.net/northwood/images/heroes/766539_N37_medium.jpg?auto=compress%2Cformat&fit=crop&w=1600&q=82",alt:"Aerial photograph of a landscaped office campus surrounded by mature trees",credit:"Architectural reference photograph, Northwood Office",subject:"Buildings, campus edge and outdoor connectivity",focal:"center 55%"},
  compute:{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Frontier_Supercomputer_%283%29.jpg/1200px-Frontier_Supercomputer_%283%29.jpg",alt:"Photograph of Frontier supercomputer equipment, racks and densely cabled high-speed interconnect",credit:"Real supercomputer facility photograph, Wikimedia Commons",subject:"Compute, data and high-speed infrastructure"},
  datacentre:{url:"https://etimg.etb2bimg.com/photo/131845791.cms",alt:"Rows of enterprise server cabinets with overhead cable trays in a real data-centre facility",credit:"Reference data-centre photograph",subject:"Physical racks, power, network and environment"},
  security:{url:"https://lirp.cdn-website.com/e83a844e/dms3rep/multi/opt/36f59436-20ea-420e-8d14-04d1185a9972-1920w.png",alt:"Access control card being presented to an electronic reader at a glazed office entrance",credit:"Illustrative access-control installation photograph",subject:"Access, video surveillance and monitoring"},
  widearea:{url:"/images/sol_noc.jpg",alt:"Photograph of a network operations centre with monitoring displays",credit:"Infrastructure operations reference photograph",subject:"Network connectivity, branches and monitoring"},
  document:{url:"https://bcbs.asia.canon/media/ovfllnli/image.webp?format=jpeg&v=1dc082511a76ef0&width=1280",alt:"Canon multifunction document equipment in active use at a business workplace",credit:"Canon product and workplace photograph",subject:"Capture, process, records and secure output"},
  resilience:{url:"https://habrastorage.org/files/5f5/51a/237/5f551a237ed94c3eb75798ea4de055ed.jpg",alt:"Real APC uninterruptible power supply cabinets supporting data-centre continuity",credit:"Data-centre power equipment reference photograph",subject:"Protection, recoverability and operational resilience"},
  workplace:{url:"https://imageio.forbes.com/specials-images/imageserve/61a787ec933e8ef4f55d7f55/0x0.jpg?fit=bounds&format=jpg&height=900&width=1600",alt:"Professional team collaborating in a sunlit office with business workstations",credit:"Contemporary office reference photograph",subject:"People, workstations, Wi-Fi and collaboration"}
};
export function Architecture3D({type,zones,active,onSelect,selector}:{type:ViewType;zones:Zone[];active:number;onSelect:(index:number)=>void;selector?:ReactNode}){
 const [failed,setFailed]=useState(false);
 const [help,setHelp]=useState(false);
 const photo=PHOTOS[type];
 return <section className="kp-explorer" aria-label={`${type} photographic infrastructure explorer`}>
   <div className="kp-scene">
     <img key={type} src={failed?"/images/sol_noc.jpg":photo.url} alt={photo.alt} className="kp-scene-photo" style={{objectPosition:photo.focal||"center"}} onError={()=>setFailed(true)} onLoad={()=>setFailed(false)} decoding="async" loading="lazy"/>
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
