"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Server, Building2, Monitor, Wifi, Truck, Landmark, CheckCircle2, Cloud, Cpu, Brain, Network, type LucideIcon } from "lucide-react";
import { VideoHero } from "../video-hero";
import { usePage } from "../page-context";
import { PartnerStrip } from "../partner-strip";
import { AIInfrastructure } from "../ai-infrastructure";

interface ServiceDetail { title: string; description: string; icon: LucideIcon; bullets: string[]; }

const PROVINCES = ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"];

const SERVICE_DETAILS: ServiceDetail[] = [
  { title: "IT Hardware Supply", description: "Authorised supply of servers, storage, networking, endpoints and accessories from leading OEMs, with full warranty management.", icon: Server, bullets: ["Authorised reseller for Dell, HPE, Lenovo, H3C, Huawei, Aruba, Hikvision, Canon and Microsoft", "Full warranty registration and lifecycle management", "Volume pricing through aggregated partner relationships", "Configuration-to-order on servers, storage and networking", "Pre-sales architecture validation before any order is placed"] },
  { title: "Solutions Procurement", description: "End-to-end procurement of integrated solutions against an RFP, with architecture, costing and supplier coordination by KABO.", icon: Building2, bullets: ["Single unified procurement partner across multiple OEMs", "Architecture-led BoM with component-level costing", "Supplier coordination and lead-time management", "POPIA, B-BBEE and Treasury-compliant documentation pack", "Procurement tracking dashboard with milestone visibility"] },
  { title: "Software Licensing", description: "Licensing strategy, sourcing and renewal management across cloud, security and productivity platforms.", icon: Monitor, bullets: ["Microsoft, VMware, Nutanix, Veeam and Hikvision licensing expertise", "True-up and renewal management with calendar reminders", "License optimisation to remove unused entitlements", "Cloud consumption monitoring and right-sizing", "Compliance audit support and remediation"] },
  { title: "National Distribution", description: "Distribution and stocking of components and consumables across all nine provinces, with forward logistics.", icon: Wifi, bullets: ["Regional stocking hubs for fast-moving SKUs", "Consignment stock for high-volume customers", "Forward logistics to site, branch and remote locations", "Multi-province delivery with single-point accountability", "Stock visibility portal for procurement teams"] },
  { title: "Logistics & Customs", description: "Site survey, staging, configuration, last-mile delivery and on-site deployment with single-point accountability.", icon: Truck, bullets: ["SARS customs clearance and import documentation", "Staging and pre-configuration in KABO facilities", "Last-mile delivery and white-glove installation", "Site survey, rack-and-stack and cable management", "Commissioning, handover and as-built documentation"] },
  { title: "Asset Recovery", description: "Secure decommissioning, data sanitisation, buy-back and responsible recycling of retired ICT assets.", icon: Landmark, bullets: ["Certified data sanitisation to NIST 800-88 standards", "On-site decommissioning with chain-of-custody documentation", "Buy-back and trade-in valuation against current market", "Responsible e-waste recycling with certificates of destruction", "Asset register reconciliation and disposal reporting"] },
];

const ENGINEERING_SERVICES: ServiceDetail[] = [
  { title: "AI Infrastructure Engineering", description: "End-to-end design, deployment and operation of GPU-accelerated AI platforms — from single-node inference appliances to liquid-cooled HGX clusters with InfiniBand fabrics.", icon: Cpu, bullets: ["GPU cluster sizing, architecture and TCO modelling against your workload", "NVIDIA H100/H200, HPE Apollo, Dell PowerEdge XE9680 and H3C GPU platforms", "InfiniBand 400G fabric design, commissioning and performance tuning", "ML/Ops platform deployment — training, serving, experiment tracking", "Edge AI inference platforms for remote sites, mines and plants", "AI workload migration, model governance and sovereign hosting"] },
  { title: "Cloud & Hybrid Integration", description: "Architecture, migration and operation of hybrid cloud platforms spanning on-premises, HPE GreenLake, Microsoft Azure and sovereign African cloud zones.", icon: Cloud, bullets: ["Hybrid cloud architecture spanning on-prem, GreenLake and Azure", "Workload assessment, migration sequencing and landing-zone design", "Cloud consumption governance, FinOps and right-sizing", "Sovereign cloud zones keeping POPIA-regulated data on African soil", "Cloud-native modernisation — containers, microservices, serverless", "Disaster recovery and cross-cloud failover orchestration"] },
  { title: "Solution Architecture & Design", description: "Vendor-agnostic architecture, reference design and validation across compute, storage, network, security and AI stacks — a single blueprint, a single accountable owner.", icon: Network, bullets: ["Reference architecture across all ten KABO solution domains", "Capacity planning, performance modelling and TCO comparison", "Vendor-agnostic stack selection against workload, not SKU", "BOM validation, build sheets and as-built documentation", "Architecture review board for in-flight customer projects", "POPIA, PCI-DSS and sector-regulator compliance mapping"] },
  { title: "Managed AI Operations", description: "24/7 operations, monitoring and optimisation of AI platforms — from GPU utilisation to model drift, capacity and governance — delivered from the KABO Gauteng SOC.", icon: Brain, bullets: ["GPU utilisation, throughput and queue-depth monitoring with capacity forecasting", "Model drift detection, retraining triggers and reproducible version governance", "AI workload governance — data lineage, model provenance and POPIA-aligned residency", "Prompt safety controls, output filtering and policy enforcement for generative AI", "Elastic burst to HPE GreenLake or Microsoft Azure when on-prem capacity is exhausted", "MLOps pipeline automation with CI/CD for model releases and rollback", "SLA-backed inference availability with sub-second latency targets"] },
];

