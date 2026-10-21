"use client";

import { useEffect, useState, type FocusEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { usePage, type Page } from "./page-context";
import { FloatingDots } from "./floating-dots";

type HeroSlide = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  primary: { label: string; page: Page };
  secondary: { label: string; page: Page };
  shortLabel: string;
};

/** Three KABO capability stories, not invented operating metrics or customer claims. */
const SLIDES: readonly HeroSlide[] = [
  {
    eyebrow: "Technology foundations",
    title: "Intelligence begins with",
    highlight: "infrastructure.",
    description:
      "From data centres and networks to AI-ready computing and secure environments, KABO brings the technology foundations together.",
    primary: { label: "Explore solutions", page: "solutions" },
    secondary: { label: "Start a project", page: "rfq" },
    shortLabel: "Infrastructure",
  },
  {
    eyebrow: "Networks & secure environments",
    title: "Build connected systems.",
    highlight: "Ready for what’s next.",
    description:
      "Plan resilient connectivity, campus networks, SD-WAN and integrated electronic security around the needs of your organisation.",
    primary: { label: "Discover solutions", page: "solutions" },
    secondary: { label: "Configure a solution", page: "configure" },
    shortLabel: "Connectivity",
  },
  {
    eyebrow: "Technology procurement",
    title: "The right technology.",
    highlight: "Sourced with purpose.",
    description:
      "From enterprise hardware and infrastructure platforms to workplace technology and consumables, connect your requirements to a practical supply solution.",
    primary: { label: "Explore products", page: "products" },
    secondary: { label: "Request a quote", page: "rfq" },
    shortLabel: "Procurement",
  },
];

/**
 * Cinematic three-scene landing hero. Keep the approved navigation untouched,
 * the real-world illustration constant, and the site's existing moving line / dot
 * artwork behind all interactive content. Each scene changes the entire text and
 * CTA block, with manual navigation and respectful automatic transitions.
 */
