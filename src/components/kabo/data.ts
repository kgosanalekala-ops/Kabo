"use client";

import { Server, Wifi, Shield, Headphones, Monitor, Cpu, Database, FileText, Cloud, Network, Zap, Activity, type LucideIcon } from "lucide-react";

// ============================================================================
// COMPANY INFO — from KABO IT Group Corporate Profile 2026 Elite
// ============================================================================

export const COMPANY = {
  legalName: "KABO IT Group",
  tradeName: "KABO",
  registration: "2016/402771/07",
  bbbeeLevel: "Level 1",
  bbbeeProcurement: "135%",
  ownership: "100% Black-owned",
  hq: "12886 Masemola Street, Mamelodi East, Pretoria, 0122",
  city: "Pretoria",
  country: "South Africa",
  founded: "2016",
  phone: "+27 612 85 4418",
  emailGeneral: "info@kaboitgroup.co.za",
  emailSupport: "support@kaboitgroup.co.za",
  website: "www.kaboitgroup.co.za",
  alliances: 15,
  domains: 10,
  verticals: 9,
  provinces: 9,
  tagline: "Intelligent infrastructure. Engineered for the AI era.",
  positioning: "Intelligent infrastructure, engineered to perform.",
  description:
    "KABO IT Group is a Gauteng-established systems integrator delivering enterprise-grade compute, data, networking, security and AI infrastructure to organisations across the public sector, financial services, mining, healthcare, education, telecommunications, manufacturing, retail and smart infrastructure sectors.",
};

// ============================================================================
// SOLUTIONS — 10 interlocking infrastructure domains (per Corporate Profile)
// ============================================================================

