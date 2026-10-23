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
 const group=new THREE.Group();group.name="02 · 24-port managed network switch";
 // One equipment subject per story: a rack-mount managed switch, not a podium display.
 box(group,m.dark,2.26,.32,.94,0,0,0);
 box(group,m.chassis,2.31,.24,.026,0,0,.482);
 box(group,m.steel,2.26,.025,.04,0,.15,.486);
 for(const side of [-1,1]){
  box(group,m.trim,.12,.39,.065,side*1.19,0,.36);
  for(const dy of [-.115,.115])cylinder(group,m.chassis,.026,.026,.014,side*1.19,dy,.4,12).rotation.x=Math.PI/2;
 }
 for(let i=0;i<16;i++){
  const x=-.99+i*.105;
  box(group,m.steel,.084,.099,.021,x,-.035,.502,false);
  box(group,m.chassis,.063,.073,.024,x,-.038,.519,false);
  box(group,m.chassis,.062,.018,.026,x,-.012,.532,false);
  if(i%3===0)box(group,m.accent,.017,.011,.02,x,.088,.513,false);
 }
 box(group,m.steel,.11,.12,.02,.89,-.035,.513,false);
 box(group,m.accent,.018,.017,.019,1.00,.07,.513,false);
 box(group,m.chassis,2.10,.018,.68,0,.155,-.045,false);
 for(let i=0;i<12;i++)box(group,m.steel,.027,.016,.22,-1.01+i*.175,.166,-.21,false);
 group.rotation.x=-.13;
 return {group,accents:[m.accent,m.status]};
}

function securityCamera(m:Mats):EquipmentModel {
 const group=new THREE.Group();group.name="03 · Motorised PTZ surveillance camera";
 // Curved housing, mechanical gimbal and nested optical assembly, shown as one object.
 const hood=new THREE.Mesh(new THREE.SphereGeometry(.63,56,32,0,Math.PI*2,0,Math.PI/2),m.porcelain);
 hood.position.y=.45;hood.scale.y=.72;hood.castShadow=true;group.add(hood);
 cylinder(group,m.trim,.605,.605,.07,0,.415,0,56);
 cylinder(group,m.porcelain,.50,.40,.16,0,.25,0,48);
 const dome=new THREE.Mesh(new THREE.SphereGeometry(.46,48,32,0,Math.PI*2,Math.PI/2,Math.PI/2),m.lens);
 dome.position.y=.12;dome.rotation.x=Math.PI;dome.castShadow=true;group.add(dome);
 // Small recessed camera lens and concentric machined-metal focusing rings.
 cylinder(group,m.trim,.185,.188,.04,0,.12,.419,48).rotation.x=Math.PI/2;
 cylinder(group,m.lens,.153,.153,.015,0,.12,.448,48).rotation.x=Math.PI/2;
 ring(group,m.accent,.103,.007,0,.12,.463);
 ring(group,m.steel,.066,.018,0,.12,.468);
 cylinder(group,m.lens,.042,.042,.012,0,.12,.478,32).rotation.x=Math.PI/2;
 for(let x of [-.30,.30]){
  cylinder(group,m.steel,.027,.027,.028,x,-.045,.31,20).rotation.x=Math.PI/2;
  cylinder(group,m.status,.013,.013,.012,x,-.045,.33,16).rotation.x=Math.PI/2;
 }
 cylinder(group,m.porcelain,.27,.33,.17,0,.87,0,42);
 cylinder(group,m.steel,.23,.23,.03,0,.985,0,42);
 return {group,accents:[m.accent,m.status]};
}

