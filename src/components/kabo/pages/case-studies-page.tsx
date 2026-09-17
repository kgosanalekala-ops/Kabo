"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VideoHero } from "../video-hero";
import { CASE_STUDIES } from "../data";
import { usePage } from "../page-context";

export function CaseStudiesPage() {
  const { navigate } = usePage();
  return (
    <>
      <VideoHero variant="abstract" tag="Case Studies" title={<>{<>Evidence, not</>}<br /><span className="intel-text-gradient">just claims</span>.</>} subtitle="Selected KABO engagements across AI infrastructure, data centre, SD-WAN and integrated security. Each delivered under a unified contract, a single escalation path, and the same engineering team from workshop to QBR." />
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {CASE_STUDIES.map((cs, i) => {
              const isDark = i % 2 === 1;
              return (
                <motion.div key={cs.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.05 }} className={isDark ? "relative rounded-3xl bg-[#001E3C] overflow-hidden" : "relative rounded-3xl border border-[#DCE6EF] bg-[#F5F9FC] overflow-hidden"}>
                  {isDark && (
                    <>
                      <div className="absolute inset-0 grid-pattern-dark opacity-30" />
                      <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#00C7FD]/15 blur-3xl" />
                    </>
                  )}
                  <div className="relative p-6 sm:p-8 lg:p-10">
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                      <div>
                        <div className={isDark ? "text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mb-1" : "text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-1"}>{cs.sector} &middot; {cs.client}</div>
                        <h3 className={isDark ? "text-xl sm:text-2xl font-bold text-white font-display leading-tight" : "text-xl sm:text-2xl font-bold text-[#001E3C] font-display leading-tight"}>{cs.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cs.stack.slice(0, 3).map((s) => (
                          <span key={s} className={isDark ? "inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white/80" : "inline-flex items-center rounded-md bg-[#F1F6FB] px-2 py-1 text-xs font-medium text-[#003865]"}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6 mt-5">
                      <div>
                        <div className={isDark ? "text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mb-2" : "text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2"}>Challenge</div>
                        <p className={isDark ? "text-sm text-white/75 leading-relaxed" : "text-sm text-[#5A6B7C] leading-relaxed"}>{cs.challenge}</p>
                      </div>
                      <div>
                        <div className={isDark ? "text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mb-2" : "text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2"}>Solution</div>
                        <p className={isDark ? "text-sm text-white/75 leading-relaxed" : "text-sm text-[#5A6B7C] leading-relaxed"}>{cs.solution}</p>
                      </div>
                      <div>
                        <div className={isDark ? "text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mb-2" : "text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-2"}>Outcome</div>
                        <p className={isDark ? "text-sm text-white/75 leading-relaxed" : "text-sm text-[#5A6B7C] leading-relaxed"}>{cs.outcome}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-14 text-center">
            <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
              Become Our Next Case Study
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
