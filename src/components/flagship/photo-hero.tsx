"use client";
import { ExternalLink } from "lucide-react";
import { RealEquipment3D } from "./real-equipment-3d";

const EQUIPMENT=[
 {maker:"ENTERPRISE COMPUTE",name:"Servers & storage",line:"Rack infrastructure · Resilient compute · Protected data",link:"https://www.hpe.com/us/en/compute/hpe-proliant-compute/dl380-gen11.html",linkLabel:"Explore HPE ProLiant reference"},
 {maker:"CONNECTED NETWORKS",name:"Campus connectivity",line:"Managed switching · Wireless access · Intelligent fabric",link:"https://www.h3c.com/en/Products_and_Solutions/SMB_Products/Products/SMB_Cloudnet/Wireless/AP/Ceiling_Mounted/WA7130/",linkLabel:"Explore H3C wireless reference"},
 {maker:"ELECTRONIC SECURITY",name:"Intelligent surveillance",line:"PTZ cameras · Recording · Secure monitoring",link:"https://pro-av.hikvision.com/mena-en/products/IP-Products/PTZ-Cameras/Pro-Series/ds-2de4a425iwg-e/",linkLabel:"Explore PTZ equipment reference"},
] as const;

export function HeroPhoto({slide}:{slide:number}){
 const data=EQUIPMENT[slide]||EQUIPMENT[0];
 return <div className="kp-hero-product-scene kp-hero-product-scene--real" aria-label="An interactive three-dimensional KABO technology showroom">
  <div className="kp-real-ambient" aria-hidden="true"/>
  <RealEquipment3D slide={slide}/>
  <div className="kp-hero-product-caption kp-real-caption">
   <span>DESIGN STUDY / {data.maker}</span>
   <strong>{data.name}</strong>
   <small>{data.line}</small>
   <a href={data.link} rel="noopener noreferrer" target="_blank">{data.linkLabel} <ExternalLink size={13} aria-hidden="true"/></a>
  </div>
  <span className="kp-hero-disclosure kp-real-disclosure">INTERACTIVE WEBGL HARDWARE MODELS · REPRESENTATIVE, NOT OEM CAD</span>
 </div>;
}
