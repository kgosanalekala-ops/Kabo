"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** Target value to count up to */
  value: number;
  /** Duration in ms (default 1800) */
  duration?: number;
  /** Prefix string (e.g. "R" for currency) */
  prefix?: string;
  /** Suffix string (e.g. "+", "%") */
  suffix?: string;
  /** For non-numeric values like "24/7" or "Level 1", pass as `text` and the component renders it statically */
  text?: string;
  /** Number of decimals (default 0) */
  decimals?: number;
  /** Delay before starting (ms) */
  delay?: number;
  className?: string;
}

/**
 * Count-up number component. Animates from 0 to `value` when scrolled into view.
 *
 * Mobile reliability note:
 *  - framer-motion's `useInView` uses IntersectionObserver, which on some mobile
 *    browsers (notably older Safari / in-app webviews) fails to fire when the
 *    element starts below the fold. This caused the hero stat strip on mobile to
 *    permanently display "0" because the count never started.
 *  - Fix: we use a raw IntersectionObserver with a positive rootMargin (so it
 *    fires slightly before the element is fully visible) AND a fallback timer
 *    that starts the animation after `delay + 1500ms` regardless of viewport
 *    state. Whichever signal fires first wins; both are guarded by `startedRef`
 *    so the count-up only runs once.
 */
export function AnimatedCounter({
  value,
  duration = 1800,
  prefix = "",
  suffix = "",
  text,
  decimals = 0,
  delay = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (text !== undefined) return;
    if (typeof window === "undefined") return;

    let raf: number;
    let observer: IntersectionObserver | null = null;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    const startAnimation = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      if (observer) { observer.disconnect(); observer = null; }
      if (fallbackTimer) { clearTimeout(fallbackTimer); fallbackTimer = null; }

      const start = performance.now() + delay;
      const tick = (now: number) => {
        if (now < start) {
          raf = requestAnimationFrame(tick);
          return;
        }
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo for a satisfying deceleration
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplay(value * eased);
        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(value);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    // Primary trigger: IntersectionObserver with positive rootMargin so it fires
    // a little before the element is fully in view. This works in all modern
    // browsers and is the most reliable cross-device approach.
    if (ref.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              startAnimation();
              break;
            }
          }
        },
        { rootMargin: "80px 0px 80px 0px", threshold: 0 }
      );
      observer.observe(ref.current);
    }

    // Fallback: if IntersectionObserver hasn't fired within delay + 1.5s,
    // start the animation anyway. This catches the mobile case where the
    // observer never fires (e.g. element rendered off-screen on a viewport
    // that doesn't trigger an intersection event on scroll).
    fallbackTimer = setTimeout(() => {
      startAnimation();
    }, delay + 1500);

    return () => {
      if (observer) observer.disconnect();
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration, delay, text]);

  if (text !== undefined) {
    return <span ref={ref} className={className}>{text}</span>;
  }

  const formatted = display.toLocaleString("en-ZA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
