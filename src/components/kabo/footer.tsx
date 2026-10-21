"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { usePage, type Page } from "./page-context";

const LINKS: { heading: string; items: { label: string; page: Page }[] }[] = [
  { heading: "Solutions", items: [{ label: "AI Infrastructure", page: "solutions" }, { label: "Compute & Storage", page: "solutions" }, { label: "Networking Fabric", page: "solutions" }, { label: "Cybersecurity", page: "solutions" }, { label: "Cloud & Hybrid", page: "solutions" }] },
  { heading: "Company", items: [{ label: "Home", page: "home" }, { label: "About KABO", page: "about" }, { label: "Industries", page: "industries" }, { label: "Services", page: "services" }, { label: "Partner Ecosystem", page: "partners" }] },
  { heading: "Resources", items: [{ label: "Products", page: "products" }, { label: "ICT Procurement", page: "procurement" }, { label: "Request a Quote", page: "rfq" }, { label: "Support Portal", page: "support" }, { label: "Contact", page: "contact" }] },
];

export function Footer() {
  const { navigate } = usePage();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!privacyOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setPrivacyOpen(false); };
    const prevScroll = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);
    return () => { window.removeEventListener("keydown", onEscape); document.body.style.overflow = prevScroll; previous?.focus(); };
  }, [privacyOpen]);
  return (
    <footer className="bg-[#001E3C] text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern-dark opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00C7FD]/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Image src="/logos/kabo-logo-white.png" alt="KABO IT Group" width={180} height={46} className="h-10 w-auto mb-5" />
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Based in Pretoria, South Africa, KABO supplies ICT infrastructure, workplace technology and consumables, and develops integrated technology solution proposals for customer requirements.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 px-3 py-1">
              <span className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold">
                Powering Africa&rsquo;s Intelligent Infrastructure
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
              (e.g. "Cybersecurity") wrap inside the column instead
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
              <a href="https://wa.me/27612854418" target="_blank" rel="noopener noreferrer" className="hover:text-[#00C7FD] transition-colors">WhatsApp sales enquiries</a><br />
              <a href="tel:+27612854418" className="hover:text-[#00C7FD] transition-colors">+27 612 85 4418</a>
            </p>
          </div>
          <div>
            <div className="text-xs tracking-[0.18em] uppercase text-[#00C7FD] font-display font-semibold mb-2">Start a project</div>
            <button onClick={() => navigate("contact")} className="inline-flex items-center gap-2 text-white/90 hover:text-[#00C7FD] transition-colors font-medium">
              Start a conversation
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/50">&copy; {new Date().getFullYear()} KABO IT Group. All rights reserved.</p>
          <button type="button" onClick={()=>setPrivacyOpen(true)} className="text-xs text-white/70 hover:text-[#00c7fd] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#00c7fd]">Privacy &amp; content rights</button>
        </div>
      </div>
      {privacyOpen && <div className="fixed inset-0 z-[100] bg-[#001122]/85 backdrop-blur-sm flex items-center justify-center p-4" role="presentation" onMouseDown={e => {if(e.target===e.currentTarget)setPrivacyOpen(false);}}>
        <section role="dialog" aria-modal="true" aria-labelledby="privacy-title" className="bg-white text-[#001e3c] rounded-[24px] p-6 sm:p-9 shadow-2xl w-full max-w-xl max-h-[85dvh] overflow-y-auto">
          <div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase text-[#0071c5] font-semibold tracking-[.18em]">KABO IT Group</p><h2 id="privacy-title" className="font-display text-2xl font-bold mt-2">Privacy &amp; content rights</h2></div><button ref={closeRef} onClick={()=>setPrivacyOpen(false)} aria-label="Close privacy information" className="rounded-full border border-slate-200 p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071c5]">Close</button></div>
          <p className="mt-6 leading-relaxed text-[#486078]">KABO uses information you submit in enquiry and quotation forms to respond to your request. Do not submit passwords or highly sensitive information through these forms. Message delivery may involve the selected email or messaging service.</p>
          <p className="mt-4 leading-relaxed text-[#486078]">This website does not request optional marketing-cookie consent where no optional tracking is enabled. Privacy controls and notices must be updated before such technologies are introduced.</p>
          <p className="mt-4 leading-relaxed text-[#486078]">Original site copy, branded illustrations and downloadable KABO materials are protected by copyright. Third-party OEM names and trademarks remain the property of their respective owners. Written permission is required to republish original KABO content.</p>
          <p className="mt-4 text-sm text-[#516b81]">For privacy or intellectual property enquiries, contact <a href="mailto:info@kaboitgroup.co.za" className="underline text-[#0071c5]">info@kaboitgroup.co.za</a>.</p>
        </section>
      </div>}
    </footer>
  );
}
