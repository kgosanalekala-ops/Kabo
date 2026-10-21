"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { usePage } from "./page-context";
import { FloatingDots } from "./floating-dots";

/**
 * KABO flagship opening: an editorial statement and a real-world infrastructure
 * visual, not simulated UI or unsupported performance claims. The photograph
 * illustrates a data-centre environment; it is not presented as a KABO facility.
 */
export function Hero() {
  const { navigate } = usePage();
  const reducedMotion = useReducedMotion();

  const entrance = (delay: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reducedMotion ? 0 : 0.85,
      delay: reducedMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section
      aria-labelledby="kabo-hero-heading"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#03182C] text-white"
    >
      {/* An intentionally asymmetric composition. On desktop, the image is a
          clear architectural vista; on mobile, it becomes a cinematic backdrop. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[#03182C]" />
        <motion.div
          initial={reducedMotion ? false : { opacity: 0.35, scale: 1.065 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 1.6, ease: "easeOut" }}
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
        {/* Reuse the animated path lines and travelling dots from the other KABO hero sections.
            Keep the overlay over the photograph and behind all hero copy; respect reduced motion. */}
        <div className="absolute inset-0 overflow-hidden opacity-50 motion-reduce:hidden lg:left-[38%] lg:opacity-90">
          <FloatingDots variant="datacenter" idSuffix="-landing" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#03182C] to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-center px-5 pb-28 pt-32 sm:px-9 sm:pb-32 sm:pt-36 lg:px-14 lg:pb-28 xl:px-20">
        <div className="max-w-[940px]">
          <motion.div {...entrance(0.08)} className="mb-7 flex items-center gap-3.5 sm:mb-9">
            <span className="h-[2px] w-8 shrink-0 bg-[#49D8F4]" />
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#B9D7E5] sm:text-[11px] sm:tracking-[0.26em]">
              KABO IT GROUP <span className="mx-2 text-white/30">/</span> Technology foundations
            </p>
          </motion.div>

          <motion.h1
            id="kabo-hero-heading"
            {...entrance(0.16)}
            className="max-w-[940px] font-display text-[clamp(2.62rem,8.6vw,5rem)] font-semibold leading-[1.045] tracking-[-0.062em] text-[#FCFFFF] sm:text-[clamp(4.6rem,6.5vw,7.35rem)] sm:leading-[1.015]"
          >
            Intelligence<br />
            begins with<br />
            <span className="text-[#71DFFF]">infrastructure.</span>
          </motion.h1>

          <motion.p
            {...entrance(0.29)}
            className="mt-7 max-w-[31.5rem] text-[14px] leading-[1.85] text-[#CDDFEB] sm:mt-9 sm:text-[17px]"
          >
            From data centres and networks to AI-ready computing and secure
            environments, KABO brings the technology foundations together.
          </motion.p>

          <motion.div {...entrance(0.41)} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 sm:mt-11">
            <button
              type="button"
              onClick={() => navigate("solutions")}
              className="group inline-flex min-h-[52px] items-center justify-center gap-7 bg-[#54D9F7] px-6 py-3.5 text-[13px] font-semibold tracking-[0.005em] text-[#03182C] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#A0EDFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none sm:px-7 sm:text-[14px]"
            >
              Explore solutions
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => navigate("rfq")}
              className="group inline-flex min-h-12 items-center gap-2 border-b border-white/50 py-2 text-[13px] font-medium text-white transition-colors hover:border-[#71DFFF] hover:text-[#71DFFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[14px]"
            >
              Start a project
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" strokeWidth={1.6} aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-7 left-5 right-5 flex items-center justify-between border-t border-white/20 pt-5 sm:bottom-9 sm:left-9 sm:right-9 lg:left-14 lg:right-14 xl:left-20 xl:right-20">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#B4CADA]/85 sm:text-[11px]">Design <span className="mx-1.5 text-[#71DFFF]/70">·</span> Supply <span className="mx-1.5 text-[#71DFFF]/70">·</span> Integrate</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 sm:text-[11px]">South Africa</span>
        </div>
      </div>
    </section>
  );
}