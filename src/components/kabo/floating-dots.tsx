"use client";

import { HeroVariant } from "./video-hero";

interface FloatingDotsProps {
  variant?: "home" | HeroVariant;
  /** Unique suffix for SVG IDs so multiple instances don't clash */
  idSuffix?: string;
}

/**
 * Renders floating dots that travel ALONG the geometric SVG paths
 * defined for each hero variant. Used in the home hero and in all
 * VideoHero variants (datacenter, network, security, smartcity, abstract).
 *
 * Each variant gets a different set of paths + dot configurations so the
 * motion matches the visible geometric lines on that hero.
 */
export function FloatingDots({ variant = "home", idSuffix = "" }: FloatingDotsProps) {
  const uid = (s: string) => `${s}${idSuffix}`;

  // Define paths + dot configurations per variant
  const config = getVariantConfig(variant, uid);

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={uid("dot-line")} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,199,253,0)" />
          <stop offset="50%" stopColor="rgba(0,199,253,0.55)" />
          <stop offset="100%" stopColor="rgba(0,113,197,0)" />
        </linearGradient>
        {config.paths.map((p, i) => (
          <path key={i} id={uid(`path-${i}`)} d={p.d} fill="none" />
        ))}
      </defs>

      {/* Visible strokes */}
      {config.paths.map((p, i) => (
        <use
          key={i}
          href={`#${uid(`path-${i}`)}`}
          stroke={p.stroke || `url(#${uid("dot-line")})`}
          strokeWidth={p.strokeWidth || 1.2}
        />
      ))}

      {/* Dots traveling along the paths */}
      {config.dots.map((dot, i) => (
        <circle key={i} r={dot.r} fill={dot.fill}>
          <animateMotion dur={`${dot.dur}s`} begin={`${dot.begin}s`} repeatCount="indefinite" rotate="auto">
            <mpath href={`#${uid(`path-${dot.pathIdx}`)}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur={`${dot.dur}s`}
            begin={`${dot.begin}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

function getVariantConfig(variant: string, uid: (s: string) => string) {
  switch (variant) {
    case "home":
    case "datacenter":
      return {
        paths: [
          { d: "M 100 200 Q 360 100 720 260 T 1340 220" },
          { d: "M 160 500 Q 460 380 820 540 T 1380 480" },
          { d: "M 80 360 Q 400 280 720 420 T 1360 360", stroke: "rgba(0,199,253,0.18)", strokeWidth: 0.8 },
        ],
        dots: [
          { pathIdx: 0, r: 3, fill: "#00C7FD", dur: 8, begin: 0 },
          { pathIdx: 0, r: 2, fill: "#4AB6F2", dur: 8, begin: 4 },
          { pathIdx: 1, r: 3, fill: "#00C7FD", dur: 10, begin: 1 },
          { pathIdx: 1, r: 2, fill: "#4AB6F2", dur: 10, begin: 6 },
          { pathIdx: 2, r: 2.5, fill: "#00C7FD", dur: 12, begin: 2 },
          { pathIdx: 2, r: 2, fill: "#4AB6F2", dur: 12, begin: 7 },
          { pathIdx: 2, r: 2, fill: "#0071C5", dur: 12, begin: 10 },
        ],
      };
    case "network":
      return {
        paths: [
          { d: "M 100 400 L 360 200 L 720 400 L 1080 200 L 1340 400" },
          { d: "M 100 500 L 360 600 L 720 500 L 1080 600 L 1340 500" },
        ],
        dots: [
          { pathIdx: 0, r: 3, fill: "#00C7FD", dur: 9, begin: 0 },
          { pathIdx: 0, r: 2, fill: "#4AB6F2", dur: 9, begin: 4.5 },
          { pathIdx: 1, r: 3, fill: "#00C7FD", dur: 11, begin: 1.5 },
          { pathIdx: 1, r: 2, fill: "#4AB6F2", dur: 11, begin: 7 },
        ],
      };
    case "security":
      return {
        paths: [
          { d: "M 720 100 L 1200 400 L 720 700 L 240 400 Z" },
          { d: "M 720 250 L 1050 400 L 720 550 L 390 400 Z", stroke: "rgba(0,199,253,0.25)", strokeWidth: 1 },
        ],
        dots: [
          { pathIdx: 0, r: 3, fill: "#00C7FD", dur: 12, begin: 0 },
          { pathIdx: 0, r: 2, fill: "#4AB6F2", dur: 12, begin: 6 },
          { pathIdx: 1, r: 2.5, fill: "#00C7FD", dur: 8, begin: 2 },
          { pathIdx: 1, r: 2, fill: "#4AB6F2", dur: 8, begin: 5 },
        ],
      };
    case "smartcity":
      return {
        paths: [
          { d: "M 100 700 L 360 500 L 720 600 L 1080 400 L 1340 500" },
          { d: "M 100 600 L 360 700 L 720 500 L 1080 600 L 1340 700", stroke: "rgba(0,199,253,0.25)", strokeWidth: 0.8 },
        ],
        dots: [
          { pathIdx: 0, r: 3, fill: "#00C7FD", dur: 10, begin: 0 },
          { pathIdx: 0, r: 2, fill: "#4AB6F2", dur: 10, begin: 5 },
          { pathIdx: 1, r: 2.5, fill: "#00C7FD", dur: 12, begin: 2 },
          { pathIdx: 1, r: 2, fill: "#4AB6F2", dur: 12, begin: 8 },
        ],
      };
    case "abstract":
    default:
      return {
        paths: [
          { d: "M 100 300 C 300 100 500 500 720 300 C 940 100 1140 500 1340 300" },
          { d: "M 100 500 C 300 300 500 700 720 500 C 940 300 1140 700 1340 500", stroke: "rgba(0,199,253,0.25)", strokeWidth: 0.8 },
        ],
        dots: [
          { pathIdx: 0, r: 3, fill: "#00C7FD", dur: 11, begin: 0 },
          { pathIdx: 0, r: 2, fill: "#4AB6F2", dur: 11, begin: 5.5 },
          { pathIdx: 1, r: 2.5, fill: "#00C7FD", dur: 13, begin: 2 },
          { pathIdx: 1, r: 2, fill: "#4AB6F2", dur: 13, begin: 8 },
        ],
      };
  }
}
