"use client";

export interface ProductCategory {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  overview: string;
  capabilities: { name: string; desc: string }[];
  technologies: string[];
  relatedSolutions: string[];
  relatedIndustries: string[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "compute-platforms",
    name: "Compute & Hyperconverged Platforms",
    icon: "Server",
    tagline: "HPE ProLiant, Dell PowerEdge, H3C UniServer, Huawei TaiShan, VxRail, Synergy — sized to the workload, not the catalogue.",
    overview: "KABO engineers compute platforms that anchor the modern enterprise — rack and blade servers, hyperconverged infrastructure and composable platforms engineered for virtualisation, containerised workloads and bare-metal databases. Each platform is sized to the workload, the SLA and the 3–5 year growth curve.",
    capabilities: [
      { name: "Rack & Blade Servers", desc: "HPE ProLiant DL/ML, Dell PowerEdge R/XR, H3C UniServer and Huawei TaiShan — sized to workload class" },
      { name: "Hyperconverged Infrastructure", desc: "HPE Synergy composable, Dell VxRail, H3C UIS — software-defined, scale-out" },
      { name: "Virtualisation & Containers", desc: "VMware vSphere, Hyper-V, OpenShift and Kubernetes platforms for hybrid operation" },
      { name: "Bare-Metal Databases", desc: "High-core, high-memory platforms tuned for OLTP and OLAP engines" },
    ],
    technologies: ["HPE ProLiant", "HPE Synergy", "Dell PowerEdge", "Dell VxRail", "H3C UniServer", "Huawei TaiShan", "VMware vSphere", "OpenShift"],
    relatedSolutions: ["compute"],
    relatedIndustries: ["public-sector", "financial-services", "telecommunications", "manufacturing"],
  },
  {
    slug: "storage-platforms",
    name: "Storage & Data Platforms",
    icon: "Database",
    tagline: "Pure FlashArray, FlashBlade, Evergreen//One, Dell PowerStore, HPE Alletra — primary, secondary and cyber-resilient storage.",
    overview: "KABO architects primary, secondary and cyber-resilient storage across all-flash, NVMe, hybrid and object platforms. From Pure Storage FlashArray and FlashBlade to HPE Alletra and Dell PowerStore, every layer is tuned to the workload's I/O profile and the business RPO/RTO.",
    capabilities: [
      { name: "All-Flash NVMe Primary", desc: "Pure FlashArray, HPE Alletra, Dell PowerStore — sub-millisecond latency with array-based replication" },
      { name: "Scale-Out File & Object", desc: "Pure FlashBlade and object stores for unstructured data at billion-file scale" },
      { name: "Immutable & Air-Gapped", desc: "Hardened, air-gapped backup targets that ransomware cannot encrypt" },
      { name: "Storage-as-a-Service", desc: "Pure Evergreen//One — non-disruptive upgrades that survive refresh cycles" },
    ],
    technologies: ["Pure FlashArray", "Pure FlashBlade", "Pure Evergreen//One", "HPE Alletra", "Dell PowerStore", "Dell PowerScale", "NVMe-over-Fabric"],
    relatedSolutions: ["data", "ai-infrastructure", "continuity"],
    relatedIndustries: ["healthcare", "financial-services", "telecommunications", "manufacturing"],
  },
  {
    slug: "networking-fabric",
    name: "Networking & Connectivity Fabric",
    icon: "Wifi",
    tagline: "Juniper Mist/QFX/SRX, HPE Aruba CX/Wi-Fi 6, Huawei CloudEngine, H3C campus — spine-leaf, SD-WAN, observability.",
    overview: "KABO engineers network fabrics that span campus, core, data centre and the wide area. Spine-leaf fabrics, Wi-Fi 6/6E wireless, SD-WAN, network observability and zero-trust micro-segmentation engineered as one fabric.",
    capabilities: [
      { name: "Campus Networking", desc: "Juniper Mist and HPE Aruba Wi-Fi 6/6E access points, campus switching, ClearPass NAC" },
      { name: "Data Centre Fabrics", desc: "Juniper QFX and Huawei CloudEngine spine-leaf with EVPN-VXLAN for AI, storage, trading" },
      { name: "SD-WAN", desc: "Application-aware routing, multi-link branch connectivity, zero-trust segmentation" },
      { name: "Network Observability", desc: "Juniper Apstra intent-based fabric with flow analytics and anomaly detection" },
    ],
    technologies: ["Juniper Mist AI", "Juniper QFX", "Juniper SRX", "Juniper Apstra", "HPE Aruba CX", "Aruba Wi-Fi 6/6E", "Huawei CloudEngine", "H3C S9820", "ClearPass NAC"],
    relatedSolutions: ["networking"],
    relatedIndustries: ["education", "manufacturing", "retail", "telecommunications", "smart-infrastructure"],
  },
  {
    slug: "cyber-security",
    name: "Cybersecurity & 24/7 SOC",
    icon: "Shield",
    tagline: "Fortinet FortiGate, Sophos Intercept X, Palo Alto Strata, Prisma SASE, Cortex XDR/XSIAM — wrapped in a 24/7 SOC.",
    overview: "KABO engineers defence-in-depth across network, endpoint, identity and email — anchored by Fortinet, Sophos and Palo Alto Networks, wrapped in a 24/7 SOC for detection, response and governance. Security is engineered into every layer, not bolted on after deployment.",
    capabilities: [
      { name: "NGFW & Secure Web Gateway", desc: "Fortinet FortiGate, Palo Alto Strata NGFWs and FortiSandbox for the network edge" },
      { name: "SASE & ZTNA", desc: "Palo Alto Prisma SASE and identity-aware access policies across users, devices and workloads" },
      { name: "EDR/XDR & SOC", desc: "Cortex XDR/XSIAM and Sophos Intercept X with 24/7 SOC monitoring and IR runbooks" },
      { name: "Email Security & DLP", desc: "Anti-phishing, DLP and continuous compliance reporting" },
    ],
    technologies: ["Fortinet FortiGate", "FortiAnalyzer", "FortiSandbox", "Sophos Intercept X", "Sophos Firewall", "Palo Alto Strata", "Prisma SASE", "Prisma Cloud", "Cortex XDR", "XSIAM"],
    relatedSolutions: ["security"],
    relatedIndustries: ["public-sector", "financial-services", "mining", "retail", "smart-infrastructure"],
  },
  {
    slug: "ai-gpu-compute",
    name: "AI Compute & GPU Infrastructure",
    icon: "Cpu",
    tagline: "NVIDIA HGX H100/H200, L40S, InfiniBand 400G, Spectrum-X, Pure FlashBlade, MLOps — engineered for the AI era.",
    overview: "KABO engineers the full AI stack — GPU compute, low-latency fabric, high-throughput storage, MLOps tooling and Zero-Trust security — into a single, observable platform built for the AI era. From single-node inference appliances to liquid-cooled HGX clusters with InfiniBand fabrics, regulated data stays on African soil.",
    capabilities: [
      { name: "GPU Cluster Design", desc: "NVIDIA HGX H100/H200 multi-GPU platforms with NVLink, InfiniBand 400G, Spectrum-X" },
      { name: "AI Training & Inference", desc: "NVIDIA AI Enterprise, ML/Ops platforms, distributed training, model serving" },
      { name: "High-Bandwidth Storage", desc: "Pure FlashBlade tuned to GPU pipelines with GPUDirect integration" },
      { name: "Sovereign AI Hosting", desc: "POPIA-aligned GPU zones keeping African enterprise data on African soil" },
    ],
    technologies: ["NVIDIA HGX H100", "NVIDIA HGX H200", "NVIDIA L40S", "NVIDIA NVLink", "InfiniBand 400G", "NVIDIA Spectrum-X", "NVIDIA AI Enterprise", "HPE Apollo 6500", "Dell PowerEdge XE9680", "Pure FlashBlade"],
    relatedSolutions: ["ai-infrastructure"],
    relatedIndustries: ["healthcare", "education", "manufacturing", "smart-infrastructure"],
  },
  {
    slug: "cloud-platforms",
    name: "Cloud & Hybrid Platforms",
    icon: "Cloud",
    tagline: "Microsoft Azure, HPE GreenLake, sovereign zones, migration factory, FinOps governance.",
    overview: "KABO engineers multi-cloud and hybrid platforms that extend on-prem architecture into a coherent operating model — Azure-first landing zones, HPE GreenLake consumption, hybrid connectivity, migration factories and FinOps governance. One operations plane across on-prem, edge and cloud.",
    capabilities: [
      { name: "Azure Landing Zones", desc: "POPIA-aligned sovereign cloud zones with hub-and-spoke topology and identity integration" },
      { name: "Hybrid Connectivity", desc: "ExpressRoute, SD-WAN and zero-trust access across on-prem and cloud" },
      { name: "Migration Factory", desc: "Workload assessment, migration sequencing, landing-zone design and cutover runbooks" },
      { name: "FinOps Governance", desc: "Cloud consumption monitoring, right-sizing and chargeback across subscriptions" },
    ],
    technologies: ["Microsoft Azure", "Azure AI", "Microsoft Fabric", "HPE GreenLake", "Microsoft 365", "Entra ID", "Intune", "Defender XDR"],
    relatedSolutions: ["cloud"],
    relatedIndustries: ["public-sector", "financial-services", "healthcare", "retail", "smart-infrastructure"],
  },
  {
    slug: "physical-security",
    name: "Physical Security & AI Video",
    icon: "Shield",
    tagline: "Hikvision DeepinView, ColorVu, AcuSense, ANPR, HikCentral VMS — integrated into the SOC.",
    overview: "KABO architects the full physical-security stack — cameras, NVR/VMS, AI analytics, access control and SOC integration — powered by Hikvision. DeepinView AI cameras deliver edge inference, ColorVu captures full-colour detail in near-darkness, and AcuSense drops false alarms by up to 95%.",
    capabilities: [
      { name: "AI Video Analytics", desc: "Hikvision DeepinView edge inference for target classification, behaviour analysis and metadata" },
      { name: "Low-Light Imaging", desc: "ColorVu full-colour imaging at 0.0005 lux with F1.0 optics and dual-illuminator (LED + IR)" },
      { name: "ANPR & Perimeter", desc: "AcuSense classification, virtual tripwires, thermal zero-light perimeter, object left/removed" },
      { name: "Access & SOC Integration", desc: "HikCentral VMS federated across sites, integrated with identity and SOC telemetry" },
    ],
    technologies: ["Hikvision DeepinView", "ColorVu", "AcuSense", "HikCentral Pro VMS", "DeepinMind NVR", "ANPR cameras", "Thermal perimeter", "Access control"],
    relatedSolutions: ["physical-security"],
    relatedIndustries: ["public-sector", "mining", "healthcare", "retail", "smart-infrastructure"],
  },
  {
    slug: "analytics-platforms",
    name: "Analytics & BI Platforms",
    icon: "Database",
    tagline: "Microsoft Fabric, OneLake, Power BI, SQL Server, Purview — make infrastructure investment visible.",
    overview: "KABO engineers modern data platforms that turn infrastructure into intelligence — Microsoft Fabric lakehouses, Power BI dashboards, SQL platforms and self-service analytics. Each architecture is engineered to make infrastructure investment visible to the business.",
    capabilities: [
      { name: "Lakehouse Architecture", desc: "Microsoft Fabric lakehouse with OneLake, medallion architecture and governance" },
      { name: "Power BI & Self-Service", desc: "Power BI semantic models, dashboards and row-level security across the business" },
      { name: "SQL & Operational Data", desc: "SQL Server, Azure SQL and PostgreSQL platforms tuned to the workload" },
      { name: "Data Governance & Lineage", desc: "Microsoft Purview governance, lineage and POPIA-aligned data classification" },
    ],
    technologies: ["Microsoft Fabric", "OneLake", "Power BI", "SQL Server", "Azure SQL", "PostgreSQL", "Microsoft Purview"],
    relatedSolutions: ["analytics-bi"],
    relatedIndustries: ["financial-services", "retail", "telecommunications", "smart-infrastructure"],
  },
  {
    slug: "backup-resilience",
    name: "Backup, Resilience & DR",
    icon: "Server",
    tagline: "Veeam Availability Suite, Commvault, hardened immutable repositories, clean-room recovery, CDP.",
    overview: "KABO engineers business continuity and cyber-resilience — Veeam and Commvault-powered backup, immutable storage, disaster recovery and tested IR runbooks. Every architecture is engineered against the business impact analysis, with RPO/RTO bound contractually and audited semi-annually.",
    capabilities: [
      { name: "Image-Based Backup", desc: "Veeam Availability Suite and Commvault intelligent data services across virtual, physical and cloud" },
      { name: "Immutable & Air-Gapped", desc: "Hardened repositories and air-gapped clean-room recovery targets" },
      { name: "Disaster Recovery", desc: "Orchestrated DR across heterogeneous workloads with tested runbooks" },
      { name: "Cyber-Resilience", desc: "Clean-room recovery, rapid recovery playbooks and continuous data protection" },
    ],
    technologies: ["Veeam Availability Suite", "Veeam Hardened Repository", "Veeam CDP", "Veeam Threat Detection", "Commvault Intelligent Data Services", "Commvault Clean Room", "Pure Storage SafeMode"],
    relatedSolutions: ["continuity"],
    relatedIndustries: ["financial-services", "healthcare", "public-sector", "telecommunications"],
  },
  {
    slug: "digital-workplace",
    name: "Digital Workplace & Endpoints",
    icon: "Monitor",
    tagline: "HP, Dell, Lenovo, Acer endpoints; Microsoft 365, VDI, unified comms, Zero-Trust device posture.",
    overview: "KABO engineers the modern digital workplace — endpoint fleets across HP, Dell, Lenovo and Acer, Microsoft 365 productivity, VDI for secure remote access, and Zero-Trust device posture baked into every endpoint. A unified DaaS commercial model, a single accountable owner across imaging, deployment and lifecycle.",
    capabilities: [
      { name: "Endpoint Fleets", desc: "HP, Dell, Lenovo and Acer devices with DaaS, imaging and reverse logistics" },
      { name: "Microsoft 365 & VDI", desc: "M365, Intune, Entra ID and VDI on Azure and on-prem" },
      { name: "Unified Communications", desc: "Voice, video, chat and meeting rooms integrated and managed" },
      { name: "Zero-Trust Device Posture", desc: "Conditional access, EDR/XDR and device-as-a-service procurement" },
    ],
    technologies: ["Microsoft 365", "Microsoft Intune", "Entra ID", "HP EliteBook", "Dell Latitude", "Lenovo ThinkPad", "Acer TravelMate", "VMware Horizon", "Defender XDR"],
    relatedSolutions: ["digital-workplace"],
    relatedIndustries: ["education", "retail", "healthcare", "public-sector"],
  },
];
