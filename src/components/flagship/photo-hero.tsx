"use client";
import { RealEquipment3D } from "./real-equipment-3d";

const EQUIPMENT=[
 {maker:"ENTERPRISE COMPUTE",name:"Enterprise server systems",line:"Compute / storage / availability"},
 {maker:"CONNECTED NETWORKS",name:"Managed network switching",line:"Connectivity / segmentation / resilience"},
 {maker:"ELECTRONIC SECURITY",name:"Network surveillance",line:"Monitoring / visibility / response"},
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
  </div>
  <span className="kp-hero-disclosure kp-real-disclosure">INTERACTIVE 3D DESIGN STUDY · REPRESENTATIVE, NOT OEM CAD</span>
 </div>;
}
