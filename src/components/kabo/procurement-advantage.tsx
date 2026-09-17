"use client";

import { motion } from "framer-motion";
import { Award, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { usePage } from "./page-context";

const ADVANTAGES = [
  { icon: Award, title: "BBB-EE Level 1 Procurement", desc: "Level 1 contributor with maximum procurement recognition. Every KABO engagement contributes directly to your supplier development scorecard — no pass-through, no fronting, no procurement gymnastics." },
  { icon: TrendingUp, title: "Procurement Requirement Advantage", desc: "Treasury-compliant documentation pack, B-BBEE certificates, and procurement-ready proposals that streamline your procurement requirement response." },
  { icon: Shield, title: "POPIA-Aligned Sovereign Hosting", desc: "Regulated workloads stay on African soil. Sovereign cloud zones and air-gapped repositories keep POPIA-regulated data resident and recoverable." },
];

export function ProcurementAdvantage() {
  const { navigate } = usePage();
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="lg:col-span-5">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">The KABO Commercial Advantage</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">
              Your procurement requirement, <span className="intel-text-gradient">won</span>.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
              KABO isn&rsquo;t just a technology partner. We&rsquo;re a procurement advantage. Every engagement is engineered to score high on your B-BBEE scorecard, comply with Treasury regulations and keep regulated data sovereign. One partner that wins the procurement requirement and delivers the outcome.
            </p>
            <button onClick={() => navigate("contact")} className="mt-8 group inline-flex items-center gap-2 rounded-full bg-[#001E3C] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0071C5] transition-colors">
              Engage KABO for Your Next RFP
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-7 space-y-4">
            {ADVANTAGES.map((adv, i) => (
              <motion.div key={adv.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-6 sm:p-7 card-hover">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <adv.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#001E3C] font-display mb-2">{adv.title}</h3>
                    <p className="text-sm text-[#5A6B7C] leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
