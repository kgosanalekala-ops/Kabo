"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import type { ViewType } from "./architecture-studio";

type Zone = { id: string; name: string; caption: string; number: string };
type Point = {x:number;y:number;z:number};
type Kind = "building"|"datacentre"|"branch"|"gate"|"field"|"rack"|"gpu"|"storage"|"fabric"|"ups"|"cooling"|"camera"|"reader"|"network"|"control"|"edge"|"cloud"|"printer"|"scanner"|"archive"|"workflow"|"laptop"|"workstation"|"wifi"|"meeting"|"supplies"|"firewall"|"backup"|"recovery";
type Element={p:Point;kind:Kind;tag:string};
type Diagram={items:Element[];edges:[number,number][];ground:"campus"|"facility"|"office"|"district"};
const place=(kind:Kind,tag:string,x:number,z:number):Element=>({kind,tag,p:{x,y:0,z}});
const DIAGRAMS:Record<ViewType,Diagram>={
 campus:{ground:"campus",items:[place("building","ADMINISTRATION",-3.7,-1.5),place("datacentre","CAMPUS CORE",2.3,-1.8),place("branch","CONNECTED BLOCK",-.5,1.9),place("gate","SECURITY ACCESS",-3.5,2.8),place("field","REMOTE FACILITY",3.2,2.7)],edges:[[0,1],[0,2],[2,3],[2,4],[1,4]]},
 compute:{ground:"facility",items:[place("storage","DATA SOURCES",-3.4,1.3),place("fabric","DATA FABRIC",-1.4,-2),place("gpu","GPU COMPUTE",1.5,1.0),place("backup","RESILIENCE",3.8,-1.5)],edges:[[0,1],[1,2],[2,3],[0,3]]},
 datacentre:{ground:"facility",items:[place("rack","SERVER AISLE",-3.4,-1.6),place("storage","STORAGE",-.7,2),place("fabric","NETWORK CORE",0,-2.3),place("ups","POWER",3,2),place("cooling","COOLING",3.8,-1.7)],edges:[[0,1],[0,2],[2,3],[3,4],[1,4]]},
 security:{ground:"campus",items:[place("camera","CAMERA",-3.5,-1.8),place("reader","CONTROLLED DOOR",-2.2,2.2),place("network","SEGMENTED NETWORK",1,-1.7),place("control","CONTROL ROOM",3.5,2)],edges:[[0,2],[1,2],[2,3]]},
 widearea:{ground:"district",items:[place("branch","REGIONAL BRANCH",-3.7,-1.8),place("edge","SD-WAN EDGE",-1,2),place("cloud","HYBRID SERVICES",1.8,-1.7),place("control","OPERATIONS CENTRE",3.7,2)],edges:[[0,1],[1,2],[2,3],[0,3]]},
 document:{ground:"office",items:[place("scanner","CAPTURE",-3.5,-1.8),place("workflow","APPROVAL",-1,2),place("archive","RECORDS",1.8,-1.7),place("printer","SECURE OUTPUT",3.8,2)],edges:[[0,1],[1,2],[2,3]]},
 resilience:{ground:"facility",items:[place("laptop","USER ACCESS",-3.8,-1.8),place("firewall","SECURITY EDGE",-1.3,2),place("rack","PROTECTED SERVERS",1,-1.6),place("backup","BACKUP COPY",3.4,2),place("recovery","RECOVERY SITE",4.1,-1.7)],edges:[[0,1],[1,2],[2,3],[3,4]]},
 workplace:{ground:"office",items:[place("laptop","BUSINESS LAPTOP",-3.7,-1.8),place("workstation","WORKSTATION",-1.5,2),place("wifi","BUSINESS WI-FI",1,-1.8),place("meeting","MEETING ROOM",3.5,2),place("supplies","SUPPLIES",4,-1.7)],edges:[[0,2],[1,2],[2,3],[2,4]]}
};
const clamp=(n:number,lo:number,hi:number)=>Math.max(lo,Math.min(hi,n));
const blue={roof:"#5c96b8",face:"#365d79",side:"#18384f",light:"#a7d1e9",steel:"#7398b3",warm:"#d4e2e8",foundation:"#203b51"};
function point(p:Point,yaw:number,pitch:number,zoom:number,w:number,h:number){
 const cs=Math.cos(yaw),sn=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
 const x=p.x*cs-p.z*sn, depth=p.x*sn+p.z*cs;
 const v=p.y*cp-depth*sp, z=p.y*sp+depth*cp;
 const k=zoom/(zoom+z*.82);
 return {x:w/2+x*k*w*.082,y:h*.61-v*k*h*.14,z,k};
}
function path(ctx:CanvasRenderingContext2D,pts:{x:number;y:number}[],fill:string,stroke?:string){
 if(!pts.length)return;
 ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();
 ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.2;ctx.stroke();}
}
function line(ctx:CanvasRenderingContext2D,a:{x:number;y:number},b:{x:number;y:number},color:string,width=1.4){
 ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();
}
type Projection=(p:Point)=>{x:number;y:number;z:number;k:number};
function block(ctx:CanvasRenderingContext2D,p:Point,sx:number,sy:number,sz:number,proj:Projection,roof=blue.roof,front=blue.face,side=blue.side){
 const x0=p.x-sx/2,x1=p.x+sx/2,z0=p.z-sz/2,z1=p.z+sz/2;
 const vertices=[
 {x:x0,y:p.y,z:z0},{x:x1,y:p.y,z:z0},{x:x1,y:p.y,z:z1},{x:x0,y:p.y,z:z1},
 {x:x0,y:p.y+sy,z:z0},{x:x1,y:p.y+sy,z:z0},{x:x1,y:p.y+sy,z:z1},{x:x0,y:p.y+sy,z:z1}];
 const faces=[{ids:[0,1,5,4],fill:side},{ids:[1,2,6,5],fill:front},{ids:[2,3,7,6],fill:front},{ids:[3,0,4,7],fill:side},{ids:[4,5,6,7],fill:roof}];
 faces.sort((a,b)=>b.ids.reduce((v,i)=>v+proj(vertices[i]).z,0)-a.ids.reduce((v,i)=>v+proj(vertices[i]).z,0));
 faces.forEach(f=>path(ctx,f.ids.map(i=>proj(vertices[i])),f.fill,"rgba(172,211,231,.55)"));
}
function softCircle(ctx:CanvasRenderingContext2D,p:{x:number;y:number},radius:number,color:string){
 ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();
}
function annotate(ctx:CanvasRenderingContext2D,a:Point,b:Point,proj:Projection,color="#bdddf0",thickness=2){
 line(ctx,proj(a),proj(b),color,thickness);
}
function windows(ctx:CanvasRenderingContext2D,p:Point,sx:number,sy:number,sz:number,proj:Projection,rows=3,columns=4){
 const z=p.z+sz/2+.014;
 for(let r=0;r<rows;r++)for(let c=0;c<columns;c++){
  const y=p.y+.26+(r+.45)*(Math.max(.5,sy-.46))/rows;
  const x=p.x-sx/2+(c+.5)*sx/columns;
  const spread=sx/(columns*3.8);
  path(ctx,[proj({x:x-spread,y:y-.11,z}),proj({x:x+spread,y:y-.11,z}),proj({x:x+spread,y:y+.11,z}),proj({x:x-spread,y:y+.11,z})],
   c%3===0?"#d2e9f4":"#7aafcb","#b8d8e8");
 }
}
function shadow(ctx:CanvasRenderingContext2D,p:Point,proj:Projection,sx=1.7,sz=1.3){
 const pts=Array.from({length:20},(_,i)=>{const t=i*Math.PI/10;return proj({x:p.x+Math.cos(t)*sx/2,y:-.04,z:p.z+Math.sin(t)*sz/2})});
 path(ctx,pts,"rgba(3,17,32,.43)");
}
function roofEquipment(ctx:CanvasRenderingContext2D,p:Point,height:number,proj:Projection){
 block(ctx,{x:p.x+.15,y:height,z:p.z},.42,.22,.42,proj,"#8bbbd2","#456a87","#274b65");
}
function building(ctx:CanvasRenderingContext2D,p:Point,proj:Projection,variant:"campus"|"data"|"branch"|"gate"|"recovery"){
 const dims=variant==="campus"?[2.15,2.2,1.55]:variant==="data"?[2.28,1.45,1.7]:variant==="gate"?[1.35,.88,1.1]:variant==="recovery"?[1.92,1.55,1.5]:[1.65,1.55,1.25];
 const [sx,sy,sz]=dims;
 shadow(ctx,p,proj,sx*1.27,sz*1.3);
 block(ctx,p,sx,sy,sz,proj,variant==="data"?"#7194a9":"#699fba",variant==="gate"?"#4e6477":"#537d99","#294b63");
 windows(ctx,p,sx,sy,sz,proj,variant==="gate"?1:3,variant==="campus"?5:3);
 const x=p.x,doorY=.55,z=p.z+sz/2+.025;
 path(ctx,[proj({x:x-.18,y:0,z}),proj({x:x+.18,y:0,z}),proj({x:x+.18,y:doorY,z}),proj({x:x-.18,y:doorY,z})],"#102b40","#bad7e5");
 if(variant==="data"||variant==="recovery")roofEquipment(ctx,p,sy,proj);
 if(variant==="campus"){
  // An attached low wing, pitched entrance canopy and walkway make the campus a real complex.
  const wing={x:p.x+1.05,y:0,z:p.z+.32};
  block(ctx,wing,.94,.95,1.25,proj,"#81a8be","#5a7c92","#24455e");
  windows(ctx,wing,.94,.95,1.25,proj,1,3);
  annotate(ctx,{x:p.x,y:doorY+.11,z:z+.12},{x:p.x+.75,y:doorY+.11,z:z+.12},proj,"#9ccce3",3);
 }
}
function rack(ctx:CanvasRenderingContext2D,p:Point,proj:Projection,variant:"server"|"gpu"|"storage"|"fabric"|"ups"|"backup"|"firewall"){
 const dims=variant==="fabric"||variant==="firewall"?[1.35,1.1,1]:[1.35,2.0,1.05];const [sx,sy,sz]=dims;
 shadow(ctx,p,proj,sx*1.2,sz*1.2);block(ctx,p,sx,sy,sz,proj,"#657e90","#20374b","#15283a");
 const z=p.z+sz/2+.02;
 const slots=variant==="fabric"?4:variant==="ups"?5:variant==="firewall"?3:7;
 for(let i=0;i<slots;i++){
  const y=.19+(i+.2)*(sy-.3)/slots;
  path(ctx,[proj({x:p.x-sx*.38,y,z}),proj({x:p.x+sx*.37,y,z}),proj({x:p.x+sx*.37,y:y+.12,z}),proj({x:p.x-sx*.38,y:y+.12,z})],
   i%3===1?"#385976":"#29455e","#7299af");
  softCircle(ctx,proj({x:p.x+sx*.28,y:y+.055,z:z+.018}),2.3,i%3?"#82bfff":"#d1ebff");
 }
 if(variant==="gpu"){
  annotate(ctx,{x:p.x-.3,y:sy+.08,z:p.z},{x:p.x+.3,y:sy+.08,z:p.z},proj,"#abd9f2",4);
 }
 if(variant==="ups"){
  for(let i=0;i<3;i++)softCircle(ctx,proj({x:p.x+.1+(i-1)*.22,y:sy*.65,z:z+.02}),3.5,i===0?"#d4e8f6":"#8bbde5");
 }
}
function device(ctx:CanvasRenderingContext2D,p:Point,proj:Projection,kind:Kind){
 shadow(ctx,p,proj,2,1.3);
 if(kind==="laptop"||kind==="workstation"){
  block(ctx,p,1.75,.21,1.25,proj,"#5b7a8d","#213c50","#173246");
  const y=kind==="workstation"?1.65:1.22;
  path(ctx,[proj({x:p.x-.65,y:.27,z:p.z+.06}),proj({x:p.x+.65,y:.27,z:p.z+.06}),proj({x:p.x+.65,y,z:p.z+.06}),proj({x:p.x-.65,y,z:p.z+.06})],"#142f48","#b4d8ee");
  path(ctx,[proj({x:p.x-.55,y:.41,z:p.z+.07}),proj({x:p.x+.55,y:.41,z:p.z+.07}),proj({x:p.x+.55,y:y-.13,z:p.z+.07}),proj({x:p.x-.55,y:y-.13,z:p.z+.07})],"#337ea6","#a2d3f0");
  annotate(ctx,{x:p.x-.45,y:.19,z:p.z+.6},{x:p.x+.45,y:.19,z:p.z+.6},proj,"#8ab8d0",3);
  return;
 }
 if(kind==="printer"||kind==="scanner"){
  block(ctx,p,1.65,.86,1.35,proj,"#a5bccb","#5b7487","#314e63");
  block(ctx,{x:p.x,y:.89,z:p.z},1.35,.22,1.1,proj,"#d5e4ec","#658295","#304e65");
  for(let i=0;i<3;i++)annotate(ctx,{x:p.x-.43,y:.35+i*.1,z:p.z+.7},{x:p.x+.45,y:.35+i*.1,z:p.z+.7},proj,"#b5d9ec",2);
  if(kind==="scanner")block(ctx,{x:p.x,y:1.13,z:p.z-.26},1.4,.11,.6,proj,"#c5d9e2");
  else path(ctx,[proj({x:p.x-.45,y:1.18,z:p.z+.22}),proj({x:p.x+.45,y:1.18,z:p.z+.22}),proj({x:p.x+.38,y:1.55,z:p.z+.19}),proj({x:p.x-.38,y:1.55,z:p.z+.19})],"#ebf3f9","#8baec2");
  return;
 }
 if(kind==="camera"||kind==="wifi"||kind==="edge"){
  const h=kind==="camera"?2.1:2.5;
  annotate(ctx,{x:p.x,y:0,z:p.z},{x:p.x,y:h,z:p.z},proj,"#bed9e9",5);
  if(kind==="camera"){
   block(ctx,{x:p.x+.26,y:h-.14,z:p.z},.78,.32,.38,proj,"#dce5ea","#8faebe","#51748c");
   softCircle(ctx,proj({x:p.x+.65,y:h-.05,z:p.z+.2}),6,"#305d82");
  }else{
   for(let r=1;r<4;r++){
    const c=proj({x:p.x,y:h-.15,z:p.z});ctx.beginPath();ctx.arc(c.x,c.y,r*12,Math.PI*1.13,Math.PI*1.87);
    ctx.strokeStyle="rgba(153,211,248,"+(0.67-r*.12)+")";ctx.lineWidth=2;ctx.stroke();
   }
   block(ctx,{x:p.x,y:h-.18,z:p.z},.28,.28,.3,proj,"#b8d6e5","#4b7696");
  }
  return;
 }
 if(kind==="cloud"){
  const c=proj({x:p.x,y:1.75,z:p.z});ctx.fillStyle="#8ec7e6";
  for(const [dx,dy,r] of [[-30,5,18],[-12,-7,23],[15,-5,27],[37,9,17]])softCircle(ctx,{x:c.x+dx,y:c.y+dy},r,"#79afcd");
  line(ctx,{x:c.x-23,y:c.y+18},{x:c.x+35,y:c.y+18},"#c2e5f5",3);
  annotate(ctx,{x:p.x,y:0,z:p.z},{x:p.x,y:1.36,z:p.z},proj,"#6c9fbd",2);
  return;
 }
 if(kind==="reader"||kind==="gate"){
  building(ctx,p,proj,"gate");
  annotate(ctx,{x:p.x+.7,y:.2,z:p.z+.5},{x:p.x+.7,y:1.5,z:p.z+.5},proj,"#a7d9f2",4);
  softCircle(ctx,proj({x:p.x+.7,y:1.49,z:p.z+.5}),5,"#81c5eb");return;
 }
 if(kind==="meeting"||kind==="control"||kind==="workflow"){
  block(ctx,p,2,1.1,1.65,proj,"#7394a8","#446782","#2c4b60");
  path(ctx,[proj({x:p.x-.76,y:.5,z:p.z+.84}),proj({x:p.x+.76,y:.5,z:p.z+.84}),proj({x:p.x+.76,y:1.85,z:p.z+.84}),proj({x:p.x-.76,y:1.85,z:p.z+.84})],"#173b5c","#aad8ec");
  for(let i=0;i<3;i++)line(ctx,proj({x:p.x-.55,y:.75+i*.34,z:p.z+.85}),proj({x:p.x+.5,y:.75+i*.34,z:p.z+.85}),i===1?"#e3f6ff":"#4792c3",4);
  return;
 }
 if(kind==="supplies"||kind==="archive"){
  block(ctx,p,1.65,1.75,1.3,proj,"#8ba9b9","#667e91","#3a566b");
  for(let i=0;i<4;i++){
   const y=.25+i*.36;annotate(ctx,{x:p.x-.63,y,z:p.z+.66},{x:p.x+.63,y,z:p.z+.66},proj,"#b8d9eb",3);
   if(kind==="supplies")for(let j=0;j<5;j++)annotate(ctx,{x:p.x-.48+j*.22,y:y+.04,z:p.z+.67},{x:p.x-.48+j*.22,y:y+.21,z:p.z+.67},proj,j%2?"#a2bfd1":"#e5edf2",4);
  }return;
 }
 if(kind==="cooling"){
  block(ctx,p,1.85,1.6,1.5,proj,"#718da0","#658398","#395569");
  for(let i=0;i<3;i++){
   const c=proj({x:p.x-.5+i*.48,y:1.63,z:p.z});
   ctx.strokeStyle="#c2e4f5";ctx.lineWidth=2;ctx.beginPath();ctx.arc(c.x,c.y,8,0,Math.PI*2);ctx.stroke();
  }return;
 }
 building(ctx,p,proj,kind==="recovery"?"recovery":"branch");
}
function drawAsset(ctx:CanvasRenderingContext2D,item:Element,proj:Projection){
 const {kind,p}=item;
 if(kind==="building"||kind==="datacentre"||kind==="branch"||kind==="gate"||kind==="field"||kind==="recovery"){
  building(ctx,p,proj,kind==="building"?"campus":kind==="datacentre"?"data":kind==="gate"?"gate":kind==="recovery"?"recovery":"branch");
 }else if(["rack","gpu","storage","fabric","ups","network","firewall","backup"].includes(kind)){
  rack(ctx,p,proj,kind==="rack"?"server":kind==="network"?"fabric":kind==="storage"?"storage":kind==="backup"?"backup":kind as "gpu"|"fabric"|"ups"|"firewall");
 }else device(ctx,p,proj,kind);
}
function sceneBackground(ctx:CanvasRenderingContext2D,w:number,h:number,diagram:Diagram,proj:Projection){
 const g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,"#10283a");g.addColorStop(.54,"#0d2031");g.addColorStop(1,"#0b1727");ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
 const pad=diagram.ground==="campus"?"#385369":diagram.ground==="district"?"#314e64":"#32495e";
 path(ctx,[proj({x:-6.1,y:-.18,z:-5.4}),proj({x:6.1,y:-.18,z:-5.4}),proj({x:6.1,y:-.18,z:5.4}),proj({x:-6.1,y:-.18,z:5.4})],pad,"#739fb8");
 for(let q=-5;q<=5;q++){
  line(ctx,proj({x:q,y:-.17,z:-5.3}),proj({x:q,y:-.17,z:5.3}),"rgba(185,210,230,.11)");
  line(ctx,proj({x:-6,y:-.17,z:q}),proj({x:6,y:-.17,z:q}),"rgba(185,210,230,.11)");
 }
 if(diagram.ground==="campus"||diagram.ground==="district"){
  path(ctx,[proj({x:-6,y:-.11,z:.17}),proj({x:6,y:-.11,z:.17}),proj({x:6,y:-.11,z:1.01}),proj({x:-6,y:-.11,z:1.01})],"rgba(19,36,51,.77)");
  for(let x=-5.7;x<6;x+=1.5)line(ctx,proj({x,y:-.1,z:.59}),proj({x:x+.65,y:-.1,z:.59}),"#a8bbc5",1.8);
 }
 if(diagram.ground==="campus"){
  for(const [x,z] of [[-5,-3.5],[4.8,-3],[0,4],[4.9,4.1],[-5,4]]){
   annotate(ctx,{x,y:0,z},{x,y:1.0,z},proj,"#456a57",3);
   const c=proj({x,y:1.0,z});softCircle(ctx,c,11,"#557c85");softCircle(ctx,{x:c.x+3,y:c.y-4},7,"#7d9ea4");
  }
 }
}
export function Architecture3D({type,zones,active,onSelect}:{type:ViewType;zones:Zone[];active:number;onSelect:(index:number)=>void}){
 const canvas=useRef<HTMLCanvasElement>(null);
 const drag=useRef<{x:number;y:number}|null>(null);
 const [yaw,setYaw]=useState(-.48),[pitch,setPitch]=useState(.72),[zoom,setZoom]=useState(8.8),[dims,setDims]=useState({w:1000,h:530}),[reduced,setReduced]=useState(false);
 const diagram=DIAGRAMS[type]||DIAGRAMS.campus;
 const proj:Projection=(p)=>point(p,yaw,pitch,zoom,dims.w,dims.h);
 useEffect(()=>{
  const q=window.matchMedia("(prefers-reduced-motion: reduce)"),f=()=>setReduced(q.matches);f();q.addEventListener("change",f);
  return()=>q.removeEventListener("change",f);
 },[]);
 useEffect(()=>{const el=canvas.current;if(!el)return;const ro=new ResizeObserver(()=>setDims({w:Math.max(el.clientWidth,300),h:Math.max(el.clientHeight,300)}));ro.observe(el);return()=>ro.disconnect();},[]);
 useEffect(()=>{
  const el=canvas.current,ctx=el?.getContext("2d");if(!el||!ctx)return;
  const w=dims.w,h=dims.h,dpr=Math.min(window.devicePixelRatio||1,2);
  el.width=Math.ceil(w*dpr);el.height=Math.ceil(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  let frame=0,raf=0;
  const P:Projection=(p)=>point(p,yaw,pitch,zoom,w,h);
  const render=()=>{
   frame++;ctx.clearRect(0,0,w,h);sceneBackground(ctx,w,h,diagram,P);
   for(const [a,b] of diagram.edges){
    const aa=diagram.items[a],bb=diagram.items[b];if(!aa||!bb)continue;
    const from=P({x:aa.p.x,y:.06,z:aa.p.z}),to=P({x:bb.p.x,y:.06,z:bb.p.z});
    line(ctx,from,to,"rgba(138,204,241,.72)",2);
    const u=reduced?.48:(frame*.004+a*.23)%1;
    softCircle(ctx,{x:from.x+(to.x-from.x)*u,y:from.y+(to.y-from.y)*u},3.6,"#d1f2ff");
   }
   const sorted=diagram.items.map((item,i)=>({item,i,depth:P(item.p).z})).sort((a,b)=>b.depth-a.depth);
   for(const {item,i} of sorted){
    drawAsset(ctx,item,P);
    if(i===active){
     const q=P({x:item.p.x,y:0,z:item.p.z});
     ctx.beginPath();ctx.ellipse(q.x,q.y+4,30,11,0,0,Math.PI*2);ctx.strokeStyle="#b0deff";ctx.lineWidth=2;ctx.stroke();
    }
   }
   ctx.fillStyle="rgba(216,235,247,.72)";ctx.font="10px system-ui,sans-serif";ctx.fillText("KABO  /  CONCEPTUAL INFRASTRUCTURE ENVIRONMENT",16,h-19);
   if(!reduced)raf=requestAnimationFrame(render);
  };
  render();return()=>cancelAnimationFrame(raf);
 },[type,diagram,active,yaw,pitch,zoom,dims,reduced]);
 const spin=(amount:number)=>setYaw(x=>x+amount);
 return <section className="vf-orbit" aria-label={type+" explorable infrastructure environment"}>
  <div className="vf-orbit-top"><span>INTERACTIVE / ENVIRONMENT EXPLORER</span><span>DRAG TO ROTATE · SELECT AN ASSET · SHIFT + SCROLL TO ZOOM</span></div>
  <div className="vf-orbit-surface">
   <canvas ref={canvas} role="img" aria-label="Illustrated three-dimensional infrastructure environment with physical facilities and connected equipment"
    onPointerDown={e=>{if(e.pointerType==="touch")return;e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,y:e.clientY};}}
    onPointerMove={e=>{if(!drag.current)return;const dx=e.clientX-drag.current.x,dy=e.clientY-drag.current.y;drag.current={x:e.clientX,y:e.clientY};setYaw(v=>v+dx*.006);setPitch(v=>clamp(v+dy*.005,.32,1.22));}}
    onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}}
    onWheel={e=>{if(!(e.shiftKey||e.ctrlKey))return;e.preventDefault();setZoom(v=>clamp(v+e.deltaY*.011,6,16));}}/>
   <div className="vf-orbit-hotspots">{diagram.items.slice(0,zones.length).map((item,i)=>{
    const q=proj({x:item.p.x,y:2.2,z:item.p.z});
    return <button key={zones[i].id} type="button" style={{left:q.x,top:q.y}} className={"vf-orbit-node "+(active===i?"is-active":"")}
     onClick={()=>onSelect(i)} aria-haspopup="dialog" aria-label={"Inspect "+zones[i].name} aria-pressed={active===i}>
     <span>{zones[i].number}</span><strong>{zones[i].name}</strong></button>;
   })}</div>
   <div className="vf-orbit-actions">
    <button type="button" aria-label="Rotate environment left" onClick={()=>spin(-.22)}><ChevronLeft size={17}/></button>
    <button type="button" aria-label="Rotate environment right" onClick={()=>spin(.22)}><ChevronRight size={17}/></button>
    <button type="button" aria-label="Zoom in" onClick={()=>setZoom(v=>clamp(v-.7,6,16))}><ZoomIn size={17}/></button>
    <button type="button" aria-label="Zoom out" onClick={()=>setZoom(v=>clamp(v+.7,6,16))}><ZoomOut size={17}/></button>
    <button type="button" aria-label="Reset environment" onClick={()=>{setYaw(-.48);setPitch(.72);setZoom(8.8);}}><RotateCcw size={17}/></button>
   </div>
  </div>
  <p className="vf-orbit-note">Illustrative environment, not a customer installation or certified topology. Select a numbered asset to open its technical explanation. Mobile visitors can select any asset below the illustration.</p>
 </section>;
}
