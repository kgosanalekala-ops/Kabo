"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { usePage } from "./page-context";
import { FloatingDots } from "./floating-dots";
import { AnimatedCounter } from "./animated-counter";

const STATS = [
  { value: 15, label: "Strategic Alliances", sub: "HPE · Dell · NVIDIA · Microsoft" },
  { value: 12, label: "Solution Domains", sub: "Compute → Managed Services" },
  { value: 9, label: "Provinces Covered", sub: "Nationwide engineering" },
  { text: "24/7", label: "NOC + SOC", sub: "Gauteng operations" },
] as const;

export function Hero() {
  const { navigate } = usePage();
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#001E3C]">
      {/* ============ BACKGROUND ============ */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sol_datacenter.jpg"
          alt="KABO-engineered data centre hall"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#001E3C]/95 via-[#002B5C]/85 to-[#001E3C]/95" />
        <div className="absolute inset-0 intel-gradient-mesh opacity-70" />
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />

        {/* Floating accent orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#00C7FD]/12 blur-3xl float-anim" />
        <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-[#0071C5]/15 blur-3xl float-anim" style={{ animationDelay: "3s" }} />

        {/* Floating dots traveling ALONG the geometric network paths */}
        <FloatingDots variant="home" idSuffix="-home" />

        <div className="scan-line" />
      </div>

      {/* ============ HERO CONTENT (above the fold) ============ */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* ---------- Left column — headline & CTAs ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 backdrop-blur px-3 sm:px-4 py-1.5 mb-5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#00C7FD] opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00C7FD]" />
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#00C7FD] font-display font-semibold">
                  National Systems Integrator &middot; Gauteng &middot; Est. 2016
                </span>
              </motion.div>

              {/* Headline — top-tier, intelligent, confident */}
              <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight text-[2rem] sm:text-5xl lg:text-6xl xl:text-[4rem]">
                Africa&rsquo;s intelligent <span className="intel-text-gradient-bright">infrastructure</span>,<br className="hidden sm:block" />
                <span className="sm:inline"> engineered to </span>
                <span className="intel-text-gradient-bright">perform</span>.
              </h1>

              {/* Supporting copy — corporate, intelligent, top-tier */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed max-w-2xl"
              >
                We design, build and operate the enterprise infrastructure that runs modern Africa &mdash; from GPU-grade AI platforms and sovereign cloud to zero-trust networks and 24/7 security operations. Fifteen strategic alliances. Twelve interlocking domains. A single accountable partner across the full stack.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3"
              >
                <button
                  onClick={() => navigate("solutions")}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:shadow-[#00C7FD]/30 hover:scale-[1.03] transition-all"
                >
                  Explore Our Capabilities
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => navigate("contact")}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white backdrop-blur hover:bg-white/10 hover:border-[#00C7FD]/50 transition-all"
                >
                  Start a Conversation
                </button>
              </motion.div>

              {/* Trust signals — compact, 3 inline proof points */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-[11px] sm:text-xs text-white/65"
              >
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
                  B-BBEE Level 1 &middot; 135%
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
                  NVIDIA HGX H100/H200
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#00C7FD] opacity-60 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00C7FD]" />
                  </span>
                  24/7 NOC + SOC
                </span>
              </motion.div>
            </motion.div>

            {/* ---------- Right column — floating capability card cluster (desktop only) ---------- */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative h-[26rem]">
                {/* Backdrop card */}
                <div className="absolute top-8 right-0 w-72 h-96 rounded-3xl bg-gradient-to-br from-[#00C7FD]/15 to-[#0071C5]/5 border border-white/10 backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0 grid-pattern-dark opacity-40" />
                  <div className="relative p-6 flex flex-col h-full justify-between">
                    <div>
                      <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold mb-3">Architecture in Motion</div>
                      <div className="text-3xl font-bold text-white font-display leading-tight">8-Step<br />Methodology</div>
                      <p className="text-xs text-white/60 mt-3 leading-relaxed">Define → Design → Select → Build → Secure → Operate → Sustain → Prove.</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {["01","02","03","04","05","06","07","08"].map((n) => (
                        <div key={n} className="aspect-square rounded-md bg-white/5 border border-[#00C7FD]/20 flex items-center justify-center text-[10px] text-[#00C7FD] font-mono font-semibold">{n}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Foreground floating cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-64 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 p-5 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C7FD] to-[#0071C5] flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-xs text-[#00C7FD] font-display uppercase tracking-wider">B-BBEE</div>
                      <div className="text-sm font-bold text-white font-display">Level 1 · 135%</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-white/60 leading-relaxed">B-BBEE Level 1 contributor. Maximum procurement recognition for public- and private-sector clients.</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-4 left-12 w-60 rounded-2xl bg-gradient-to-br from-[#003865] to-[#001E3C] backdrop-blur-md border border-[#00C7FD]/30 p-5 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00C7FD]/20 border border-[#00C7FD]/40 flex items-center justify-center">
                      <Cpu className="h-5 w-5 text-[#00C7FD]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-xs text-[#00C7FD] font-display uppercase tracking-wider">AI Stack</div>
                      <div className="text-sm font-bold text-white font-display">NVIDIA HGX</div>
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] text-white/60 leading-relaxed">H100/H200 GPU clusters, InfiniBand 400G, FlashBlade tiers, MLOps &amp; 24/7 SOC governance.</div>
                  <div className="mt-3 flex gap-1.5">
                    {["H100", "H200", "L40S"].map((g) => (
                      <span key={g} className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 text-[#00C7FD] border border-white/10">{g}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============ ANIMATED STAT STRIP (below the fold — one scroll down) ============ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24 w-full"
      >
        {/* Counter bar — animated count-up when scrolled into view */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-l-2 border-[#00C7FD]/40 pl-3 sm:pl-4 lg:pl-5"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display bg-gradient-to-br from-[#5FE5FF] via-[#00C7FD] to-[#0071C5] bg-clip-text text-transparent">
                <AnimatedCounter
                  value={"value" in s ? s.value : 0}
                  text={"text" in s ? s.text : undefined}
                  duration={2000}
                  delay={i * 150}
                />
              </div>
              <div className="mt-1 text-[11px] sm:text-xs lg:text-sm font-medium text-white uppercase tracking-wider">
                {s.label}
              </div>
              <div className="mt-0.5 text-[9px] sm:text-[10px] lg:text-xs text-white/45 hidden sm:block">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#001E3C] to-transparent pointer-events-none" />
    </section>
  );
}