const DESCRIPTIONS=[
 "Three-dimensional enterprise server rack with drive bays, ventilation and management LEDs",
 "Three-dimensional managed Ethernet network switch with rack-mounting hardware and network ports",
 "Three-dimensional PTZ surveillance camera with curved housing, optical lens and gimbal",
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
  const camera=new THREE.PerspectiveCamera(35,1,.1,40);
  camera.position.set(0,.25,5.8);
  camera.lookAt(0,0,0);
  scene.add(new THREE.HemisphereLight(0xe9f6ff,0x203443,2.15));
  const key=new THREE.SpotLight(0xc3eaff,75,16,Math.PI/4,.58,1.4);
  key.position.set(-2.8,5.5,4.5);key.castShadow=!coarse;key.shadow.mapSize.set(512,512);scene.add(key,key.target);
  const rim=new THREE.DirectionalLight(0x45bdff,4.2);rim.position.set(4,2,-5);scene.add(rim);
  const front=new THREE.PointLight(0xffffff,12,9);front.position.set(1,-.2,4);scene.add(front);
  const mats=hardwareMaterials();
  // One standalone rotating subject replaces the previous 3-device wheel and stage.
  const subject=new THREE.Group();scene.add(subject);
  const server=serverRack(mats),access=accessSystem(mats),security=securityCamera(mats);
  const machines=[server,access,security];
  server.group.position.y=.20;
  access.group.scale.setScalar(1.17);
  security.group.scale.setScalar(1.64);
  machines.forEach((item,index)=>{item.group.visible=index===selection.current%3;subject.add(item.group);});
  let width=0,height=0;
  const resize=()=>{
   const w=Math.max(holder.clientWidth,1),h=Math.max(holder.clientHeight,1);
   if(w===width&&h===height)return;
   width=w;height=h;camera.aspect=w/h;
   const heightScale=h<300?.90:h<400?.96:1;
   camera.position.z=Math.max(4.45,1.65/(Math.tan(35*Math.PI/360)*(w/h)))*heightScale;
   camera.position.y=.23;
   camera.lookAt(0,.10,0);
   camera.updateProjectionMatrix();renderer.setSize(w,h,false);
  };
  resize();
  const ro=new ResizeObserver(resize);ro.observe(holder);
  let pointerId:number|null=null,lastX=0,rotationOffset=0;
  const begin=(event:PointerEvent)=>{if(event.pointerType==="touch"||event.button!==0)return;pointerId=event.pointerId;lastX=event.clientX;renderer.domElement.setPointerCapture(event.pointerId);};
  const move=(event:PointerEvent)=>{if(event.pointerId!==pointerId)return;rotationOffset+=(event.clientX-lastX)*.008;lastX=event.clientX;};
  const finish=(event:PointerEvent)=>{if(event.pointerId===pointerId)pointerId=null;};
  renderer.domElement.addEventListener("pointerdown",begin);
  renderer.domElement.addEventListener("pointermove",move);
  renderer.domElement.addEventListener("pointerup",finish);
  renderer.domElement.addEventListener("pointercancel",finish);
  let active=true,visible=document.visibilityState==="visible",raf=0,lastFrame=0,phase=.20,current=selection.current%3;
  const observer=new IntersectionObserver(entries=>{active=entries[0]?.isIntersecting??false;}, {threshold:.03});observer.observe(holder);
  const onVisibility=()=>{visible=document.visibilityState==="visible"};document.addEventListener("visibilitychange",onVisibility);
  const render=(ms:number)=>{
   raf=requestAnimationFrame(render);
   if(!active||!visible||ms-lastFrame<(coarse?32:18))return;
   lastFrame=ms;
   if(current!==selection.current%3){current=selection.current%3;phase=.2;rotationOffset=0;}
   machines.forEach((model,index)=>{model.group.visible=index===current;});
   // At 60 fps: one full revolution in roughly 36 seconds, matching subtle product-showcase motion.
   if(!reduced&&pointerId===null)phase+=.0029;
   subject.rotation.y=phase+rotationOffset-.42;
   subject.position.y=reduced?0:Math.sin(ms*.00052)*.035;
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
 return <div className="kp-real-3d">
  <div ref={host} className="kp-real-3d-viewport" role="img" aria-label={DESCRIPTIONS[slide%DESCRIPTIONS.length]}/>
  {unsupported&&<div className="kp-real-3d-fallback" role="status">3D graphics aren’t supported in this browser. Equipment specifications remain available below.</div>}
  <span className="kp-real-3d-corner kp-real-3d-corner--top" aria-hidden="true">KABO / EQUIPMENT SHOWROOM</span>
  <span className="kp-real-3d-corner kp-real-3d-corner--bottom" aria-hidden="true">3D EQUIPMENT · {unsupported?"STATIC VIEW":"AUTO-ROTATING"}</span>
 </div>;
}
