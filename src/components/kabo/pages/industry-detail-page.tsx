"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, AlertTriangle, Layers, Server } from "lucide-react";
import { VideoHero, type HeroVariant } from "../video-hero";
import { INDUSTRIES } from "../industries-data";
import { ICON_MAP } from "../icon-map";
import { SOLUTIONS } from "../data";
import { usePage } from "../page-context";

interface IndustryDetailPageProps { slug: string; }

const VARIANT_BY_SLUG: Record<string, HeroVariant> = {
  healthcare: "abstract", education: "abstract", "financial-services": "abstract", "public-sector": "abstract",
  mining: "datacenter", "oil-gas": "datacenter", manufacturing: "datacenter", logistics: "network",
  retail: "network", hospitality: "abstract", transportation: "network", "energy-utilities": "datacenter",
  "defense-security": "security", "smart-city": "smartcity", agriculture: "abstract",
};

export function IndustryDetailPage({ slug }: IndustryDetailPageProps) {
  const { navigate } = usePage();
  const industry = INDUSTRIES.find((i) => i.slug === slug) ?? INDUSTRIES[0];
  const Icon = ICON_MAP[industry.icon] ?? ICON_MAP.Server;
  const variant = VARIANT_BY_SLUG[industry.slug] ?? "abstract";
  const relatedSolutions = SOLUTIONS.filter((s) => industry.relatedSolutions.includes(s.slug));

  return (
    <>
      <VideoHero variant={variant} tag={industry.name} title={<>{industry.name}<br /><span className="intel-text-gradient">engineered in</span>.</>} subtitle={industry.tagline}>
        <button onClick={() => navigate("industries")} className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 hover:border-[#00C7FD]/50 transition-all">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
          Back to Industries
        </button>
      </VideoHero>
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#001E3C] text-[#00C7FD] mb-6">
                <Icon className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Industry Overview</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#001E3C] font-display leading-tight">{industry.name} infrastructure, end to end</h2>
              <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">{industry.overview}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D32F2F]/20 bg-[#D32F2F]/5 px-3 py-1 mb-4">
                  <AlertTriangle className="h-3.5 w-3.5 text-[#D32F2F]" strokeWidth={1.5} />
                  <span className="text-xs tracking-[0.18em] uppercase text-[#D32F2F] font-display">Industry Challenges</span>
                </div>
                <ul className="space-y-2">
                  {industry.challenges.map((c) => (
                    <li key={c} className="text-sm text-[#003865] flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#D32F2F] mt-1.5 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-24 bg-[#F5F9FC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">The KABO Approach</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">How we engineer for {industry.name.toLowerCase()}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {industry.kaboApproach.map((approach, i) => (
              <motion.div key={approach} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl border border-[#DCE6EF] bg-white p-6 card-hover">
                <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2">Approach {String(i + 1).padStart(2, "0")}</div>
                <p className="text-sm text-[#003865] leading-relaxed">{approach}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-24 bg-[#001E3C] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#00C7FD]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1 mb-4">
              <Layers className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
              <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display">Reference Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight">Six layers, one blueprint</h2>
          </div>
          <div className="space-y-3 max-w-4xl mx-auto">
            {industry.architecture.map((layer, i) => (
              <motion.div key={layer.layer} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.4, delay: i * 0.1 }} className="group flex items-center gap-4 sm:gap-6 rounded-2xl intel-glass p-5 sm:p-6 hover:border-[#00C7FD]/40 transition-all">
                <div className="inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white font-bold text-lg sm:text-xl font-display shrink-0">{String(i + 1).padStart(2, "0")}</div>
                <div className="flex-1">
                  <div className="text-lg sm:text-xl font-bold text-white font-display">{layer.layer}</div>
                  <div className="text-sm text-white/60 mt-0.5">{layer.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Deployment Scenarios</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">How {industry.name.toLowerCase()} customers deploy</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {industry.deployment.map((d, i) => (
              <motion.div key={d.scenario} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-6 card-hover">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#001E3C] text-[#00C7FD] mb-4">
                  <Server className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-[#001E3C] font-display mb-2">{d.scenario}</h3>
                <p className="text-sm text-[#5A6B7C] leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-24 bg-[#F5F9FC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Related Solutions</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">KABO solutions for {industry.name.toLowerCase()}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedSolutions.map((sol, i) => {
              const SolIcon = sol.icon;
              return (
                <motion.button key={sol.slug} onClick={() => navigate("solution-detail", sol.slug)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group rounded-2xl border border-[#DCE6EF] bg-white p-6 text-left card-hover">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    <SolIcon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-[#001E3C] font-display mb-2 leading-tight">{sol.shortTitle}</h3>
                  <p className="text-xs text-[#5A6B7C] leading-relaxed line-clamp-3">{sol.tagline}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001E3C] font-display leading-tight">Ready to engineer for your {industry.name.toLowerCase()} estate?</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
              Discuss Your {industry.name} Workload
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
