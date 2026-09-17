"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { usePage, type Page } from "./page-context";
import { cn } from "@/lib/utils";

const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: "About", page: "about" },
  { label: "Solutions", page: "solutions" },
  { label: "Products", page: "products" },
  { label: "Industries", page: "industries" },
  { label: "Services", page: "services" },
  { label: "Support", page: "support" },
];

export function Navbar() {
  const { currentPage, navigate } = usePage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open.
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  const go = (page: Page) => {
    navigate(page);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        // `fixed top-0` keeps the design where the hero goes under the
        // transparent navbar (intentional on desktop and mobile).
        //
        // Mobile-drift fix:
        //  - `transform-gpu` + `will-change-transform` forces the header
        //    onto its own GPU-composited layer. On iOS Safari and Chrome
        //    Android, `position: fixed` elements otherwise repaint on
        //    every scroll tick and drift visibly when the URL bar
        //    collapses. Promoting to a composited layer eliminates the
        //    drift — the layer moves with the page without repainting.
        //  - `transition-colors` (instead of `transition-all`) so the
        //    padding change between scrolled/not-scrolled doesn't
        //    animate the navbar's height mid-scroll, which on mobile
        //    read as "navbar not staying in place".
        "fixed top-0 inset-x-0 z-50 transform-gpu will-change-transform",
        "transition-colors duration-300",
        scrolled
          ? "bg-[#001E3C]/95 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-4 sm:py-5"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-3 group" aria-label="KABO IT Group — home">
          <Image src="/logos/kabo-logo-white.png" alt="KABO IT Group" width={140} height={36} className="h-8 sm:h-9 w-auto transition-transform group-hover:scale-105" priority />
        </button>
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.page || (item.page === "solutions" && currentPage === "solution-detail") || (item.page === "products" && currentPage === "product-detail") || (item.page === "industries" && currentPage === "industry-detail") || (item.page === "partners" && currentPage === "partner-detail");
            return (
              <button key={item.page} onClick={() => go(item.page)} className={cn("px-4 py-2 text-sm font-medium font-display transition-colors relative", isActive ? "text-[#00C7FD]" : "text-white/80 hover:text-white")}>
                {item.label}
                {isActive && <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-3 right-3 h-0.5 bg-[#00C7FD] rounded-full" />}
              </button>
            );
          })}
        </div>
        <div className="hidden lg:block">
          <button onClick={() => go("contact")} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0071C5]/20 hover:shadow-xl hover:scale-[1.03] transition-all">
            Get in Touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </button>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-white hover:bg-white/10" aria-label="Toggle menu" aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
        </button>
      </nav>
      {mobileOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-[#001E3C]/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button key={item.page} onClick={() => go(item.page)} className="block w-full text-left px-4 py-3 text-base font-medium text-white/90 hover:bg-white/5 hover:text-[#00C7FD] rounded-lg transition-colors font-display">
                {item.label}
              </button>
            ))}
            <button onClick={() => go("contact")} className="block w-full text-center mt-3 rounded-full bg-gradient-to-r from-[#0071C5] to-[#00C7FD] px-5 py-3 text-sm font-semibold text-white">
              Get in Touch
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
