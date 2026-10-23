"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, PieChart, Globe } from "lucide-react";
import { usePage } from "./page-context";

const PILLARS = [
  { icon: TrendingUp, title: "Growth Trajectory", desc: "KABO is exploring opportunities in AI-ready data centres, resilient energy infrastructure and integrated enterprise technology, with each initiative assessed for technical and commercial feasibility." },
  { icon: PieChart, title: "Diversified Revenue", desc: "A portfolio spanning ICT equipment, workplace procurement, enterprise infrastructure and project-led services, with commercial terms scoped to each engagement." },
  { icon: Globe, title: "Expansion Vision", desc: "Based in South Africa, KABO seeks collaborations with investors, technology manufacturers and engineering delivery partners on projects whose capacity and responsibilities can be established." },
];

export function Investor() {
  const { navigate } = usePage();
  return (
    <section className="py-20 sm:py-28 bg-[#001E3C] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern-dark opacity-30" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#00C7FD]/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#0071C5]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1 mb-4">
            <TrendingUp className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold">Investor Relations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight">
            Building Africa&rsquo;s <span className="intel-text-gradient">ecosystem orchestrator</span>.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed">
            KABO brings together infrastructure architecture, technology sourcing and project integration planning. We welcome discussions with strategic investors and development partners working on South African digital and energy infrastructure.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {PILLARS.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group rounded-2xl intel-glass p-6 sm:p-7 hover:border-[#00C7FD]/40 transition-all">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                <p.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-2">{p.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <button onClick={() => navigate("investors")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
            View Investor Relations
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