export interface Solution {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  image: string;
  tagline: string;
  description: string;
  capabilities: { title: string; spec: string }[];
  stack: string[];
  outcomes: string[];
  partners: string[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "compute",
    title: "Compute & Hyperconverged Infrastructure",
    shortTitle: "Compute",
    icon: Server,
    image: "/images/sol_datacenter.jpg",
    tagline: "Servers, HCI, blade and rack platforms engineered for virtualisation, containerised workloads and bare-metal databases. Right-sized for the workload, not the catalogue.",
    description:
      "KABO engineers compute platforms that anchor the modern enterprise — rack and blade servers, hyperconverged infrastructure and composable platforms engineered for virtualisation, containerised workloads and bare-metal databases. Each platform is sized to the workload, the SLA and the 3–5 year growth curve, not the catalogue.",
    capabilities: [
      { title: "Rack & Blade Servers", spec: "HPE ProLiant, Dell PowerEdge, H3C and Huawei rack/blade platforms sized to workload class" },
      { title: "Hyperconverged Infrastructure", spec: "HPE Synergy, Dell VxRail and H3C UIS — composable, software-defined, scale-out" },
      { title: "Virtualisation & Containers", spec: "VMware, Hyper-V, OpenShift and Kubernetes platforms engineered for hybrid operation" },
      { title: "Bare-Metal Databases", spec: "High-core, high-memory platforms tuned for OLTP and OLAP database engines" },
    ],
    stack: ["HPE ProLiant", "HPE Synergy", "Dell PowerEdge", "Dell VxRail", "H3C UniServer", "Huawei TaiShan", "VMware vSphere", "OpenShift"],
    outcomes: [
      "Compute sized to the workload, the SLA and a 3–5 year growth horizon",
      "Unified reference architecture across rack, blade, HCI and composable platforms",
      "Vendor-neutral selection scored against fit, TCO, support and B-BBEE contribution",
    ],
    partners: ["HPE", "Dell", "Huawei", "H3C"],
  },
  {
    slug: "data",
    title: "Primary & Secondary Storage",
    shortTitle: "Data & Storage",
    icon: Database,
    image: "/images/sol_datacenter.jpg",
    tagline: "All-flash, NVMe, hybrid and object storage from Pure Storage, HPE and Dell — with deduplication, compression and replication tuned to the workload's I/O profile.",
    description:
      "KABO architects primary, secondary and cyber-resilient storage across all-flash, NVMe, hybrid and object platforms. From Pure Storage FlashArray and FlashBlade to HPE Alletra and Dell PowerStore, every layer is tuned to the workload's I/O profile and the business RPO/RTO.",
    capabilities: [
      { title: "All-Flash NVMe Primary", spec: "Pure FlashArray, HPE Alletra, Dell PowerStore — sub-millisecond latency with array-based replication" },
      { title: "Scale-Out File & Object", spec: "Pure FlashBlade and object stores for unstructured data at billion-file scale" },
      { title: "Immutable & Air-Gapped", spec: "Hardened, air-gapped backup targets that ransomware cannot encrypt" },
      { title: "Replication & DR", spec: "Array-based and storage-based replication engineered against the business impact analysis" },
    ],
    stack: ["Pure Storage FlashArray", "Pure FlashBlade", "Pure Evergreen//One", "HPE Alletra", "Dell PowerStore", "Dell PowerScale", "NVMe-over-Fabric"],
    outcomes: [
      "Primary storage tuned to latency, throughput and the workload's I/O profile",
      "Immutable, air-gapped cyber-resilience aligned to the RPO/RTO",
      "Non-disruptive upgrade model that survives refresh cycles — the Evergreen principle",
    ],
    partners: ["Pure Storage", "HPE", "Dell"],
  },
  {
    slug: "networking",
    title: "Network Fabric & SD-WAN",
    shortTitle: "Networking",
    icon: Wifi,
    image: "/images/sol_campus.jpg",
    tagline: "Campus, core, data-centre and WAN fabrics from Juniper, HPE Aruba, Huawei and H3C — wired, wireless, SDN and SD-WAN, designed for performance and observability.",
    description:
      "KABO engineers network fabrics that span campus, core, data centre and the wide area — Juniper Mist and QFX, HPE Aruba CX and Wi-Fi 6/6E, Huawei CloudEngine and H3C campus switching. Spine-leaf fabrics, SD-WAN, network observability and zero-trust micro-segmentation engineered as one fabric.",
    capabilities: [
      { title: "Spine-Leaf DC Fabrics", spec: "EVPN-VXLAN spine-leaf with NVMe-over-Fabric readiness for AI and storage traffic" },
      { title: "Campus Wi-Fi 6/6E", spec: "Cloud-managed controllers, predictive heat-mapping and ClearPass NAC for distributed estates" },
      { title: "SD-WAN", spec: "Application-aware routing, multi-link branch connectivity and SLA reporting" },
      { title: "Network Observability", spec: "Flow analytics, anomaly detection and intent-based fabric management with Juniper Apstra" },
    ],
    stack: ["Juniper Mist AI", "Juniper QFX", "Juniper SRX", "Juniper Apstra", "HPE Aruba CX", "Aruba Wi-Fi 6/6E", "Huawei CloudEngine", "H3C S9820", "ClearPass NAC"],
    outcomes: [
      "Unified network fabric across campus, DC, WAN and edge — wired, wireless, SDN and SD-WAN",
      "Observability and intent-based operations engineered in, not bolted on",
      "Zero-trust micro-segmentation east-west and north-south",
    ],
    partners: ["Juniper", "HPE Aruba", "Huawei", "H3C"],
  },
  {
    slug: "security",
    title: "Cybersecurity & 24/7 SOC",
    shortTitle: "Cybersecurity",
    icon: Shield,
    image: "/images/sol_government.jpg",
    tagline: "Next-gen firewalls, SASE, endpoint, email and identity from Fortinet, Sophos and Palo Alto, wrapped in a 24/7 SOC for detection, response and governance.",
    description:
      "KABO engineers defence-in-depth across network, endpoint, identity and email — anchored by Fortinet, Sophos and Palo Alto Networks, wrapped in a 24/7 SOC for detection, response and governance. Security is engineered into every layer, not bolted on after deployment.",
    capabilities: [
      { title: "NGFW & Secure Web Gateway", spec: "Fortinet FortiGate, Palo Alto Strata NGFWs and FortiSandbox for the network edge" },
      { title: "SASE & ZTNA", spec: "Prisma SASE and identity-aware access policies across users, devices and workloads" },
      { title: "EDR/XDR & SOC", spec: "Cortex XDR/XSIAM and Sophos Intercept X with 24/7 SOC monitoring and IR runbooks" },
      { title: "Email Security & DLP", spec: "Anti-phishing, DLP and continuous compliance reporting" },
    ],
    stack: ["Fortinet FortiGate", "FortiAnalyzer", "FortiSandbox", "Sophos Intercept X", "Sophos Firewall", "Palo Alto Strata", "Prisma SASE", "Prisma Cloud", "Cortex XDR", "XSIAM"],
    outcomes: [
      "One Zero-Trust overlay across network, endpoint, identity and cloud",
      "24/7 SOC detection, response and governance — not just tooling",
      "Continuous compliance and vulnerability management reporting",
    ],
    partners: ["Fortinet", "Sophos", "Palo Alto"],
  },
  {
    slug: "ai-infrastructure",
    title: "AI Infrastructure & GPU Compute",
    shortTitle: "AI Infrastructure",
    icon: Cpu,
    image: "/images/sol_datacenter.jpg",
    tagline: "GPU-accelerated platforms for model training, inference and HPC — paired with high-throughput storage, low-latency fabrics and MLOps tooling. The portfolio's organising principle.",
    description:
      "KABO engineers the full AI stack — GPU compute, low-latency fabric, high-throughput storage, MLOps tooling and Zero-Trust security — into a single, observable platform built for the AI era. From single-node inference appliances to liquid-cooled HGX clusters with InfiniBand fabrics, regulated data stays on African soil.",
    capabilities: [
      { title: "GPU Compute Fabric", spec: "NVIDIA HGX H100/H200 multi-GPU platforms with NVLink and 400G InfiniBand" },
      { title: "AI Training & Inference", spec: "ML/Ops platforms with distributed training, model serving and experiment tracking" },
      { title: "Ruggedised Edge AI", spec: "Edge servers for distributed inference at remote sites, mines and plants" },
      { title: "Sovereign AI Hosting", spec: "POPIA-aligned GPU zones keeping African enterprise data on African soil" },
    ],
    stack: ["NVIDIA HGX H100/H200", "NVIDIA L40S", "NVIDIA AI Enterprise", "InfiniBand 400G", "Spectrum-X", "HPE Apollo 6500", "Dell PowerEdge XE9680", "Pure Storage FlashBlade"],
    outcomes: [
      "AI workloads trained and inferred without exposing data offshore",
      "GPU capacity matched to demand, not stranded by refresh cycles",
      "One accountable AI infrastructure partner across facilities, hardware and MLOps",
    ],
    partners: ["HPE", "Dell", "NVIDIA", "Pure Storage", "Microsoft"],
  },
  {
    slug: "cloud",
    title: "Multi-Cloud & Hybrid Platforms",
    shortTitle: "Cloud",
    icon: Cloud,
    image: "/images/sol_noc.jpg",
    tagline: "Azure-first cloud landing zones, hybrid connectivity, migration factories and FinOps governance — extending on-prem architecture into a coherent multi-cloud operating model.",
    description:
      "KABO engineers multi-cloud and hybrid platforms that extend on-prem architecture into a coherent operating model — Azure-first landing zones, HPE GreenLake consumption, hybrid connectivity, migration factories and FinOps governance. One operations plane across on-prem, edge and cloud.",
    capabilities: [
      { title: "Azure Landing Zones", spec: "POPIA-aligned sovereign cloud zones with hub-and-spoke topology and identity integration" },
      { title: "Hybrid Connectivity", spec: "ExpressRoute, SD-WAN and zero-trust access across on-prem and cloud" },
      { title: "Migration Factory", spec: "Workload assessment, migration sequencing, landing-zone design and cutover runbooks" },
      { title: "FinOps Governance", spec: "Cloud consumption monitoring, right-sizing and chargeback across subscriptions" },
    ],
    stack: ["Microsoft Azure", "Azure AI", "Microsoft Fabric", "HPE GreenLake", "Microsoft 365", "Entra ID", "Intune", "Defender XDR"],
    outcomes: [
      "A unified operating model across on-prem, edge and multi-cloud",
      "POPIA-aligned cloud zones keeping regulated workloads on African soil",
      "FinOps governance that turns cloud spend into business accountability",
    ],
    partners: ["Microsoft", "HPE"],
  },
  {
    slug: "digital-workplace",
    title: "Digital Workplace & Endpoints",
    shortTitle: "Digital Workplace",
    icon: Monitor,
    image: "/images/sol_callcenter.jpg",
    tagline: "Modern endpoint fleets across HP, Dell, Lenovo and Acer; Microsoft 365 productivity; VDI for secure remote access; and Zero-Trust device posture baked into every endpoint.",
    description:
      "KABO engineers the modern digital workplace — endpoint fleets across HP, Dell, Lenovo and Acer, Microsoft 365 productivity, VDI for secure remote access, and Zero-Trust device posture baked into every endpoint. A unified DaaS commercial model, a single accountable owner across imaging, deployment and lifecycle.",
    capabilities: [
      { title: "Endpoint Fleets", spec: "HP, Dell, Lenovo and Acer devices with DaaS, imaging and reverse logistics" },
      { title: "Microsoft 365 & VDI", spec: "M365, Intune, Entra ID and VDI on Azure and on-prem" },
      { title: "Unified Communications", spec: "Voice, video, chat and meeting rooms integrated and managed" },
      { title: "Zero-Trust Device Posture", spec: "Conditional access, EDR/XDR and device-as-a-service procurement" },
    ],
    stack: ["Microsoft 365", "Microsoft Intune", "Entra ID", "HP EliteBook", "Dell Latitude", "Lenovo ThinkPad", "Acer TravelMate", "VMware Horizon", "Defender XDR"],
    outcomes: [
      "One DaaS commercial model across imaging, deployment and lifecycle",
      "Zero-Trust device posture baked into every endpoint, not bolted on",
      "Hybrid teams with the productivity tools they actually use",
    ],
    partners: ["Microsoft", "HP", "Lenovo", "Dell", "Acer"],
  },
  {
    slug: "physical-security",
    title: "Physical Security & AI Video",
    shortTitle: "Physical Security",
    icon: Shield,
    image: "/images/sol_smartcity.jpg",
    tagline: "End-to-end video surveillance from Hikvision — DeepinView AI cameras, ColorVu low-light imaging, AcuSense classification, ANPR, perimeter detection and HikCentral VMS integrated into the SOC.",
    description:
      "KABO architects the full physical-security stack — cameras, NVR/VMS, AI analytics, access control and SOC integration — powered by Hikvision. DeepinView AI cameras deliver edge inference, ColorVu captures full-colour detail in near-darkness, and AcuSense drops false alarms by up to 95%. Every estate lands inside the 24/7 SOC for joint cyber + physical response.",
    capabilities: [
      { title: "AI Video Analytics", spec: "DeepinView edge inference for target classification, behaviour analysis and metadata streaming" },
      { title: "Low-Light Imaging", spec: "ColorVu full-colour imaging at 0.0005 lux with F1.0 optics and dual-illuminator (LED + IR)" },
      { title: "ANPR & Perimeter", spec: "AcuSense classification, virtual tripwires, thermal zero-light perimeter and object left/removed detection" },
      { title: "Access & SOC Integration", spec: "HikCentral VMS federated across sites, integrated with identity systems and SOC telemetry" },
    ],
    stack: ["Hikvision DeepinView", "ColorVu", "AcuSense", "HikCentral Pro VMS", "DeepinMind NVR", "ANPR cameras", "Thermal perimeter", "Access control"],
    outcomes: [
      "Up to 95% false-alarm reduction through AcuSense target classification",
      "One federated VMS across every site, integrated with identity and incident workflow",
      "Joint cyber + physical IR runbooks in the 24/7 SOC",
    ],
    partners: ["Hikvision"],
  },
  {
    slug: "analytics-bi",
    title: "Data Platform, Analytics & BI",
    shortTitle: "Analytics & BI",
    icon: Database,
    image: "/images/sol_noc.jpg",
    tagline: "Modern data platforms, lakehouse architectures, Power BI dashboards and self-service analytics — engineered to make infrastructure investment visible to the business.",
    description:
      "KABO engineers modern data platforms that turn infrastructure into intelligence — Microsoft Fabric lakehouses, Power BI dashboards, SQL platforms and self-service analytics. Each architecture is engineered to make infrastructure investment visible to the business, with governance and lineage built in.",
    capabilities: [
      { title: "Lakehouse Architecture", spec: "Microsoft Fabric lakehouse with OneLake, medallion architecture and governance" },
      { title: "Power BI & Self-Service", spec: "Power BI semantic models, dashboards and row-level security across the business" },
      { title: "SQL & Operational Data", spec: "SQL Server, Azure SQL and PostgreSQL platforms tuned to the workload" },
      { title: "Data Governance & Lineage", spec: "Purview governance, lineage and POPIA-aligned data classification" },
    ],
    stack: ["Microsoft Fabric", "OneLake", "Power BI", "SQL Server", "Azure SQL", "PostgreSQL", "Microsoft Purview"],
    outcomes: [
      "Infrastructure investment made visible to the business through dashboards",
      "Self-service analytics that reduces the BI bottleneck",
      "Governance and lineage built in — POPIA-aligned and audit-ready",
    ],
    partners: ["Microsoft"],
  },
  {
    slug: "continuity",
    title: "Backup, Resilience & DR",
    shortTitle: "Continuity",
    icon: Server,
    image: "/images/sol_datacenter.jpg",
    tagline: "Veeam and Commvault-powered backup, immutable storage, disaster recovery and cyber-resilience runbooks — tested, RPO/RTO-bound and audited against the business impact analysis.",
    description:
      "KABO engineers business continuity and cyber-resilience — Veeam and Commvault-powered backup, immutable storage, disaster recovery and tested IR runbooks. Every architecture is engineered against the business impact analysis, with RPO/RTO bound contractually and audited semi-annually.",
    capabilities: [
      { title: "Image-Based Backup", spec: "Veeam Availability Suite and Commvault intelligent data services across virtual, physical and cloud" },
      { title: "Immutable & Air-Gapped", spec: "Hardened repositories and air-gapped clean-room recovery targets" },
      { title: "Disaster Recovery", spec: "Orchestrated DR across heterogeneous workloads with tested runbooks" },
      { title: "Cyber-Resilience", spec: "Clean-room recovery, rapid recovery playbooks and continuous data protection" },
    ],
    stack: ["Veeam Availability Suite", "Veeam Hardened Repository", "Veeam CDP", "Veeam Threat Detection", "Commvault Intelligent Data Services", "Commvault Clean Room", "Pure Storage SafeMode"],
    outcomes: [
      "RPO/RTO bound contractually and audited semi-annually",
      "Immutable, air-gapped cyber-resilience that survives attack, outage and audit",
      "A single accountable owner across backup, DR and cyber-recovery",
    ],
    partners: ["Veeam", "Commvault", "Pure Storage"],
  },
  {
    slug: "iot-edge",
    title: "IoT & Edge Computing",
    shortTitle: "IoT & Edge",
    icon: Zap,
    image: "/images/sol_manufacturing.jpg",
    tagline: "Ruggedised edge compute, OT/IT convergence, industrial networking and Schneider-powered infrastructure monitoring — bringing observability to remote sites and operational floors.",
    description:
      "KABO engineers IoT and edge infrastructure that brings observability to remote sites and operational floors — ruggedised edge compute, OT/IT convergence, industrial networking and Schneider-powered infrastructure monitoring. The pattern is consistent: instrument everything, normalise the telemetry, secure the data path and present decisions to the operator.",
    capabilities: [
      { title: "Ruggedised Edge Compute", spec: "Edge servers for distributed inference at remote sites, mines, plants and substations" },
      { title: "OT/IT Convergence", spec: "Zero-trust segmentation across operational technology and enterprise IT" },
      { title: "Industrial Networking", spec: "Schneider, Huawei and Hikvision industrial networking and telemetry" },
      { title: "Infrastructure Monitoring", spec: "Schneider EcoStruxure DCIM for power, cooling and capacity visibility" },
    ],
    stack: ["Schneider EcoStruxure", "Schneider Galaxy VS/VM", "Huawei IoT", "Hikvision AI Video", "Ruggedised edge servers", "Industrial networking"],
    outcomes: [
      "A unified observability plane across IT, OT and physical infrastructure",
      "Edge inference at the point of operation — mines, plants, substations, campuses",
      "DCIM that makes power, cooling and capacity visible against the growth curve",
    ],
    partners: ["Schneider", "Huawei", "Hikvision", "HPE"],
  },
  {
    slug: "managed-services-itsm",
    title: "Managed Services & ITSM",
    shortTitle: "Managed Services",
    icon: Activity,
    image: "/images/sol_noc.jpg",
    tagline: "ManageEngine-powered IT operations management, ITSM, endpoint management, network/server monitoring and the contact-centre platforms that route, assist and analyse every customer interaction.",
    description:
      "KABO engineers the operations plane that ties infrastructure, security and applications into a single accountable service. ManageEngine OpManager for network and server monitoring, ServiceDesk Plus for ITSM, MDM for endpoint, Analytics Plus for BI on operational telemetry, and the contact-centre platforms that route, assist and analyse every customer interaction — all wrapped into the 24/7 NOC and SOC.",
    capabilities: [
      { title: "IT Operations Management", spec: "ManageEngine OpManager for network/server monitoring, correlated with security telemetry in the SOC" },
      { title: "ITSM & Service Desk", spec: "ServiceDesk Plus with change, incident, problem and asset management — integrated with NOC and SOC workflows" },
      { title: "Endpoint & MDM", spec: "ManageEngine MDM for patch, configuration, asset and lifecycle management across distributed fleets" },
      { title: "Contact Centre & CX", spec: "Omnichannel ACD, IVR, AI-assisted agent desktop, speech analytics and workforce engagement" },
    ],
    stack: ["ManageEngine OpManager", "ManageEngine ServiceDesk Plus", "ManageEngine MDM", "ManageEngine Analytics Plus", "ManageEngine Contact Center", "ManageEngine ADManager Plus"],
    outcomes: [
      "A single operations plane across infrastructure, security, applications and customer experience",
      "ITSM workflows integrated with NOC and SOC runbooks — no swivel-chair escalation",
      "Operational telemetry turned into BI through Analytics Plus, dashboards and QBR reporting",
    ],
    partners: ["ManageEngine"],
  },
];

