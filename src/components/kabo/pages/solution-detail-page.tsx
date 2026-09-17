"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, Building2, Sparkles } from "lucide-react";
import { VideoHero, type HeroVariant } from "../video-hero";
import { SOLUTIONS, PARTNERS } from "../data";
import { usePage } from "../page-context";

interface SolutionDetailPageProps { detail: string; }

const VARIANT_BY_SLUG: Record<string, HeroVariant> = {
  "compute": "datacenter", "data": "datacenter", "ai-infrastructure": "datacenter", "continuity": "datacenter", "analytics-bi": "datacenter",
  "networking": "network", "cloud": "network",
  "security": "security", "physical-security": "security",
  "digital-workplace": "abstract", "iot-edge": "abstract",
};

export function SolutionDetailPage({ detail }: SolutionDetailPageProps) {
  const { navigate } = usePage();
  const solution = SOLUTIONS.find((s) => s.slug === detail) ?? SOLUTIONS[0];
  const Icon = solution.icon;
  const partnersOnSolution = PARTNERS.filter((p) => p.solutions.includes(solution.slug));

  return (
    <>
      <VideoHero variant={VARIANT_BY_SLUG[solution.slug] ?? "abstract"} tag={solution.shortTitle} title={<>{solution.title.split(" ").slice(0, -2).join(" ")} <span className="intel-text-gradient">{solution.title.split(" ").slice(-2).join(" ")}</span></>} subtitle={solution.description}>
        <button onClick={() => navigate("solutions")} className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 hover:border-[#00C7FD]/50 transition-all">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
          Back to Solutions
        </button>
      </VideoHero>
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#001E3C]/20">
              <Image src={solution.image} alt={solution.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001E3C]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/95 backdrop-blur shadow-lg">
                  <Icon className="h-6 w-6 text-[#0071C5]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display">Solution</div>
                  <div className="text-lg font-bold text-white font-display">{solution.shortTitle}</div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }}>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Overview</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#001E3C] font-display leading-tight">Engineered, not resold</h2>
              <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">{solution.tagline}</p>
              <div className="mt-8">
                <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-3">Technology Stack</div>
                <div className="flex flex-wrap gap-2">
                  {solution.stack.map((s) => (
                    <span key={s} className="inline-flex items-center rounded-md bg-[#F1F6FB] px-3 py-1.5 text-sm font-medium text-[#003865]">{s}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => navigate("contact")} className="mt-8 group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl hover:scale-[1.03] transition-all">
                Discuss This Solution
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-24 bg-[#F5F9FC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Capabilities</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">What this solution delivers</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {solution.capabilities.map((cap, i) => (
              <motion.div key={cap.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl border border-[#DCE6EF] bg-white p-6 card-hover">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#0071C5]/10 to-[#00C7FD]/10 text-[#0071C5] mb-4">
                  <Cpu className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-[#001E3C] font-display mb-2">{cap.title}</h3>
                <p className="text-sm text-[#5A6B7C] leading-relaxed">{cap.spec}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-24 bg-[#001E3C] overflow-hidden">
        <div className="absolute inset-0 intel-gradient-mesh opacity-90" />
        <div className="absolute inset-0 grid-pattern-dark opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
                <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display">Outcomes</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">What changes for your business</h3>
              <ul className="mt-7 space-y-4">
                {solution.outcomes.map((o, i) => (
                  <motion.li key={o} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-[#00C7FD] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-base text-white/85 leading-relaxed">{o}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1 mb-4">
                <Building2 className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
                <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display">Partners on this solution</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">Unified under one contract</h3>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {partnersOnSolution.map((p) => (
                  <button key={p.slug} onClick={() => navigate("partner-detail", p.slug)} className="rounded-xl intel-glass p-4 text-left card-hover">
                    <div className="text-base font-bold font-display mb-1" style={{ color: p.colour }}>{p.name}</div>
                    <div className="text-xs text-white/60">{p.category}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001E3C] font-display leading-tight">Ready to engineer this for your estate?</h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6B7C] max-w-2xl mx-auto">One conversation replaces a queue of vendors. Let&rsquo;s talk about your {solution.shortTitle.toLowerCase()} workload.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
              Discuss This Solution
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
            <button onClick={() => navigate("solutions")} className="inline-flex items-center gap-2 rounded-full border border-[#DCE6EF] px-6 py-3.5 text-base font-semibold text-[#003865] hover:border-[#00C7FD] hover:text-[#0071C5] transition-colors">
              <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
              Back to Solutions
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
