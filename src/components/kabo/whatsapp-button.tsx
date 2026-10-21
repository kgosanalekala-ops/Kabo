"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

/**
 * One compact WhatsApp shortcut at every breakpoint.
 * It yields to the footer legal links once they appear in the viewport;
 * the footer retains its separate WhatsApp contact link.
 */
export function WhatsAppButton() {
  const [legalLinksVisible, setLegalLinksVisible] = useState(false);

  useEffect(() => {
    const legalLinks = document.getElementById("kabo-footer-legal");
    if (!legalLinks || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setLegalLinksVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(legalLinks);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="https://wa.me/27612854418?text=Hello%20KABO%20IT%20Group%2C%20I%20would%20like%20an%20ICT%20quote%20or%20consultation."
      target="_blank"
      rel="noopener noreferrer"
      title="Ask KABO on WhatsApp"
      aria-label="Open WhatsApp to enquire about KABO supplies and solutions"
      aria-hidden={legalLinksVisible}
      tabIndex={legalLinksVisible ? -1 : 0}
      className={
        "kabo-whatsapp-float fixed bottom-5 right-6 z-40 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full " +
        "bg-[#075e54] text-white shadow-xl transition-[opacity,transform,background-color] duration-200 " +
        "hover:bg-[#064e46] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#40D5F4] " +
        "motion-reduce:transition-none " +
        (legalLinksVisible ? "pointer-events-none opacity-0 lg:scale-90" : "scale-100 opacity-100")
      }
    >
      <MessageCircle size={23} strokeWidth={1.9} aria-hidden="true" />
    </a>
  );
}
