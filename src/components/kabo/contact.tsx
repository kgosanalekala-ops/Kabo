"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Clock } from "lucide-react";
import { usePage } from "./page-context";

export function Contact() {
  const { navigate } = usePage();
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="lg:col-span-6">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Let&rsquo;s Talk</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">
              Let&rsquo;s build something <span className="intel-text-gradient">resilient</span>.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
              One conversation replaces a queue of vendors. Tell us about your workload, your estate, your RFP &mdash; we&rsquo;ll route it to the right architect and come back with a reference design, not a brochure.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: MapPin, label: "Registered Address", value: "12886 Masemola Street, Mamelodi East, Pretoria, 0122" },
                { icon: Clock, label: "Engineering & NOC", value: "24/7 operations from Gauteng SOC" },
                { icon: Mail, label: "Engage", value: "info@kaboitgroup.co.za  ·  +27 612 85 4418" },
              ].map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex items-start gap-3">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-[#F1F6FB] text-[#0071C5] shrink-0">
                    <c.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display">{c.label}</div>
                    <div className="text-base text-[#003865] mt-0.5">{c.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <button onClick={() => navigate("contact")} className="mt-8 group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
              Start a Conversation
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-6">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#001E3C] via-[#003865] to-[#001E3C] p-8 sm:p-10 overflow-hidden">
              <div className="absolute inset-0 grid-pattern-dark opacity-40" />
              <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#00C7FD]/15 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-[#0071C5]/15 blur-3xl" />
              <div className="relative">
                <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mb-3">The KABO Promise</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight mb-6">Unified contract. Single escalation path. The same engineering team from workshop to QBR.</h3>
                <ul className="space-y-3">
                  {[
                    "No vendor sprawl — every layer under a single agreement",
                    "No finger pointing — a single accountable owner, end to end",
                    "No orphan SKUs — every product integrated into the reference architecture",
                    "No procurement gymnastics — B-BBEE Level 1, Treasury-ready",
                  ].map((item, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex items-start gap-3 text-white/85">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#00C7FD]/20 text-[#00C7FD] text-xs font-bold shrink-0 mt-0.5">&radic;</span>
                      <span className="text-sm sm:text-base leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
