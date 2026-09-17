"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Building2 } from "lucide-react";
import { VideoHero } from "../video-hero";
import { PARTNERS, SOLUTIONS } from "../data";
import { usePage } from "../page-context";

interface PartnerDetailPageProps { detail: string; }

export function PartnerDetailPage({ detail }: PartnerDetailPageProps) {
  const { navigate } = usePage();
  const partner = PARTNERS.find((p) => p.slug === detail) ?? PARTNERS[0];
  const solutionsOnPartner = SOLUTIONS.filter((s) => partner.solutions.includes(s.slug));

  return (
    <>
      <VideoHero variant="abstract" tag={partner.name} title={<><span style={{ color: partner.colour }}>{partner.name}</span><br /><span className="intel-text-gradient">{partner.category}</span></>} subtitle={partner.tagline}>
        <button onClick={() => navigate("partners")} className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 hover:border-[#00C7FD]/50 transition-all">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
          Back to Partners
        </button>
      </VideoHero>
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Partner Overview</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-display leading-tight" style={{ color: partner.colour }}>{partner.name}</h2>
              <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">{partner.description}</p>
              <div className="mt-8">
                <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-3">Portfolio</div>
                <div className="flex flex-wrap gap-2">
                  {partner.portfolio.map((p) => (
                    <span key={p} className="inline-flex items-center rounded-md bg-[#F1F6FB] px-3 py-1.5 text-sm font-medium text-[#003865]">{p}</span>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-3xl bg-gradient-to-br from-[#001E3C] via-[#003865] to-[#001E3C] p-8 sm:p-10 overflow-hidden relative">
              <div className="absolute inset-0 grid-pattern-dark opacity-40" />
              <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#00C7FD]/15 blur-3xl" />
              <div className="relative">
                <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mb-3">Relationship</div>
                <p className="text-base text-white/85 leading-relaxed mb-6">{partner.relationship}</p>
                <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mb-4">KABO Integration</div>
                <ul className="space-y-3">
                  {partner.integration.map((item, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#00C7FD] shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-sm text-white/80 leading-relaxed">{item}</span>
                    </motion.li>
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
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0071C5]/20 bg-[#0071C5]/5 px-3 py-1 mb-4">
              <Building2 className="h-3.5 w-3.5 text-[#0071C5]" strokeWidth={1.5} />
              <span className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display">KABO Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">Solutions featuring {partner.name}</h2>
            <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">A cross-cutting capability across all KABO solutions where {partner.name} platforms are engineered into the architecture.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutionsOnPartner.map((sol, i) => {
              const Icon = sol.icon;
              return (
                <motion.button key={sol.slug} onClick={() => navigate("solution-detail", sol.slug)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group rounded-2xl border border-[#DCE6EF] bg-white p-6 text-left card-hover">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001E3C] font-display leading-tight">Ready to engineer with {partner.name}?</h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6B7C] max-w-2xl mx-auto">One conversation replaces a queue of vendors. Let&rsquo;s talk about your {partner.name} requirement.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
              Discuss {partner.name}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
            <button onClick={() => navigate("partners")} className="inline-flex items-center gap-2 rounded-full border border-[#DCE6EF] px-6 py-3.5 text-base font-semibold text-[#003865] hover:border-[#00C7FD] hover:text-[#0071C5] transition-colors">
              <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
              Back to Partners
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
