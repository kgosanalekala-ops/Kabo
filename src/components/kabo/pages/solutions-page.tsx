"use client";

import { VideoHero } from "../video-hero";
import { Solutions } from "../solutions";
import { ArrowRight } from "lucide-react";
import { usePage } from "../page-context";
import { PartnerStrip } from "../partner-strip";
import { AIInfrastructure } from "../ai-infrastructure";

export function SolutionsPage() {
  const { navigate } = usePage();
  return (
    <>
      <VideoHero fullViewport variant="network" tag="Solutions" title={<>{<>Solutions engineered</>}<br />for <span className="intel-text-gradient">Africa&rsquo;s reality</span>.</>} subtitle="Twelve interlocking solution domains — from compute and AI infrastructure to campus networks and secure connectivity — mapped to your requirements. Click a card to see the technology stack.">
        <button onClick={() => navigate("partners")} className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-[13px] font-medium text-white backdrop-blur transition-[background-color,border-color] hover:border-[#00C7FD]/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#70E0F7] sm:text-[14px]">
          Meet our partners
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </VideoHero>
      <section className="bg-[#001e3c] py-8 border-t border-[#2d6688]"><div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-4 text-white"><div><p className="font-semibold text-[#72dffc] text-xs uppercase tracking-widest">Project discovery</p><p className="text-lg font-display font-semibold mt-1">Know your environment. Explore the right architecture.</p></div><button className="kabo-depth-button rounded-full px-6 py-3 font-semibold bg-[#00a8e8] text-white" onClick={()=>navigate("configure")}>Configure your solution <ArrowRight className="inline w-4 h-4 ml-2"/></button></div></section>
      <section className="bg-[#f3f8fb] py-16"><div className="mx-auto max-w-7xl px-5 sm:px-8"><p className="uppercase tracking-widest text-xs font-semibold text-[#0071c5]">Interactive technical experiences</p><h2 className="text-3xl font-display font-bold text-[#001e3c] mt-2">Explore our reference architectures</h2><div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">{[{slug:"sd-wan",title:"SD-WAN",detail:"Secure branch connectivity and application-aware overlays."},{slug:"campus-network",title:"Campus networking",detail:"Campus core, access, Wi-Fi and segmentation."},{slug:"data-centre",title:"Data centre",detail:"Compute, storage, fabrics and facility infrastructure."},{slug:"surveillance",title:"Surveillance and access control",detail:"IP CCTV, NVR/VMS, access control and control-room integration."}, {slug:"ai-infrastructure",title:"AI infrastructure",detail:"Accelerated compute, storage, fabric, power and model operations."}, {slug:"continuity",title:"Backup and recovery",detail:"Veeam-ready backup patterns, immutable copies and disaster recovery."}, {slug:"cybersecurity",title:"Cybersecurity",detail:"Identity, endpoints, segmentation, monitoring and response."}, {slug:"hybrid-cloud",title:"Hybrid cloud",detail:"On-premises systems, private links and secure cloud landing zones."}].map(x=><button key={x.slug} onClick={()=>navigate("architecture",x.slug)} className="card-hover group text-left rounded-3xl border border-[#d5e4ef] bg-white p-7 hover:border-[#00a8e8] hover:shadow-xl transition-[transform,box-shadow,border-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071c5]"><span className="text-[#0071c5] text-xs uppercase font-semibold tracking-wider">Architecture explorer</span><h3 className="font-display font-bold text-2xl text-[#001e3c] mt-3">{x.title}</h3><p className="text-[#567087] mt-3">{x.detail}</p><span className="mt-6 inline-flex items-center text-[#0071c5] font-semibold gap-2">Explore interactive diagram <ArrowRight size={17}/></span></button>)}</div></div></section>
      <Solutions variant="page" />
      <AIInfrastructure />
      <PartnerStrip context="these solutions" />
    </>
  );
}