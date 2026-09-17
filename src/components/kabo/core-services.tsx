"use client";

import { motion } from "framer-motion";
import { Server, Building2, Monitor, Wifi, Truck, Landmark, ArrowRight, type LucideIcon } from "lucide-react";
import { usePage } from "./page-context";

interface ServiceDetail { title: string; description: string; icon: LucideIcon; bullets: string[]; }

const SERVICES: ServiceDetail[] = [
  { title: "IT Hardware Supply", description: "Authorised supply of servers, storage, networking, endpoints and accessories from leading OEMs, with full warranty management.", icon: Server, bullets: ["Authorised reseller for Dell, HPE, Lenovo, H3C, Huawei, Aruba, Hikvision, Canon and Microsoft", "Full warranty registration and lifecycle management", "Configuration-to-order on servers, storage and networking", "Pre-sales architecture validation before any order is placed"] },
  { title: "Solutions Procurement", description: "End-to-end procurement of integrated solutions against an RFP, with architecture, costing and supplier coordination by KABO.", icon: Building2, bullets: ["Single unified procurement partner across multiple OEMs", "Architecture-led BoM with component-level costing", "POPIA, B-BBEE and Treasury-compliant documentation pack", "Procurement tracking dashboard with milestone visibility"] },
  { title: "Software Licensing", description: "Licensing strategy, sourcing and renewal management across cloud, security and productivity platforms.", icon: Monitor, bullets: ["Microsoft, VMware, Nutanix, Veeam and Hikvision licensing expertise", "True-up and renewal management with calendar reminders", "License optimisation to remove unused entitlements", "Cloud consumption monitoring and right-sizing"] },
  { title: "National Distribution", description: "Distribution and stocking of components and consumables across all nine provinces, with forward logistics.", icon: Wifi, bullets: ["Regional stocking hubs for fast-moving SKUs", "Consignment stock for high-volume customers", "Forward logistics to site, branch and remote locations", "Stock visibility portal for procurement teams"] },
  { title: "Logistics & Customs", description: "Site survey, staging, configuration, last-mile delivery and on-site deployment with single-point accountability.", icon: Truck, bullets: ["SARS customs clearance and import documentation", "Staging and pre-configuration in KABO facilities", "Last-mile delivery and white-glove installation", "Commissioning, handover and as-built documentation"] },
  { title: "Asset Recovery", description: "Secure decommissioning, data sanitisation, buy-back and responsible recycling of retired ICT assets.", icon: Landmark, bullets: ["Certified data sanitisation to NIST 800-88 standards", "On-site decommissioning with chain-of-custody documentation", "Buy-back and trade-in valuation against current market", "Responsible e-waste recycling with certificates of destruction"] },
];

export function CoreServices() {
  const { navigate } = usePage();
  return (
    <section className="py-20 sm:py-28 bg-[#F5F9FC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Core Services</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">
            A unified contract across the <span className="intel-text-gradient">ICT lifecycle</span>.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
            From the first server to the last recycled asset, KABO owns the outcome. Each service below is delivered under a unified contract and a single escalation path.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }} className="group rounded-2xl border border-[#DCE6EF] bg-white p-6 sm:p-7 card-hover">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#001E3C] text-[#00C7FD] mb-5 group-hover:bg-gradient-to-br group-hover:from-[#0071C5] group-hover:to-[#00C7FD] group-hover:text-white transition-all duration-300">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-1">Service {String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-lg sm:text-xl font-bold text-[#001E3C] font-display mb-3 leading-tight">{service.title}</h3>
                <p className="text-sm text-[#5A6B7C] leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-1.5">
                  {service.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="text-xs text-[#003865] flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#00C7FD] mt-1.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <button onClick={() => navigate("services")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
            Explore All Services
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