export function ServicesPage() {
  const { navigate } = usePage();
  return (
    <>
      <VideoHero variant="network" tag="Core Services" title={<>{<>Core Services</>}<br /><span className="intel-text-gradient">IT hardware supply</span> and solutions procurement.</>} subtitle="IT hardware supply and solutions procurement is our core service. Beyond solutions, KABO operates the supply chain that puts enterprise ICT on the ground across South Africa.">
        <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl hover:scale-[1.03] transition-all">
          Talk to our services team
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </VideoHero>
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Six core services</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">A unified contract across the ICT lifecycle</h2>
            <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">From the first server to the last recycled asset, KABO owns the outcome. Each service below is delivered under one contract and one escalation path.</p>
          </div>
          <div className="space-y-6 sm:space-y-8">
            {SERVICE_DETAILS.map((service, i) => {
              const Icon = service.icon;
              const isDark = i % 2 === 1;
              return (
                <motion.div key={service.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.55, delay: 0.05 }} className={isDark ? "relative rounded-3xl bg-[#001E3C] overflow-hidden" : "relative rounded-3xl border border-[#DCE6EF] bg-[#F5F9FC] overflow-hidden"}>
                  {isDark && (
                    <>
                      <div className="absolute inset-0 grid-pattern-dark opacity-30" />
                      <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#00C7FD]/15 blur-3xl" />
                      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-[#0071C5]/15 blur-3xl" />
                    </>
                  )}
                  <div className="relative grid lg:grid-cols-12 gap-6 lg:gap-10 p-6 sm:p-8 lg:p-10">
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-4">
                        <div className={isDark ? "inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-[#00C7FD] shrink-0" : "inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white shrink-0"}>
                          <Icon className="h-7 w-7" strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className={isDark ? "text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mb-1.5" : "text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-1.5"}>Service {String(i + 1).padStart(2, "0")}</div>
                          <h3 className={isDark ? "text-xl sm:text-2xl font-bold text-white font-display leading-tight" : "text-xl sm:text-2xl font-bold text-[#001E3C] font-display leading-tight"}>{service.title}</h3>
                        </div>
                      </div>
                      <p className={isDark ? "mt-5 text-base text-white/75 leading-relaxed" : "mt-5 text-base text-[#5A6B7C] leading-relaxed"}>{service.description}</p>
                    </div>
                    <div className="lg:col-span-8">
                      <div className={isDark ? "text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mb-4" : "text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-4"}>What this service covers</div>
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                        {service.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-[#00C7FD] shrink-0 mt-0.5" strokeWidth={1.5} />
                            <span className={isDark ? "text-sm sm:text-base text-white/85 leading-relaxed" : "text-sm sm:text-base text-[#003865] leading-relaxed"}>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-[#001E3C] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#00C7FD]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#0071C5]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1 mb-4">
              <Cpu className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
              <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display">Engineering &amp; Integration Services</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight">AI &amp; Cloud infrastructure,<br className="hidden sm:block" /><span className="intel-text-gradient">engineered end-to-end</span>.</h2>
            <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed">Beyond procurement and logistics, KABO engineers the AI and cloud platforms that define the next decade of African enterprise compute. Four specialised services delivered by certified architects and operated from our Gauteng SOC.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {ENGINEERING_SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.55, delay: (i % 2) * 0.1 }} className="group relative rounded-2xl intel-glass p-6 sm:p-8 hover:border-[#00C7FD]/40 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mb-1">Service {String(i + 1).padStart(2, "0")}</div>
                      <h3 className="text-xl font-bold text-white font-display leading-tight">{service.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-5">{service.description}</p>
                  <ul className="space-y-2">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#00C7FD] shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-xs sm:text-sm text-white/80 leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
              Engage our AI &amp; Cloud engineers
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-[#F5F9FC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
            <div className="relative rounded-3xl bg-gradient-to-br from-[#001E3C] via-[#003865] to-[#001E3C] p-6 sm:p-10 lg:p-12 overflow-hidden">
              <div className="absolute inset-0 grid-pattern-dark opacity-40" />
              <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[#00C7FD]/15 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#0071C5]/15 blur-3xl" />
              <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1 mb-4">
                    <MapPin className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
                    <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display">Nationwide Footprint</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display leading-tight">Distribution, logistics and engineering across all nine provinces</h3>
                  <p className="mt-4 text-base text-white/75 leading-relaxed">From Cape Town to Musina, KABO delivers, stages, configures and supports. A unified contract, a single standard, every province.</p>
                  <button onClick={() => navigate("contact")} className="mt-6 group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#001E3C] hover:bg-[#00C7FD] hover:text-white transition-colors">
                    Talk to our logistics team
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PROVINCES.map((province, i) => (
                    <motion.div key={province} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur px-3 py-3 text-center">
                      <span className="text-xs sm:text-sm font-medium text-white/90">{province}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001E3C] font-display leading-tight">Ready to consolidate your ICT supply chain?</h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6B7C] max-w-2xl mx-auto">A single contract, a single escalation path, and the same engineering team across hardware, software, logistics and asset recovery.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
              Engage KABO
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>
      <AIInfrastructure />
      <PartnerStrip context="these services" />
    </>
  );
}
