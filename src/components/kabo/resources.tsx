"use client";

import { motion } from "framer-motion";
import { FileText, Download, ArrowRight, BookOpen } from "lucide-react";
import { usePage } from "./page-context";

const RESOURCES = [
  { icon: FileText, title: "Africa-Grade Infrastructure White Paper", desc: "A white paper on Africa-grade infrastructure — how KABO engineers for power instability, connectivity variance and sovereign data residency across all nine provinces.", type: "White Paper" },
  { icon: BookOpen, title: "AI Infrastructure Reference Architecture", desc: "Reference architecture for NVIDIA HGX H100/H200 clusters, InfiniBand 400G fabrics, Pure Storage FlashBlade tiers and MLOps pipelines — engineered for African enterprise.", type: "Reference Architecture" },
  { icon: Download, title: "Procurement-Ready Capability Statement", desc: "B-BBEE Level 1, 135% procurement recognition, 15 strategic alliances, 10 solution domains, nationwide footprint. Everything your procurement team needs to score KABO on the next RFP.", type: "Capability Statement" },
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
            White papers, reference architectures and capability statements — downloadable, audit-ready and engineered for procurement teams.
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
              <button onClick={() => navigate("contact")} className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-[#0071C5] hover:text-[#00C7FD] transition-colors">
                Request Resource
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={1.5} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
