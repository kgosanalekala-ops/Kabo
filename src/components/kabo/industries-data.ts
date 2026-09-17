"use client";

export interface Industry {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  overview: string;
  challenges: string[];
  kaboApproach: string[];
  architecture: { layer: string; desc: string }[];
  deployment: { scenario: string; desc: string }[];
  relatedSolutions: string[];
}

const ARCH_TEMPLATE = [
  { layer: "Edge", desc: "Endpoints, IoT, vehicle compute, sensors, ruggedised edge AI" },
  { layer: "Network", desc: "Wi-Fi 6/6E, SD-WAN, Private 5G, ZTNA, spine-leaf, Juniper Mist" },
  { layer: "Compute", desc: "HPE ProLiant, Dell PowerEdge, H3C UniServer, Huawei TaiShan, NVIDIA HGX" },
  { layer: "Storage", desc: "Pure FlashArray/FlashBlade, Dell PowerStore, immutable backup" },
  { layer: "Cloud", desc: "Azure, HPE GreenLake, sovereign zones, FinOps governance" },
  { layer: "Security", desc: "Fortinet, Sophos, Palo Alto NGFW, Hikvision AI, 24/7 SOC" },
];

export const INDUSTRIES: Industry[] = [
  {
    slug: "public-sector",
    name: "Public Sector & Government",
    icon: "Building2",
    tagline: "Departmental data-centre modernisation, secure inter-agency networking, citizen digital services, POPIA-compliant data handling.",
    overview: "KABO delivers public sector infrastructure with departmental data-centre modernisation, secure inter-departmental networking, citizen-facing digital services and POPIA-compliant data handling — engineered for the procurement, governance and B-BBEE regimes of South African national, provincial and municipal government.",
    challenges: [
      "SITA-aligned procurement requires Level 1 B-BBEE suppliers with full documentation",
      "POPIA compliance requires sovereign data residency for citizen data",
      "Nationwide rollout demands consistent engineering across all nine provinces",
      "Audit-ready evidence must be available on demand for the AG and regulators",
    ],
    kaboApproach: [
      "SITA-aligned procurement with B-BBEE Level 1, 135% procurement recognition",
      "Sovereign cloud zones keeping citizen data on African soil",
      "Secure inter-agency fabric with zero-trust segmentation",
      "Audit-ready documentation mapped to POPIA and sector regulators",
    ],
    architecture: ARCH_TEMPLATE,
    deployment: [
      { scenario: "National Department", desc: "Data centre, sovereign cloud, nationwide SD-WAN, 24/7 SOC" },
      { scenario: "Provincial Office", desc: "SD-WAN, managed endpoints, contact centre, citizen service desk" },
      { scenario: "Citizen Service Centre", desc: "Endpoints, VDI, managed print, telehealth kiosks, contact centre" },
    ],
    relatedSolutions: ["compute", "cloud", "networking", "security", "digital-workplace"],
  },
  {
    slug: "financial-services",
    name: "Banking & Financial Services",
    icon: "Landmark",
    tagline: "Core-banking-adjacent compute, low-latency trading fabrics, PCI-DSS segmentation, immutable backup, 24/7 SOC.",
    overview: "KABO engineers financial services infrastructure with core-banking-adjacent compute, low-latency trading fabrics, PCI-DSS-aligned segmentation, immutable backup and 24/7 SOC monitoring — the regulated, audit-ready infrastructure that banks, insurers and fintechs need to operate without surprises.",
    challenges: [
      "Trading workloads demand sub-millisecond latency and deterministic performance",
      "Contact centre and payment path must be PCI-DSS compliant",
      "Ransomware threats target customer data and core banking systems",
      "SARB-aligned governance requires audit-ready evidence on demand",
    ],
    kaboApproach: [
      "All-flash NVMe storage (Pure FlashArray) with sub-millisecond latency",
      "PCI-DSS compliant segmentation across payment path and contact centre",
      "Immutable Veeam and Commvault repositories with cyber-resilience runbooks",
      "Sovereign cloud zones keeping customer data on African soil",
    ],
    architecture: ARCH_TEMPLATE,
    deployment: [
      { scenario: "Head Office", desc: "Trading floor, data centre, contact centre, 24/7 SOC" },
      { scenario: "Branch", desc: "SD-WAN, contact centre, managed endpoints, PCI-DSS payment path" },
      { scenario: "Cloud Burst", desc: "Azure for risk modelling, GreenLake for elastic compute" },
    ],
    relatedSolutions: ["compute", "data", "networking", "security", "continuity"],
  },
  {
    slug: "mining",
    name: "Mining & Minerals",
    icon: "Factory",
    tagline: "OT/IT convergence, ruggedised edge compute, private wireless mesh, pit-to-port telemetry.",
    overview: "KABO engineers mining infrastructure with OT/IT convergence for underground and open-cast operations — ruggedised edge compute, private LTE/Wi-Fi mesh for autonomous equipment, real-time surveillance and centralised production telemetry from pit to port.",
    challenges: [
      "Remote sites lack reliable grid power and on-site engineering staff",
      "Harsh environments demand ruggedised, high-ambient-rated hardware",
      "OT/IT convergence requires zero-trust segmentation without breaking production",
      "Pit-to-port telemetry needs real-time edge processing and central analytics",
    ],
    kaboApproach: [
      "Schneider-powered modular DC with N+1 power, cooling and solar PV",
      "Ruggedised edge compute for distributed inference at the face",
      "Private wireless mesh for autonomous equipment and IIoT telemetry",
      "Hikvision AI video for perimeter, safety and production monitoring",
    ],
    architecture: ARCH_TEMPLATE,
    deployment: [
      { scenario: "Mine Site", desc: "Modular DC, private wireless mesh, ruggedised edge, IIoT, ANPR" },
      { scenario: "Processing Plant", desc: "Edge compute, OT/IT convergence, central analytics" },
      { scenario: "Head Office", desc: "Central NOC, SOC, data centre, cloud integration" },
    ],
    relatedSolutions: ["iot-edge", "compute", "networking", "physical-security", "ai-infrastructure"],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Hospitals",
    icon: "HeartPulse",
    tagline: "Hospital data-centre modernisation, PACS imaging, secure clinical messaging, HIPAA-equivalent data protection, 24/7 operations.",
    overview: "KABO engineers healthcare infrastructure with hospital data-centre modernisation, PACS imaging infrastructure, secure clinical messaging, HIPAA-equivalent data protection and 24/7 operations for the systems clinicians depend on — engineered for life-safety availability.",
    challenges: [
      "Large PACS imaging datasets strain legacy storage and bandwidth",
      "Clinical workloads cannot tolerate downtime — availability is safety",
      "Patient data must remain POPIA-compliant and audit-ready",
      "Branch clinics need consistent connectivity and clinical system access",
    ],
    kaboApproach: [
      "All-flash NVMe storage (Pure FlashArray) tuned for PACS and HIS workloads",
      "N+1 power, cooling and network redundancy across the estate",
      "POPIA-aligned sovereign cloud zones for patient data residency",
      "SD-WAN branch connectivity with application-aware routing",
    ],
    architecture: ARCH_TEMPLATE,
    deployment: [
      { scenario: "Hospital Campus", desc: "Multi-building data centre, PACS, HIS, telehealth, 24/7 SOC" },
      { scenario: "Branch Clinic", desc: "SD-WAN, cloud VDI, managed print, telehealth kiosks" },
      { scenario: "Mobile Clinic", desc: "Connected vehicle, edge compute, offline sync" },
    ],
    relatedSolutions: ["data", "networking", "security", "digital-workplace", "cloud"],
  },
  {
    slug: "education",
    name: "Education & Higher Learning",
    icon: "GraduationCap",
    tagline: "Campus Wi-Fi 6/6E, learning-management infrastructure, VDI labs, secure student identity, cost-effective endpoint fleets.",
    overview: "KABO delivers campus-wide connectivity, learning-management system infrastructure, VDI for labs and libraries, secure student identity and cost-effective endpoint fleets — built for the budget cycle and the academic calendar of universities, colleges and schools.",
    challenges: [
      "High-density wireless for lecture halls, dorms and libraries",
      "VDI labs reduce endpoint refresh cost and centralise management",
      "E-learning platforms need reliable cloud and identity",
      "Student devices must be secured without compromising access",
    ],
    kaboApproach: [
      "Wi-Fi 6/6E high-density designs with Juniper Mist predictive heat-mapping",
      "VDI labs with GPU acceleration for design and engineering students",
      "Microsoft 365, Teams and Fabric for collaboration and analytics",
      "Zero-trust access with Microsoft Entra ID and Intune",
    ],
    architecture: ARCH_TEMPLATE,
    deployment: [
      { scenario: "Main Campus", desc: "Wi-Fi 6/6E, VDI labs, data centre, cloud integration, BI" },
      { scenario: "Satellite Campus", desc: "SD-WAN, cloud VDI, managed print" },
      { scenario: "Remote Learning", desc: "Microsoft 365, Teams, cloud VDI, analytics" },
    ],
    relatedSolutions: ["networking", "digital-workplace", "cloud", "analytics-bi", "security"],
  },
  {
    slug: "telecommunications",
    name: "Telecommunications & Carriers",
    icon: "Network",
    tagline: "Core and edge infrastructure for fixed and mobile operators — high-density compute, low-latency switching, OSS/BSS, NFV/SDN-ready fabrics.",
    overview: "KABO delivers core and edge infrastructure for fixed and mobile operators — high-density compute, low-latency switching, OSS/BSS platforms and NFV/SDN-ready fabrics that let carriers launch services faster without re-architecting the network.",
    challenges: [
      "High-density compute for core network functions and OSS/BSS",
      "Low-latency switching for subscriber and traffic growth",
      "NFV/SDN-ready fabric for service velocity without re-architecture",
      "Continuous availability — 99.999% is the baseline, not the target",
    ],
    kaboApproach: [
      "High-density compute platforms engineered for core network functions",
      "Juniper QFX spine-leaf fabrics with EVPN-VXLAN for scale",
      "NFV/SDN-ready fabrics with Juniper Apstra intent-based operations",
      "24/7 NOC and SOC with carrier-grade SLA reporting",
    ],
    architecture: ARCH_TEMPLATE,
    deployment: [
      { scenario: "Core DC", desc: "High-density compute, spine-leaf fabric, OSS/BSS, 24/7 NOC" },
      { scenario: "Edge POP", desc: "Edge compute, NFV, low-latency switching" },
      { scenario: "Operations Centre", desc: "NOC, SOC, capacity reporting, QBR" },
    ],
    relatedSolutions: ["compute", "networking", "data", "security", "iot-edge"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Industrial",
    icon: "Factory",
    tagline: "Smart-factory fabric, OT/IT convergence, MES/SCADA hosting, industrial IoT telemetry, AI vision QA and worker safety.",
    overview: "KABO engineers smart-factory infrastructure — OT/IT convergence, MES and SCADA hosting, industrial IoT telemetry, ruggedised edge compute and AI-powered vision for quality assurance and worker safety on the production line.",
    challenges: [
      "OT and IT networks must converge safely under zero-trust segmentation",
      "Quality control needs real-time AI inference at the production line",
      "Production lines cannot tolerate downtime — availability is revenue",
      "IIoT data volume strains legacy infrastructure and bandwidth",
    ],
    kaboApproach: [
      "Private 5G and Wi-Fi 6/6E for ultra-low latency IIoT across the plant",
      "Edge GPU servers for real-time quality control with Hikvision AI video",
      "OT/IT convergence with zero-trust segmentation and SOC monitoring",
      "Central NOC monitoring of production and IT telemetry in one plane",
    ],
    architecture: ARCH_TEMPLATE,
    deployment: [
      { scenario: "Smart Factory", desc: "Private 5G, edge AI, OT/IT convergence, central NOC" },
      { scenario: "Distribution Centre", desc: "Wi-Fi 6/6E, edge compute, IoT, analytics" },
      { scenario: "Head Office", desc: "Data centre, ERP, cloud integration, BI" },
    ],
    relatedSolutions: ["iot-edge", "compute", "networking", "physical-security", "ai-infrastructure"],
  },
  {
    slug: "retail",
    name: "Retail & Wholesale",
    icon: "Store",
    tagline: "Multi-site SD-WAN, POS resilience, centralised merchandising and BI, PCI-DSS payment path, AI video loss prevention.",
    overview: "KABO delivers multi-site retail infrastructure — in-store networking, POS resilience, centralised merchandising and BI platforms, secure payment-path segmentation and AI video for loss prevention across the store estate.",
    challenges: [
      "POS systems need reliable, secure connectivity across the store estate",
      "In-store Wi-Fi must support customers, staff and loss-prevention",
      "Loss prevention needs AI video analytics across the store",
      "Customer service needs omnichannel contact centre and BI",
    ],
    kaboApproach: [
      "SD-WAN with multi-operator POS connectivity and SLA reporting",
      "Wi-Fi 6/6E in-store wireless with customer portals and analytics",
      "Hikvision AI video for loss prevention, dwell and queue analytics",
      "ManageEngine contact centre with omnichannel routing and AI assistants",
    ],
    architecture: ARCH_TEMPLATE,
    deployment: [
      { scenario: "Flagship Store", desc: "SD-WAN, Wi-Fi 6/6E, CCTV analytics, edge compute, PCI-DSS" },
      { scenario: "Branch Store", desc: "SD-WAN, managed POS, cloud VDI" },
      { scenario: "E-commerce", desc: "Azure cloud, contact centre, analytics, BI" },
    ],
    relatedSolutions: ["networking", "digital-workplace", "security", "physical-security", "analytics-bi"],
  },
  {
    slug: "smart-infrastructure",
    name: "Smart Infrastructure",
    icon: "Building2",
    tagline: "Cities, utilities, transport and estates as observable systems — AI video, IoT, edge compute, analytics and 24/7 SOC.",
    overview: "KABO's smart-infrastructure practice carries the platforms that turn cities, utilities, transport networks and large estates into observable, optimised systems. We integrate surveillance, IoT, edge compute, networking and analytics — Hikvision AI video, Huawei IoT, Schneider power telemetry and Microsoft Azure cloud — into a single operations pane that gives operators situational awareness and decision-grade data.",
    challenges: [
      "Urban analytics strain legacy infrastructure and bandwidth",
      "City-wide CCTV needs AI video analytics with low false-alarm rates",
      "Smart lighting, metering and traffic need reliable connectivity",
      "Citizen services need omnichannel platforms and 24/7 operations",
    ],
    kaboApproach: [
      "Instrument: Cameras, sensors, meters, gateways at the edge — Hikvision, Huawei, Schneider",
      "Normalise: Telemetry aggregated, tagged and time-stamped into one stream",
      "Secure: Encrypted transport, zero-trust access, SOC monitoring",
      "Decide: Dashboards, alerts and automated response rules for operators",
    ],
    architecture: ARCH_TEMPLATE,
    deployment: [
      { scenario: "Municipality HQ", desc: "Data centre, central NOC, SOC, contact centre, BI" },
      { scenario: "District", desc: "Edge compute, CCTV analytics, smart lighting, IoT telemetry" },
      { scenario: "Citizen Service", desc: "Contact centre, kiosks, VDI, managed print" },
    ],
    relatedSolutions: ["physical-security", "iot-edge", "networking", "analytics-bi", "cloud"],
  },
];
