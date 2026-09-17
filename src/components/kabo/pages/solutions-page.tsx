"use client";

import { VideoHero } from "../video-hero";
import { Solutions } from "../solutions";
import { ArrowRight } from "lucide-react";
import { usePage } from "../page-context";
import { PartnerStrip } from "../partner-strip";
import { AIInfrastructure } from "../ai-infrastructure";

export function SolutionsPage() {
  const { navigate } = usePage();
  return (
    <>
      <VideoHero variant="network" tag="Solutions" title={<>{<>Solutions engineered</>}<br />for <span className="intel-text-gradient">Africa&rsquo;s reality</span>.</>} subtitle="Twelve interlocking solution domains — from compute and AI infrastructure to managed services and ITSM — engineered against your workload, not a vendor SKU. Click a card to see the technology stack.">
        <button onClick={() => navigate("partners")} className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 hover:border-[#00C7FD]/50 transition-all">
          Meet our partners
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </VideoHero>
      <Solutions variant="page" />
      <AIInfrastructure />
      <PartnerStrip context="these solutions" />
    </>
  );
}
