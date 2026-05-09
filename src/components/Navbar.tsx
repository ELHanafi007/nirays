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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      >
        <div className="container nav-inner premium-nav-inner">
          
          {/* Left Links (Desktop) */}
          <div className="nav-links premium-nav-left">
            <Link href="/menu" className="nav-link">
              Menu
            </Link>
            <Link href="/#experience" className="nav-link">
              Atelier
            </Link>
          </div>

          {/* Mobile Hamburger (Left on mobile, hidden on desktop) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-menu-btn premium-hamburger"
            aria-label="Toggle menu"
          >
            <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Center Logo */}
          <Link href="/" className="nav-logo premium-logo" onClick={() => setMenuOpen(false)}>
            <span className="premium-logo-main">NIRAYAS</span>
            <span className="premium-logo-sub">Sushi & Wok</span>
          </Link>

          {/* Right Links (Desktop) */}
          <div className="premium-nav-right">
            <div className="nav-lang premium-lang">
              <button className="lang-btn lang-btn--active">FR</button>
              <span className="lang-sep"></span>
              <button className="lang-btn">EN</button>
            </div>
            <Link href="/menu" className="nav-cta premium-cta">
              <span>Réserver</span>
              <ArrowRight size={12} className="cta-icon" />
            </Link>
            {/* Mobile Lang (Visible on mobile, hidden on desktop) */}
            <div className="mobile-lang">
               <button className="lang-btn lang-btn--active">FR</button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-menu premium-mobile-menu"
          >
            <div className="mobile-menu-bg"></div>
            
            <div className="mobile-menu-content">
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
                  className="mobile-menu-item-wrapper"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="mobile-menu-link premium-mobile-link"
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
              className="mobile-menu-footer"
            >
              <div className="mobile-menu-socials">
                <a href="#">Instagram</a>
                <a href="#">Contact</a>
              </div>
              <p className="mobile-menu-copy">
                &copy; 2026 Nirayas
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
