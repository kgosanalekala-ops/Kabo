"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Rotate3D, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import type { ViewType } from "./architecture-studio";

type Zone = { id: string; name: string; caption: string; number: string };
type Pt = { x: number; y: number; z: number };
const POSITIONS: Record<ViewType,Pt[]> = {
 campus:[{x:-3.4,y:0,z:-1.0},{x:2.6,y:0,z:-1.9},{x:.1,y:0,z:1.9},{x:-3.6,y:0,z:2.4},{x:3.5,y:0,z:2.6}],
 compute:[{x:-3.5,y:0,z:0},{x:-1,y:0,z:-2},{x:2,y:0,z:0},{x:3.5,y:0,z:2}],
 security:[{x:-3.4,y:0,z:-1.6},{x:-1.1,y:0,z:2.1},{x:1.6,y:0,z:-1.5},{x:3.6,y:0,z:1.8}],
 widearea:[{x:-3.6,y:0,z:-1.6},{x:-1.0,y:0,z:2.1},{x:2,y:0,z:-1.5},{x:3.6,y:0,z:1.8}],
 workplace:[{x:-3.5,y:0,z:-1.6},{x:-1.1,y:0,z:2.1},{x:1.7,y:0,z:-1.5},{x:3.5,y:0,z:1.8}]
};
const EDGES: Record<ViewType,[number,number][]> = {
 campus:[[0,1],[0,2],[2,4],[2,3],[1,4]],
 compute:[[0,1],[1,2],[2,3],[0,3]],
 security:[[0,2],[1,2],[2,3]],
 widearea:[[0,1],[1,2],[2,3],[0,3]],
 workplace:[[0,1],[1,2],[2,3]]
};
function clamp(n:number,min:number,max:number){return Math.min(max,Math.max(min,n))}
function project(p:Pt,yaw:number,pitch:number,zoom:number,w:number,h:number){
 const cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
 const x=p.x*cy-p.z*sy, depth=p.x*sy+p.z*cy;
 const y=p.y*cp-depth*sp, z=p.y*sp+depth*cp;
 const scale=zoom/(zoom+z*.9);
 return {x:w/2+x*scale*w*.083,y:h*.58-y*scale*h*.145,z,scale};
}
type Face={pts:Pt[];fill:string;line:string;depth:number};
function box(origin:Pt,sx:number,sy:number,sz:number,fill:string,yaw:number,pitch:number,zoom:number,w:number,h:number):Face[]{
 const {x,y,z}=origin, x0=x-sx/2,x1=x+sx/2,z0=z-sz/2,z1=z+sz/2;
 const pts:Pt[]=[{x:x0,y,z:z0},{x:x1,y,z:z0},{x:x1,y,z:z1},{x:x0,y,z:z1},{x:x0,y:y+sy,z:z0},{x:x1,y:y+sy,z:z0},{x:x1,y:y+sy,z:z1},{x:x0,y:y+sy,z:z1}];
 const faces=[[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7],[4,5,6,7]];
 return faces.map((ids,i)=>({pts:ids.map(id=>pts[id]),fill:i===4?"#5fa4be":i%2?"#143d58":fill,line:"#5e9eb7",depth:ids.reduce((a,id)=>a+project(pts[id],yaw,pitch,zoom,w,h).z,0)/4}));
}
export function Architecture3D({type,zones,active,onSelect}:{type:ViewType;zones:Zone[];active:number;onSelect:(index:number)=>void}){
 const canvas=useRef<HTMLCanvasElement>(null);
 const pointer=useRef<{x:number;y:number}|null>(null);
 const [yaw,setYaw]=useState(-.45),[pitch,setPitch]=useState(.69),[zoom,setZoom]=useState(8.8);
 const [dims,setDims]=useState({w:1000,h:530});
 const [reduce,setReduce]=useState(false);
 const positions=POSITIONS[type].slice(0,zones.length);
 useEffect(()=>{const mq=window.matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setReduce(mq.matches);update();mq.addEventListener("change",update);return()=>mq.removeEventListener("change",update)},[]);
 useEffect(()=>{const el=canvas.current;if(!el)return;const observer=new ResizeObserver(()=>setDims({w:el.clientWidth||1000,h:el.clientHeight||530}));observer.observe(el);return()=>observer.disconnect()},[]);
 useEffect(()=>{
 const el=canvas.current;if(!el)return;const ctx=el.getContext("2d");if(!ctx)return;
 const w=Math.max(320,dims.w),h=Math.max(260,dims.h),dpr=Math.min(window.devicePixelRatio||1,2);
 el.width=Math.round(w*dpr);el.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
 let frame=0,raf=0;
 const render=()=>{
  frame++;ctx.clearRect(0,0,w,h);
  const bg=ctx.createLinearGradient(0,0,w,h);bg.addColorStop(0,"#102c3b");bg.addColorStop(.6,"#071c2c");bg.addColorStop(1,"#061523");ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
  const halo=ctx.createRadialGradient(w*.53,h*.43,10,w*.53,h*.43,w*.55);halo.addColorStop(0,"rgba(58,173,220,.16)");halo.addColorStop(1,"rgba(6,22,34,0)");ctx.fillStyle=halo;ctx.fillRect(0,0,w,h);
  for(let a=-7;a<=7;a++){for(const axis of [0,1]){
   const pa=project(axis?{x:-7,y:-.035,z:a}:{x:a,y:-.035,z:-7},yaw,pitch,zoom,w,h);
   const pb=project(axis?{x:7,y:-.035,z:a}:{x:a,y:-.035,z:7},yaw,pitch,zoom,w,h);
   ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);ctx.strokeStyle="rgba(104,185,214,.10)";ctx.lineWidth=1;ctx.stroke();
  }}
  const edges=EDGES[type];for(const [a,b] of edges){if(!positions[a]||!positions[b])continue;
   const v1=project({...positions[a],y:.25},yaw,pitch,zoom,w,h),v2=project({...positions[b],y:.25},yaw,pitch,zoom,w,h);
   ctx.beginPath();ctx.moveTo(v1.x,v1.y);ctx.lineTo(v2.x,v2.y);ctx.strokeStyle="rgba(107,208,243,.52)";ctx.lineWidth=2;ctx.setLineDash([7,8]);ctx.lineDashOffset=reduce?0:-frame*.38;ctx.stroke();ctx.setLineDash([]);
   const t=reduce?.5:(frame*.003+(a*.27))%1;const px=v1.x+(v2.x-v1.x)*t,py=v1.y+(v2.y-v1.y)*t;
   ctx.beginPath();ctx.arc(px,py,3,0,Math.PI*2);ctx.fillStyle="#a9edff";ctx.shadowColor="#a9edff";ctx.shadowBlur=14;ctx.fill();ctx.shadowBlur=0;
  }
  const faces:Face[]=[];
  positions.forEach((p,i)=>{
   const hgt=i===active?2.25:1.25+(i%3)*.32;
   const body=i===active?"#226b8b":"#19465f";
   faces.push(...box(p,1.35,hgt,1.17,body,yaw,pitch,zoom,w,h));
   if(type==="compute"||type==="campus")faces.push(...box({x:p.x,y:hgt+.05,z:p.z},.87,.22,.78,"#144861",yaw,pitch,zoom,w,h));
  });
  faces.sort((a,b)=>b.depth-a.depth);
  faces.forEach(f=>{const screen=f.pts.map(p=>project(p,yaw,pitch,zoom,w,h));ctx.beginPath();screen.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fillStyle=f.fill;ctx.fill();ctx.strokeStyle=f.line;ctx.lineWidth=1.2;ctx.stroke()});
  positions.forEach((p,i)=>{const a=project({...p,y:1.1+(i===active?1.3:1.0)},yaw,pitch,zoom,w,h);
   ctx.beginPath();ctx.arc(a.x,a.y, i===active?8:5,0,Math.PI*2);ctx.fillStyle=i===active?"#dcf9ff":"#76d3ed";ctx.shadowBlur=i===active?19:7;ctx.shadowColor="#74dafa";ctx.fill();ctx.shadowBlur=0;
  });
  if(!reduce)raf=requestAnimationFrame(render);
 };
 render();return()=>cancelAnimationFrame(raf);
 },[dims,yaw,pitch,zoom,type,active,reduce,positions.length]);
 const projection=useCallback((i:number)=>project({...positions[i],y:2.2},yaw,pitch,zoom,dims.w,dims.h),[positions,yaw,pitch,zoom,dims]);
 return <section className="vf-orbit" aria-label={type+" interactive three-dimensional architecture model"}>
  <div className="vf-orbit-top"><span><Rotate3D size={15}/> 3D SYSTEM EXPLORER</span><span>DRAG TO ORBIT · SELECT A SYSTEM · SCROLL TO ZOOM</span></div>
  <div className="vf-orbit-surface">
   <canvas ref={canvas} role="img" aria-label="Original three-dimensional illustrated infrastructure model with interconnected selectable equipment" onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);pointer.current={x:e.clientX,y:e.clientY}}} onPointerMove={e=>{if(!pointer.current)return;const dx=e.clientX-pointer.current.x,dy=e.clientY-pointer.current.y;pointer.current={x:e.clientX,y:e.clientY};setYaw(v=>v+dx*.007);setPitch(v=>clamp(v+dy*.005,.28,1.25))}} onPointerUp={()=>{pointer.current=null}} onPointerCancel={()=>{pointer.current=null}} onWheel={e=>{if(!e.shiftKey&&!e.ctrlKey)return;e.preventDefault();setZoom(v=>clamp(v+e.deltaY*.012,5.8,16))}}/>
   {positions.map((p,i)=>{const s=projection(i);return <button key={zones[i].id} type="button" className={"vf-orbit-node "+(active===i?"is-active":"")} style={{left:s.x,top:s.y}} onClick={()=>onSelect(i)} aria-pressed={active===i} title={zones[i].caption}><span>{zones[i].number}</span><strong>{zones[i].name}</strong></button>})}
   <div className="vf-orbit-actions"><button aria-label="Zoom in" onClick={()=>setZoom(v=>clamp(v-.8,5.8,16))}><ZoomIn size={17}/></button><button aria-label="Zoom out" onClick={()=>setZoom(v=>clamp(v+.8,5.8,16))}><ZoomOut size={17}/></button><button aria-label="Reset view" onClick={()=>{setYaw(-.45);setPitch(.69);setZoom(8.8)}}><RotateCcw size={17}/></button></div>
  </div>
  <p className="vf-orbit-note">Illustrative architecture, not a customer installation or manufacturer-certified design. Equipment representations are conceptual.</p>
 </section>;
}
