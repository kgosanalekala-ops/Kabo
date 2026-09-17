"use client";

import { motion } from "framer-motion";
import { Workflow, ArrowRight } from "lucide-react";
import { ARCHITECTURE_STEPS, ARCH_PRINCIPLES } from "./data";

export function Framework() {
  return (
    <section className="py-20 sm:py-28 bg-[#001E3C] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern-dark opacity-30" />
      <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-[#00C7FD]/10 blur-3xl float-anim" />
      <div className="absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-[#0071C5]/15 blur-3xl float-anim-slow" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1 mb-4">
            <Workflow className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold">Architecture Thesis &middot; 8-Step Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight">
            Every architecture starts with a business outcome &mdash; <span className="intel-text-gradient">and ends with one</span>.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed">
            Technology without an outcome is inventory. Every KABO engagement is structured as an eight-step architectural flow that ties business requirement to measurable result, with each layer accountable to the next.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-14">
          {ARCHITECTURE_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              className="group rounded-2xl intel-glass p-5 sm:p-6 hover:border-[#00C7FD]/40 transition-all"
            >
              <div className="flex items-baseline gap-2 mb-3">
                <div className="text-2xl sm:text-3xl font-bold font-display bg-gradient-to-br from-[#00C7FD] to-[#0071C5] bg-clip-text text-transparent">{step.num}</div>
                <ArrowRight className="h-4 w-4 text-[#00C7FD] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-display leading-tight">{step.title}</div>
              <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mt-1 mb-3">{step.subtitle}</div>
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
          {ARCH_PRINCIPLES.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold mb-3">Principle {String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-display leading-tight mb-3">{p.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
