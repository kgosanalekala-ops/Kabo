"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * A floating "Move to top" button that appears in the bottom-right corner
 * after the user scrolls down 300px. Mounted globally in the root layout so
 * it appears on every page. Hidden on small mobile screens (`< sm`).
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={scrollTop}
          className="fixed right-4 sm:right-6 bottom-6 z-40 hidden sm:inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#0071C5] to-[#00C7FD] text-white shadow-xl shadow-[#0071C5]/40 hover:shadow-2xl hover:shadow-[#00C7FD]/40 hover:scale-110 transition-all"
          aria-label="Move to top"
          title="Move to top"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
