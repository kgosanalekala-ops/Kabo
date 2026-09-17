"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "Level 1", label: "B-BBEE Rating · 135%" },
  { value: "15", label: "Strategic Alliances" },
  { value: "12", label: "Solution Domains" },
  { value: "9", label: "Industries Served" },
  { value: "9", label: "Provinces Covered" },
  { value: "24/7", label: "NOC + SOC Operations" },
];

export function Stats() {
  return (
    <section className="py-16 sm:py-20 bg-[#F5F9FC] border-y border-[#DCE6EF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0071C5] font-display tracking-tight">{s.value}</div>
              <div className="mt-2 text-xs sm:text-sm text-[#5A6B7C] uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
