"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, Building2, Cable, ClipboardList, SlidersHorizontal } from "lucide-react";
import { usePage } from "../page-context";

const options = [
  { id: "sd-wan", title: "SD-WAN & branch connectivity", focus: "Sites, underlay diversity, performance policies and encryption" },
  { id: "campus-network", title: "Campus & enterprise networking", focus: "Wired access, Wi-Fi, NAC, switching and structured cabling" },
  { id: "data-centre", title: "Compute & data centre", focus: "Servers, storage, virtualisation, power and recovery" },
  { id: "surveillance", title: "Surveillance & access control", focus: "IP CCTV, recording, access events and control rooms" },
  { id: "ai-infrastructure", title: "AI infrastructure", focus: "Accelerated compute, high-speed fabrics, storage and cooling" },
  { id: "digital-workplace", title: "Digital workspace & procurement", focus: "Endpoints, peripherals, print, software and consumables" },
] as const;

const priorities = ["High availability", "Cybersecurity", "Scalability", "Cost efficiency", "Integration", "Remote management"] as const;

export function ConfiguratorPage() {
  const { navigate } = usePage();
  const [solution, setSolution] = useState<string>(options[0].id);
  const [sites, setSites] = useState("2-10");
  const [priority, setPriority] = useState<string>(priorities[0]);
  const [deployment, setDeployment] = useState("New deployment");
  const reduceMotion = useReducedMotion();
  const selected = useMemo(() => options.find(x=>x.id===solution) ?? options[0], [solution]);

  const continueToRFQ = () => {
    const params = new URLSearchParams({ sites, priority, deployment });
    // Quote details remain editable, and no prices or final engineering designs are inferred.
    window.location.assign(`/rfq/${encodeURIComponent(solution)}?${params.toString()}`);
  };

  return <>
    <section className="bg-[#001e3c] text-white pt-36 pb-16 sm:pb-24 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 intel-gradient-mesh" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8"><p className="text-[#78e1ff] font-semibold text-xs uppercase tracking-[.24em]">KABO / Solution discovery</p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-4xl mt-4 leading-[1.08]">Your next infrastructure decision <span className="intel-text-gradient-bright">starts with clarity.</span></h1>
        <p className="text-slate-200 max-w-3xl text-lg leading-relaxed mt-6">Explore an initial solution direction, capture your project priorities and pass a structured brief directly into the quotation process. This is discovery assistance—not an automated engineering approval or price guarantee.</p>
      </div>
    </section>
    <section className="bg-[#f3f8fb] py-12 sm:py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid gap-7 lg:grid-cols-[1.5fr_1fr] items-start">
        <div className="space-y-7">
          <div className="rounded-[26px] bg-white shadow-sm border border-[#d8e7ef] p-5 sm:p-8"><h2 className="font-display text-2xl font-bold text-[#001e3c] flex items-center gap-3"><SlidersHorizontal className="text-[#0071c5]" /> 01. Select your environment</h2>
            <div className="grid sm:grid-cols-2 gap-3 mt-7" role="group" aria-label="Solution domains">{options.map(o => <motion.button type="button" key={o.id} onClick={()=>setSolution(o.id)} whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={{ scale:.99 }} aria-pressed={solution===o.id} className={`text-left rounded-2xl p-5 border transition-[border-color,background-color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071c5] ${solution===o.id ? "bg-[#e4f6ff] border-[#009fd5] shadow-[0_8px_30px_rgba(0,113,197,.12)]" : "border-[#d7e4ed] hover:border-[#009fd5] hover:bg-[#f5fbff]"}`}><span className="text-[#001e3c] font-display font-bold block">{o.title}</span><span className="block text-[#516a7f] text-sm mt-2 leading-relaxed">{o.focus}</span></motion.button>)}</div>
          </div>
          <div className="rounded-[26px] bg-white shadow-sm border border-[#d8e7ef] p-5 sm:p-8"><h2 className="font-display text-2xl font-bold text-[#001e3c] flex items-center gap-3"><Building2 className="text-[#0071c5]" /> 02. Define your requirements</h2>
            <div className="grid sm:grid-cols-2 gap-5 mt-7"><label className="block text-sm font-semibold text-[#001e3c]">Number of sites / facilities <select value={sites} onChange={e=>setSites(e.target.value)} className="w-full mt-2 rounded-xl border border-[#c9dae8] bg-white px-4 py-3.5 text-base font-normal"><option>1</option><option>2-10</option><option>11-50</option><option>51+</option><option>To be determined</option></select></label>
              <label className="block text-sm font-semibold text-[#001e3c]">Deployment approach <select value={deployment} onChange={e=>setDeployment(e.target.value)} className="w-full mt-2 rounded-xl border border-[#c9dae8] bg-white px-4 py-3.5 text-base font-normal"><option>New deployment</option><option>Upgrade / modernisation</option><option>Expansion</option><option>Assessment / design</option></select></label>
              <label className="block text-sm font-semibold text-[#001e3c] sm:col-span-2">Primary objective <select value={priority} onChange={e=>setPriority(e.target.value)} className="w-full mt-2 rounded-xl border border-[#c9dae8] bg-white px-4 py-3.5 text-base font-normal">{priorities.map(x=><option key={x}>{x}</option>)}</select></label></div>
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 rounded-[26px] bg-[#001e3c] text-white border border-[#2c6a8b] p-6 sm:p-9 shadow-2xl shadow-[#001e3c]/20" aria-live="polite"><p className="uppercase text-[#6cdefd] tracking-[.2em] font-semibold text-xs">Your discovery brief</p><h2 className="font-display font-bold text-2xl sm:text-3xl mt-3">{selected.title}</h2><p className="text-slate-300 mt-4 leading-relaxed">{selected.focus}.</p>
          <div className="mt-7 space-y-4 border-y border-white/15 py-6"><div className="flex gap-3"><Building2 size={19} className="text-[#69dffc] mt-0.5 shrink-0"/><div><p className="text-slate-400 text-xs uppercase tracking-wider">Scope</p><p className="mt-1 font-medium">{sites} site(s)</p></div></div><div className="flex gap-3"><Cable size={19} className="text-[#69dffc] mt-0.5 shrink-0"/><div><p className="text-slate-400 text-xs uppercase tracking-wider">Approach</p><p className="mt-1 font-medium">{deployment}</p></div></div><div className="flex gap-3"><BadgeCheck size={19} className="text-[#69dffc] mt-0.5 shrink-0"/><div><p className="text-slate-400 text-xs uppercase tracking-wider">Priority</p><p className="mt-1 font-medium">{priority}</p></div></div></div>
          <p className="text-sm text-slate-300 mt-6">The KABO team validates technical requirements, OEM selection, availability, pricing and implementation scope before any proposal.</p>
          <button type="button" onClick={continueToRFQ} className="kabo-depth-button mt-7 w-full justify-center rounded-full px-6 py-4 font-semibold text-white bg-gradient-to-r from-[#0071c5] to-[#00a8e8] inline-flex gap-2 items-center"><ClipboardList size={18}/> Continue to quotation <ArrowRight size={18}/></button>
          <button type="button" onClick={()=>navigate("solutions")} className="mt-4 w-full text-sm text-slate-300 hover:text-white underline underline-offset-4">Explore reference architectures first</button>
        </aside>
      </div>
    </div></section>
  </>;
}