export function Hero() {
  const { navigate } = usePage();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [interaction, setInteraction] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const paused = manuallyPaused || hovered || focused || hidden;
  const slide = SLIDES[active];

  // Do not advance a hidden tab, a hovered/focused hero, or a reduced-motion UI.
  useEffect(() => {
    const onVisibilityChange = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    onVisibilityChange();
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const showSlide = (index: number) => {
    setActive(index);
    setInteraction((value) => value + 1);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  };

  return (
    <section
      aria-label="KABO technology solutions — featured stories"
      className="relative isolate flex min-h-[780px] items-center overflow-hidden bg-[#03182C] text-white sm:min-h-[760px] lg:min-h-[100svh]"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={handleBlur}
    >
      {/* A real-world technology illustration, not a claim about KABO premises. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[#03182C]" />
        <motion.div
          initial={reducedMotion ? false : { opacity: 0.45, scale: 1.045 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 1.8, ease: "easeOut" }}
          className="absolute inset-0 lg:left-[38%]"
        >
          <Image
            src="/images/sol_datacenter.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 65vw, 100vw"
            className="object-cover object-[50%_center] saturate-[0.86] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-[#03223D]/[0.08] mix-blend-multiply" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#03182C_0%,rgba(3,24,44,0.98)_27%,rgba(3,24,44,0.86)_47%,rgba(3,24,44,0.30)_75%,rgba(3,24,44,0.04)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(3,24,44,0.68)_0%,rgba(3,24,44,0.65)_24%,rgba(3,24,44,0.91)_62%,#03182C_100%)]" />
        {/* Identical animated travelling dots and lines to the other KABO section heroes. */}
        <div className="absolute inset-0 overflow-hidden opacity-50 motion-reduce:hidden lg:left-[38%] lg:opacity-90">
          <FloatingDots variant="datacenter" idSuffix="-landing" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#03182C] to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[780px] w-full max-w-[1440px] flex-col justify-center px-5 pb-36 pt-32 sm:min-h-[760px] sm:px-9 sm:pb-36 sm:pt-36 lg:min-h-[100svh] lg:px-14 lg:pb-32 xl:px-20">
        <div className="w-full max-w-[790px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -15 }}
              transition={{ duration: reducedMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Story ${active + 1} of ${SLIDES.length}: ${slide.shortLabel}`}
              className="flex min-h-[380px] flex-col justify-center sm:min-h-[410px]"
            >
              <div className="mb-6 flex items-center gap-3 sm:mb-7">
                <span className="h-[2px] w-8 shrink-0 bg-[#49D8F4]" aria-hidden="true" />
                <p className="text-[10px] font-medium uppercase tracking-[0.19em] text-[#B9D7E5] sm:text-[11px] sm:tracking-[0.24em]">
                  KABO IT GROUP <span className="mx-1.5 text-white/35">/</span> {slide.eyebrow}
                </p>
              </div>

              <h1
                className="max-w-[770px] font-display text-[clamp(2.5rem,6.2vw,5.2rem)] font-semibold leading-[1.075] tracking-[-0.047em] text-[#FCFFFF]"
              >
                <span className="block">{slide.title}</span>
                <span className="block bg-gradient-to-r from-[#80E8FD] via-[#34D2F7] to-[#63B8F6] bg-clip-text text-transparent">
                  {slide.highlight}
                </span>
              </h1>

              <p className="mt-6 max-w-[36rem] text-[14px] leading-[1.75] text-[#CDDFEB] sm:mt-7 sm:text-[16px] sm:leading-[1.8]">
                {slide.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-9">
                <button
                  type="button"
                  onClick={() => navigate(slide.primary.page)}
                  className="group inline-flex min-h-[50px] items-center justify-center gap-5 bg-[#54D9F7] px-6 py-3 text-[13px] font-semibold text-[#03182C] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#A0EDFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none sm:text-[14px]"
                >
                  {slide.primary.label}
                  <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" strokeWidth={1.8} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate(slide.secondary.page)}
                  className="group inline-flex min-h-12 items-center gap-2 border-b border-white/50 py-2 text-[13px] font-medium text-white transition-colors hover:border-[#71DFFF] hover:text-[#71DFFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[14px]"
                >
                  {slide.secondary.label}
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" strokeWidth={1.6} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal cinematic scene selector. Live slide transitions never steal screen-reader focus. */}
        <div className="absolute bottom-7 left-5 right-5 border-t border-white/20 pt-5 sm:bottom-9 sm:left-9 sm:right-9 lg:left-14 lg:right-14 xl:left-20">
          <div className="flex items-end justify-between gap-5">
            <div
              className="flex w-full max-w-[555px] items-start gap-3 sm:gap-6"
              aria-label="Choose featured story"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {SLIDES.map((item, index) => (
                <button
                  key={item.shortLabel}
                  type="button"
                  onClick={() => showSlide(index)}
                  aria-label={`Show story ${index + 1} of ${SLIDES.length}: ${item.shortLabel}`}
                  aria-pressed={active === index}
                  className="group relative min-h-11 flex-1 border-t border-white/25 pt-2 text-left transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#70E0F7]"
                >
                  {active === index && (
                    <span key={`${index}-${interaction}`} className="pointer-events-none absolute -top-px left-0 right-0 h-[2px] overflow-hidden">
                      <span
                        className="kabo-hero-slide-progress block h-full w-full origin-left bg-[#70E0F7]"
                        style={{ animationPlayState: paused ? "paused" : "running" }}
                        onAnimationEnd={(event) => {
                          if (event.animationName === "kabo-hero-slide-progress" && !paused && !reducedMotion) {
                            setActive((current) => (current + 1) % SLIDES.length);
                          }
                        }}
                      />
                    </span>
                  )}
                  <span className={`text-[10px] font-semibold tabular-nums tracking-[0.12em] sm:text-[11px] ${active === index ? "text-[#74DFF8]" : "text-white/45 group-hover:text-white/75"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`ml-2 hidden text-[11px] font-medium sm:inline lg:ml-3 ${active === index ? "text-white" : "text-white/55 group-hover:text-white/80"}`}>
                    {item.shortLabel}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setManuallyPaused((value) => !value);
                setFocused(false); // Explicit Play resumes even if the control retains keyboard focus.
              }}
              aria-label={manuallyPaused ? "Play automatic hero slides" : "Pause automatic hero slides"}
              aria-pressed={manuallyPaused}
              className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white/70 transition-colors hover:border-[#70E0F7] hover:text-[#70E0F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#70E0F7] motion-reduce:hidden"
            >
              {manuallyPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}