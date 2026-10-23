"use client";

import { useState } from "react";

export type SceneKey = "campus" | "compute" | "network" | "security" | "edge";

type Site = { key: SceneKey; name: string; category: string; description: string; x: number; y: number };
export const SITES: Site[] = [
  { key:"campus", name:"Connected campus", category:"ACCESS LAYER", description:"High-density wireless, switching and identity-aware connectivity across buildings and workspaces.", x:345,y:330 },
  { key:"compute", name:"Intelligent data centre", category:"COMPUTE & DATA", description:"Compute, storage, accelerated workloads and resilience designed around application demands.", x:622,y:235 },
  { key:"network", name:"Wide-area fabric", category:"NETWORK CORE", description:"Routing, encrypted branch overlays and segmentation connect locations into one resilient fabric.", x:516,y:416 },
  { key:"security", name:"Secure environments", category:"PHYSICAL & CYBER", description:"Video systems, electronic access, sensor networks and security policy integrated at the edge.", x:180,y:420 },
  { key:"edge", name:"Connected edge", category:"DISTRIBUTED SYSTEMS", description:"Remote facilities, IoT endpoints and distributed network infrastructure brought into view.", x:785,y:415 },
];

function Building({ x, y, w, d, h, color = "#2d579c", windows = 4 }: { x:number; y:number; w:number; d:number; h:number; color?:string; windows?:number }) {
  const left = `${x},${y-h} ${x+d},${y-h-d*.48} ${x+d},${y-d*.48} ${x},${y}`;
  const front = `${x},${y-h} ${x+w},${y-h} ${x+w},${y} ${x},${y}`;
  const side = `${x+w},${y-h} ${x+w+d},${y-h-d*.48} ${x+w+d},${y-d*.48} ${x+w},${y}`;
  const roof = `${x},${y-h} ${x+d},${y-h-d*.48} ${x+w+d},${y-h-d*.48} ${x+w},${y-h}`;
  return <g className="vf-building">
    <polygon points={roof} fill="#3a63a5" stroke="#86ace8" strokeOpacity=".35" strokeWidth="1.2" />
    <polygon points={front} fill="url(#buildingFront)" stroke="#83a9e4" strokeOpacity=".25" strokeWidth="1.2" />
    <polygon points={side} fill="#152f5d" stroke="#83a9e4" strokeOpacity=".27" strokeWidth="1.2" />
    <polygon points={left} fill="#1d3a6b" opacity=".8" />
    <path d={`M ${x+8} ${y-h+8} H ${x+w-8}`} stroke={color} strokeWidth="2" opacity=".85" />
    {Array.from({length: windows},(_,i)=> <g key={i} opacity=".85">
      <path d={`M ${x+14+i*(Math.max(16,(w-25)/windows))} ${y-h+32} v ${Math.max(12,h-54)}`} stroke="#82abec" strokeOpacity=".55" strokeWidth="5" strokeDasharray="9 9" />
    </g>)}
    <path d={`M${x+w+8} ${y-h+12} l${Math.max(10,d-16)} ${-Math.max(5,(d-16)*.48)}`} stroke="#759edf" strokeWidth="3" opacity=".45"/>
  </g>
}

function SmallServer({x,y}:{x:number;y:number}) {return <g><path d={`M${x-42} ${y}l42 -22 52 26 -44 23z`} fill="#17315c" stroke="#5d8cd7" strokeOpacity=".45"/><path d={`M${x-42} ${y}v-68 l42 -22 v68z`} fill="#29487b"/><path d={`M${x} ${y-22}v-68 l52 26 v68z`} fill="#162e58"/><path d={`M${x-33} ${y-57}l30 -16M${x-33} ${y-41}l30 -16M${x-33} ${y-25}l30 -16`} stroke="#759fdf" strokeWidth="3" strokeOpacity=".6"/><circle cx={x+12} cy={y-57} r="3" fill="#6c9aea"/></g>}