// ============================================================================
// ARCHITECTURE METHODOLOGY — 8 steps tying business requirement to outcome
// ============================================================================

export interface ArchStep {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
}

export const ARCHITECTURE_STEPS: ArchStep[] = [
  { num: "01", title: "Define", subtitle: "Business Requirement", desc: "We start with the workload, the SLA, the user base and the commercial outcome the client is buying — not the SKU." },
  { num: "02", title: "Design", subtitle: "Architecture", desc: "Reference architectures are mapped to the requirement, with capacity, resilience and growth modelled across a 3–5 year horizon." },
  { num: "03", title: "Select", subtitle: "Technology", desc: "Vendor-neutral selection across our fifteen strategic alliances, scored against fit, TCO, support and B-BBEE contribution." },
  { num: "04", title: "Build", subtitle: "Integration", desc: "Pre-staging, factory integration, configuration validation and interoperability testing in our integration facility before site delivery." },
  { num: "05", title: "Secure", subtitle: "Security", desc: "Zero-trust overlay, segmentation, identity, encryption and SOC monitoring designed in — not retro-fitted after deployment." },
  { num: "06", title: "Operate", subtitle: "Operations", desc: "24/7 NOC and SOC monitoring, SLA-backed incident response, patching, tuning and capacity reporting against the original requirement." },
  { num: "07", title: "Sustain", subtitle: "Lifecycle", desc: "Refresh planning, firmware and licensing governance, technology roadmaps and graceful migration as workloads and vendors evolve." },
  { num: "08", title: "Prove", subtitle: "Business Outcome", desc: "Quarterly business reviews tie operational metrics back to the original outcome — availability, performance, cost, risk and growth." },
];

