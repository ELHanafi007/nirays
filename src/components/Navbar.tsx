"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      >
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            Nirayas
          </Link>

          <div className="nav-links">
            <Link href="/menu" className="nav-link">
              Menu
            </Link>
            <a href="#experience" className="nav-link">
              Notre Savoir-Faire
            </a>
            <a href="#" className="nav-link">
              Contact
            </a>
          </div>

          <div className="nav-lang">
            <button className="lang-btn lang-btn--active">FR</button>
            <span className="lang-sep"></span>
            <button className="lang-btn">EN</button>
          </div>

          <Link href="/menu" className="nav-cta">
            Réserver
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-menu-btn"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
          >
            {[
              { label: "Menu", href: "/menu" },
              { label: "Notre Savoir-Faire", href: "#experience" },
              { label: "Contact", href: "#" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.15, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className="mobile-menu-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