export function NetworkScene({ compact=false, initial="campus", onPick }: {compact?:boolean;initial?:SceneKey;onPick?:(key:SceneKey)=>void}) {
  const [selected,setSelected]=useState<SceneKey>(initial);
  const active=SITES.find(s=>s.key===selected) || SITES[0];
  const choose=(key:SceneKey)=>{setSelected(key);onPick?.(key)};
  return <div className={`vf-scene ${compact?"vf-scene--compact":""}`}>
    <div className="vf-scene-topline"><span className="vf-live-dot"/> KABO / ARCHITECTURE EXPLORER <span className="vf-scene-topright">INTERACTIVE REFERENCE MODEL</span></div>
    <div className="vf-scene-canvas">
    <svg viewBox="0 0 1000 600" role="img" aria-label="Interactive illustrated campus with data centre, connected buildings, secure access, edge and network infrastructure" className="vf-campus-svg">
      <defs>
        <linearGradient id="ground" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#162e56"/><stop offset="1" stopColor="#081E31"/></linearGradient>
        <linearGradient id="buildingFront" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#2a4b82"/><stop offset="1" stopColor="#112C46"/></linearGradient>
        <radialGradient id="haze"><stop stopColor="#2c68c5" stopOpacity=".3"/><stop offset="1" stopColor="#2c68c5" stopOpacity="0"/></radialGradient>
        <filter id="neon"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <pattern id="microgrid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="#6e9ce3" strokeOpacity=".075" strokeWidth="1"/></pattern>
      </defs>
      <ellipse cx="520" cy="350" rx="460" ry="240" fill="url(#haze)"/>
      <g opacity=".9"><path d="M65 385 L405 215 L954 405 L614 570 Z" fill="url(#ground)" stroke="#39588c" strokeOpacity=".34" strokeWidth="1.5"/><path d="M65 385 L405 215 L954 405 L614 570 Z" fill="url(#microgrid)" opacity=".8"/></g>
      <g fill="none" stroke="#3d66a6" strokeOpacity=".2"><path d="M 118 400 L 459 230 M 177 423 L 520 252 M 235 446 L 578 275 M 293 468 L 636 298 M 351 490 L 695 321 M 407 513 L 750 343 M 470 534 L 810 366"/><path d="M 160 340 L 709 530 M 216 310 L 763 499 M 273 282 L 820 471 M 329 253 L 878 442"/></g>
      <path className="vf-route vf-route--a" d="M180 420 Q210 355 345 330 Q465 310 622 235"/>
      <path className="vf-route vf-route--b" d="M345 330 Q420 420 516 416 Q665 425 785 415"/>
      <path className="vf-route vf-route--c" d="M622 235 Q711 289 785 415"/>
      <path className="vf-route vf-route--d" d="M180 420 Q343 485 516 416"/>
      <path className="vf-route-pulse" d="M180 420 Q210 355 345 330 Q465 310 622 235"/>
      <path className="vf-route-pulse vf-route-pulse--two" d="M345 330 Q420 420 516 416 Q665 425 785 415"/>
      {/* Isometric environments are original KABO artwork, not vendor diagrams. */}
      <g opacity=".92"><Building x={265} y={334} w={92} d={48} h={165} windows={4}/><Building x={374} y={346} w={86} d={44} h={115} windows={3}/><Building x={332} y={344} w={34} d={32} h={57} windows={1}/></g>
      <g><Building x={575} y={263} w={112} d={54} h={130} windows={5}/><Building x={694} y={270} w={50} d={28} h={88} windows={2}/><path d="M588 138 H680" stroke="#6393dc" strokeWidth="3" opacity=".7" /></g>
      <g><Building x={148} y={424} w={90} d={35} h={80} windows={3}/><path d="M237 360v-55" stroke="#6b98df" strokeOpacity=".8" strokeWidth="3"/><circle cx="237" cy="301" r="10" fill="#122950" stroke="#74a0e4" strokeWidth="2"/><path d="M224 284q13-13 26 0M218 276q19-21 38 0" stroke="#6993d5" fill="none" strokeWidth="2" opacity=".8"/></g>
      <g><Building x={745} y={429} w={90} d={42} h={78} windows={3}/><path d="M790 344v-23" stroke="#739de0" strokeWidth="2"/><circle cx="790" cy="319" r="5" fill="#6493db"/></g>
      <SmallServer x={505} y={441}/>
      {SITES.map((s,i)=><g key={s.key} tabIndex={0} role="button" aria-label={`Inspect ${s.name}`} aria-pressed={selected===s.key} className={`vf-node ${selected===s.key?"vf-node--active":""}`} onClick={()=>choose(s.key)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();choose(s.key)}}} style={{cursor:"pointer"}}>
        <circle cx={s.x} cy={s.y} r="24" fill="#031A2A" fillOpacity=".8" stroke="#8db6f4" strokeOpacity=".32" strokeWidth="1"/>
        {selected===s.key&&<circle cx={s.x} cy={s.y} r="32" className="vf-node-ring" fill="none" stroke="#92b6f3" strokeWidth="1"/>}
        <circle cx={s.x} cy={s.y} r="11" fill={selected===s.key?"#a3c0f3":"#0e2e63"} stroke="#9cbef1" strokeWidth="1.5"/><text x={s.x} y={s.y+4} fontSize="11" fontWeight="700" textAnchor="middle" fill={selected===s.key?"#081a3a":"#b6cdf5"}>{i+1}</text>
      </g>)}
      <g className="vf-map-annotation"><text x="54" y="90" fontSize="12" letterSpacing="3" fill="#84a4d6">ENTERPRISE SYSTEMS / FIELD VIEW</text><text x="54" y="113" fontSize="11" fill="#7083a3">Schematic · Not to scale</text><path d="M55 124 h115" stroke="#5684cc" strokeOpacity=".5"/></g>
      <g opacity=".6"><path d="M880 95 v55 m-12-43 l12-12 12 12" stroke="#6694db" fill="none" strokeWidth="1.5"/><text x="871" y="80" fill="#83a0d0" fontSize="11">N</text></g>
    </svg>
    </div>
    <div className="vf-scene-footer"><div className="vf-scene-selected"><span className="vf-scene-index">0{SITES.findIndex(s=>s.key===selected)+1}</span><span><strong>{active.name}</strong><small>{active.category}</small></span></div><p>{active.description}</p></div>
    <div className="vf-scene-choices" role="group" aria-label="Select an infrastructure domain">{SITES.map(s=><button key={s.key} onClick={()=>choose(s.key)} className={selected===s.key?"is-active":""} aria-pressed={selected===s.key}>{s.name}</button>)}</div>
  </div>
}