// Architecture principles
export const ARCH_PRINCIPLES = [
  { title: "Outcome over inventory", desc: "We measure success by the business metric — uptime, throughput, latency, recovery time — not by hardware shipped." },
  { title: "Architecture before product", desc: "Reference design first; product selection second. The architecture must outlive any single vendor refresh cycle." },
  { title: "Operate what we build", desc: "If we designed it, we can run it. The same engineers who integrate carry the operational accountability post go-live." },
];

// ============================================================================
// DELIVERY METHODOLOGY — 4-stage engagement discipline
// ============================================================================

export interface DeliveryStage {
  num: string;
  name: string;
  desc: string;
  output: string;
}

export const DELIVERY_STAGES: DeliveryStage[] = [
  { num: "01", name: "Discover", desc: "Workload profiling, dependency mapping, capacity baseline, security posture assessment and outcome definition.", output: "Statement of Work" },
  { num: "02", name: "Design", desc: "Reference architecture, vendor selection, capacity plan, security overlay, integration plan and acceptance criteria.", output: "HLD & LLD" },
  { num: "03", name: "Deliver", desc: "Procurement, factory integration, site deployment, interoperability testing, security validation and go-live cutover.", output: "Live system + AT" },
  { num: "04", name: "Operate", desc: "24/7 NOC/SOC monitoring, incident response, change management, capacity reporting and QBR.", output: "SLA performance + roadmap" },
];

export const GOVERNANCE_STANDARDS = [
  "ISO/IEC 27001 information security",
  "ITIL 4 service management",
  "NIST CSF risk posture",
  "POPIA data protection",
  "PCI-DSS where applicable",
];

// ============================================================================
// PARTNERS — 15 strategic alliances + extended vendor portfolio
// ============================================================================

export interface Partner {
  name: string;
  slug: string;
  colour: string;
  category: string;
  tagline: string;
  description: string;
  portfolio: string[];
  relationship: string;
  integration: string[];
  solutions: string[];
  strategic: boolean;
}

