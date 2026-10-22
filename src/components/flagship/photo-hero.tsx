"use client";
import { useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
const EQUIPMENT=[
 {maker:"HPE",name:"ProLiant DL380 Gen11",line:"Servers · Storage · Enterprise compute",
  photo:"https://www.hpe.com/content/dam/hpe/shared-publishing/images-norend/marquee-png/ProLiant-DL380-Gen11-L-1200x1056.png",
  scene:"https://etimg.etb2bimg.com/photo/131845791.cms",
  link:"https://www.hpe.com/us/en/compute/hpe-proliant-compute/dl380-gen11.html",sceneAlt:"Photograph of enterprise server racks inside a data centre"},
 {maker:"H3C",name:"WA7200 enterprise wireless",line:"Access points · Switching · Connected campuses",
  photo:"https://www.h3c.com/cn/res/202606/17/20260617_16353239_x_Img_x_jpeg_0_2868986_30005_0.jpeg",
  scene:"https://northwoodoffice-assets.imgix.net/northwood/images/heroes/766539_N37_medium.jpg?auto=compress%2Cformat&fit=crop&w=1600&q=82",
  link:"https://www.h3c.com/en/Products_and_Solutions/InterConnect/Wireless/Products/AP/Wi-Fi_7/Indoor/WA7232/",sceneAlt:"Aerial photograph of landscaped corporate buildings and campus connections"},
 {maker:"HIKVISION",name:"DarkFighter PTZ",line:"Cameras · Recording · Electronic security",
  photo:"https://cctvexpress.co.uk/cdn/shop/files/DS-2DE4A425IWG-E.webp?v=1750247628",
  scene:"https://lirp.cdn-website.com/e83a844e/dms3rep/multi/opt/36f59436-20ea-420e-8d14-04d1185a9972-1920w.png",
  link:"https://pro-av.hikvision.com/mena-en/products/IP-Products/PTZ-Cameras/Pro-Series/ds-2de4a425iwg-e/",sceneAlt:"Real-world access control installation at a modern office building"},
] as const;
export function HeroPhoto({slide}:{slide:number}){
 const data=EQUIPMENT[slide]||EQUIPMENT[0];
 const [photoFailed,setPhotoFailed]=useState<string|null>(null);
 const [sceneFailed,setSceneFailed]=useState<string|null>(null);
 return <div className="kp-hero-product-scene" aria-label={`${data.maker} equipment and infrastructure visual reference`}>
  <img key={data.scene} className="kp-hero-world-photo" src={sceneFailed===data.scene?"/images/sol_noc.jpg":data.scene} alt={data.sceneAlt} onError={()=>setSceneFailed(data.scene)} decoding="async"/>
  <div className="kp-hero-world-shade" aria-hidden="true"/>
  {photoFailed!==data.photo&&<img key={data.photo} className="kp-hero-oem-product" src={data.photo} alt={`${data.maker} ${data.name} product photograph`} onError={()=>setPhotoFailed(data.photo)} decoding="async"/>}
  <div className="kp-hero-product-caption"><span>{data.maker} / EQUIPMENT REFERENCE</span><strong>{data.name}</strong><small>{data.line}</small><a href={data.link} rel="noopener noreferrer" target="_blank">Official product information <ExternalLink size={13} aria-hidden="true"/></a></div>
  <span className="kp-hero-disclosure">REFERENCE IMAGERY / NOT A KABO INSTALLATION</span>
 </div>;
}
