"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type EquipmentModel = {
  group: THREE.Group;
  accents: THREE.MeshStandardMaterial[];
};

const PALETTE = {
  ink: 0x091722,
  graphite: 0x172834,
  steel: 0x486273,
  trim: 0x89a6b9,
  white: 0xe4f0f4,
  blue: 0x1aa8ea,
  cyan: 0x54d6ff,
};

function hardwareMaterials() {
  return {
    chassis: new THREE.MeshStandardMaterial({color:PALETTE.ink,metalness:.72,roughness:.33}),
    dark: new THREE.MeshStandardMaterial({color:PALETTE.graphite,metalness:.64,roughness:.36}),
    steel: new THREE.MeshStandardMaterial({color:PALETTE.steel,metalness:.82,roughness:.26}),
    trim: new THREE.MeshStandardMaterial({color:PALETTE.trim,metalness:.7,roughness:.32}),
    porcelain: new THREE.MeshPhysicalMaterial({color:PALETTE.white,metalness:.2,roughness:.23,clearcoat:.8,clearcoatRoughness:.19}),
    lens: new THREE.MeshPhysicalMaterial({color:0x061323,metalness:.42,roughness:.12,clearcoat:1,clearcoatRoughness:.08}),
    accent: new THREE.MeshStandardMaterial({color:PALETTE.cyan,metalness:.08,roughness:.19,emissive:0x0072b2,emissiveIntensity:.8}),
    status: new THREE.MeshStandardMaterial({color:0xa6ecff,emissive:0x14c7f3,emissiveIntensity:1.6}),
    ground: new THREE.MeshStandardMaterial({color:0x102532,metalness:.62,roughness:.49}),
  };
}

type Mats=ReturnType<typeof hardwareMaterials>;

function box(parent:THREE.Object3D,material:THREE.Material,w:number,h:number,d:number,x:number,y:number,z:number,cast=true) {
 const node=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
 node.position.set(x,y,z);node.castShadow=cast;node.receiveShadow=true;parent.add(node);return node;
}

function cylinder(parent:THREE.Object3D,material:THREE.Material,top:number,bottom:number,height:number,x:number,y:number,z:number,segments=36) {
 const mesh=new THREE.Mesh(new THREE.CylinderGeometry(top,bottom,height,segments),material);
 mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}

function ring(parent:THREE.Object3D,material:THREE.Material,radius:number,tube:number,x:number,y:number,z:number,axis:"x"|"z"="z") {
 const mesh=new THREE.Mesh(new THREE.TorusGeometry(radius,tube,10,48),material);
 mesh.position.set(x,y,z);if(axis==="x")mesh.rotation.x=-Math.PI/2;parent.add(mesh);return mesh;
}

function serverRack(m:Mats):EquipmentModel {
 const group=new THREE.Group();group.name="01 · Enterprise rack system";
 box(group,m.chassis,1.44,2.51,1.04,0,-.21,-.05);
 box(group,m.steel,1.48,.07,1.09,0,1.08,-.05);
 for(const x of [-.69,.69]){
  box(group,m.trim,.055,2.44,.06,x,-.2,.494);
  box(group,m.dark,.10,2.48,1.05,x,-.2,-.05);
 }
 for(let i=0;i<9;i++){
  const y=.86-i*.255;
  box(group,m.dark,1.28,.225,.052,0,y,.493);
  box(group,m.steel,1.27,.014,.065,0,y+.11,.522);
  box(group,m.steel,.028,.14,.067,-.57,y,.532);
  box(group,m.steel,.028,.14,.067,.57,y,.532);
  // Short rows of drive trays and status LEDs create an engineered silhouette.
  if(i%3===2){
   for(let p=0;p<2;p++)ring(group,m.trim,.067,.009,-.22+p*.43,y,.533);
  } else {
   for(let p=0;p<7;p++)box(group,m.steel,.069,.046,.005,-.43+p*.145,y,.533,false);
  }
  box(group,i%2?m.status:m.accent,.024,.025,.011,.475,y,.54,false);
 }
 // Cut-out style dark side vents make the machine legible when rotated.
 for(let i=0;i<9;i++)box(group,m.chassis,.007,.038,.58,-.735,.74-i*.19,-.06,false);
 for(const x of [-.56,.56])cylinder(group,m.steel,.05,.06,.09,x,-1.52,-.26,16);
 return {group,accents:[m.accent,m.status]};
}