export const PARTNERS: Partner[] = [
  { name: "HPE", slug: "hpe", colour: "#00A6E8", category: "Compute · HCI · Cloud", tagline: "ProLiant servers, Synergy composable infrastructure, GreenLake edge-to-cloud and Aruba networking.", description: "HPE anchors KABO's compute portfolio — ProLiant servers, Synergy composable infrastructure and the GreenLake edge-to-cloud platform. HPE brings the engineering credibility to carry mission-critical workloads and the consumption model that lets clients scale HPE as-a-Service.", portfolio: ["HPE ProLiant", "HPE Synergy", "HPE GreenLake", "HPE Alletra Storage", "HPE Aruba Networking", "HPE InfoSight"], relationship: "KABO is an authorised HPE partner delivering compute, storage, GreenLake consumption and Aruba networking with nationwide deployment and managed operations.", integration: ["Architecture and sizing aligned to workload, not vendor SKU", "GreenLake commercial wrapping delivered through a unified KABO contract", "On-site break-fix and proactive monitoring via KABO NOC"], solutions: ["compute", "ai-infrastructure", "cloud", "data", "networking"], strategic: true },
  { name: "Dell Technologies", slug: "dell", colour: "#007DB8", category: "Compute · Storage · HCI", tagline: "PowerEdge servers, PowerStore and PowerScale storage, VxRail hyperconverged infrastructure.", description: "Dell Technologies brings PowerEdge servers, PowerStore and PowerScale storage, and VxRail hyperconverged infrastructure. KABO deploys Dell across enterprise cores, AI clusters and remote/edge sites where resilience and supply-chain depth matter.", portfolio: ["Dell PowerEdge", "Dell PowerStore", "Dell PowerScale", "Dell PowerProtect", "Dell VxRail"], relationship: "KABO is an authorised Dell Technologies partner delivering PowerEdge, PowerStore, PowerScale and VxRail with nationwide engineering and managed operations.", integration: ["PowerEdge XE9680 GPU servers engineered for AI training", "PowerStore and PowerScale sized to workload, not vendor SKU", "PowerProtect and Veeam integration for ransomware-resilient backup"], solutions: ["compute", "ai-infrastructure", "data", "continuity"], strategic: true },
  { name: "Microsoft", slug: "microsoft", colour: "#0078D4", category: "Cloud · Productivity · Identity", tagline: "Azure cloud, Microsoft 365, Entra ID, Intune, Defender and Fabric — the cloud and productivity spine.", description: "Microsoft is the cloud and productivity spine of the KABO portfolio — Azure landing zones, Microsoft 365, Entra ID, Intune, Defender and Fabric. KABO holds the Azure-aligned designations to architect, migrate and operate Microsoft estates at enterprise scale.", portfolio: ["Microsoft Azure", "Microsoft 365", "Microsoft Entra ID", "Microsoft Intune", "Microsoft Defender XDR", "Microsoft Fabric", "Azure AI"], relationship: "KABO is a Microsoft partner delivering Azure, Microsoft 365, Entra ID, Intune, Defender XDR and Fabric with architecture and managed operations.", integration: ["Azure landing zones with POPIA-aligned sovereign cloud residency", "Microsoft 365, Teams and Fabric integrated across workplace and BI", "Defender XDR correlated with NGFW and endpoint telemetry in the SOC"], solutions: ["cloud", "digital-workplace", "analytics-bi", "security"], strategic: true },
  { name: "Veeam", slug: "veeam", colour: "#00B336", category: "Backup · Resilience", tagline: "Availability Suite, hardened immutable repositories, CDP and ransomware resilience.", description: "Veeam underwrites KABO's cyber-resilience practice — image-based backup, instant recovery, immutable repositories and continuous data protection across virtual, physical and cloud workloads. The platform ties RPO and RTO directly to the business impact analysis.", portfolio: ["Veeam Availability Suite", "Veeam Backup & Replication", "Veeam Hardened Repository", "Veeam CDP", "Veeam Threat Detection"], relationship: "KABO is an authorised Veeam partner delivering backup, CDP and ransomware resilience with architecture and managed operations.", integration: ["Hardened immutable repositories that ransomware cannot encrypt", "CDP delivering sub-second RPO for critical databases", "Threat detection integrated with SOC monitoring and recovery orchestration"], solutions: ["continuity", "security"], strategic: true },
  { name: "Fortinet", slug: "fortinet", colour: "#E11932", category: "Network Security · SASE", tagline: "FortiGate NGFWs, FortiSandbox, FortiAnalyzer and the Fortinet Security Fabric.", description: "Fortinet secures the KABO network edge — FortiGate NGFWs, FortiSandbox, FortiAnalyzer and the Fortinet Security Fabric tying detection, response and segmentation into a single operational pane. KABO deploys Fortinet across campus, data-centre and SASE architectures.", portfolio: ["Fortinet FortiGate", "FortiSandbox", "FortiAnalyzer", "Fortinet Security Fabric", "Fortinet SASE"], relationship: "KABO is an authorised Fortinet partner delivering NGFW, SASE and the Security Fabric with nationwide deployment and managed operations.", integration: ["FortiGate NGFWs sized to throughput, inspection and SLA", "Fortinet Security Fabric tying detection, response and segmentation into one pane", "SASE architectures for distributed estates with identity-aware policies"], solutions: ["security", "networking"], strategic: true },
  { name: "Sophos", slug: "sophos", colour: "#225F9E", category: "Endpoint · Firewall · XDR", tagline: "Intercept X with XDR, Sophos Firewall and the Sophos Central platform.", description: "Sophos extends KABO's endpoint and SMB/mid-market security posture — Intercept X with XDR, Sophos Firewall and the Sophos Central platform. A natural fit for distributed estates that need enterprise-grade protection with mid-market operational simplicity.", portfolio: ["Sophos Intercept X", "Sophos XDR", "Sophos Firewall", "Sophos Central", "Sophos MTR"], relationship: "KABO is an authorised Sophos partner delivering endpoint, firewall and XDR with the Sophos Central platform and managed operations.", integration: ["Intercept X with XDR integrated into the SOC telemetry stream", "Sophos Firewall at the branch and campus edge with Central management", "MTR (managed threat response) backed by KABO SOC escalation"], solutions: ["security"], strategic: true },
  { name: "Palo Alto Networks", slug: "palo-alto", colour: "#FA582D", category: "NGFW · Cloud · SOC", tagline: "Strata firewalls, Prisma Cloud, Prisma SASE and Cortex XDR/XSIAM for the SOC.", description: "Palo Alto Networks anchors KABO's enterprise NGFW and cloud security practice — Strata firewalls, Prisma Cloud, Prisma SASE and Cortex XDR/XSIAM for the SOC. The platform of choice for clients running high-throughput, high-sensitivity workloads.", portfolio: ["Palo Alto Strata NGFW", "Prisma Cloud", "Prisma SASE", "Cortex XDR", "Cortex XSIAM"], relationship: "KABO is an authorised Palo Alto Networks partner delivering NGFW, cloud security and Cortex XDR/XSIAM with managed operations.", integration: ["Strata NGFWs for high-throughput, high-sensitivity workloads", "Prisma Cloud and Prisma SASE for cloud and SASE architectures", "Cortex XDR/XSIAM normalised into the SOC event stream"], solutions: ["security", "cloud"], strategic: true },
  { name: "Pure Storage", slug: "pure-storage", colour: "#FF7F00", category: "All-Flash · NVMe · Object", tagline: "FlashArray for block, FlashBlade for file/object and Evergreen//One storage-as-a-service.", description: "Pure Storage is KABO's primary all-flash and NVMe platform — FlashArray for block, FlashBlade for file/object and Evergreen//One for storage-as-a-service. Pure brings the latency, density and non-disruptive upgrade model AI and database workloads demand.", portfolio: ["Pure FlashArray", "Pure FlashBlade", "Pure Evergreen//One", "Pure Portworx", "Pure SafeMode"], relationship: "KABO is an authorised Pure Storage partner delivering FlashArray, FlashBlade and Evergreen//One with architecture and managed operations.", integration: ["FlashArray and FlashBlade sized to workload I/O profile", "Evergreen//One storage-as-a-service wrapping through a unified KABO contract", "SafeMode immutable snapshots integrated with cyber-resilience runbooks"], solutions: ["data", "ai-infrastructure", "continuity"], strategic: true },
  { name: "Commvault", slug: "commvault", colour: "#1A4D2E", category: "Enterprise Backup · DR", tagline: "Intelligent data services, cyber-resilience with clean-room recovery, orchestrated DR.", description: "Commvault underpins KABO's large-enterprise resilience practice — intelligent data services, cyber-resilience with clean-room recovery, and orchestrated DR across heterogeneous workloads. The platform of choice when the recovery SLA is contractual, not aspirational.", portfolio: ["Commvault Intelligent Data Services", "Commvault Clean Room", "Commvault Disaster Recovery", "Commvault Cyber Resilience"], relationship: "KABO is an authorised Commvault partner delivering intelligent data services, clean-room recovery and orchestrated DR with managed operations.", integration: ["Commvault clean-room recovery for cyber-resilience", "Orchestrated DR across heterogeneous workloads", "Recovery SLAs engineered against the business impact analysis"], solutions: ["continuity"], strategic: true },
  { name: "Juniper Networks", slug: "juniper", colour: "#84B135", category: "Network Fabric · SD-WAN", tagline: "Mist AI-driven wireless, EX/QFX switching, SRX secure routing and Apstra fabric management.", description: "Juniper Networks anchors KABO's data-centre and campus fabric practice — Mist AI-driven wireless, EX/QFX switching, SRX secure routing and Apstra intent-based fabric management. Engineered for observability, automation and scale.", portfolio: ["Juniper Mist AI", "Juniper EX Switching", "Juniper QFX Fabric", "Juniper SRX", "Juniper Apstra", "Juniper SD-WAN"], relationship: "KABO is an authorised Juniper Networks partner delivering campus, DC and SD-WAN fabrics with managed operations.", integration: ["Mist AI-driven wireless with predictive heat-mapping and SLA assurance", "QFX spine-leaf fabrics engineered for AI and storage traffic", "Apstra intent-based fabric with end-to-end observability"], solutions: ["networking"], strategic: true },
  { name: "Schneider Electric", slug: "schneider", colour: "#3DCD58", category: "Power · Cooling · DCIM", tagline: "Galaxy VS/VM UPS, Uniflair cooling, NetShelter racks and EcoStruxure DCIM.", description: "Schneider Electric carries the physical layer — UPS, precision cooling, racks, PDU and EcoStruxure DCIM. The foundation that lets KABO design AI-ready, high-density data-centre space with the power and thermal envelope the silicon demands.", portfolio: ["Schneider Galaxy VS/VM", "Schneider Uniflair Cooling", "Schneider NetShelter SX", "Schneider EcoStruxure DCIM", "Schneider Power Logic"], relationship: "KABO is an authorised Schneider Electric partner delivering power, cooling, racks and DCIM with nationwide engineering.", integration: ["Galaxy VS/VM UPS sized to availability class — N+1 or 2N", "Uniflair in-row or rear-door cooling for high-density AI racks", "EcoStruxure DCIM wrapping into the KABO observability plane"], solutions: ["iot-edge", "compute", "ai-infrastructure"], strategic: true },
  { name: "Huawei", slug: "huawei", colour: "#C7000B", category: "Compute · Network · Storage", tagline: "TaiShan servers, OceanStor storage, CloudEngine switching and AirEngine Wi-Fi.", description: "Huawei broadens KABO's optionality across servers, storage and networking — TaiShan servers, OceanStor storage and CloudEngine switching. A critical supply-chain alternative for cost-sensitive, scale-out and edge workloads across Africa.", portfolio: ["Huawei TaiShan", "Huawei OceanStor", "Huawei CloudEngine", "Huawei AirEngine Wi-Fi", "Huawei IoT"], relationship: "KABO is an authorised Huawei partner delivering servers, storage, networking and IoT with nationwide engineering.", integration: ["TaiShan servers for cost-sensitive compute and edge workloads", "OceanStor all-flash for latency-sensitive workloads", "CloudEngine switching and AirEngine Wi-Fi for distributed estates"], solutions: ["compute", "data", "networking", "iot-edge"], strategic: true },
  { name: "ManageEngine", slug: "manageengine", colour: "#E11932", category: "ITOM · Monitoring · ITSM · CX", tagline: "OpManager, ServiceDesk Plus, MDM, Analytics Plus and contact-centre platforms.", description: "ManageEngine powers KABO's IT operations management and contact-centre stack — OpManager for network/server monitoring, ServiceDesk Plus for ITSM, MDM for endpoint, Analytics Plus for BI on operational telemetry, and the contact-centre platforms that route, assist and analyse every customer interaction.", portfolio: ["ManageEngine OpManager", "ManageEngine ServiceDesk Plus", "ManageEngine MDM", "ManageEngine Analytics Plus", "ManageEngine Contact Center"], relationship: "KABO partners with ManageEngine to deliver ITOM, ITSM, endpoint management and contact-centre platforms with managed operations.", integration: ["OpManager network/server monitoring correlated with security telemetry", "ServiceDesk Plus integrated with NOC and SOC workflows", "Contact Centre platforms engineered into the same secure, observable fabric"], solutions: ["analytics-bi", "digital-workplace", "security"], strategic: true },
  { name: "H3C", slug: "h3c", colour: "#FF6A00", category: "Networking · Compute", tagline: "Campus switching, routers, Wi-Fi 6, servers and UniStor storage.", description: "H3C extends KABO's networking and compute optionality — campus switching, routers, Wi-Fi 6, servers and storage. A high-value, cost-effective alternative for distributed estates and public-sector deployments where supply-chain diversity matters.", portfolio: ["H3C Campus Switching", "H3C Routers", "H3C Wi-Fi 6", "H3C Servers", "H3C UniStor"], relationship: "KABO is an authorised H3C partner delivering networking, wireless, servers and storage with nationwide engineering and managed operations.", integration: ["Campus switching and Wi-Fi 6 with predictive heat-mapping", "Servers and UniStor storage for cost-sensitive workloads", "Supply-chain diversity for public-sector and distributed estates"], solutions: ["networking", "compute", "data"], strategic: true },
  { name: "Hikvision", slug: "hikvision", colour: "#E60012", category: "Surveillance · AI Video · Access Control", tagline: "DeepinView AI cameras, ColorVu, AcuSense, ANPR, perimeter detection and HikCentral VMS.", description: "Hikvision is KABO's strategic partner for video surveillance, AI video analytics and physical access control — DeepinView AI cameras, ColorVu low-light imaging, AcuSense target classification, ANPR, perimeter detection, NVR/VMS platforms and centralised video management integrated into the SOC. Hikvision underpins every KABO industry practice — public sector, financial services, mining, healthcare, education, telecommunications, manufacturing, retail and smart infrastructure.", portfolio: ["Hikvision DeepinView", "Hikvision ColorVu", "Hikvision AcuSense", "Hikvision ANPR", "Hikvision Perimeter Detection", "Hikvision Access Control", "HikCentral Pro VMS"], relationship: "KABO architects, integrates and operates the surveillance estate. Hikvision powers it. A single accountable partner, a single observable surveillance fabric, every industry.", integration: ["DeepinView edge AI for face recognition, ANPR and behaviour analysis", "HikCentral VMS federated across sites, integrated with identity and SOC telemetry", "Joint cyber + physical IR runbooks with SLA-backed 24/7 response"], solutions: ["physical-security"], strategic: true },
];

