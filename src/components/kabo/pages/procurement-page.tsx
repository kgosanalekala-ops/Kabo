"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, ShoppingBag, MessageCircle, PackageCheck, FileText } from "lucide-react";
import { usePage } from "../page-context";

const categories = [
  { name: "Servers & compute", group: "Infrastructure", desc: "Rack servers, workstations, GPU-ready systems, memory, drives and compute accessories." },
  { name: "Storage & backup", group: "Infrastructure", desc: "NAS, SAN, storage media, backup platforms, tape and related infrastructure." },
  { name: "Networking", group: "Infrastructure", desc: "Switches, access points, routers, SD-WAN appliances, optics and structured cabling." },
  { name: "Data centre facilities", group: "Infrastructure", desc: "Racks, UPS, PDUs, environmental monitoring and facility accessories." },
  { name: "Laptops & desktops", group: "Workplace", desc: "Business laptops, desktops, monitors, docks, keyboards and accessories." },
  { name: "Print & document", group: "Workplace", desc: "Printers, scanners, multifunction devices and document management supplies." },
  { name: "Printing consumables", group: "Consumables", desc: "OEM-compatible sourcing enquiries for toner, ink, drums and maintenance kits." },
  { name: "Office & stationery", group: "Consumables", desc: "Paper, stationery, workspace essentials and general office supplies." },
  { name: "Software & licensing", group: "Software", desc: "Operating systems, productivity, endpoint protection, virtualisation and backup licensing." },
  { name: "Electronic surveillance & access control", group: "Security", desc: "Access control, CCTV, surveillance networking, sensors and system accessories." },
  { name: "Connectivity", group: "Infrastructure", desc: "Routers, CPE, fibre components, patch panels and business connectivity equipment." },
  { name: "Energy solutions", group: "Infrastructure", desc: "UPS infrastructure, backup power and integration-oriented energy accessories." },
];
const groups = ["All", "Infrastructure", "Workplace", "Consumables", "Software", "Security"];
export function ProcurementPage() {
  const [group,setGroup]=useState("All"); const [search,setSearch]=useState(""); const {navigate}=usePage();
  const filtered=categories.filter(x=>(group==="All"||x.group===group)&&`${x.name} ${x.desc}`.toLowerCase().includes(search.toLowerCase()));
  return <>
    <section className="relative overflow-hidden bg-[#001e3c] text-white pt-36 pb-20"><div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_75%_10%,#006cb9,transparent_42%)]"/><div className="relative mx-auto max-w-7xl px-5 sm:px-8"><p className="text-[#8aeaff] font-semibold uppercase tracking-[.22em] text-xs">Procurement · Sourcing · Supply</p><h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.08]">The technology your business needs.<br/><span className="text-[#67def9]">One sourcing conversation.</span></h1><p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">From enterprise infrastructure and AI systems to laptops, printing consumables and workplace supplies. Tell us what you need; KABO will confirm specifications, availability, channel eligibility and a project-specific quotation.</p><button onClick={()=>navigate("rfq", "procurement")} className="kabo-depth-button mt-8 rounded-full bg-[#00a8e8] hover:bg-[#00c7fd] px-7 py-3 font-semibold inline-flex items-center gap-2">Request a quotation <ArrowRight size={18}/></button></div></section>
    <section className="bg-[#f3f8fb] py-16 sm:py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8"><div className="flex flex-wrap gap-5 justify-between items-end"><div><p className="text-xs uppercase font-semibold text-[#0071c5] tracking-[.22em]">Product and supply portfolio</p><h2 className="font-display text-3xl font-bold text-[#001e3c] mt-2">Explore sourcing categories</h2></div><label className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-3 w-full sm:w-80"><Search className="text-[#0071c5]" size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search equipment or supplies" className="bg-transparent outline-none w-full text-[#001e3c]" aria-label="Search supply categories"/></label></div>
    <div className="flex flex-wrap gap-2 mt-8 mb-8">{groups.map(g=><button key={g} onClick={()=>setGroup(g)} className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${group===g?"bg-[#001e3c] text-white border-[#001e3c]":"bg-white border-[#d8e5ef] text-[#36506a] hover:border-[#0071c5]"}`}>{g}</button>)}</div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{filtered.map((item,i)=><motion.article key={item.name} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:Math.min(i*.035,.3)}} className="group bg-white p-7 rounded-3xl border border-[#d9e7f0] shadow-sm hover:shadow-xl transition-shadow"><div className="h-12 w-12 rounded-xl bg-[#e4f6fd] flex items-center justify-center"><ShoppingBag className="text-[#0071c5]" size={22}/></div><p className="uppercase tracking-widest text-[11px] text-[#0071c5] font-semibold mt-6">{item.group}</p><h3 className="font-display text-xl font-bold text-[#001e3c] mt-2">{item.name}</h3><p className="text-[#51697d] mt-3 text-sm leading-relaxed min-h-16">{item.desc}</p><button onClick={()=>navigate("rfq",item.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""))} className="mt-6 inline-flex gap-2 items-center font-semibold text-sm text-[#0071c5]">Request pricing <ArrowRight size={17}/></button></motion.article>)}</div>{filtered.length===0&&<p className="mt-6 text-slate-500">No matching categories. You can still submit an open RFQ.</p>}
    <div className="mt-10 bg-[#001e3c] text-white rounded-3xl p-8 sm:p-10 flex flex-wrap gap-6 justify-between items-center"><div className="max-w-2xl"><h3 className="font-display text-2xl font-bold">Have an existing bill of materials or tender list?</h3><p className="text-slate-300 mt-2">Send KABO the make, model, part numbers, quantity, destination and deadline. Product availability and OEM authorisations are confirmed against the specific opportunity.</p></div><button onClick={()=>navigate("rfq", "bill-of-materials")} className="kabo-depth-button inline-flex items-center gap-2 bg-[#00a8e8] px-6 py-3 rounded-full font-semibold">Start an RFQ <FileText size={18}/></button></div>
    </div></section>
  </>;
}
