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
            <span>Back</span>
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
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="menu-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Our Menu
        </motion.h1>
        <motion.p
          className="menu-hero-sub"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A curated selection of seasonal dishes
        </motion.p>
        <motion.div
          className="menu-hero-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
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
      <div className="container" style={{ paddingBottom: "4rem" }}>
        {CATEGORY_LIST.map((category, ci) => (
          <section
            key={category}
            className="menu-section"
            data-category={category}
            ref={(el) => { if (el) sectionRefs.current.set(category, el); }}
          >
            <motion.div
              className="menu-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="menu-section-num">
                {String(ci + 1).padStart(2, "0")}
              </span>
              <span className="menu-section-label">
                {String(ci + 1).padStart(2, "0")}
              </span>
              <h2 className="menu-section-title">{category}</h2>
              <p className="menu-section-count">
                {groupedMenu[category].length} dishes
              </p>
            </motion.div>

            <div className="menu-grid">
              {groupedMenu[category].map((item, idx) => (
                <MenuCard key={item.id} item={item} index={idx} />
              ))}
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
            <Link href="/" className="footer-link">Home</Link>
            <a href="#" className="footer-link">Instagram</a>
            <a href="#" className="footer-link">Reservations</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
          <p className="footer-copy">&copy; 2026 NIRAYAS. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </main>
  );
}
