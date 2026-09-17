"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Heart, Users, MapPin, Award, Zap } from "lucide-react";
import { VideoHero } from "../video-hero";
import { usePage } from "../page-context";

const VALUES = [
  { icon: Target, title: "Accountability", desc: "One owner, end to end. No finger pointing, no orphaned outcomes." },
  { icon: Eye, title: "Transparency", desc: "Audit-ready evidence. POPIA-aligned, BBB-EE compliant, regulator-ready." },
  { icon: Heart, title: "African Reality", desc: "Engineered for load-shedding, copper theft and fibre cuts at 3am." },
  { icon: Users, title: "Black Ownership", desc: "100% Black-owned. BBB-EE Level 1. Procurement advantage, not window dressing." },
];

const TIMELINE = [
  { year: "2016", title: "KABO IT Group Founded", desc: "Established in Gauteng with a mission to engineer intelligent infrastructure for African enterprise." },
  { year: "Growth", title: "15 Strategic Alliances", desc: "Curated fifteen technology partners across compute, data, networking, security, AI, cloud, workplace and physical security." },
  { year: "Today", title: "12 Domains, 9 Provinces", desc: "Nationwide footprint across all nine South African provinces, 24/7 NOC and SOC from Gauteng, twelve interlocking solution domains, nine industry verticals." },
  { year: "Tomorrow", title: "African Expansion", desc: "Extending KABO's ecosystem orchestration model into SADC and the broader African continent — carrying the same architecture, partnerships and operational discipline that work in South Africa." },
];

export function AboutPage() {
  const { navigate } = usePage();
  return (
    <>
      <VideoHero variant="abstract" tag="About KABO" title={<>{<>Intelligent infrastructure,</>}<br /><span className="intel-text-gradient">engineered</span> for the AI era.</>} subtitle="KABO IT Group is a Gauteng-established systems integrator — 100% Black-owned, B-BBEE Level 1 with 135% procurement recognition. Founded in 2016. Fifteen strategic alliances, twelve interlocking domains, a unified architecture — engineered end-to-end. Nationwide footprint today, expanding into the broader African continent." />
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Our Mission</span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">One owner for every layer of African enterprise ICT.</h2>
              <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">KABO IT Group exists to remove the friction, finger-pointing and accountability gaps that plague multi-vendor ICT estates. We orchestrate fifteen strategic alliances into twelve interlocking solution domains under a single architecture, a single contract and a single escalation path.</p>
              <p className="mt-4 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">From compute, data and networking through security, AI infrastructure, cloud, digital workplace, physical security, analytics/BI, continuity and IoT/edge — KABO owns the outcome. End to end, across all nine South African provinces today, expanding into the broader African continent, 24/7.</p>
              <button onClick={() => navigate("contact")} className="mt-8 group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl hover:scale-[1.03] transition-all">
                Engage KABO
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, value: "Level 1", label: "B-BBEE · 135%" },
                { icon: Users, value: "100%", label: "Black-Owned" },
                { icon: Zap, value: "12", label: "Solution Domains" },
                { icon: MapPin, value: "9", label: "Provinces Covered" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-6 text-center">
                  <s.icon className="h-7 w-7 text-[#0071C5] mx-auto mb-3" strokeWidth={1.5} />
                  <div className="text-3xl font-bold text-[#001E3C] font-display">{s.value}</div>
                  <div className="text-xs text-[#5A6B7C] uppercase tracking-wider mt-1">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-[#F5F9FC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">What We Stand For</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">Four values, non-negotiable.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: (i % 4) * 0.08 }} className="group rounded-2xl border border-[#DCE6EF] bg-white p-6 sm:p-7 card-hover">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                  <v.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-[#001E3C] font-display mb-2">{v.title}</h3>
                <p className="text-sm text-[#5A6B7C] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-[#001E3C] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#00C7FD]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#00C7FD] font-display">Our Journey</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight">Built in Africa, for Africa.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIMELINE.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl intel-glass p-6">
                <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold mb-2">{t.year}</div>
                <h3 className="text-lg font-bold text-white font-display mb-2">{t.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001E3C] font-display leading-tight">Ready to work with a single accountable partner?</h2>
          <div className="mt-8">
            <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
              Start a Conversation
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
