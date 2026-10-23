export const STUDIO_SLUGS = ["campus", "compute", "datacentre", "security", "widearea", "document", "resilience", "workplace"] as const;
export type StudioSlug = (typeof STUDIO_SLUGS)[number];
export type StudioHotspot = {
  number: string;
  name: string;
  kicker: string;
  x: number;
  y: number;
  description: string;
  equipment: string[];
  principle: string;
};
export type StudioScene = {
  slug: StudioSlug;
  title: string;
  editorial: string;
  subtitle: string;
  icon: string;
  image: string;
  fallback: string;
  hotspots: StudioHotspot[];
};
const hotspot = (number: string, name: string, kicker: string, x: number, y: number, description: string, equipment: string[], principle: string): StudioHotspot => ({ number, name, kicker, x, y, description, equipment, principle });

export const STUDIO_SCENES: StudioScene[] = [
  {
    slug: "campus", title: "Connected Campus", editorial: "One intelligent\ncampus. Every\nsystem connected.", subtitle: "Explore the invisible infrastructure connecting people, places and services.", icon: "network", image: "/images/studio/campus.webp", fallback: "/images/sol_campus.jpg",
    hotspots: [
      hotspot("01", "Wireless & access", "ENTERPRISE CONNECTIVITY", 31, 49, "Site-surveyed Wi-Fi coverage and secure wired access bring users and devices online throughout buildings and shared outdoor areas. Network identity, roaming and capacity are designed around actual usage.", ["Wi-Fi 6/6E/7 access points", "PoE access switches", "Wireless controllers / cloud management", "Network authentication services"], "Model density, radio interference, PoE power and physical cabling before selecting hardware."),
      hotspot("02", "Resilient campus core", "DATA AND SERVICE HEART", 57, 34, "A fault-tolerant switching and routing backbone aggregates distribution networks, hosts critical network services and connects the campus to data centres and external services.", ["High-capacity core switches", "Optical modules and fibre links", "Redundant uplinks and routing", "Network visibility platforms"], "Specify bandwidth, convergence and failover based on measured traffic and availability targets."),
      hotspot("03", "Branch & cloud fabric", "CONNECTED BEYOND THE SITE", 72, 60, "Encrypted, policy-controlled links integrate regional offices, cloud platforms and specialist service providers without surrendering control of campus segmentation.", ["SD-WAN appliances", "Carrier routers and optical handoffs", "Secure firewalls", "LTE/5G connectivity for backup"], "Evaluate primary and secondary carrier paths, latency and failover under real application load."),
      hotspot("04", "Integrated security", "SAFE BY DESIGN", 19, 70, "IP video, monitored entrances, security operations and identity-based network controls can share a resilient IP foundation while remaining logically isolated from business traffic.", ["IP CCTV cameras", "Access-control readers", "Recording and monitoring servers", "PoE security-network switches"], "Validate field of view, retention, access authorisation and privacy requirements for the site."),
      hotspot("05", "Smart edge & landscape", "OPERATIONS EVERYWHERE", 80, 28, "External fibre runs, distributed sensors, environmental telemetry and building systems extend operational visibility into walkways, parking zones and remote facilities.", ["Industrial and outdoor switches", "Fibre termination and enclosures", "Environmental / IoT sensors", "Outdoor wireless bridges"], "Protect outdoor equipment against weather, surge, physical tampering and connectivity loss."),
    ],
  },
  {
    slug: "compute", title: "Intelligent Compute", editorial: "An infrastructure\nready for the\nnext intelligence.", subtitle: "Trace the journey from governed data to accelerated workloads.", icon: "cpu", image: "/images/studio/compute.webp", fallback: "/images/sol_ai_gpu.svg",
    hotspots: [
      hotspot("01", "Governed data platforms", "DATA FOUNDATION", 19, 57, "Reliable datasets and protected storage are the foundation of analytics and AI. Ingestion, access policies and retention are tailored to the workload and organisational requirements.", ["Scale-out file and object storage", "High-throughput NVMe storage", "Backup repositories", "Data-access governance tooling"], "Capacity, source quality and data sovereignty come before choosing an accelerator."),
      hotspot("02", "High-speed fabric", "DATA IN MOTION", 42, 39, "East-west communication connects compute nodes, storage and training infrastructure. The network design responds to actual bandwidth, latency and congestion requirements.", ["High-speed Ethernet switches", "Optical and DAC connectivity", "Low-latency NICs", "Separate management fabric"], "Use throughput testing and workload characteristics to determine port speed and topology."),
      hotspot("03", "AI-ready compute", "PROCESSING ENGINE", 62, 49, "Purpose-sized CPU and GPU servers deliver inference, model development, analytics and traditional workloads. Compute choices follow model size, power budget and utilisation.", ["Rack servers and GPU platforms", "CPU and memory configurations", "Accelerator interconnects", "Virtualisation and orchestration"], "Validate software compatibility, memory capacity, rack density and lifecycle support."),
      hotspot("04", "Continuity & recovery", "PROTECTED INTELLIGENCE", 82, 66, "Availability zones, protected datasets and rehearsed recovery procedures keep critical services recoverable after an infrastructure or application event.", ["Protected backup infrastructure", "Immutable or isolated copies", "Replication links", "Observability platforms"], "Document RTO and RPO with stakeholders; periodically test full restoration."),
    ],
  },
  {
    slug: "datacentre", title: "Data Centre", editorial: "The engineered\nheart of digital\ninfrastructure.", subtitle: "Inspect the system behind performance, density, power and continuity.", icon: "server", image: "/images/studio/datacentre.webp", fallback: "/images/sol_datacenter.jpg",
    hotspots: [
      hotspot("01", "Compute racks", "PROCESSING & VIRTUALISATION", 21, 47, "Rack servers and virtualisation hosts deliver structured compute capacity. Design includes serviceability, redundancy, power draw and cable management.", ["Rack servers", "Enterprise racks and rails", "Management interfaces", "Virtualisation hosts"], "Model installed load, rack units, thermal output and component supportability."),
      hotspot("02", "Enterprise storage", "PROTECTED DATA PLATFORMS", 38, 63, "Storage arrays and software-defined services are sized for workload latency, sustained throughput, growth and data-protection requirements.", ["Block/file/object storage", "NVMe and capacity media", "Storage networking", "Replication/backup targets"], "Plan for usable capacity, rebuild time and recovery—not just raw disk totals."),
      hotspot("03", "Network fabric", "HIGH-SPEED INTERCONNECT", 57, 34, "Purpose-built leaf/spine or core fabrics join compute, storage and application domains with documented traffic segmentation and management access.", ["Data-centre switches", "Fibre optic modules", "Network interface cards", "Out-of-band management"], "Test east-west flow, uplink oversubscription and resilience against projected demand."),
      hotspot("04", "Resilient power", "DISTRIBUTION & CONTINUITY", 75, 57, "Power distribution, UPS coverage and coordinated recovery protect sensitive workloads from supply irregularities and planned maintenance.", ["UPS infrastructure", "Rack PDUs", "Power monitoring", "Power protection and distribution"], "An electrical engineer should verify topology, capacity and site-specific compliance."),
      hotspot("05", "Precision cooling", "THERMAL OPERATIONS", 86, 31, "Cooling architecture, airflow containment and sensors preserve safe operating conditions within densely populated equipment rows.", ["Computer-room cooling", "Environmental sensors", "Airflow containment", "Alerting and DCIM tooling"], "Select airflow and heat rejection with a measured thermal design—not nominal rack count."),
    ],
  },
  {
    slug: "security", title: "Electronic Security", editorial: "Every entrance.\nEvery signal.\nOne clear view.", subtitle: "Converged physical security with a reliable, auditable digital foundation.", icon: "shield", image: "/images/studio/security.webp", fallback: "/images/sol_government.jpg",
    hotspots: [
      hotspot("01", "Video surveillance", "SITUATIONAL AWARENESS", 19, 38, "Site-specific camera placement enables useful coverage of approaches, corridors and assets. Image resolution, lighting and storage are designed together.", ["IP fixed and PTZ cameras", "Video management systems", "Recording servers", "PoE switches"], "Validate fields of view, low-light performance, retention and lawful access."),
      hotspot("02", "Electronic access", "IDENTITY & ENTRY", 39, 60, "Readers, controllers and approved credentials restrict sensitive zones while preserving safe, manageable building entry and exit.", ["Access readers", "Door controllers", "Electronic locks", "Event and identity software"], "Plan door-by-door with life-safety and accessibility requirements."),
      hotspot("03", "Secure network transport", "SEGMENTED SECURITY TRAFFIC", 64, 42, "Network separation and monitored switching carry camera, alarm and controller traffic without exposing business systems or disrupting operations.", ["Managed security switches", "Secure gateways", "Fibre distribution", "Network monitoring"], "Separate privileges and traffic; avoid a single failure domain."),
      hotspot("04", "Control-room operations", "MONITOR & RESPOND", 81, 65, "Operational consoles bring live video, incident evidence and alarm context together so personnel can respond consistently.", ["Operator workstations", "Video walls and displays", "Incident-management software", "Secure evidence storage"], "Control access to footage and preserve a documented incident trail."),
    ],
  },
  {
    slug: "widearea", title: "WAN / SD-WAN", editorial: "One business.\nMany locations.\nSeamless service.", subtitle: "Branches, carriers and cloud brought together through secure connectivity.", icon: "waypoints", image: "/images/studio/widearea.webp", fallback: "/images/sol_smartcity.jpg",
    hotspots: [
      hotspot("01", "Connected branches", "LOCAL OPERATION", 20, 61, "Each facility has a consistent edge network that supports local users, safe segmentation and resilient connectivity to shared business services.", ["Branch routers", "Business Wi-Fi access points", "PoE switches", "Local firewall gateways"], "Document the facilities, service dependencies and minimum offline operation."),
      hotspot("02", "SD-WAN intelligence", "POLICY-BASED EDGE", 43, 35, "Encrypted overlays and application-aware routing steer traffic across internet, fibre and wireless access links according to quality and policy.", ["SD-WAN edge appliances", "Security subscriptions", "Dual-link interfaces", "Central orchestration"], "Test packet loss, jitter, path failover and encryption overhead."),
      hotspot("03", "Hybrid cloud path", "APPLICATION REACH", 65, 53, "Safe cloud egress and suitable interconnects link distributed sites with hosted infrastructure and software services.", ["Carrier and cloud handoffs", "Firewalls and VPN", "DNS and secure access services", "Monitoring agents"], "Design the route based on data classification and user-experience requirements."),
      hotspot("04", "Network assurance", "VISIBILITY ACROSS SITES", 82, 31, "Central telemetry helps teams see circuit health, capacity constraints and application performance before users report an outage.", ["Network monitoring platforms", "Flow/telemetry collection", "Configuration management", "Alerting and reports"], "Agree measurable availability and performance indicators for each location."),
    ],
  },
  {
    slug: "document", title: "Document & Print", editorial: "Information moves.\nWork continues.\nControl remains.", subtitle: "Follow a secure document from capture to workflow, archive and output.", icon: "files", image: "/images/studio/document.webp", fallback: "/images/sol_callcenter.jpg",
    hotspots: [
      hotspot("01", "Capture & digitise", "PAPER TO INFORMATION", 21, 51, "Scanning, OCR and consistent metadata transform physical records into searchable business inputs while retaining relevant source evidence.", ["Document scanners", "Business multifunction printers", "OCR/capture applications", "Scan-profile configuration"], "Apply quality checks, file format standards and controlled intake."),
      hotspot("02", "Workflow automation", "DOCUMENTS IN MOTION", 41, 32, "Routing and approval rules help teams review, validate and act on records without losing accountability or document ownership.", ["Document workflow applications", "Approvals and access controls", "Integration connectors", "Event and exception logs"], "Define responsible roles and failure handling before automating."),
      hotspot("03", "Records governance", "PROTECTED INFORMATION", 64, 56, "Searchable storage, permissions and retention controls protect confidential records and support traceable review and retrieval.", ["Document-management software", "Protected storage", "Backup infrastructure", "Indexing and access tools"], "Align retention and permissions to contractual and legal obligations."),
      hotspot("04", "Managed output", "SECURE DELIVERY", 83, 33, "Business printers and multifunction devices enable release-on-authentication, central policy and predictable support for office document operations.", ["MFP and laser devices", "Print-management platforms", "Consumables and supplies", "Service and maintenance"], "Measure actual page volumes, duty cycles and consumable costs."),
    ],
  },
  {
    slug: "resilience", title: "Cyber Resilience", editorial: "Protected today.\nPrepared for\nwhat comes next.", subtitle: "An architectural view of prevention, detection and proven recovery.", icon: "shield-check", image: "/images/studio/resilience.webp", fallback: "/images/sol_banking.jpg",
    hotspots: [
      hotspot("01", "Identity & endpoints", "SECURE EVERY ENTRY", 17, 57, "Access policy, authentication and managed endpoints reduce the chance that a compromised device or credential can spread across essential services.", ["Endpoint protection", "Identity and MFA platforms", "Device management", "Security-awareness controls"], "Apply least privilege, effective patching and role-based access."),
      hotspot("02", "Security boundary", "CONTROLLED TRAFFIC", 36, 38, "Firewalls and segmentation divide sensitive workloads and user networks, with remote access assessed against trust and device posture.", ["Next-generation firewalls", "Segmentation switches", "VPN/zero-trust access", "Security policy management"], "Review rule sets and verify allowed traffic instead of depending on default configurations."),
      hotspot("03", "Protected services", "WORKLOAD DEFENCE", 56, 54, "Application and server configuration, audit trails, vulnerability management and monitoring reduce the attack surface of business systems.", ["Server protection", "Log collection and SIEM", "Vulnerability scanning", "Application controls"], "Prioritise critical services using a maintained asset inventory."),
      hotspot("04", "Independent backup", "RESILIENT DATA", 74, 37, "Versioned, isolated or immutable copies preserve recovery options when primary systems suffer deletion, ransomware or hardware failure.", ["Backup software", "Protected storage", "Offsite or cloud replication", "Immutable repositories"], "Test recoverability regularly against approved RPO and RTO."),
      hotspot("05", "Recoverable operations", "BUSINESS CONTINUITY", 86, 64, "A documented restoration environment and rehearsed response plan turn abstract resilience into measured service continuity.", ["Recovery compute", "Replication infrastructure", "Incident-response tooling", "Continuity runbooks"], "Prove a complete restore and communicate realistic service recovery times."),
    ],
  },
  {
    slug: "workplace", title: "Connected Workplace", editorial: "Technology made\nfor people at\ntheir best.", subtitle: "Explore a workplace designed for productive, safe and connected teams.", icon: "monitor", image: "/images/studio/workplace.webp", fallback: "/images/sol_callcenter.jpg",
    hotspots: [
      hotspot("01", "Business notebooks", "MOBILITY & PRODUCTIVITY", 18, 62, "Portable business endpoints align processing, battery life, security and support with the daily demands of each professional role.", ["Business notebooks and docks", "Displays and accessories", "Endpoint security", "Device lifecycle services"], "Specify against user profiles, ergonomics and business application needs."),
      hotspot("02", "Professional workstations", "SPECIALIST PERFORMANCE", 39, 37, "Fixed workstations serve technical, analytical and creative tasks that need sustained CPU, memory or graphics capability.", ["Desktop and tower workstations", "Professional displays", "Graphics accelerators", "Backup power"], "Validate the actual applications and any certified hardware requirements."),
      hotspot("03", "Reliable workplace Wi-Fi", "EVERY DEVICE CONNECTED", 58, 57, "Identity-aware wired and wireless networks keep users and shared workplace services connected without exposing sensitive traffic unnecessarily.", ["Access points", "Managed switching", "PoE and structured cabling", "Network management"], "Survey coverage and device density, including meeting-room peaks."),
      hotspot("04", "Meeting & collaboration", "BETTER TOGETHER", 77, 37, "High-quality audio, video and screen-sharing support efficient collaboration across shared workspaces and remote teams.", ["Video conferencing systems", "Room displays", "Cameras and headsets", "Unified communications"], "Check platform interoperability and the acoustic characteristics of each room."),
      hotspot("05", "Document & supplies", "EVERYDAY READINESS", 88, 63, "The modern office still relies on dependable document output, licensed software, consumables and everyday business essentials.", ["Multifunction printers", "Managed consumables", "Licensed applications", "Stationery and paper"], "Manage supply lifecycle using measured consumption and service coverage."),
    ],
  },
];

export function findStudioScene(slug: string): StudioScene | undefined {
  return STUDIO_SCENES.find((scene) => scene.slug === slug);
}
