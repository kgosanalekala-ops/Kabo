"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Network, ServerCog, Waypoints, Download, ShieldCheck, MessageCircle, FileText } from "lucide-react";
import { usePage } from "../page-context";

type Node = { id: string; title: string; subtitle: string; x: number; y: number; detail: string };
type Architecture = { title: string; eyebrow: string; intro: string; nodes: Node[]; connections: [string, string][]; considerations: string[]; brief: string; applications: string[] };

const designs: Record<string, Architecture> = {
  "ai-infrastructure": {
    title: "AI-ready infrastructure", eyebrow: "AI infrastructure · Reference architecture",
    intro: "Trace a practical AI workload from governed data to accelerated compute, network fabric and operational safeguards. Accelerators and cooling are selected only after workload sizing.",
    nodes: [
      { id: "data", title: "Data sources", subtitle: "Governance · ingest", x: 50, y: 12, detail: "Classify data, permissions, locality and ingest requirements before defining training and inference pipelines." },
      { id: "storage", title: "High-throughput storage", subtitle: "Object · file", x: 18, y: 38, detail: "Select capacity, sustained throughput, metadata performance and data protection according to pipeline requirements." },
      { id: "fabric", title: "AI network fabric", subtitle: "East-west traffic", x: 82, y: 38, detail: "GPU collective traffic and storage access may need separate congestion-controlled Ethernet or InfiniBand fabrics, sized and tested for the intended workload." },
      { id: "compute", title: "Accelerated compute", subtitle: "GPU · CPU nodes", x: 50, y: 58, detail: "Choose validated server and accelerator configurations after model, latency, capacity, licensing, energy and cooling analysis." },
      { id: "platform", title: "AI platform", subtitle: "Containers · inference", x: 18, y: 82, detail: "Orchestration, model artefacts, serving endpoints, tenancy and observability operate under identity and change controls." },
      { id: "facility", title: "Facility & security", subtitle: "Power · cooling · IAM", x: 82, y: 82, detail: "Check power density, thermal design, rack space, high availability and protections for data and model assets." },
    ], connections: [["data","storage"],["storage","compute"],["fabric","compute"],["compute","platform"],["compute","facility"]],
    considerations: ["Training versus inference workload, model size and concurrency", "Data residency, throughput and data lifecycle", "Fabric bandwidth, power density and cooling feasibility", "Capacity modelling, security and software licensing"],
    applications: ["Enterprise model inference", "Data science workbenches", "High-performance computing", "AI-ready data-centre upgrades"], brief: "/briefs/kabo-ai-infrastructure-reference.pdf"
  },
  "continuity": {
    title: "Backup, recovery and continuity", eyebrow: "Resilience · Reference architecture",
    intro: "Connect production workloads to protected backups, immutable copies and tested recovery targets. The topology is driven by business impact, RPO and RTO—not by appliance selection.",
    nodes: [
      { id: "source", title: "Production estate", subtitle: "VM · physical · cloud", x: 50, y: 11, detail: "Identify critical systems, application dependencies, consistency requirements and existing retention obligations." },
      { id: "policy", title: "Policy & orchestration", subtitle: "Jobs · access · alerts", x: 18, y: 35, detail: "Create workload-specific schedules, segregation of duties, backup credentials and alerting policies." },
      { id: "primary", title: "Local backup", subtitle: "Fast restore", x: 82, y: 35, detail: "Local recovery repositories deliver short restoration times and must be protected from lateral movement." },
      { id: "immutable", title: "Immutable copy", subtitle: "Hardened · off-site", x: 50, y: 55, detail: "Use independently protected, immutable or offline copies with credential separation; retention and immutability depend on the selected platform." },
      { id: "recovery", title: "Recovery platform", subtitle: "DR site · cloud", x: 18, y: 83, detail: "Design alternate compute, networking, DNS, identity and application dependencies to meet target recovery times." },
      { id: "validation", title: "Restore assurance", subtitle: "Exercises · evidence", x: 82, y: 83, detail: "Regularly test recoverability, application consistency, failback procedures and reporting; successful backup does not prove successful restoration." },
    ], connections: [["source","policy"],["source","primary"],["primary","immutable"],["immutable","recovery"],["recovery","validation"],["policy","validation"]],
    considerations: ["Define RPO/RTO against business impact analysis", "Separate backup credentials from production identities", "Capacity, immutability, air-gap and off-site requirements", "Document and regularly test recovery and failback"],
    applications: ["Virtual machine protection", "Ransomware recovery", "Hybrid-cloud continuity", "Remote site disaster recovery"], brief: "/briefs/kabo-continuity-reference.pdf"
  },
  "cybersecurity": {
    title: "Cybersecurity infrastructure", eyebrow: "Security architecture · Reference model",
    intro: "Explore layered cyber controls from identity to endpoints, network boundaries, monitoring and recovery. Monitoring arrangements and responsibilities are contractual, never implied.",
    nodes: [
      { id: "identity", title: "Identity plane", subtitle: "MFA · policy", x: 50, y: 12, detail: "Enforce privileged-access separation, strong authentication, conditional policies and lifecycle governance." },
      { id: "users", title: "Endpoint protection", subtitle: "EDR · device posture", x: 18, y: 34, detail: "Endpoint hardening, device management and detection policies protect users and servers while respecting operational constraints." },
      { id: "boundary", title: "Secure access edge", subtitle: "NGFW · SASE · ZTNA", x: 82, y: 34, detail: "Segmentation, secure remote access and inspected traffic flows reduce implicit network trust." },
      { id: "network", title: "Segmentation fabric", subtitle: "Policy · east-west", x: 50, y: 54, detail: "Design workload and user zones with measured firewall rules, microsegmentation where supported, and encrypted service paths." },
      { id: "visibility", title: "Event visibility", subtitle: "Logs · telemetry", x: 18, y: 82, detail: "Collect audit and security events with retention, access restrictions and escalation routes. External monitoring requires an explicit service agreement." },
      { id: "response", title: "Recovery & response", subtitle: "Runbooks · restore", x: 82, y: 82, detail: "Define incident ownership, backup restoration, containment, communications and recovery tests before a live incident." },
    ], connections: [["identity","users"],["identity","boundary"],["users","network"],["boundary","network"],["network","visibility"],["visibility","response"]],
    considerations: ["Threat assessment and identity governance", "Compliance and personal-data protection scope", "Security logging, retention and response ownership", "Change control, backup and incident exercises"],
    applications: ["Enterprise network security", "Remote workforce access", "Government and healthcare environments", "Security refresh and segmentation projects"], brief: "/briefs/kabo-cybersecurity-reference.pdf"
  },
  "hybrid-cloud": {
    title: "Hybrid cloud and connectivity", eyebrow: "Cloud infrastructure · Reference architecture",
    intro: "Map an on-premises estate to cloud landing zones using secure connectivity, identity controls and operational governance. Region and service choices follow customer data and compliance requirements.",
    nodes: [
      { id: "sites", title: "Corporate sites", subtitle: "Users · branches", x: 19, y: 18, detail: "Access policies and WAN underlays are selected to suit branch and user application flows." },
      { id: "onprem", title: "On-premises estate", subtitle: "Compute · data", x: 81, y: 18, detail: "Assess servers, virtualisation, application dependencies and data sensitivity before migration." },
      { id: "wan", title: "Connectivity", subtitle: "VPN · private link", x: 50, y: 42, detail: "Resilient internet VPN or dedicated connectivity depends on business criticality, location and carrier availability." },
      { id: "identity", title: "Identity & policy", subtitle: "IAM · least privilege", x: 20, y: 67, detail: "Unified identity and access policies guard cloud resources with logging and privileged access controls." },
      { id: "landing", title: "Cloud landing zones", subtitle: "Network · workloads", x: 80, y: 67, detail: "Establish network separation, subscriptions, workloads, encryption, backup and baseline controls before deployment." },
      { id: "operations", title: "Governance & FinOps", subtitle: "Observability · cost", x: 50, y: 89, detail: "Track resource ownership, budget, monitoring, backup and security posture across the hybrid environment." },
    ], connections: [["sites","wan"],["onprem","wan"],["wan","identity"],["wan","landing"],["identity","operations"],["landing","operations"]],
    considerations: ["Application/data discovery and residency requirements", "Private connectivity versus encrypted internet options", "Identity, segmentation and cost attribution", "Backups, shared responsibility and support operating model"],
    applications: ["Cloud-adjacent data centres", "Branch to SaaS and cloud", "Hybrid application hosting", "Infrastructure migration planning"], brief: "/briefs/kabo-hybrid-cloud-reference.pdf"
  },
  "sd-wan": {
    title: "Software-defined wide-area networking", eyebrow: "SD-WAN · Reference architecture",
    intro: "Connect headquarters, distributed sites and cloud services using an application-aware WAN overlay. Explore a conceptual architecture, then request a site-specific design and bill of materials.",
    nodes: [
      { id: "control", title: "Orchestrator", subtitle: "Policy · visibility", x: 50, y: 12, detail: "Centralised policy, device lifecycle, application path visibility and configuration management. The controller and management plane depend on the chosen platform." },
      { id: "cloud", title: "Cloud / SaaS", subtitle: "Private · public", x: 81, y: 32, detail: "Cloud access may use secure direct internet breakout, private connectivity or a security service edge. Design considers identity, encryption and cloud region requirements." },
      { id: "wan", title: "Secure WAN overlay", subtitle: "IPsec · path selection", x: 50, y: 47, detail: "SD-WAN edge devices establish authenticated, encrypted overlay paths over selected underlays. Performance steering responds to loss, latency, jitter and policy." },
      { id: "hq", title: "Headquarters", subtitle: "LAN · security", x: 19, y: 72, detail: "The headquarters edge integrates with core switching, identity and firewalls. Avoid single points of failure using redundant edge and connectivity where justified." },
      { id: "branch", title: "Branch sites", subtitle: "LTE/5G · fibre", x: 50, y: 80, detail: "Branches can use fibre, broadband, LTE/5G and/or MPLS underlay. Zero-touch provisioning is available on selected platforms and is subject to security controls." },
      { id: "remote", title: "Remote / edge", subtitle: "Small sites · users", x: 81, y: 72, detail: "Small sites or remote access can connect with the appropriate security model, segmentation and identity-aware policies." },
    ], connections: [["control", "wan"], ["cloud", "wan"], ["wan", "hq"], ["wan", "branch"], ["wan", "remote"]],
    considerations: ["Site inventory, existing underlay contracts and availability targets", "Application priority, latency, jitter and loss thresholds", "Security integration, segmentation and identity controls", "Failover design, monitoring, acceptance tests and operational ownership"],
    applications: ["Multi-branch WAN modernisation", "Hybrid-cloud connectivity", "Retail and distributed operations", "Resilient internet-first branch access"], brief: "/briefs/kabo-sd-wan-reference.pdf"
  },
  "campus-network": {
    title: "Intelligent campus networking", eyebrow: "Campus · Reference architecture",
    intro: "A scalable campus architecture that unifies wired access, wireless connectivity, segmentation, security and network management, sized to actual buildings and workloads.",
    nodes: [
      { id: "mgmt", title: "Management", subtitle: "Monitoring · NAC", x: 50, y: 12, detail: "Configuration, telemetry, assurance and network access policy, typically integrated with identity and inventory systems." },
      { id: "security", title: "Security edge", subtitle: "Firewall · WAN", x: 82, y: 30, detail: "Inspect north-south traffic, enforce policy and establish connectivity to WAN, internet and cloud services." },
      { id: "core", title: "Campus core", subtitle: "Redundant switching", x: 50, y: 39, detail: "High-capacity backbone routing and switching, with appropriate resiliency, uplinks and failure-domain separation." },
      { id: "dist", title: "Distribution", subtitle: "Aggregation", x: 50, y: 62, detail: "Aggregation and policy boundaries between the core and building access layers. Depending on campus scale, a collapsed-core design may be appropriate." },
      { id: "access", title: "Access switches", subtitle: "PoE · endpoints", x: 20, y: 83, detail: "User and device connectivity including PoE budgets, endpoint authentication, VLAN/VRF or software-defined segmentation and edge uplinks." },
      { id: "wifi", title: "Enterprise Wi-Fi", subtitle: "APs · roaming", x: 78, y: 83, detail: "RF survey-based access point placement, capacity planning, SSID policy, guest isolation, roaming and management." },
    ], connections: [["mgmt", "core"], ["security", "core"], ["core", "dist"], ["dist", "access"], ["dist", "wifi"]],
    considerations: ["Site survey, cabling pathways and fibre backbone", "High availability, PoE and access port growth", "802.1X/NAC, guest access and network segmentation", "Wi-Fi RF design and acceptance testing"],
    applications: ["Office campuses", "Education and healthcare", "Multi-building government facilities", "Industrial and logistics sites"], brief: "/briefs/kabo-campus-network-reference.pdf"
  },
  "surveillance": {
    title: "Intelligent surveillance and access control", eyebrow: "Electronic security · Reference architecture",
    intro: "See how cameras, protected networks, recording, access control and operator workstations connect into a manageable electronic security environment. KABO supplies and integrates electronic systems—not guarding services.",
    nodes: [
      { id: "cameras", title: "IP video endpoints", subtitle: "Fixed · PTZ · thermal", x: 18, y: 18, detail: "Select cameras according to coverage, light levels, lens and resolution. Plan mounting, PoE loads, retention and privacy zones during site survey." },
      { id: "doors", title: "Access control", subtitle: "Readers · controllers", x: 82, y: 18, detail: "Door controllers, credentials, readers and monitored inputs operate with fail-safe/fail-secure decisions, evacuation rules and appropriate identity governance." },
      { id: "network", title: "Protected network", subtitle: "PoE · VLAN · uplinks", x: 50, y: 42, detail: "Dedicated PoE switching, device authentication where supported, segmentation, bandwidth sizing and resilient uplinks isolate operational devices from user networks." },
      { id: "recording", title: "VMS and recording", subtitle: "NVR · storage", x: 19, y: 68, detail: "Video management and recording can be centralised or distributed. Storage sizing follows camera bitrates, retention policy, redundancy, search and export needs." },
      { id: "identity", title: "Events and analytics", subtitle: "ANPR · access events", x: 81, y: 68, detail: "Optional analytics, event correlation and access logs support operator workflows. Functions are selected with privacy, false positives and applicable law in mind." },
      { id: "control", title: "Control room", subtitle: "Displays · operators", x: 50, y: 88, detail: "Operator consoles, video walls, alarm queues and escalation workflows present meaningful incidents. Procedures and staffing remain the client's responsibility unless contracted separately." },
    ], connections: [["cameras", "network"], ["doors", "network"], ["network", "recording"], ["network", "identity"], ["recording", "control"], ["identity", "control"]],
    considerations: ["Site and threat survey, coverage and privacy assessments", "PoE budget, traffic segmentation and retention storage sizing", "Access event workflows, emergency egress and system resilience", "Evidence handling, permissions, cybersecurity and support responsibilities"],
    applications: ["Corporate offices and campuses", "Healthcare and education facilities", "Logistics and distribution centres", "Municipal and industrial estates"], brief: "/briefs/kabo-surveillance-reference.pdf"
  },
  "data-centre": {
    title: "Enterprise data centre infrastructure", eyebrow: "Data centre · Reference architecture",
    intro: "Explore how compute, data, fabrics, protection and physical infrastructure work together to support reliable workloads. Final sizing, topology and vendor selections follow discovery and engineering validation.",
    nodes: [
      { id: "workloads", title: "Workloads", subtitle: "Apps · AI · virtualisation", x: 50, y: 12, detail: "Define workload criticality, performance, capacity, data protection and regulatory requirements before selecting the platform." },
      { id: "compute", title: "Compute cluster", subtitle: "Servers · GPU options", x: 18, y: 38, detail: "Rack or blade servers sized for CPU, memory, acceleration, power density, licensing and resilience requirements." },
      { id: "fabric", title: "Network fabric", subtitle: "Leaf · spine", x: 50, y: 51, detail: "Resilient east-west and north-south connectivity. Fibre channel, Ethernet storage or converged fabrics depend on workload and architecture." },
      { id: "storage", title: "Storage tier", subtitle: "Block · file · object", x: 82, y: 38, detail: "Performance and capacity tiers selected for IOPS, throughput, latency, snapshots, encryption and lifecycle management." },
      { id: "resilience", title: "Backup / DR", subtitle: "Restore · immutable copies", x: 19, y: 79, detail: "Recovery objectives drive backup policies, immutability, off-site copies, replication and periodically tested restores." },
      { id: "facility", title: "Facility layer", subtitle: "Power · cooling · racks", x: 81, y: 79, detail: "Rack layout, electrical distribution, UPS, cooling, environmental monitoring and maintainability must support actual heat and load." },
    ], connections: [["workloads", "compute"], ["workloads", "storage"], ["compute", "fabric"], ["storage", "fabric"], ["fabric", "resilience"], ["fabric", "facility"]],
    considerations: ["Workload sizing and availability targets", "Compute, storage and fabric fault domains", "Power, cooling and physical capacity", "Backup, DR exercises and lifecycle operations"],
    applications: ["Data centre refresh", "Private and hybrid cloud", "AI compute platforms", "Business continuity and resilience"], brief: "/briefs/kabo-data-centre-reference.pdf"
  }
};

