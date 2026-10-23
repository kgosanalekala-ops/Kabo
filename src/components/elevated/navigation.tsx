"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SOLUTIONS } from "@/components/kabo/data";
import { usePage, type Page } from "@/components/kabo/page-context";
import { SiteLink } from "./site-link";

const pages: { label: string; page: Page; description?: string }[] = [
  { label: "Home", page: "home" },
  { label: "Solutions", page: "solutions" },
  { label: "Products & technologies", page: "products" },
  { label: "Industries", page: "industries" },
  { label: "About KABO", page: "about" },
  { label: "Our services", page: "services" },
  { label: "Technology partners", page: "partners" },
  { label: "Case studies", page: "case-studies" },
  { label: "Support", page: "support" },
  { label: "Investors", page: "investors" },
  { label: "Contact", page: "contact" },
];

export function Navigation() {
  const { currentPage, selectedDetail } = usePage();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<"solutions" | "company" | null>(null);
  useEffect(() => {
    setOpen(false);
    setMega(null);
  }, [currentPage, selectedDetail]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMega(null);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="e-header">
        <div className="e-header-inner">
          <SiteLink
            page="home"
            className="e-logo"
            aria-label="KABO IT Group home"
          >
            <Image
              src="/logos/kabo-logo-dark.png"
              alt="KABO"
              width={165}
              height={47}
              priority
            />
          </SiteLink>
          <nav className="e-desktop-nav" aria-label="Primary navigation">
            <button
              aria-expanded={mega === "solutions"}
              aria-controls="solutions-menu"
              onClick={() => setMega(mega === "solutions" ? null : "solutions")}
            >
              Solutions <ChevronDown size={13} />
            </button>
            <SiteLink
              page="products"
              aria-current={
                currentPage.startsWith("product") ? "page" : undefined
              }
            >
              Products
            </SiteLink>
            <SiteLink
              page="industries"
              aria-current={
                currentPage.startsWith("industr") ? "page" : undefined
              }
            >
              Industries
            </SiteLink>
            <button
              aria-expanded={mega === "company"}
              aria-controls="company-menu"
              onClick={() => setMega(mega === "company" ? null : "company")}
            >
              Company <ChevronDown size={13} />
            </button>
          </nav>
          <div className="e-header-actions">
            <SiteLink page="contact" className="e-header-cta">
              Let’s talk{" "}
              <span>
                <ArrowUpRight size={17} />
              </span>
            </SiteLink>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button className="e-menu-button" aria-label="Open navigation">
                  <Menu size={22} />
                  <span>Menu</span>
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="e-nav-overlay" />
                <Dialog.Content
                  className="e-nav-dialog"
                  aria-describedby="nav-description"
                >
                  <div className="e-nav-top">
                    <Image
                      src="/logos/kabo-logo-dark.png"
                      alt="KABO"
                      width={135}
                      height={38}
                    />
                    <Dialog.Close
                      className="e-menu-close"
                      aria-label="Close navigation"
                    >
                      <X size={24} />
                    </Dialog.Close>
                  </div>
                  <span className="e-eyebrow">
                    A connected world of possibilities
                  </span>
                  <Dialog.Title>Explore KABO.</Dialog.Title>
                  <Dialog.Description id="nav-description" className="sr-only">
                    Browse our solutions, business and support pages.
                  </Dialog.Description>
                  <nav aria-label="All pages" className="e-nav-links">
                    {pages.map((item, i) => (
                      <SiteLink
                        key={item.page}
                        page={item.page}
                        aria-current={
                          currentPage === item.page ? "page" : undefined
                        }
                      >
                        <span className="e-nav-number">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                        <ArrowUpRight size={19} />
                      </SiteLink>
                    ))}
                  </nav>
                  <div className="e-nav-bottom">
                    <span>
                      Intelligent infrastructure.
                      <br />
                      Engineered to perform.
                    </span>
                    <span>
                      South Africa
                      <br />
                      B-BBEE Level 1
                    </span>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
        <AnimatePresence>
          {mega && (
            <>
              <motion.button
                className="e-mega-backdrop"
                aria-label="Close menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMega(null)}
              />
              <motion.div
                key={mega}
                id={`${mega}-menu`}
                className="e-mega"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="e-mega-intro">
                  <span className="e-eyebrow">
                    {mega === "solutions"
                      ? "Connected by design"
                      : "Meet your next technology partner"}
                  </span>
                  <h2>
                    {mega === "solutions"
                      ? "Every layer.\nOne partner."
                      : "Forward,\ntogether."}
                  </h2>
                  <SiteLink
                    page={mega === "solutions" ? "solutions" : "about"}
                    onClick={() => setMega(null)}
                    className="e-text-link"
                  >
                    {mega === "solutions"
                      ? "Explore all solutions"
                      : "Our story"}
                    <ArrowUpRight size={18} />
                  </SiteLink>
                </div>
                <nav
                  aria-label={
                    mega === "solutions" ? "Solution menu" : "Company menu"
                  }
                  className="e-mega-links"
                >
                  {mega === "solutions"
                    ? SOLUTIONS.map((solution, i) => (
                        <SiteLink
                          key={solution.slug}
                          page="solution-detail"
                          detail={solution.slug}
                          onClick={() => setMega(null)}
                        >
                          <span>{String(i + 1).padStart(2, "0")}</span>
                          {solution.shortTitle}
                          <ArrowUpRight size={14} />
                        </SiteLink>
                      ))
                    : pages.slice(4).map((item) => (
                        <SiteLink
                          key={item.page}
                          page={item.page}
                          onClick={() => setMega(null)}
                        >
                          {item.label}
                          <ArrowUpRight size={16} />
                        </SiteLink>
                      ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