function accessSystem(m:Mats):EquipmentModel {
 const group=new THREE.Group();group.name="02 · Network fabric and access point";
 box(group,m.dark,1.78,.22,.8,0,-1.23,0);
 box(group,m.steel,1.68,.043,.04,0,-1.13,.409);
 for(let i=0;i<16;i++){
  const x=-.735+i*.098;
  box(group,m.chassis,.068,.060,.013,x,-1.26,.41,false);
  if(i%3===0)box(group,m.accent,.036,.014,.018,x,-1.194,.427,false);
 }
 box(group,m.chassis,.19,.08,.015,-.64,-1.26,.431);
 for(const x of [-.76,.76])box(group,m.steel,.09,.12,.08,x,-1.23,.43);
 // Dedicated showroom stand, so the access point is connected to a surface.
 cylinder(group,m.steel,.06,.092,1.55,0,-.27,-.19,28);
 cylinder(group,m.dark,.39,.45,.085,0,-1.47,-.19);
 cylinder(group,m.porcelain,.62,.59,.14,0,.55,-.19,52);
 cylinder(group,m.trim,.57,.54,.016,0,.474,-.19,52);
 ring(group,m.accent,.31,.013,0,.633,-.19,"x");
 cylinder(group,m.status,.018,.018,.009,0,.632,.13,14);
 // Faint radial fins on the rear of the AP.
 for(let i=0;i<12;i++){
  const a=i*Math.PI/6;
  box(group,m.trim,.09,.012,.018,Math.cos(a)*.40,.64,Math.sin(a)*.40-.19,false);
 }
 return {group,accents:[m.accent,m.status]};
}

function securityCamera(m:Mats):EquipmentModel {
 const group=new THREE.Group();group.name="03 · PTZ surveillance camera and recorder";
 // Bracket, restrained stem and mounted rotating camera housing.
 cylinder(group,m.dark,.42,.5,.11,0,-1.43,0);
 cylinder(group,m.steel,.065,.087,1.25,0,-.74,0,28);
 cylinder(group,m.porcelain,.29,.30,.20,0,-.02,0);
 cylinder(group,m.steel,.29,.26,.04,0,-.14,0);
 cylinder(group,m.porcelain,.47,.41,.32,0,.22,0,48);
 cylinder(group,m.steel,.46,.46,.025,0,.395,0,48);
 const dome=new THREE.Mesh(new THREE.SphereGeometry(.42,48,32,0,Math.PI*2,Math.PI/2,Math.PI/2),m.lens);
 dome.position.y=.21;dome.rotation.x=Math.PI;dome.castShadow=true;group.add(dome);
 // Front optical stack: proper glass recession and two concentric lens rings.
 cylinder(group,m.lens,.17,.16,.12,0,.16,.366,48).rotation.x=Math.PI/2;
 ring(group,m.trim,.174,.021,0,.16,.428);
 ring(group,m.accent,.102,.009,0,.16,.445);
 cylinder(group,m.lens,.08,.08,.004,0,.16,.451,48).rotation.x=Math.PI/2;
 cylinder(group,m.accent,.026,.026,.018,.29,.25,.27,24).rotation.x=Math.PI/2;
 // Recorder remains grounded under the camera on the podium.
 box(group,m.dark,1.10,.16,.65,0,-1.26,.45);
 for(let i=0;i<4;i++)box(group,m.steel,.10,.018,.008,-.30+i*.18,-1.27,.781,false);
 box(group,m.status,.018,.018,.011,.43,-1.24,.78,false);
 return {group,accents:[m.accent,m.status]};
}

const DESCRIPTIONS=[
 "Three-dimensional enterprise server rack with drive bays, ventilation and management LEDs",
 "Three-dimensional managed Ethernet switch and ceiling-style wireless access point",
 "Three-dimensional PTZ surveillance camera with glass lens and network recorder",
];

