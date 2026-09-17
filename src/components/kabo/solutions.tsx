"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { SOLUTIONS } from "./data";
import { usePage } from "./page-context";
import { cn } from "@/lib/utils";

interface SolutionsProps { variant?: "home" | "page"; }

export function Solutions({ variant = "home" }: SolutionsProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { navigate } = usePage();
  const toggle = (slug: string) => setExpanded((cur) => (cur === slug ? null : slug));

  return (
    <section className={cn("relative py-20 sm:py-28", variant === "home" ? "bg-white" : "bg-[#F5F9FC]")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0071C5]/20 bg-[#0071C5]/5 px-3 py-1 mb-4">
            <Layers3 className="h-3.5 w-3.5 text-[#0071C5]" strokeWidth={1.5} />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">
              Twelve Solution Domains &middot; A Unified Infrastructure Fabric
            </span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001E3C] font-display leading-tight">
            Twelve interlocking domains. From the intelligent core to the{" "}
            <span className="intel-text-gradient">productive edge</span>.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#5A6B7C] leading-relaxed">
            Each domain is engineered to interoperate with the next under a unified architecture — no orphan SKUs, no accountability gaps. Hover a card to pull up the technology stack.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SOLUTIONS.map((sol, i) => {
            const Icon = sol.icon;
            const isOpen = expanded === sol.slug;
            return (
              <motion.div
                key={sol.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="kabo-card group"
              >
                {/* Media — real image with navy gradient overlay */}
                <div className="kabo-card-media">
                  <Image
                    src={sol.image}
                    alt={sol.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 z-[3] inline-flex items-center justify-center h-11 w-11 rounded-xl bg-white/95 backdrop-blur shadow-lg ring-1 ring-black/5">
                    <Icon className="h-5 w-5 text-[#0071C5]" strokeWidth={1.5} />
                  </div>
                  <div className="absolute top-3 right-3 z-[3] text-xs font-mono text-white/70 backdrop-blur-sm bg-black/20 rounded px-1.5 py-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 z-[3]">
                    <h3 className="text-lg font-bold text-white font-display leading-tight drop-shadow-sm">
                      {sol.shortTitle}
                    </h3>
                  </div>
                  <div className="kabo-card-accent" />
                  {/* Pull-up overlay on hover */}
                  <div className="kabo-card-overlay">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-[#00C7FD] font-display font-semibold mb-2">
                      Technology Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {sol.stack.slice(0, 8).map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center rounded-md bg-white/10 border border-white/15 px-2 py-0.5 text-[11px] font-medium text-white"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-white/70 leading-relaxed line-clamp-3">
                      {sol.tagline}
                    </div>
                  </div>
                </div>

                {/* Body — visible content + actions */}
                <div className="kabo-card-body">
                  <p className="text-sm text-[#5A6B7C] leading-relaxed line-clamp-2">{sol.tagline}</p>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-[#DCE6EF]">
                          <div className="text-xs tracking-[0.18em] uppercase text-[#0071C5] font-display mb-3">
                            Technology Stack
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {sol.stack.map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center rounded-md bg-[#F1F6FB] px-2.5 py-1 text-xs font-medium text-[#003865]"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="mt-5 flex items-center gap-2">
                    <button
                      onClick={() => toggle(sol.slug)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE6EF] px-3 py-2 text-sm font-medium text-[#003865] hover:border-[#00C7FD] hover:text-[#0071C5] transition-colors"
                    >
                      {isOpen ? "Hide Stack" : "View Stack"}
                    </button>
                    <button
                      onClick={() => navigate("solution-detail", sol.slug)}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-[#001E3C] px-3 py-2 text-sm font-medium text-white hover:bg-[#0071C5] transition-colors group/btn"
                    >
                      Learn More
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
