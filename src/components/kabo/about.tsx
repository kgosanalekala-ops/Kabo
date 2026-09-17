"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Headset, Layers } from "lucide-react";
import { usePage } from "./page-context";

export function About() {
  const { navigate } = usePage();
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00C7FD]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#0071C5]/5 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">The KABO Difference</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">
              Architecture first.<br />
              Technology <span className="intel-text-gradient">follows</span>.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
              KABO IT Group is a Gauteng-established systems integrator &mdash; B-BBEE Level 1 with 135% procurement recognition. Since 2016 we have curated fifteen strategic alliances into twelve interlocking solution domains, underpinned by a single reference architecture, a single contract and a single escalation path. The result: no finger pointing between vendors, no orphan SKUs, no accountability gaps when something breaks at 3am.
            </p>
            <p className="mt-4 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
              From compute, data and networking through security, AI infrastructure, cloud, digital workplace, physical security, analytics/BI, continuity and IoT/edge &mdash; KABO owns the outcome end to end. Nationwide footprint across all nine South African provinces today, expanding into the broader African continent.
            </p>

            {/* Promise tiles — small icon-driven list */}
            <div className="mt-7 grid sm:grid-cols-3 gap-3">
              {[
                { icon: Layers, title: "Unified contract", desc: "Every layer, one agreement." },
                { icon: Headset, title: "Single escalation path", desc: "One number, 24/7." },
                { icon: ShieldCheck, title: "Same engineering team", desc: "Integrate → operate." },
              ].map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-4 hover:border-[#00C7FD]/40 hover:bg-white transition-colors"
                >
                  <p.icon className="h-5 w-5 text-[#0071C5] mb-2" strokeWidth={1.5} />
                  <div className="text-sm font-bold text-[#001E3C] font-display">{p.title}</div>
                  <div className="text-xs text-[#5A6B7C] mt-0.5">{p.desc}</div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => navigate("about")}
              className="mt-8 group inline-flex items-center gap-2 rounded-full bg-[#001E3C] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0071C5] transition-colors"
            >
              Read Our Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </motion.div>

          {/* Right column — real image with floating stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#001E3C]/15 aspect-[4/3]">
              <Image
                src="/images/sol_noc.jpg"
                alt="KABO 24/7 Network Operations Centre"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#001E3C]/80 via-[#001E3C]/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold mb-1">Gauteng SOC</div>
                  <div className="text-lg font-bold text-white font-display leading-tight">24/7 NOC + SOC<br />operations</div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 border border-white/20">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#00C7FD] opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00C7FD]" />
                  </span>
                  <span className="text-[10px] tracking-[0.18em] uppercase text-white font-display font-semibold">Live</span>
                </div>
              </div>
            </div>

            {/* Floating stat tile */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -left-5 sm:-left-8 rounded-2xl bg-white shadow-xl border border-[#DCE6EF] p-4 hidden sm:block"
            >
              <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold mb-1">Founded</div>
              <div className="text-2xl font-bold text-[#001E3C] font-display leading-none">2016</div>
              <div className="text-[10px] text-[#5A6B7C] mt-1">Gauteng, South Africa</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-5 -right-5 sm:-right-8 rounded-2xl bg-gradient-to-br from-[#003865] to-[#001E3C] shadow-xl border border-[#00C7FD]/30 p-4 hidden sm:block"
            >
              <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold mb-1">B-BBEE</div>
              <div className="text-2xl font-bold text-white font-display leading-none">L1<span className="text-[#00C7FD]"> · </span>135%</div>
              <div className="text-[10px] text-white/60 mt-1">procurement</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
