"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

export type HeroVariant =
  | "datacenter"
  | "network"
  | "security"
  | "smartcity"
  | "abstract";

interface PageHeroProps {
  variant?: HeroVariant;
  tag: string;
  title: ReactNode;
  subtitle: string;
  image?: string;
  imageCaption?: string;
  children?: ReactNode;
}

const HERO_ART: Record<HeroVariant, { image: string; caption: string }> = {
  datacenter: {
    image: "/images/sol_datacenter.jpg",
    caption: "ENTERPRISE INFRASTRUCTURE",
  },
  network: {
    image: "/images/sol_campus.jpg",
    caption: "CONNECTED ENVIRONMENTS",
  },
  security: {
    image: "/images/sol_government.jpg",
    caption: "PROTECTION BY DESIGN",
  },
  smartcity: {
    image: "/images/sol_smartcity.jpg",
    caption: "A MORE CONNECTED WORLD",
  },
  abstract: { image: "/images/sol_noc.jpg", caption: "TECHNOLOGY IN CONTEXT" },
};

/** Editorial masthead for the new website. Original business content passes through the new layout. */
export function PageHero({
  variant = "abstract",
  tag,
  title,
  subtitle,
  image,
  imageCaption,
  children,
}: PageHeroProps) {
  const art = HERO_ART[variant];

  return (
    <section
      className={`business-hero business-hero--${variant}`}
      aria-label={tag}
    >
      <div className="business-hero__inner">
        <motion.div
          className="business-hero__copy"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="business-hero__tag">
            <span aria-hidden="true" />
            {tag}
          </div>
          <h1 className="business-hero__title">{title}</h1>
          <p className="business-hero__subtitle">{subtitle}</p>
          {children && <div className="business-hero__actions">{children}</div>}
        </motion.div>
        <motion.div
          className="business-hero__art"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          aria-hidden="true"
        >
          <div className="business-hero__image-wrap">
            <Image
              src={image ?? art.image}
              alt=""
              fill
              priority
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 45vw, 40vw"
              className="business-hero__image"
            />
            <span className="business-hero__image-tint" />
          </div>
          <div className="business-hero__art-frame" />
          <span className="business-hero__art-mark">
            K<span>·</span>
          </span>
          <div className="business-hero__art-caption">
            <span>{imageCaption ?? art.caption}</span>
            <span>KA / BO</span>
          </div>
        </motion.div>
      </div>
      <div className="business-hero__baseline">
        <span>KABO IT GROUP</span>
        <span>INTELLIGENT INFRASTRUCTURE / CONNECTED THINKING</span>
      </div>
    </section>
  );
}
