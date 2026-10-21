"use client";
import { ArrowRight } from "lucide-react";
import { usePage } from "../page-context";
const scenarios=[
 { slug:"sd-wan", title:"Distributed branch WAN", detail:"Reference design for multi-site branch connectivity, encrypted overlays and application-aware traffic routing." },
 { slug:"campus-network", title:"Connected campus", detail:"Reference design for wired access, enterprise Wi-Fi, segmentation and campus switching." },
 { slug:"data-centre", title:"Resilient data centre", detail:"Concept architecture for compute, storage, networking, power and data protection." },
 { slug:"surveillance", title:"Surveillance and access control", detail:"Electronic security reference architecture for video, access events, recording and control rooms." },
 { slug:"ai-infrastructure", title:"AI-ready infrastructure", detail:"Compute, network fabric, storage, cooling and data governance for AI workloads." },
 { slug:"continuity", title:"Resilient recovery", detail:"Backup policies, immutable repositories and tested recovery targets." },
 { slug:"cybersecurity", title:"Layered cybersecurity", detail:"Identity, segmentation, endpoints, visibility and incident readiness." },
 { slug:"hybrid-cloud", title:"Connected hybrid cloud", detail:"Secure paths from branch and data centre to cloud landing zones." }
];
export function CaseStudiesPage(){const {navigate}=usePage();return <><section className="pt-36 pb-20 bg-[#001e3c] text-white"><div className="max-w-7xl mx-auto px-5 sm:px-8"><p className="uppercase text-xs tracking-widest text-cyan-300">Illustrative engineering scenarios</p><h1 className="mt-4 text-5xl font-display font-bold">Reference architectures</h1><p className="mt-5 text-lg text-slate-300 max-w-3xl">These are technical examples, not claims of completed customer projects. Verified case studies can be published separately once authorised.</p></div></section><section className="bg-[#f3f8fb] py-20"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 xl:grid-cols-4 gap-6">{scenarios.map(x=><button onClick={()=>navigate("architecture",x.slug)} key={x.slug} className="p-8 bg-white border border-slate-200 rounded-3xl text-left hover:shadow-lg"><h2 className="text-2xl font-bold text-[#001e3c]">{x.title}</h2><p className="mt-4 text-slate-600">{x.detail}</p><span className="mt-6 font-semibold text-[#0071c5] inline-flex gap-2 items-center">Explore concept <ArrowRight size={17}/></span></button>)}</div></section></>}
