"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import { FloatingDots } from "./floating-dots";
import { HERO_VARIANT_IMAGE, type HeroVariant } from "@/lib/hero-visuals";
export type { HeroVariant } from "@/lib/hero-visuals";

interface VideoHeroProps {
  variant?: HeroVariant;
  tag: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
  /** Legacy flag retained for page compatibility; full-height alignment now applies to desktop only. */
  fullViewport?: boolean;
}

export function VideoHero({ variant = "abstract", tag, title, subtitle, children }: VideoHeroProps) {
  return (
    // All pages clear the fixed header. Mobile/tablet height is driven by
    // actual content; wide desktop uses a full first-screen minimum; tablet landscape stays content-sized.
    <section className="relative isolate mt-[74px] flex min-h-[min(640px,calc(100svh-74px))] items-center overflow-hidden bg-[#001E3C] sm:min-h-[min(760px,calc(92svh-74px))] xl:min-h-[calc(100svh-74px)]">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={HERO_VARIANT_IMAGE[variant]}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#001E3C]/95 via-[#002B5C]/85 to-[#001E3C]/95" />
        <div className="absolute inset-0 intel-gradient-mesh opacity-70" />
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        {/* Floating accent orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#00C7FD]/10 blur-3xl float-anim" />
        <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-[#0071C5]/15 blur-3xl float-anim" style={{ animationDelay: "3s" }} />

        {/* Floating dots traveling ALONG the geometric paths — matches the variant */}
        <FloatingDots variant={variant} idSuffix={`-${variant}`} />

        <div className="scan-line motion-reduce:hidden" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#001E3C] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-9 sm:py-9 lg:px-14 lg:py-10 xl:px-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-[790px]">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 backdrop-blur px-3 sm:px-4 py-1.5 mb-4 sm:mb-5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#00C7FD] opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00C7FD]" />
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#00C7FD] font-display font-semibold">{tag}</span>
          </div>
          <h1 className="max-w-[790px] font-display text-[clamp(1.875rem,7.2vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.045em] text-white sm:text-[clamp(2.125rem,4vw,3.5rem)] sm:leading-[1.12]">{title}</h1>
          <p className="mt-4 max-w-[36rem] text-[13px] leading-[1.65] text-[#CDDFEB] sm:mt-4 sm:text-[15px] sm:leading-[1.7] lg:text-[16px] lg:leading-[1.7]">{subtitle}</p>
          {children && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}