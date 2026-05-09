"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled 
            ? "py-4 bg-black/60 backdrop-blur-2xl border-b border-white/5" 
            : "py-8 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12">
          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-3 items-center">
            {/* Left Links */}
            <div className="flex items-center gap-8">
              <Link href="/menu" className="text-[10px] uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors relative group">
                Menu
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full"></span>
              </Link>
              <Link href="/#experience" className="text-[10px] uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors relative group">
                Atelier
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Center Logo */}
            <div className="flex justify-center">
              <Link href="/" className="flex flex-col items-center group">
                <span className="font-serif text-2xl tracking-[0.2em] text-white group-hover:text-gold transition-colors duration-500">NIRAYAS</span>
                <span className="text-[8px] tracking-[0.6em] text-gold/70 uppercase mt-1.5 ml-2">Sushi & Wok</span>
              </Link>
            </div>

            {/* Right Links & CTA */}
            <div className="flex items-center justify-end gap-8">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/50">
                <button className="text-gold">FR</button>
                <span className="w-[1px] h-3 bg-white/20"></span>
                <button className="hover:text-white transition-colors">EN</button>
              </div>
              <Link href="/menu" className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-gold border border-white/10 hover:border-gold transition-all duration-500 text-[10px] uppercase tracking-[0.3em] text-white hover:text-black">
                <span>Réserver</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center text-white z-50 relative"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5 items-start">
                <span className={`h-[1px] bg-current transition-all duration-500 ${menuOpen ? "rotate-45 translate-y-[7px] w-full" : "w-full"}`}></span>
                <span className={`h-[1px] bg-current transition-all duration-500 ${menuOpen ? "opacity-0 w-full" : "w-4"}`}></span>
                <span className={`h-[1px] bg-current transition-all duration-500 ${menuOpen ? "-rotate-45 -translate-y-[7px] w-full" : "w-full"}`}></span>
              </div>
            </button>

            <Link href="/" className="flex flex-col items-center relative z-50" onClick={() => setMenuOpen(false)}>
              <span className="font-serif text-xl tracking-[0.2em] text-white">NIRAYAS</span>
              <span className="text-[6px] tracking-[0.5em] text-gold uppercase mt-1 ml-1">Sushi & Wok</span>
            </Link>

            <div className="w-10 flex justify-end z-50 relative">
              <button className="text-[10px] tracking-[0.2em] text-gold">FR</button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-center"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-gold/5 pointer-events-none"></div>
            
            <div className="flex flex-col items-center gap-10 relative z-10 w-full px-8">
              {[
                { label: "Accueil", href: "/" },
                { label: "Le Menu", href: "/menu" },
                { label: "Notre Atelier", href: "/#experience" },
                { label: "Réserver", href: "#" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full text-center overflow-hidden"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-4xl text-white/90 hover:text-gold transition-colors duration-500 inline-block relative group"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-6 z-10"
            >
              <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-white/40">
                <a href="#" className="hover:text-gold transition-colors">Instagram</a>
                <a href="#" className="hover:text-gold transition-colors">Contact</a>
              </div>
              <p className="text-[8px] tracking-[0.4em] text-white/20 uppercase">
                &copy; 2026 Nirayas
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