// Extended vendor portfolio — beyond the strategic fifteen
export interface ExtendedVendor {
  name: string;
  slug: string;
  colour: string;
  category: string;
  tagline: string;
  description: string;
  portfolio: string[];
}

export const EXTENDED_VENDORS: ExtendedVendor[] = [
  { name: "Lenovo", slug: "lenovo", colour: "#E2231A", category: "Compute · Endpoint", tagline: "ThinkSystem servers, ThinkAgile HCI and ThinkPad/ThinkBook endpoint fleets.", description: "Lenovo delivers ThinkSystem servers, ThinkAgile HCI and ThinkPad/ThinkBook endpoint fleets — a high-value alternative across enterprise compute and modern workplace procurement.", portfolio: ["Lenovo ThinkSystem SR/SE", "Lenovo ThinkAgile HX/VX", "Lenovo ThinkPad", "Lenovo ThinkBook"] },
  { name: "HPE Aruba", slug: "aruba", colour: "#00A6E8", category: "Networking", tagline: "Aruba campus switching, Wi-Fi 6/6E, ClearPass NAC and Central cloud management.", description: "HPE Aruba delivers Aruba campus switching, Wi-Fi 6/6E wireless, ClearPass network access control and Central cloud management — the wireless and access-layer fabric of choice for distributed estates.", portfolio: ["Aruba CX Switching", "Aruba Wi-Fi 6/6E APs", "Aruba ClearPass NAC", "Aruba Central"] },
  { name: "HP", slug: "hp", colour: "#0096D6", category: "Endpoint · Workplace", tagline: "HP Elite and Pro desktops, laptops, workstations and managed-print services.", description: "HP delivers HP Elite and Pro desktops, laptops and workstations — plus HP print and managed-print services. A core endpoint supplier across modern workplace deployments.", portfolio: ["HP EliteBook", "HP ProBook", "HP Z Workstations", "HP Managed Print"] },
  { name: "Canon", slug: "canon", colour: "#CC0000", category: "Imaging · Workplace", tagline: "imageRUNNER MFPs, production imaging and document-management solutions.", description: "Canon delivers Canon multifunction printers, production imaging and document-management solutions. Deployed where secure, high-volume imaging and capture are part of the workplace architecture.", portfolio: ["Canon imageRUNNER MFPs", "Canon Production Imaging", "Canon Document Capture"] },
  { name: "Acer", slug: "acer", colour: "#83B81A", category: "Endpoint · Education", tagline: "TravelMate notebooks, Veriton desktops and education-grade endpoint fleets.", description: "Acer delivers Acer notebooks, desktops, Chromebooks and education-grade endpoint fleets. A cost-effective option for education, retail and bulk refresh programmes.", portfolio: ["Acer TravelMate", "Acer Swift", "Acer Chromebooks", "Acer Education Endpoints"] },
  { name: "NVIDIA", slug: "nvidia", colour: "#76B900", category: "AI · GPU Compute", tagline: "H100/H200 and L40S accelerators, NVIDIA networking and the AI Enterprise software stack.", description: "NVIDIA GPU platforms power KABO's AI infrastructure — H100/H200 and L40S accelerators, NVIDIA networking and the AI Enterprise software stack underpinning training, inference and HPC workloads.", portfolio: ["NVIDIA H100", "NVIDIA H200", "NVIDIA L40S", "NVIDIA AI Enterprise", "NVIDIA InfiniBand", "NVIDIA Spectrum-X"] },
];

