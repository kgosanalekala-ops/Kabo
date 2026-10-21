"use client";
import { useEffect, useRef } from "react";
import { usePage } from "@/components/kabo/page-context";

/* Motion is progressively enhanced. Without JS / intersection support, the
 * entire site stays visible and usable, including keyboard and touch layouts. */
const TARGETS=[
".vf-section-lead",".vf-intro .vf-two-col > div",".vf-domain-card",
".vf-industry-tile",".vf-process-step",".vf-oem-grid button",
".vf-procurement-grid button",".vf-detail-overview > div",
".vf-detail-list > div",".vf-eco-heading",".vf-ecosystem-names > span",
".vf-form-grid > div",".vf-form-grid > form",".vf-company-contact",
".vf-arch-frame",".vf-invitation-inner",
".vf-interior-content .vf-eyebrow",".vf-interior-content h1",
".vf-interior-content > p",".vf-interior-action",".vf-interior-index"
].join(",");

export function MotionDirector(){
 const {currentPage,selectedDetail}=usePage();
 const bar=useRef<HTMLSpanElement>(null);
 useEffect(()=>{
   if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
   const root=document.querySelector(".vf-app");
   if(!root)return;
   const io=new IntersectionObserver(entries=>{
     for(const entry of entries){
       if(!entry.isIntersecting)continue;
       (entry.target as HTMLElement).dataset.vfReveal="visible";
       io.unobserve(entry.target);
     }
   },{rootMargin:"0px 0px -8% 0px",threshold:.08});
   const register=()=>{
     root.querySelectorAll<HTMLElement>(TARGETS).forEach(el=>{
       if(el.dataset.vfReveal)return;
       const siblings=Array.from(el.parentElement?.children||[]).filter(node=>node.matches(TARGETS));
       const order=Math.max(0,siblings.indexOf(el));
       el.style.setProperty("--vf-reveal-delay",Math.min(order,4)*70+"ms");
       if(el.getBoundingClientRect().top<window.innerHeight*.82){
         el.dataset.vfReveal="visible";
       }else{
         el.dataset.vfReveal="pending";
         io.observe(el);
       }
     });
   };
   register();
   // Includes pages created after AnimatePresence exit and filtered results.
   const changes=new MutationObserver(register);
   changes.observe(root,{childList:true,subtree:true});
   return()=>{changes.disconnect();io.disconnect();};
 },[currentPage,selectedDetail]);

 useEffect(()=>{
   let frame=0;
   const draw=()=>{
     frame=0;
     const total=document.documentElement.scrollHeight-window.innerHeight;
     const fraction=total>0?Math.max(0,Math.min(1,window.scrollY/total)):0;
     if(bar.current)bar.current.style.transform="scaleX("+fraction+")";
   };
   const schedule=()=>{if(!frame)frame=requestAnimationFrame(draw);};
   schedule();
   window.addEventListener("scroll",schedule,{passive:true});
   window.addEventListener("resize",schedule);
   return()=>{window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);if(frame)cancelAnimationFrame(frame);};
 },[currentPage,selectedDetail]);
 return <div className="vf-reading-track" aria-hidden="true"><span ref={bar}/></div>;
}
