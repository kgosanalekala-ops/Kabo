"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { usePage, type Page } from "./page-context";
import { cn } from "@/lib/utils";

/** An editorial, restrained header: easy to scan, with complete secondary navigation. */
const PRIMARY: { label: string; page: Page }[] = [
  { label: "Solutions", page: "solutions" },
  { label: "Products", page: "products" },
  { label: "Industries", page: "industries" },
];

const GROUPS: { title: string; links: { label: string; page: Page; description?: string }[] }[] = [
  {
    title: "Plan & source",
    links: [
      { label: "Services", page: "services", description: "What we deliver" },
      { label: "Procurement", page: "procurement", description: "Hardware & supply" },
      { label: "Solution configurator", page: "configure", description: "Shape your requirement" },
    ],
  },
  {
    title: "Discover KABO",
    links: [
      { label: "About", page: "about", description: "Our company" },
      { label: "Partners", page: "partners", description: "Technology portfolios" },
      { label: "Case studies", page: "case-studies", description: "Reference scenarios" },
      { label: "Support", page: "support", description: "Get assistance" },
      { label: "Contact", page: "contact", description: "Talk to us" },
    ],
  },
];

export function Navbar() {
  const { currentPage, navigate } = usePage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMoreOpen(false); }, [currentPage]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMoreOpen(false); setMobileOpen(false); }
    };
    const onOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) setMoreOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      window.removeEventListener("keydown", onEscape);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);

  const go = (page: Page) => {
    navigate(page);
    setMobileOpen(false);
    setMoreOpen(false);
  };

  const active = (page: Page) =>
    currentPage === page ||
    (page === "solutions" && ["solution-detail", "architecture", "configure"].includes(currentPage)) ||
    (page === "products" && ["product-detail", "procurement"].includes(currentPage)) ||
    (page === "industries" && currentPage === "industry-detail");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transform-gpu transition-[background-color,border-color] duration-300",
        scrolled || mobileOpen || moreOpen
          ? "border-b border-white/10 bg-[#03182D] backdrop-blur-xl"
          : "border-b border-white/10 bg-[#03182D] backdrop-blur-lg"
      )}
    >
      <nav aria-label="Main navigation" className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-9 lg:px-14 xl:px-20">
        <button
          type="button"
          onClick={() => go("home")}
          className="flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5BDCF7]"
          aria-label="KABO IT Group — home"
        >
          <Image src="/logos/kabo-logo-white.png" alt="KABO IT Group" width={140} height={36} priority className="h-[28px] w-auto sm:h-[32px]" />
        </button>

        <div className="ml-auto hidden items-center gap-7 lg:flex xl:gap-10">
          {PRIMARY.map((item) => (
            <button
              key={item.page}
              type="button"
              onClick={() => go(item.page)}
              aria-current={active(item.page) ? "page" : undefined}
              className={cn(
                "border-b border-transparent py-2 text-[12px] font-medium tracking-[0.015em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5BDCF7] xl:text-[13px]",
                active(item.page) ? "border-[#5BDCF7] text-white" : "text-white/70 hover:text-white"
              )}
            >
              {item.label}
            </button>
          ))}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((previous) => !previous)}
              aria-expanded={moreOpen}
              aria-controls="kabo-more-navigation"
              aria-haspopup="true"
              className={cn(
                "inline-flex items-center gap-1.5 py-2 text-[12px] font-medium tracking-[0.015em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5BDCF7] xl:text-[13px]",
                moreOpen ? "text-white" : "text-white/70 hover:text-white"
              )}
            >
              Explore
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", moreOpen && "rotate-180")} strokeWidth={1.6} />
            </button>
            {moreOpen && (
              <div
                id="kabo-more-navigation"
                className="absolute right-0 top-[calc(100%+18px)] grid w-[435px] grid-cols-2 gap-6 rounded-xl border border-white/15 bg-[#061e36]/98 p-6 shadow-[0_22px_65px_rgba(0,0,0,0.40)] backdrop-blur-xl"
              >
                {GROUPS.map((group) => (
                  <div key={group.title}>
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#6BCFEA]">{group.title}</p>
                    <div className="space-y-0.5">
                      {group.links.map((link) => (
                        <button
                          type="button"
                          key={link.page}
                          onClick={() => go(link.page)}
                          className="group block w-full rounded-md px-2 py-2.5 text-left transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#5BDCF7]"
                        >
                          <span className="block text-[13px] font-medium text-white/90 group-hover:text-[#5BDCF7]">{link.label}</span>
                          {link.description && <span className="mt-0.5 block text-[11px] text-white/45">{link.description}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => go("rfq")}
          className="ml-1 hidden shrink-0 items-center gap-3 border border-[#5BDCF7]/55 px-4 py-2.5 text-[12px] font-medium text-white/95 transition-[background-color,border-color] hover:border-[#5BDCF7] hover:bg-[#5BDCF7]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5BDCF7] sm:inline-flex"
        >
          Request a quote <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} />
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen((previous) => !previous)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#5BDCF7] lg:hidden"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="kabo-mobile-navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.8} /> : <Menu className="h-5 w-5" strokeWidth={1.8} />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="kabo-mobile-navigation"
          aria-label="Mobile navigation"
          className="max-h-[calc(100dvh-74px)] overflow-y-auto overscroll-contain border-t border-white/10 bg-[#03182D] px-5 pb-8 pt-5 sm:px-8 lg:hidden"
        >
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#5BDCF7]">Explore</p>
          {PRIMARY.map((item) => (
            <button
              type="button"
              key={item.page}
              onClick={() => go(item.page)}
              className="block w-full border-b border-white/10 py-3.5 text-left text-[16px] font-medium text-white/90 focus-visible:outline-2 focus-visible:outline-[#5BDCF7]"
            >
              {item.label}
            </button>
          ))}
          <div className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-2">
            {GROUPS.map((group) => (
              <div key={group.title}>
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#5BDCF7]">{group.title}</p>
                {group.links.map((link) => (
                  <button
                    type="button"
                    key={link.page}
                    onClick={() => go(link.page)}
                    className="block w-full py-2.5 text-left text-[14px] font-normal text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#5BDCF7]"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go("rfq")}
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#40D5F4] px-5 py-3 text-sm font-semibold text-[#04182e] sm:hidden"
          >
            Request a quote <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </header>
  );
}