// ============================================================================
// WHY KABO — 6 reasons clients choose us
// ============================================================================

export const WHY_KABO_POINTS = [
  { num: "01", title: "Outcome-Led", desc: "Architecture starts at the business outcome and ends at the SLA — not at the SKU." },
  { num: "02", title: "One Team", desc: "The same engineers integrate and operate. No hand-off, no diffusion of accountability." },
  { num: "03", title: "15 Strategic Partners", desc: "Vendor-neutral selection across fifteen strategic alliances — fit-for-purpose, never fit-for-catalogue." },
  { num: "04", title: "24/7 SOC + NOC", desc: "Continuous monitoring, response and reporting against contractual SLAs." },
  { num: "05", title: "Level 1 · 135%", desc: "Maximum B-BBEE procurement recognition — and Gauteng-established." },
  { num: "06", title: "AI-Ready", desc: "GPU compute, low-latency fabric and high-throughput storage — engineered for the AI era." },
];

// ============================================================================
// COMPETITIVE POSITIONING — three pillars
// ============================================================================

export const COMPETITIVE_PILLARS = [
  { title: "Depth vs. Resellers", desc: "Where resellers ship boxes, KABO architects the stack — reference design, integration, deployment and 24/7 operations under a single accountable team." },
  { title: "Breadth vs. Specialists", desc: "Where specialists carry one domain, KABO carries ten — compute, data, network, security, AI, cloud, workplace, surveillance, analytics and edge." },
  { title: "Profile vs. Multinationals", desc: "Where multinationals bring global brand and local overhead, KABO brings Level 1 B-BBEE with maximum procurement recognition — maximum procurement value, local accountability." },
];

