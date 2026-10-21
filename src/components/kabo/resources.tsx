"use client";

import { motion } from "framer-motion";
import { FileText, Download, ArrowRight, BookOpen } from "lucide-react";
import { usePage } from "./page-context";

const RESOURCES = [
  { icon: BookOpen, title: "SD-WAN Reference Brief", desc: "Conceptual network topology, secure overlays, implementation considerations and design inputs for distributed connectivity.", type: "Technical Brief", url: "/briefs/kabo-sd-wan-reference.md" },
  { icon: FileText, title: "Campus Networking Reference Brief", desc: "Core, distribution, wired access, wireless and security layers for multi-building campus network planning.", type: "Technical Brief", url: "/briefs/kabo-campus-network-reference.md" },
  { icon: Download, title: "Data Centre Infrastructure Brief", desc: "Planning considerations for servers, storage fabrics, backup, resilience, power and cooling.", type: "Technical Brief", url: "/briefs/kabo-data-centre-reference.md" },
];

export function Resources() {
  const { navigate } = usePage();
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Technical Resources</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">Evidence, not just claims.</h2>
          <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
            Original reference briefs for infrastructure discussions. Conceptual material only; final design, compatibility and pricing follow a site-specific assessment.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {RESOURCES.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }} className="group rounded-2xl border border-[#DCE6EF] bg-[#F5F9FC] p-6 sm:p-7 card-hover">
              <div className="flex items-center justify-between mb-5">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#001E3C] text-[#00C7FD] group-hover:bg-gradient-to-br group-hover:from-[#0071C5] group-hover:to-[#00C7FD] group-hover:text-white transition-all duration-300">
                  <r.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display font-semibold">{r.type}</span>
              </div>
              <h3 className="text-lg font-bold text-[#001E3C] font-display mb-2 leading-tight">{r.title}</h3>
              <p className="text-sm text-[#5A6B7C] leading-relaxed mb-5">{r.desc}</p>
              <a href={r.url} download className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-[#0071C5] hover:text-[#00C7FD] transition-colors">
                Download brief
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={1.5} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
