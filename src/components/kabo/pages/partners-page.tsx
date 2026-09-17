"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VideoHero } from "../video-hero";
import { PARTNERS } from "../data";
import { usePage } from "../page-context";

export function PartnersPage() {
  const { navigate } = usePage();
  return (
    <>
      <VideoHero variant="abstract" tag="Partner Ecosystem" title={<>{<>Fifteen strategic alliances,</>}<br /><span className="intel-text-gradient">one architecture</span>.</>} subtitle="HPE, Dell, Microsoft, Veeam, Fortinet, Sophos, Palo Alto, Pure Storage, Commvault, Juniper, Schneider, Huawei, ManageEngine, H3C and Hikvision — engineered into one architecture under one contract. No vendor sprawl, no orphan SKUs.">
        <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl hover:scale-[1.03] transition-all">
          Engage KABO
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </VideoHero>
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Leading OEM Partners</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">A curated ecosystem, a single accountable owner</h2>
            <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">Each partner below is integrated into KABO solutions under a unified contract. Click a partner to see their portfolio, relationship and integration points.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {PARTNERS.map((partner, i) => (
              <motion.button key={partner.slug} onClick={() => navigate("partner-detail", partner.slug)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} className="group relative rounded-2xl border border-[#DCE6EF] bg-white p-6 sm:p-7 text-left card-hover overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: partner.colour }} />
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold font-display mb-1" style={{ color: partner.colour }}>{partner.name}</h3>
                    <div className="text-xs text-[#5A6B7C] uppercase tracking-wider">{partner.category}</div>
                  </div>
                  <div className="text-3xl font-bold text-[#DCE6EF] font-display">{String(i + 1).padStart(2, "0")}</div>
                </div>
                <p className="text-sm text-[#5A6B7C] leading-relaxed mb-5">{partner.tagline}</p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071C5] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore partner
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
