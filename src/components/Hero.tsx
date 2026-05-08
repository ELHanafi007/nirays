"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background Image */}
      <div className="hero-bg">
        <Image
          src="/images/hero.png"
          alt="Nirayas sushi & wok - Premium Japanese Dining"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ opacity: 0.55 }}
        />
        <div className="hero-overlay" />
        <div className="hero-vignette" />
      </div>

      {/* Content */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <div className="hero-eyebrow animate-fade-in-up delay-2">
            <span>Artisanal Japanese Dining</span>
          </div>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Nirayas <span style={{ fontSize: '0.4em', display: 'block', letterSpacing: '0.3em', marginTop: '1rem', opacity: 0.8 }}>sushi & wok</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Where tradition meets innovation in every bite
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link href="/menu" className="hero-cta">
            <span>Explore Our Menu</span>
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}
