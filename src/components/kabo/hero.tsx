"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { usePage } from "./page-context";

/**
 * KABO flagship entrance: one message, one strong photograph, no floating cards.
 * The photographic background is an illustrative infrastructure image, not a
 * claim that KABO owns the facility pictured.
 */
export function Hero() {
  const { navigate } = usePage();
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : delay, ease: "easeOut" as const },
  });

  return (
    <section
      aria-labelledby="kabo-hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#04182e] text-white"
    >
      {/* Let the architecture speak. The image is part of the composition,
          not a canvas for floating interface cards or animated overlays. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/sol_datacenter.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[57%_center] opacity-85 lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,18,35,0.98)_0%,rgba(3,18,35,0.95)_25%,rgba(3,18,35,0.78)_48%,rgba(3,18,35,0.20)_100%)] max-lg:bg-[linear-gradient(90deg,rgba(3,18,35,0.97)_0%,rgba(3,18,35,0.85)_62%,rgba(3,18,35,0.43)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04182e]/85 via-transparent to-[#04182e]/40" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pb-28 sm:pt-40 lg:px-10 lg:pb-36 lg:pt-44">
        <div className="max-w-[58rem]">
          <motion.div {...reveal(0.08)} className="mb-7 flex items-center gap-3 sm:mb-10">
            <span className="h-px w-9 bg-[#40D5F4]" aria-hidden="true" />
            <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#A9C2D6] sm:text-xs">
              KABO IT GROUP&nbsp; / &nbsp;SOUTH AFRICA
            </span>
          </motion.div>

          <motion.h1
            {...reveal(0.16)}
            id="kabo-hero-title"
            className="max-w-[58rem] font-display text-[clamp(3.35rem,7.4vw,7.8rem)] font-semibold leading-[0.99] tracking-[-0.055em] text-white"
          >
            Building the <br className="hidden sm:block" />
            backbone of <br className="hidden sm:block" />
            <span className="text-[#5BDCF7]">what&rsquo;s next.</span>
          </motion.h1>

          <motion.p
            {...reveal(0.32)}
            className="mt-8 max-w-[34rem] text-[15px] leading-[1.8] text-[#B8C8D7] sm:mt-10 sm:text-[17px]"
          >
            Enterprise technology, intelligent infrastructure and procurement —
            brought together with clarity, precision and purpose.
          </motion.p>

          <motion.div {...reveal(0.45)} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5 sm:mt-12">
            <button
              onClick={() => navigate("solutions")}
              className="group inline-flex min-h-12 items-center justify-center gap-4 rounded-sm bg-[#40D5F4] px-6 py-3.5 text-[13px] font-semibold tracking-[0.01em] text-[#001E3C] shadow-[0_16px_55px_rgba(0,199,253,0.16)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#86E9FB] hover:shadow-[0_20px_55px_rgba(0,199,253,0.26)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none sm:text-sm"
            >
              Explore solutions
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" strokeWidth={1.7} />
            </button>
            <button
              onClick={() => navigate("rfq")}
              className="group inline-flex min-h-12 items-center gap-2 border-b border-white/45 py-2 text-[13px] font-medium tracking-[0.01em] text-white transition-colors hover:border-[#5BDCF7] hover:text-[#5BDCF7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-sm"
            >
              Request a quote
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" strokeWidth={1.7} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* A quiet scroll cue, not another information panel. */}
      <div className="pointer-events-none absolute bottom-6 left-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/55 sm:bottom-9 sm:left-8 lg:left-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
        <ArrowDownRight className="h-4 w-4 text-[#5BDCF7]" strokeWidth={1.5} aria-hidden="true" />
        Explore KABO
      </div>
    </section>
  );
}