"use client";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
const EQUIPMENT=[
 {maker:"HPE",name:"ProLiant DL380 Gen11",line:"Servers · Storage · Enterprise compute",
  photo:"/images/oem/hpe-proliant-dl380-gen11.jpg",
  scene:"/images/architecture/datacentre.webp",
  link:"https://www.hpe.com/us/en/compute/hpe-proliant-compute/dl380-gen11.html",sceneAlt:"Approved photorealistic concept illustration of a data centre"},
 {maker:"H3C",name:"WA7130 Wi-Fi 7 access point",line:"Access points · Switching · Connected campuses",
  photo:"/images/oem/h3c-wa7130.jpg",
  scene:"/images/architecture/campus.webp",
  link:"https://www.h3c.com/en/Products_and_Solutions/SMB_Products/Products/SMB_Cloudnet/Wireless/AP/Ceiling_Mounted/WA7130/",sceneAlt:"Approved photorealistic concept illustration of a connected campus"},
 {maker:"HIKVISION",name:"DarkFighter PTZ",line:"Cameras · Recording · Electronic security",
  photo:"https://cctvexpress.co.uk/cdn/shop/files/DS-2DE4A425IWG-E.webp?v=1750247628",
  scene:"/images/architecture/security.webp",
  link:"https://pro-av.hikvision.com/mena-en/products/IP-Products/PTZ-Cameras/Pro-Series/ds-2de4a425iwg-e/",sceneAlt:"Approved realistic concept illustration of an enterprise security environment"},
] as const;
export function HeroPhoto({slide}:{slide:number}){
 const data=EQUIPMENT[slide]||EQUIPMENT[0];
 const supporting=EQUIPMENT.filter((_,index)=>index!==slide);
 const [photoFailed,setPhotoFailed]=useState<string|null>(null);
 const [sceneFailed,setSceneFailed]=useState<string|null>(null);
 return <div className="kp-hero-product-scene" aria-label={`${data.maker} equipment and infrastructure visual reference`}>
  <img key={data.scene} className="kp-hero-world-photo" src={sceneFailed===data.scene?"/images/sol_noc.jpg":data.scene} alt={data.sceneAlt} onError={()=>setSceneFailed(data.scene)} decoding="async"/>
  <div className="kp-hero-world-shade" aria-hidden="true"/>
  <div className="kp-hero-equipment-stage">
   <span className="kp-hero-stage-glow" aria-hidden="true"/>
   {supporting.map((item,index)=><div className={`kp-hero-support kp-hero-support--${index+1}`} key={item.maker}>
    <img src={item.photo} alt="" aria-hidden="true" loading="lazy" decoding="async" onError={e=>{e.currentTarget.style.opacity="0"}}/>
   </div>)}
   {photoFailed!==data.photo&&<div className="kp-hero-feature-equipment"><img key={data.photo} className="kp-hero-oem-product" src={data.photo} alt={`${data.maker} ${data.name} product photograph`} onError={()=>setPhotoFailed(data.photo)} decoding="async"/></div>}
   <span className="kp-hero-stage-ground" aria-hidden="true"/>
  </div>
  <div className="kp-hero-product-caption"><span>{data.maker} / EQUIPMENT REFERENCE</span><strong>{data.name}</strong><small>{data.line}</small><a href={data.link} rel="noopener noreferrer" target="_blank">Official product information <ExternalLink size={13} aria-hidden="true"/></a></div>
  <span className="kp-hero-disclosure">GENUINE EQUIPMENT PHOTOS / CINEMATIC DEPTH PRESENTATION</span>
 </div>;
}
