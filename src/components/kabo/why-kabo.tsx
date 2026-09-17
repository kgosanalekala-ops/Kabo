"use client";

import { motion } from "framer-motion";
import { Target, Users, Cpu, Shield, Award, Zap, type LucideIcon } from "lucide-react";

interface WhyItem { icon: LucideIcon; num: string; title: string; desc: string; }

const ITEMS: WhyItem[] = [
  { icon: Target, num: "01", title: "Outcome-Led", desc: "Architecture starts at the business outcome and ends at the SLA — not at the SKU. Every engagement begins with the workload, the SLA and the commercial outcome the client is buying." },
  { icon: Users, num: "02", title: "Same Team End-to-End", desc: "The same engineers who integrate carry the operational accountability post go-live. No hand-off. No diffusion of accountability. The team owns the outcome from workshop to QBR." },
  { icon: Cpu, num: "03", title: "15 Strategic Partners", desc: "Vendor-neutral selection across fifteen strategic alliances — HPE, Dell, Microsoft, Veeam, Fortinet, Sophos, Palo Alto, Pure, Commvault, Juniper, Schneider, Huawei, ManageEngine, H3C and Hikvision." },
  { icon: Shield, num: "04", title: "24/7 SOC + NOC", desc: "Continuous monitoring, response and reporting against contractual SLAs. Every workload we manage runs under a single operational model — unified runbooks, unified accountability, unified escalation." },
  { icon: Award, num: "05", title: "Level 1 · 135%", desc: "Maximum B-BBEE procurement recognition — and Gauteng-established. Every engagement contributes directly to your supplier development scorecard." },
  { icon: Zap, num: "06", title: "AI-Ready", desc: "GPU compute, low-latency fabric and high-throughput storage — engineered for the AI era. From single-node inference appliances to liquid-cooled HGX clusters with InfiniBand fabrics." },
];

export function WhyKABO() {
  return (
    <section className="py-20 sm:py-28 bg-[#F5F9FC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Why KABO</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">
            A single accountable partner,<br className="hidden sm:block" />
            <span className="intel-text-gradient">everywhere it matters</span>.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ITEMS.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} className="group rounded-2xl border border-[#DCE6EF] bg-white p-6 sm:p-7 card-hover">
              <div className="flex items-start justify-between mb-5">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="text-3xl font-bold text-[#DCE6EF] font-display">{item.num}</div>
              </div>
              <h3 className="text-lg font-bold text-[#001E3C] font-display mb-2 leading-tight">{item.title}</h3>
              <p className="text-sm text-[#5A6B7C] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
