"use client";

import { ArrowRight } from "lucide-react";
import { usePage } from "./page-context";

interface PartnerStripProps { context?: string; }

export function PartnerStrip({ context = "our solutions" }: PartnerStripProps) {
  const { navigate } = usePage();
  return (
    <section className="py-16 sm:py-20 bg-[#F5F9FC] border-y border-[#DCE6EF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#0071C5] font-display">
          Leading OEM Partners
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001E3C] font-display leading-tight">
          Fifteen strategic alliances power {context}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#5A6B7C] max-w-2xl mx-auto leading-relaxed">
          HPE, Dell, Microsoft, Veeam, Fortinet, Sophos, Palo Alto, Pure Storage, Commvault, Juniper, Schneider, Huawei, ManageEngine, H3C and Hikvision — engineered into one architecture under one contract.
        </p>
        <button onClick={() => navigate("partners")} className="mt-7 group inline-flex items-center gap-2 rounded-full bg-[#001E3C] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0071C5] transition-colors">
          Explore Our Partner Ecosystem
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
