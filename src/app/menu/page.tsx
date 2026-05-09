"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MenuCard from "@/components/MenuCard";
import { MENU_DATA, CATEGORIES } from "../data";

const CATEGORY_LIST = CATEGORIES.filter((c) => c !== "All");

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORY_LIST[0]);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const navRef = useRef<HTMLDivElement>(null);
  const isScrollingToRef = useRef(false);

  const groupedMenu = useMemo(() => {
    const groups: Record<string, typeof MENU_DATA> = {};
    CATEGORY_LIST.forEach((cat) => {
      groups[cat] = MENU_DATA.filter((item) => item.category === cat);
    });
    return groups;
  }, []);

  const scrollToCategory = useCallback((category: string) => {
    const el = sectionRefs.current.get(category);
    if (!el) return;
    isScrollingToRef.current = true;
    setActiveCategory(category);
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => { isScrollingToRef.current = false; }, 800);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingToRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cat = entry.target.getAttribute("data-category");
            if (cat) setActiveCategory(cat);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const activeBtn = navRef.current.querySelector(`[data-cat="${activeCategory}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeCategory]);

  return (
    <main className="menu-page">
      {/* Nav */}
      <nav className="nav nav--scrolled" style={{ position: "fixed" }}>
        <div className="container nav-inner">
          <Link href="/" className="back-link">
            <ArrowLeft size={14} />
            <span>Rja3</span>
          </Link>
          <Link
            href="/"
            className="nav-logo"
            style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}
          >
            Nirayas sushi & wok
          </Link>
          <div style={{ width: 80 }} />
        </div>
      </nav>

      {/* Hero */}
      <motion.div
        className="menu-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <motion.p
            className="menu-hero-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Tachkila
          </motion.p>
          <motion.h1
            className="menu-hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Tachkila <br /> Assiliya
          </motion.h1>
          <motion.div
            className="menu-hero-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>

      {/* Category Nav */}
      <div className="category-nav-wrapper">
        <div className="container">
          <div className="category-nav scrollbar-hide" ref={navRef}>
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat}
                data-cat={cat}
                onClick={() => scrollToCategory(cat)}
                className={`category-btn ${activeCategory === cat ? "category-btn--active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="menu-sections" style={{ paddingBottom: "8rem" }}>
        {CATEGORY_LIST.map((category, ci) => (
          <section
            key={category}
            className="menu-section"
            data-category={category}
            ref={(el) => { if (el) sectionRefs.current.set(category, el); }}
          >
            <div className="container">
              <motion.div
                className="menu-section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-gold text-[10px] tracking-[0.5em] uppercase">
                    {String(ci + 1).padStart(2, "0")}
                  </span>
                  <div className="h-[1px] w-12 bg-gold/30" />
                </div>
                <h2 className="menu-section-title">{category}</h2>
                <p className="menu-section-count">
                  {groupedMenu[category].length} atbaq
                </p>
              </motion.div>
            </div>

            <div className="menu-grid scrollbar-hide" style={{ paddingLeft: "max(1.25rem, calc((100vw - 1400px) / 2 + 1.25rem))", paddingRight: "max(1.25rem, calc((100vw - 1400px) / 2 + 1.25rem))" }}>
              {groupedMenu[category].map((item, idx) => (
                <MenuCard key={item.id} item={item} index={idx} />
              ))}
              {/* Spacer for end of scroll */}
              <div style={{ flex: "0 0 20vw", minWidth: "20vw" }} />
            </div>
          </section>
        ))}
      </div>

      {/* Glow Divider */}
      <div className="glow-line" />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <h2 className="footer-logo">Nirayas sushi & wok</h2>
          <div className="footer-links">
            <Link href="/" className="footer-link">Rja3</Link>
            <a href="#" className="footer-link">Instagram</a>
            <a href="#" className="footer-link">Résiervi</a>
            <a href="#" className="footer-link">Tawasel M3ana</a>
          </div>
          <p className="footer-copy">&copy; 2026 NIRAYAS. L7O9O9 MA7FOUDA.</p>
        </div>
      </footer>
    </main>
  );
}
