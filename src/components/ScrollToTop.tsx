"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-50 w-10 h-10 md:w-11 md:h-11 bg-bg-tertiary border border-white/10 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-colors hover:border-accent"
          aria-label="Scroll to top"
        >
          <ChevronUp size={18} className="text-text-secondary" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