function ArchitectureDiagram({ design, active, choose }: { design: Architecture; active: string; choose: (id: string) => void }) {
  const byId = Object.fromEntries(design.nodes.map(n => [n.id, n]));
  return <div className="relative isolate overflow-hidden rounded-[28px] border border-[#ffffff26] bg-[#061d34] p-4 sm:p-6 shadow-2xl shadow-[#001e3c]/20">
    <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 50% 25%,#087ab644,transparent 55%),linear-gradient(#2f668122 1px, transparent 1px),linear-gradient(90deg,#2f668122 1px,transparent 1px)", backgroundSize: "auto,34px 34px,34px 34px" }} />
    <div className="relative flex items-center justify-between gap-2 pb-2 text-xs font-semibold uppercase tracking-[.2em] text-cyan-200/80"><span>KABO / Architecture explorer</span><span className="text-[#75e5ff]">Conceptual · not to scale</span></div>
    <div className="relative max-w-full overflow-x-auto overscroll-x-contain" role="region" tabIndex={0} aria-label="Scrollable network architecture diagram"><svg viewBox="0 0 1000 660" role="group" aria-label={`Interactive network architecture for ${design.title}`} className="relative block h-auto min-w-[760px] w-full" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="route" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#05cefb"/><stop offset="1" stopColor="#0879da"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="6"/></filter></defs>
      {design.connections.map(([a,b],i) => {
        const src=byId[a], dest=byId[b]; if(!src || !dest) return null;
        return <g key={`${a}-${b}`}><line x1={src.x*10} y1={src.y*6.6} x2={dest.x*10} y2={dest.y*6.6} stroke="#0bd2ff" strokeWidth="8" opacity=".11" filter="url(#glow)"/><line x1={src.x*10} y1={src.y*6.6} x2={dest.x*10} y2={dest.y*6.6} stroke="url(#route)" strokeDasharray="8 10" strokeWidth="2.5" opacity=".75"><animate className="kabo-svg-motion" attributeName="stroke-dashoffset" from="0" to="-54" dur={`${2+i*.2}s`} repeatCount="indefinite"/></line></g>;
      })}
      {design.nodes.map((n, i) => <g key={n.id} role="button" tabIndex={0} onClick={() => choose(n.id)} onKeyDown={e => { if(e.key === "Enter" || e.key === " "){e.preventDefault();choose(n.id);} }} aria-label={`Explore ${n.title}`} style={{ cursor: "pointer", outline: "none" }}>
        <rect x={n.x*10-111} y={n.y*6.6-37} width="222" height="77" rx="13" fill={active===n.id ? "#0c5e91" : "#092e50"} stroke={active===n.id ? "#85eaff" : "#37678b"} strokeWidth={active===n.id?3:1.5}/>
        <circle cx={n.x*10-87} cy={n.y*6.6-7} r="7" fill={active===n.id ? "#80f5ff" : "#159bd9"}/>
        <text x={n.x*10-72} y={n.y*6.6-1} fill="#f6fcff" fontSize="17" fontWeight="700">{n.title}</text>
        <text x={n.x*10-88} y={n.y*6.6+23} fill="#b6d9eb" fontSize="14">{n.subtitle}</text>
      </g>)}
    </svg></div>
    <div className="relative mt-4 flex flex-wrap justify-center gap-2" aria-label="Architecture components">{design.nodes.map(node => <button type="button" key={node.id} onClick={() => choose(node.id)} aria-pressed={active===node.id} className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${active===node.id ? "border-cyan-300 bg-cyan-300 text-[#001e3c]" : "border-white/25 text-white hover:border-cyan-300 hover:bg-white/10"}`}>{node.title}</button>)}</div>
    <p className="relative mt-3 text-center text-xs text-slate-300">Swipe horizontally on smaller screens. Select a component to explore its role.</p>
  </div>;
}

export function ArchitecturePage({ type }: { type: string }) {
  const design = designs[type] || designs["sd-wan"];
  const { navigate } = usePage();
  const [active, setActive] = useState(design.nodes[0].id);
  useEffect(() => setActive(design.nodes[0].id), [type, design]);
  const selected = design.nodes.find(n => n.id === active) || design.nodes[0];
  return <>
    <section className="relative overflow-hidden bg-[#001e3c] pt-36 pb-20 text-white"><div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_75%_10%,#006cb9,transparent_42%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8"><p className="text-[#8aeaff] text-xs sm:text-sm font-semibold tracking-[.22em] uppercase">{design.eyebrow}</p><h1 className="max-w-4xl mt-4 font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08]">{design.title}</h1><p className="mt-6 max-w-3xl text-lg text-slate-200 leading-relaxed">{design.intro}</p><div className="flex flex-wrap gap-3 mt-8"><button onClick={() => navigate("rfq", type)} className="kabo-depth-button inline-flex items-center gap-2 rounded-full bg-[#00a8e8] hover:bg-[#00c7fd] text-white font-semibold px-6 py-3">Request solution design <ArrowRight size={18}/></button><a href={design.brief} download className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold hover:bg-white/10"><Download size={17}/> Download technical brief</a></div></div>
    </section>
    <section className="bg-[#f2f7fb] py-14 sm:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="flex flex-wrap items-end justify-between gap-6 mb-7"><div><p className="uppercase text-xs tracking-[.2em] font-semibold text-[#0071c5]">Technical architecture</p><h2 className="text-3xl font-bold mt-2 text-[#001e3c]">Explore the design</h2></div><div className="flex flex-wrap gap-2">{Object.entries(designs).map(([slug,v])=><button key={slug} onClick={()=>navigate("architecture", slug)} className={`text-sm px-4 py-2 rounded-full border font-semibold ${slug===type?"bg-[#001e3c] text-white border-[#001e3c]":"bg-white text-[#001e3c] border-slate-200"}`}>{slug==="sd-wan"?"SD-WAN":slug==="campus-network"?"Campus":slug==="data-centre"?"Data centre":"Surveillance"}</button>)}</div></div>
    <div className="grid lg:grid-cols-[1.65fr_1fr] gap-6 items-stretch"><ArchitectureDiagram key={type} design={design} active={active} choose={setActive}/><div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-7 sm:p-9 flex flex-col"><div className="flex items-center gap-2 text-xs text-[#0071c5] uppercase tracking-widest font-semibold"><Network size={16}/> Component insight</div><AnimatePresence mode="wait"><motion.div key={selected.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}><h3 className="font-display text-2xl text-[#001e3c] font-bold mt-7">{selected.title}</h3><p className="mt-2 text-sm text-[#0071c5]">{selected.subtitle}</p><p className="mt-5 text-[#486078] leading-relaxed">{selected.detail}</p></motion.div></AnimatePresence><div className="mt-auto pt-8 border-t border-slate-200"><p className="text-sm text-slate-500">Illustrative reference architecture. Detailed engineering, OEM selection and bill of materials follow site discovery.</p><button onClick={()=>navigate("rfq",type)} className="mt-5 inline-flex gap-2 items-center text-[#0071c5] font-semibold">Discuss this architecture <ArrowRight size={18}/></button></div></div></div>
    <div className="mt-10 grid md:grid-cols-2 gap-6"><div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200"><h3 className="text-xl font-bold text-[#001e3c] flex gap-2 items-center"><ShieldCheck size={22} className="text-[#0071c5]"/> Engineering considerations</h3><ul className="mt-5 space-y-3">{design.considerations.map(x=><li key={x} className="pl-4 border-l-2 border-[#00c7fd] text-[#486078]">{x}</li>)}</ul></div><div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200"><h3 className="text-xl font-bold text-[#001e3c] flex gap-2 items-center"><Waypoints size={22} className="text-[#0071c5]"/> Typical applications</h3><ul className="mt-5 space-y-3">{design.applications.map(x=><li key={x} className="pl-4 border-l-2 border-[#00c7fd] text-[#486078]">{x}</li>)}</ul></div></div>
    <div className="mt-10 rounded-3xl bg-[#001e3c] text-white p-7 sm:p-10 flex flex-wrap justify-between items-center gap-6"><div><h3 className="font-display font-bold text-2xl">From reference architecture to project specification</h3><p className="mt-2 text-slate-300 max-w-2xl">Share site counts, existing environment, capacity and security requirements. KABO can respond with a project-specific sourcing and design discussion.</p></div><button onClick={()=>navigate("rfq",type)} className="kabo-depth-button rounded-full bg-[#00a8e8] px-6 py-3 font-semibold inline-flex items-center gap-2">Start an RFQ <ArrowRight size={18}/></button></div>
    </div></section>
  </>;
}