export function RealEquipment3D({slide}:{slide:number}){
 const host=useRef<HTMLDivElement>(null);
 const selection=useRef(slide);
 const [unsupported,setUnsupported]=useState(false);
 useEffect(()=>{selection.current=slide;},[slide]);
 useEffect(()=>{
  const holder=host.current;
  if(!holder)return;
  let renderer:THREE.WebGLRenderer;
  try {renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:"low-power"});}
  catch {setUnsupported(true);return;}
  const coarse=window.matchMedia("(pointer: coarse)").matches;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,coarse?1.25:1.65));
  renderer.setSize(holder.clientWidth,holder.clientHeight,false);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.40;
  renderer.shadowMap.enabled=!coarse;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.domElement.className="kp-real-3d-canvas";
  renderer.domElement.setAttribute("aria-label","Rotating true 3D visual of enterprise server, network equipment and security camera. Drag left or right to inspect the hardware.");
  holder.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(37,1,.1,40);
  camera.position.set(0,.5,8.7);
  camera.lookAt(0,-.1,0);
  scene.add(new THREE.HemisphereLight(0xe9f6ff,0x203443,2.15));
  const key=new THREE.SpotLight(0xc3eaff,75,16,Math.PI/4,.58,1.4);
  key.position.set(-2.8,5.5,4.5);key.castShadow=!coarse;key.shadow.mapSize.set(512,512);scene.add(key,key.target);
  const rim=new THREE.DirectionalLight(0x45bdff,4.2);rim.position.set(4,2,-5);scene.add(rim);
  const front=new THREE.PointLight(0xffffff,12,9);front.position.set(1,-.2,4);scene.add(front);
  const mats=hardwareMaterials();
  const carousel=new THREE.Group();scene.add(carousel);
  const stage=new THREE.Group();carousel.add(stage);
  const base=new THREE.Mesh(new THREE.CylinderGeometry(3.62,3.72,.21,84),mats.ground);
  base.position.y=-1.75;base.receiveShadow=true;stage.add(base);
  ring(stage,mats.accent,3.18,.012,0,-1.635,0,"x");
  ring(stage,mats.steel,2.82,.012,0,-1.64,0,"x");
  const server=serverRack(mats),access=accessSystem(mats),security=securityCamera(mats);
  const machines=[server,access,security];
  server.group.position.x=-2.03;access.group.position.x=.01;security.group.position.x=2.04;
  machines.forEach(item=>stage.add(item.group));
  let width=0,height=0;
  const resize=()=>{
   const w=Math.max(holder.clientWidth,1),h=Math.max(holder.clientHeight,1);
   if(w===width&&h===height)return;
   width=w;height=h;camera.aspect=w/h;
   camera.position.z=Math.max(9.2,3.94/(Math.tan(37*Math.PI/360)*(w/h)));
   camera.position.y=w<410?.35:.5;
   camera.updateProjectionMatrix();renderer.setSize(w,h,false);
  };
  resize();
  const ro=new ResizeObserver(resize);ro.observe(holder);
  let pointerId:number|null=null,lastX=0,rotationOffset=0;
  const begin=(event:PointerEvent)=>{if(event.pointerType!=="touch"&&event.button!==0)return;pointerId=event.pointerId;lastX=event.clientX;renderer.domElement.setPointerCapture(event.pointerId);};
  const move=(event:PointerEvent)=>{if(event.pointerId!==pointerId)return;rotationOffset+=(event.clientX-lastX)*.008;lastX=event.clientX;};
  const finish=(event:PointerEvent)=>{if(event.pointerId===pointerId)pointerId=null;};
  renderer.domElement.addEventListener("pointerdown",begin);
  renderer.domElement.addEventListener("pointermove",move);
  renderer.domElement.addEventListener("pointerup",finish);
  renderer.domElement.addEventListener("pointercancel",finish);
  let active=true,visible=document.visibilityState==="visible",raf=0,lastFrame=0,phase=0;
  const observer=new IntersectionObserver(entries=>{active=entries[0]?.isIntersecting??false;}, {threshold:.03});observer.observe(holder);
  const onVisibility=()=>{visible=document.visibilityState==="visible"};document.addEventListener("visibilitychange",onVisibility);
  const render=(ms:number)=>{
   raf=requestAnimationFrame(render);
   if(!active||!visible||ms-lastFrame<(coarse?32:18))return;
   lastFrame=ms;
   if(!reduced&&pointerId===null)phase+=.003;
   carousel.rotation.y=phase+rotationOffset-.19;
   // Directional emphasis follows the existing three headline states, without hiding any machine.
   const focus=selection.current%3;
   for(let i=0;i<3;i++){
    const target=i===focus?1:0.45;
    const accent=machines[i].accents[0];
    accent.emissiveIntensity+=(target-accent.emissiveIntensity)*.04;
   }
   renderer.render(scene,camera);
  };
  raf=requestAnimationFrame(render);
  return ()=>{
   cancelAnimationFrame(raf);observer.disconnect();ro.disconnect();document.removeEventListener("visibilitychange",onVisibility);
   renderer.domElement.removeEventListener("pointerdown",begin);
   renderer.domElement.removeEventListener("pointermove",move);
   renderer.domElement.removeEventListener("pointerup",finish);
   renderer.domElement.removeEventListener("pointercancel",finish);
   scene.traverse(node=>{if(node instanceof THREE.Mesh){node.geometry.dispose();}});
   Object.values(mats).forEach(material=>material.dispose());renderer.dispose();
   if(holder.contains(renderer.domElement))holder.removeChild(renderer.domElement);
  };
 },[]);
 return <div className="kp-real-3d" onTouchStart={event=>event.stopPropagation()} onTouchEnd={event=>event.stopPropagation()}>
  <div ref={host} className="kp-real-3d-viewport" role="img" aria-label={DESCRIPTIONS[slide%DESCRIPTIONS.length]}/>
  {unsupported&&<div className="kp-real-3d-fallback" role="status">3D graphics aren’t supported in this browser. Equipment specifications remain available below.</div>}
  <span className="kp-real-3d-corner kp-real-3d-corner--top" aria-hidden="true">KABO / EQUIPMENT SHOWROOM</span>
  <span className="kp-real-3d-corner kp-real-3d-corner--bottom" aria-hidden="true">TRUE 3D · DRAG TO ORBIT</span>
 </div>;
}