// ============================================================================
// PROCUREMENT CORE LINES — daily-bread supply domains
// ============================================================================

export const PROCUREMENT_LINES = [
  { num: "01", title: "IT Equipment & Solutions", desc: "Servers, storage, hyperconverged, networking, compute, cloud-landing hardware and the full IT stack — procured, configured, asset-tagged and deployed against the design, not the catalogue. The backbone of every client estate we build and operate." },
  { num: "02", title: "Surveillance Equipment & Solutions", desc: "AI cameras, NVR/VMS platforms, access control, perimeter and ANPR — the full physical-security stack procured, integrated and operated inside the SOC. Surveillance supply underpins every KABO industry practice from mining to smart city." },
  { num: "03", title: "Security Equipment & Solutions", desc: "Next-gen firewalls, endpoint, SASE, identity, encryption and SOC tooling — the cybersecurity stack procured, integrated and operated under one Zero-Trust overlay. Security supply is continuous, refresh-driven and SLA-bound." },
  { num: "04", title: "Office Consumables & Printers", desc: "Printers, MFPs, toner, paper and managed-print services across endpoint and back-office — the consumable backbone that keeps every site productive. Procured on standing-frame contracts with scheduled replenishment." },
];

// ============================================================================
// THOUGHT LEADERSHIP — three theses for the AI era
// ============================================================================

export const THOUGHT_LEADERSHIP = [
  { num: "01", thesis: "AI changes the physics of the room.", desc: "Density, power and cooling envelopes will re-architect the data centre — not just refresh it. AI changes the spec sheet, the room and the operating model." },
  { num: "02", thesis: "Security is the architecture.", desc: "Zero-Trust will move from a capability to a precondition; the SOC becomes the system of record. Security engineered into every layer, not bolted on after deployment." },
  { num: "03", thesis: "Operations is the product.", desc: "Infrastructure value will be measured in SLA performance, not in capex — and integrators who can't operate won't survive. The same engineers integrate and operate." },
];

// ============================================================================
// ENGAGEMENT PATH — from first conversation to go-live
// ============================================================================

export const ENGAGEMENT_PATH = [
  { step: "Discovery Workshop", timeframe: "1–2 weeks", desc: "Workload, outcome, constraint, timeline." },
  { step: "Statement of Work & HLD", timeframe: "Within 10 business days", desc: "Architecture, vendor selection, commercial proposal." },
  { step: "Vendor Selection & B-BBEE Documentation", timeframe: "Commercial track", desc: "Fit-for-purpose selection, B-BBEE certificates, Treasury pack." },
  { step: "Integration, Deployment & Go-Live", timeframe: "Project track", desc: "Factory integration, site deployment, security validation, cutover." },
  { step: "Managed Services & QBR", timeframe: "Operational track", desc: "24/7 NOC/SOC, change management, capacity reporting, QBR." },
];

// ============================================================================
// CASE STUDIES
// ============================================================================

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  sector: string;
  challenge: string;
  solution: string;
  outcome: string;
  stack: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  { slug: "multi-operator-sd-wan", title: "Multi-Operator SD-WAN Across Nine Provinces", client: "National Retailer", sector: "Retail", challenge: "A national retailer needed consistent branch networking across all nine provinces. Multiple operators, inconsistent SLAs, and a fragmented support model were driving up cost and downtime.", solution: "KABO delivered multi-operator SD-WAN with application-aware routing and 24/7 monitoring from a single NOC. Branches were rolled out province by province with zero-touch provisioning.", outcome: "Consistent branch networking across all nine provinces, with a single accountable partner and a single escalation path. Application-aware routing prioritised POS and voice traffic.", stack: ["Juniper SD-WAN", "Juniper Mist", "Multi-Operator WAN", "KABO NOC"] },
  { slug: "sovereign-ai-gpu-cluster", title: "Sovereign AI GPU Cluster for Research", client: "Research Institution", sector: "Education", challenge: "A research institution needed GPU compute for LLM training and HPC, but could not expose regulated datasets to offshore cloud providers.", solution: "KABO engineered a liquid-cooled NVIDIA H100 HGX cluster with InfiniBand 400G fabric, Pure Storage FlashBlade, and an MLOps platform — all hosted in a sovereign African data centre.", outcome: "AI workloads trained and inferred without exposing data offshore. GPU capacity matched to demand with elastic burst to Azure for non-sensitive workloads.", stack: ["NVIDIA HGX H100", "HPE Apollo 6500", "InfiniBand 400G", "Pure Storage FlashBlade", "NVIDIA AI Enterprise"] },
  { slug: "modular-data-centre-remote-mining", title: "Modular Data Centre for Remote Mining Operation", client: "Mining Group", sector: "Mining", challenge: "A mining group needed data centre capacity at a remote site with unstable grid power, high temperatures, and no on-site engineering staff.", solution: "KABO delivered a Schneider-powered modular data centre with Galaxy VS UPS, in-row cooling, solar PV integration, and EcoStruxure DCIM remote monitoring from the Gauteng NOC.", outcome: "Resilient data centre capacity at a remote site with unstable grid power. DCIM delivers granular energy visibility and capacity planning against the growth curve.", stack: ["Schneider Galaxy VS", "Schneider Uniflair Cooling", "Schneider EcoStruxure DCIM", "Solar PV", "KABO NOC"] },
  { slug: "integrated-security-public-sector", title: "Integrated Security Architecture for Public Sector Estate", client: "Public Sector Department", sector: "Public Sector", challenge: "A public sector department needed to converge physical and cyber security under a single accountable contract, with POPIA-aligned evidence and 24/7 monitoring.", solution: "KABO deployed Hikvision AI video analytics, Palo Alto Strata NGFW, Sophos Intercept X endpoint, and Veeam ransomware resilience — all monitored from the Gauteng SOC.", outcome: "A unified, accountable security posture — not a portfolio of point tools. Measurable reduction in dwell time through 24/7 SOC monitoring and joint cyber + physical IR runbooks.", stack: ["Hikvision DeepinView", "Palo Alto Strata NGFW", "Sophos Intercept X", "Veeam Threat Detection", "KABO SOC"] },
];
