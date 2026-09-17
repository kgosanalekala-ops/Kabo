"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import { FloatingDots } from "./floating-dots";

export type HeroVariant = "datacenter" | "network" | "security" | "smartcity" | "abstract";

interface VideoHeroProps {
  variant?: HeroVariant;
  tag: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
}

const VARIANT_IMAGE: Record<HeroVariant, string> = {
  datacenter: "/images/sol_datacenter.jpg",
  network: "/images/sol_campus.jpg",
  security: "/images/sol_government.jpg",
  smartcity: "/images/sol_smartcity.jpg",
  abstract: "/images/sol_noc.jpg",
};

export function VideoHero({ variant = "abstract", tag, title, subtitle, children }: VideoHeroProps) {
  return (
    <section className="relative min-h-[78vh] sm:min-h-[80vh] flex items-center overflow-hidden bg-[#001E3C]">
      <div className="absolute inset-0 z-0">
        <Image
          src={VARIANT_IMAGE[variant]}
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

        <div className="scan-line" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#001E3C] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-4xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#00C7FD]/30 bg-[#00C7FD]/10 backdrop-blur px-3 sm:px-4 py-1.5 mb-5 sm:mb-7">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#00C7FD] opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00C7FD]" />
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#00C7FD] font-display font-semibold">{tag}</span>
          </div>
          <h1 className="text-[2rem] sm:text-5xl lg:text-7xl font-bold text-white font-display leading-[1.04] tracking-tight">{title}</h1>
          <p className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-xl text-white/75 leading-relaxed max-w-2xl">{subtitle}</p>
          {children && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
