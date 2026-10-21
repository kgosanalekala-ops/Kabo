"use client";
import { VideoHero } from "../video-hero";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePage } from "../page-context";
const overview: Record<string,{title:string;scope:string}> = {
 hpe:{title:"HPE",scope:"Enterprise compute, storage, edge-to-cloud and networking portfolio"},
 dell:{title:"Dell Technologies",scope:"Servers, storage, data protection and commercial computing"},
 lenovo:{title:"Lenovo",scope:"ThinkSystem servers, infrastructure and workplace devices"},
 hp:{title:"HP",scope:"Commercial computers, workstations, print and document equipment"},
 h3c:{title:"H3C",scope:"Networking, wireless, compute and storage ecosystems"},
 huawei:{title:"Huawei",scope:"Enterprise connectivity, network and data centre platforms"},
 veeam:{title:"Veeam",scope:"Backup, recovery and data resilience"}
};
export function PartnerDetailPage({detail}:{detail:string}) {
 const {navigate}=usePage();const vendor=overview[detail];
 return <><VideoHero variant="abstract" tag="Technology portfolio" title={<>{vendor?.title || "Technology sourcing"}</>} subtitle={vendor?.scope || "Project-specific technology options and integrated solution architectures"}></VideoHero><section className="bg-[#f4f8fb] py-20"><div className="max-w-6xl mx-auto px-5 sm:px-8"><div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 max-w-4xl"><p className="font-semibold uppercase tracking-widest text-[#0071c5] text-xs">Commercial and engineering enquiries</p><h2 className="mt-4 font-display text-3xl text-[#001e3c] font-bold">Talk to KABO about the right configuration</h2><p className="text-[#526b81] leading-relaxed mt-5">KABO can assess technical specifications, compatible product options, sourcing routes and deployment requirements for your project. Product availability, OEM permissions, warranty terms and pricing are verified at quotation stage. This page does not state a specific certification or unconditional channel entitlement.</p><div className="flex gap-3 flex-wrap mt-8"><button onClick={()=>navigate("rfq",detail)} className="rounded-full bg-[#0071c5] text-white font-semibold px-6 py-3 inline-flex items-center gap-2">Request an OEM quotation <ArrowRight size={18}/></button><button onClick={()=>navigate("partners")} className="rounded-full border border-slate-200 text-[#001e3c] font-semibold px-6 py-3 inline-flex items-center gap-2"><ArrowLeft size={18}/> All partners</button></div></div></div></section></>;
}
