"use client";

import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, Compass } from "lucide-react";
import { THOUGHT_LEADERSHIP, ENGAGEMENT_PATH, COMPETITIVE_PILLARS } from "./data";
import { usePage } from "./page-context";

export function ThoughtLeadership() {
  const { navigate } = usePage();
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00C7FD]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#0071C5]/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1 mb-4">
            <Lightbulb className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold">Thought Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">
            Three theses for the <span className="intel-text-gradient">AI era</span>.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
            KABO&apos;s thought leadership is grounded in three structural theses about African infrastructure over the next decade — and the practical engagement model that turns them into outcomes.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 mb-20">
          {THOUGHT_LEADERSHIP.map((t, i) => (
            <motion.div
              key={t.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-3xl bg-gradient-to-br from-[#001E3C] via-[#003865] to-[#001E3C] p-7 sm:p-8 overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="absolute inset-0 grid-pattern-dark opacity-30" />
              <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#00C7FD]/15 blur-3xl group-hover:bg-[#00C7FD]/25 transition-colors" />
              <div className="relative">
                <div className="flex items-baseline gap-3 mb-4">
                  <div className="text-5xl sm:text-6xl font-bold font-display bg-gradient-to-br from-[#00C7FD] to-[#0071C5] bg-clip-text text-transparent">{t.num}</div>
                  <Compass className="h-6 w-6 text-[#00C7FD]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display leading-tight mb-4">{t.thesis}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="lg:col-span-5">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Competitive Positioning</span>
            <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001E3C] font-display leading-tight">
              A national integrator with <span className="intel-text-gradient">enterprise depth</span>.
            </h3>
            <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
              KABO occupies a distinct position in the South African infrastructure market — the engineering depth of an enterprise integrator, the partnership credibility of a Tier-1 reseller and the B-BBEE profile of a Level 1 contributor with maximum procurement recognition.
            </p>
            <p className="mt-4 text-base text-[#5A6B7C] leading-relaxed italic">
              &ldquo;What distinguishes KABO is not any single capability — it is the integration of all of them under one corporate identity, one governance framework and one escalation path.&rdquo;
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-7 space-y-4">
            {COMPETITIVE_PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-6 sm:p-7 card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg font-bold font-display">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#001E3C] font-display mb-2">{p.title}</h4>
                    <p className="text-sm text-[#5A6B7C] leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 relative rounded-3xl bg-gradient-to-br from-[#001E3C] via-[#003865] to-[#001E3C] p-8 sm:p-10 lg:p-12 overflow-hidden"
        >
          <div className="absolute inset-0 grid-pattern-dark opacity-30" />
          <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#00C7FD]/15 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-[#0071C5]/15 blur-3xl" />
          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold mb-3">Engagement Path</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight mb-4">
                Start with an architecture <span className="intel-text-gradient">workshop</span>.
              </h3>
              <p className="text-base text-white/70 leading-relaxed">
                Every engagement begins with a structured discovery workshop — workload, outcome, constraint, timeline. From there, KABO produces a Statement of Work and a High-Level Design within ten business days.
              </p>
              <button
                onClick={() => navigate("contact")}
                className="mt-6 group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#001E3C] hover:bg-[#00C7FD] hover:text-white transition-colors"
              >
                Start a Discovery Workshop
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-3">
                {ENGAGEMENT_PATH.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3"
                  >
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-[#00C7FD]/15 text-[#00C7FD] font-bold text-sm font-display shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white font-display">{step.step}</div>
                      <div className="text-xs text-white/60">{step.desc}</div>
                    </div>
                    <div className="text-xs text-[#00C7FD] font-display font-semibold text-right whitespace-nowrap">{step.timeframe}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
