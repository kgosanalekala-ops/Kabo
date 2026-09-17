"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, Tag, Target, Building2 } from "lucide-react";
import { VideoHero, type HeroVariant } from "../video-hero";
import { PRODUCT_CATEGORIES, type ProductCategory } from "../products-data";
import { INDUSTRIES } from "../industries-data";
import { ICON_MAP } from "../icon-map";
import { SOLUTIONS } from "../data";
import { usePage } from "../page-context";

interface ProductDetailPageProps { slug: string; }

const VARIANT_BY_SLUG: Record<string, HeroVariant> = {
  "ai-compute": "datacenter", "data-centre": "datacenter", "storage-resilience": "abstract",
  networking: "network", "cyber-security": "security", ccaas: "network",
  "document-management": "abstract", "digital-workplace": "abstract",
};

export function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const { navigate } = usePage();
  const product: ProductCategory = PRODUCT_CATEGORIES.find((p) => p.slug === slug) ?? PRODUCT_CATEGORIES[0];
  const Icon = ICON_MAP[product.icon] ?? ICON_MAP.Server;
  const variant = VARIANT_BY_SLUG[product.slug] ?? "abstract";
  const relatedIndustries = INDUSTRIES.filter((ind) => product.relatedIndustries.includes(ind.slug));

  return (
    <>
      <VideoHero variant={variant} tag={product.name} title={<>{product.name.split(" ").slice(0, -1).join(" ")} <span className="intel-text-gradient">{product.name.split(" ").slice(-1).join(" ")}</span></>} subtitle={product.tagline}>
        <button onClick={() => navigate("products")} className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 hover:border-[#00C7FD]/50 transition-all">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
          Back to Products
        </button>
      </VideoHero>
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="relative rounded-3xl bg-gradient-to-br from-[#001E3C] via-[#003865] to-[#001E3C] p-8 sm:p-12 lg:p-14 overflow-hidden">
              <div className="absolute inset-0 grid-pattern-dark opacity-40" />
              <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[#00C7FD]/15 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#0071C5]/15 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-[#00C7FD] mb-6">
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display mb-3">Product Category</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">{product.name}</h2>
                <p className="mt-4 text-base text-white/80 leading-relaxed">{product.tagline}</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }}>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Overview</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#001E3C] font-display leading-tight">Engineered, not resold</h2>
              <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">{product.overview}</p>
              <button onClick={() => navigate("contact")} className="mt-8 group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl hover:scale-[1.03] transition-all">
                Discuss This Product
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-24 bg-[#F5F9FC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">Capabilities</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">What this category delivers</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {product.capabilities.map((cap, i) => (
              <motion.div key={cap.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl border border-[#DCE6EF] bg-white p-6 card-hover">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#0071C5]/10 to-[#00C7FD]/10 text-[#0071C5] mb-4">
                  <Cpu className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-[#001E3C] font-display mb-2 leading-tight">{cap.name}</h3>
                <p className="text-sm text-[#5A6B7C] leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0071C5]/20 bg-[#0071C5]/5 px-3 py-1 mb-4">
              <Tag className="h-3.5 w-3.5 text-[#0071C5]" strokeWidth={1.5} />
              <span className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display">Technologies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">The platforms and products we integrate</h2>
            <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">Each technology below is supplied, configured and supported by KABO under one contract &mdash; sourced from our partner ecosystem.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {product.technologies.map((tech, i) => (
              <motion.span key={tech} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }} className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE6EF] bg-[#F5F9FC] px-3.5 py-2 text-sm font-medium text-[#003865]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-24 bg-[#001E3C] overflow-hidden">
        <div className="absolute inset-0 intel-gradient-mesh opacity-90" />
        <div className="absolute inset-0 grid-pattern-dark opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1 mb-4">
                <Target className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
                <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display">Related Solutions</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">KABO solutions featuring this category</h3>
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.relatedSolutions.map((s) => {
                  const sol = SOLUTIONS.find((x) => x.slug === s);
                  const label = sol ? sol.shortTitle : s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                  return (
                    <button key={s} onClick={() => navigate("solution-detail", s)} className="rounded-xl intel-glass p-4 text-left card-hover">
                      <div className="text-base font-semibold text-white font-display leading-snug">{label}</div>
                      <div className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#00C7FD]">
                        View solution
                        <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1 mb-4">
                <Building2 className="h-3.5 w-3.5 text-[#00C7FD]" strokeWidth={1.5} />
                <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display">Related Industries</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">Verticals where this category lands</h3>
              <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {relatedIndustries.length > 0 ? (
                  relatedIndustries.map((ind) => {
                    const IndustryIcon = ICON_MAP[ind.icon] ?? ICON_MAP.Server;
                    return (
                      <button key={ind.slug} onClick={() => navigate("industry-detail", ind.slug)} className="rounded-xl intel-glass p-4 text-left card-hover">
                        <IndustryIcon className="h-5 w-5 text-[#00C7FD] mb-2" strokeWidth={1.5} />
                        <div className="text-sm font-semibold text-white font-display leading-snug">{ind.name}</div>
                      </button>
                    );
                  })
                ) : (
                  <div className="col-span-2 rounded-xl intel-glass p-4 text-sm text-white/70">Industry-specific deployments on request.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001E3C] font-display leading-tight">Ready to deploy {product.name.toLowerCase()}?</h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A6B7C] max-w-2xl mx-auto">One conversation replaces a queue of vendors. Let&rsquo;s talk about your {product.name.toLowerCase()} requirement.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => navigate("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#0071C5]/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
              Discuss This Product
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </button>
            <button onClick={() => navigate("products")} className="inline-flex items-center gap-2 rounded-full border border-[#DCE6EF] px-6 py-3.5 text-base font-semibold text-[#003865] hover:border-[#00C7FD] hover:text-[#0071C5] transition-colors">
              <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
              Back to Products
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
