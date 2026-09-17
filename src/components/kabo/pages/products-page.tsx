"use client";

import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { VideoHero } from "../video-hero";
import { PRODUCT_CATEGORIES } from "../products-data";
import { ICON_MAP } from "../icon-map";
import { usePage } from "../page-context";
import { PartnerStrip } from "../partner-strip";
import { AIInfrastructure } from "../ai-infrastructure";

export function ProductsPage() {
  const { navigate } = usePage();
  return (
    <>
      <VideoHero variant="datacenter" tag="Products & Technologies" title={<>{<>Products &amp; Technologies</>}<br /><span className="intel-text-gradient">One curated</span> technology portfolio.</>} subtitle="Ten product categories across fifteen strategic alliances and a broader vendor estate — from AI compute and cloud infrastructure through to digital workplace.">
        <button onClick={() => navigate("partners")} className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 hover:border-[#00C7FD]/50 transition-all">
          Meet our partners
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </VideoHero>
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Ten product categories</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">One curated technology portfolio</h2>
            <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
              KABO curates technology across fifteen strategic alliances and a broader vendor estate into ten product categories &mdash; from <strong className="text-[#003865]">AI compute and cloud infrastructure</strong> through to digital workplace. Each engineered to integrate with the next. No orphan SKUs, no orphan accountability.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {PRODUCT_CATEGORIES.map((product, i) => {
              const Icon = ICON_MAP[product.icon] ?? ICON_MAP.Server;
              return (
                <motion.button key={product.slug} onClick={() => navigate("product-detail", product.slug)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: (i % 3) * 0.08 }} className="group relative rounded-2xl border border-[#DCE6EF] bg-white p-6 sm:p-7 text-left card-hover overflow-hidden">
                  <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tl from-[#0071C5]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#001E3C] text-[#00C7FD] mb-5 group-hover:bg-gradient-to-br group-hover:from-[#0071C5] group-hover:to-[#00C7FD] group-hover:text-white transition-all duration-300">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#001E3C] font-display mb-2 leading-tight">{product.name}</h3>
                    <p className="text-sm text-[#5A6B7C] leading-relaxed line-clamp-3">{product.tagline}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071C5] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Explore category
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-[#F5F9FC]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001E3C] font-display leading-tight">Looking for a specific SKU?</h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6B7C] max-w-2xl mx-auto">We supply, configure and support the full portfolio of every partner we represent. Tell us what you need &mdash; we&rsquo;ll route it to the right specialist.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
              Talk to a product specialist
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>
      <AIInfrastructure />
      <PartnerStrip context="these product categories" />
    </>
  );
}
