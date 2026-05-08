"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Search, ChefHat } from "lucide-react";

export default function MobileBottomBar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-xl border-t border-white/5 py-3 px-6 md:hidden"
    >
      <div className="flex items-center justify-around">
        <a
          href="#menu"
          className="flex flex-col items-center gap-1 py-2 px-4 active:opacity-70"
        >
          <ChefHat size={18} className="text-text-secondary" />
          <span className="text-[8px] tracking-[0.2em] uppercase text-text-muted">
            Menu
          </span>
        </a>

        <a
          href="#experience"
          className="flex flex-col items-center gap-1 py-2 px-4 active:opacity-70"
        >
          <Search size={18} className="text-text-secondary" />
          <span className="text-[8px] tracking-[0.2em] uppercase text-text-muted">
            Our Craft
          </span>
        </a>

        <button className="flex flex-col items-center gap-1 py-2 px-4 active:opacity-70 relative">
          <ShoppingBag size={18} className="text-text-secondary" />
          <span className="absolute -top-1 right-2 w-4 h-4 bg-accent text-bg-primary text-[8px] font-bold rounded-full flex items-center justify-center">
            0
          </span>
          <span className="text-[8px] tracking-[0.2em] uppercase text-text-muted">
            Cart
          </span>
        </button>
      </div>
    </motion.div>
  );
}
