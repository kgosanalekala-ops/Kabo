"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VideoHero } from "../video-hero";
import { INDUSTRIES } from "../industries-data";
import { ICON_MAP } from "../icon-map";
import { usePage } from "../page-context";

export function IndustriesPage() {
  const { navigate } = usePage();
  return (
    <>
      <VideoHero variant="smartcity" tag="Industries" title={<>{<>Industry-vertical expertise,</>}<br /><span className="intel-text-gradient">engineered in</span>.</>} subtitle="Nine verticals across public and private enterprise. Each with its own regulatory regime, its own availability posture and its own definition of mission-critical. One partner that speaks your vertical.">
        <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl hover:scale-[1.03] transition-all">
          Engage KABO
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </VideoHero>
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">9 Industry Verticals</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">Reference architectures for every vertical we serve</h2>
            <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">KABO engineers infrastructure that fits the regulatory, operational and environmental reality of each vertical we serve. Click an industry to see the architecture, deployment scenarios and KABO approach.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {INDUSTRIES.map((ind, i) => {
              const Icon = ICON_MAP[ind.icon] ?? ICON_MAP.Server;
              return (
                <motion.button key={ind.slug} onClick={() => navigate("industry-detail", ind.slug)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: (i % 3) * 0.08 }} className="group relative rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-6 sm:p-7 text-left card-hover overflow-hidden">
                  <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tl from-[#0071C5]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#001E3C] text-[#00C7FD] mb-5 group-hover:bg-gradient-to-br group-hover:from-[#0071C5] group-hover:to-[#00C7FD] group-hover:text-white transition-all duration-300">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#001E3C] font-display mb-2 leading-tight">{ind.name}</h3>
                    <p className="text-sm text-[#5A6B7C] leading-relaxed line-clamp-3">{ind.tagline}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071C5] opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore industry
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
