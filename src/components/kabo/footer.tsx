"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { usePage, type Page } from "./page-context";

const LINKS: { heading: string; items: { label: string; page: Page }[] }[] = [
  { heading: "Solutions", items: [{ label: "AI Infrastructure", page: "solution-detail" }, { label: "Compute & Storage", page: "solutions" }, { label: "Networking Fabric", page: "solutions" }, { label: "Cybersecurity & SOC", page: "solutions" }, { label: "Cloud & Hybrid", page: "solutions" }] },
  { heading: "Company", items: [{ label: "Home", page: "home" }, { label: "About KABO", page: "about" }, { label: "Industries", page: "industries" }, { label: "Services", page: "services" }, { label: "Partner Ecosystem", page: "partners" }] },
  { heading: "Resources", items: [{ label: "Products", page: "products" }, { label: "Support Portal", page: "support" }, { label: "Investors", page: "investors" }, { label: "Contact", page: "contact" }] },
];

export function Footer() {
  const { navigate } = usePage();
  return (
    <footer className="bg-[#001E3C] text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern-dark opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00C7FD]/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Image src="/logos/kabo-logo-white.png" alt="KABO IT Group" width={180} height={46} className="h-10 w-auto mb-5" />
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Gauteng-established systems integrator delivering enterprise-grade compute, data, networking, security and AI infrastructure. Fifteen strategic alliances, twelve interlocking domains, a unified architecture — engineered end-to-end. Nationwide footprint today, expanding into the broader African continent.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1">
              <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold">
                BBB-EE Level 1 &middot; 135%
              </span>
            </div>
          </div>
          {/*
            Mobile alignment fix:
            - `grid-cols-1` on the smallest screens so each link column
              gets its own row (no awkward 2-up wrapping where
              "Resources" sits alone in a row, off-balance with the
              "Solutions" column above).
            - `sm:grid-cols-3` from the small breakpoint up — by then
              there's room for all three columns side-by-side cleanly.
            - Each link button is `flex w-full text-left` so long labels
              (e.g. "Cybersecurity & SOC") wrap inside the column instead
              of pushing the column wider and breaking grid alignment.
            - Gap reduced to `gap-6` on mobile so the columns aren't
              spread too far apart on a narrow screen.
          */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {LINKS.map((col) => (
              <div key={col.heading} className="min-w-0">
                <h4 className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item.label} className="min-w-0">
                      <button
                        onClick={() => navigate(item.page)}
                        className="group flex w-full items-center gap-1.5 text-left text-sm text-white/70 hover:text-white transition-colors"
                      >
                        <span className="min-w-0 break-words">{item.label}</span>
                        <ArrowRight
                          className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0"
                          strokeWidth={1.5}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 grid sm:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold mb-2">Registered Address</div>
            <p className="text-white/70 leading-relaxed">12886 Masemola Street<br />Mamelodi East, Pretoria, 0122<br />South Africa</p>
          </div>
          <div>
            <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold mb-2">Engage KABO</div>
            <p className="text-white/70 leading-relaxed">
              <a href="mailto:info@kaboitgroup.co.za" className="hover:text-[#00C7FD] transition-colors">info@kaboitgroup.co.za</a><br />
              <a href="mailto:support@kaboitgroup.co.za" className="hover:text-[#00C7FD] transition-colors">support@kaboitgroup.co.za</a><br />
              <a href="tel:+27612854418" className="hover:text-[#00C7FD] transition-colors">+27 612 85 4418</a>
            </p>
          </div>
          <div>
            <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold mb-2">Engage KABO</div>
            <button onClick={() => navigate("contact")} className="inline-flex items-center gap-2 text-white/90 hover:text-[#00C7FD] transition-colors font-medium">
              Start a conversation
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/50">&copy; {new Date().getFullYear()} KABO IT Group. All rights reserved.</p>
          <p className="text-xs text-white/50">POPIA-aligned &middot; BBB-EE Level 1 &middot; Sovereign African ICT</p>
        </div>
      </div>
    </footer>
  );
}
