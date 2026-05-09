"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import { MENU_DATA } from "./data";

// ── Particles (deterministic to avoid hydration mismatch) ──
const PARTICLES = Array.from({ length: 25 }, (_, i) => {
  const seed = (i + 1) * 7.3;
  const pseudo = (v: number) => ((Math.sin(v) * 10000) % 1 + 1) % 1;
  return {
    id: i,
    left: `${(pseudo(seed) * 100).toFixed(2)}%`,
    duration: `${(8 + pseudo(seed + 1) * 12).toFixed(1)}s`,
    delay: `${(pseudo(seed + 2) * 8).toFixed(1)}s`,
    opacity: +(0.15 + pseudo(seed + 3) * 0.35).toFixed(2),
    size: +(1 + pseudo(seed + 4) * 2).toFixed(1),
  };
});

function Particles() {
  return (
    <div className="particles">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            "--duration": p.duration,
            "--delay": p.delay,
            "--opacity": p.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ── Split Text (COMPLEX multi-stage reveal) ────
function SplitTitle({ text }: { text: string }) {
  const letterVariants: any = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 120,
      rotateX: 90,
      rotateZ: i % 2 === 0 ? -8 : 8,
      scale: 0.5,
      filter: "blur(12px)",
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateZ: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.4,
        delay: 0.4 + i * 0.12,
        ease: [0.16, 1, 0.3, 1] as const,
        opacity: { duration: 0.8, delay: 0.4 + i * 0.12 },
        filter: { duration: 1, delay: 0.5 + i * 0.12 },
        scale: { duration: 1.2, delay: 0.4 + i * 0.12, type: "spring" as const, stiffness: 100, damping: 12 },
      },
    }),
  };

  return (
    <div style={{ perspective: 1200, whiteSpace: "nowrap", position: "relative" }}>
      {/* Main title with letter animations */}
      <h1 className="hero-title" style={{ position: "relative", overflow: "hidden" }}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: "inline-block",
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
          >
            {char}
          </motion.span>
        ))}
        {/* Golden shimmer sweep */}
        <motion.span
          initial={{ left: "-100%" }}
          animate={{ left: "200%" }}
          transition={{ duration: 1.5, delay: 1.8, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: "absolute",
            top: 0,
            width: "50%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), rgba(212,184,138,0.5), rgba(201,169,110,0.3), transparent)",
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        />
      </h1>
      {/* Subtle breathing glow behind title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0.08, 0.15, 0] }}
        transition={{ duration: 5, delay: 2.5, repeat: Infinity, repeatDelay: 2 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120%",
          height: "200%",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.2) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ── Marquee ────────────────────────────────────
const MARQUEE_ITEMS = [
  "Omakase", "寿司", "Wagyu", "Robata", "手巻き", "Sashimi",
  "天ぷら", "Kaiseki", "Uni", "懐石", "Matcha", "焼き鳥",
];

function Marquee() {
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span className="dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Featured Dishes ────────────────────────────
const FEATURED = MENU_DATA.filter((_, i) => [0, 8, 10, 3, 20, 30].includes(i)).slice(0, 6);

function FeaturedSection() {
  return (
    <section className="featured">
      <div className="container">
        <motion.div
          className="featured-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <p className="featured-label">Khtiyar l'Chef</p>
            <h2 className="featured-title">Atbaq Khassa</h2>
          </div>
          <Link href="/menu" className="featured-link">
            Lmenu Kamel <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>
      <div className="container">
        <motion.div
          className="featured-scroll scrollbar-hide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {FEATURED.map((item, i) => (
            <motion.div
              key={item.id}
              className="featured-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="featured-card-img">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="400px"
                  loading="lazy"
                  unoptimized={true}
                />
              </div>
              <div className="featured-card-body">
                <p className="featured-card-cat">{item.category}</p>
                <h3 className="featured-card-name">{item.name}</h3>
                <span className="featured-card-price">{item.price}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Stats ──────────────────────────────────────
const STATS = [
  { number: "12", suffix: "+", label: "Snin d Tjariba" },
  { number: "50", suffix: "+", label: "Atbaq Khassa" },
  { number: "3", suffix: "", label: "Les Chefs" },
  { number: "98", suffix: "%", label: "Kliyan Kayrje3" },
];

function StatsSection() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="stat-number">
                {s.number}<span className="gold">{s.suffix}</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Atmosphere ─────────────────────────────────
function AtmosphereSection() {
  const images = [
    { src: "/images/atmosphere_1.png", title: "The Sanctuary", span: "row-span-2" },
    { src: "/images/atmosphere_2.png", title: "Pure Craft", span: "" },
    { src: "/images/atmosphere_3.png", title: "The Ritual", span: "" },
  ];

  return (
    <section className="atmosphere">
      <div className="container">
        <div className="atmosphere-header">
          <p className="atmosphere-label">Tjariba</p>
          <h2 className="atmosphere-title">Ljaw</h2>
        </div>
        <div className="atmosphere-grid">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`atmosphere-item ${img.span}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
                unoptimized={true}
              />
              <div className="atmosphere-overlay">
                <span className="atmosphere-item-title">{img.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Philosophy ─────────────────────────────────
function PhilosophySection() {
  return (
    <section className="philosophy">
      <div className="container">
        <div className="philosophy-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ position: "relative" }}
          >
            <div className="philosophy-img">
              <Image
                src="/images/chef.png"
                alt="Master Chef"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                unoptimized={true}
              />
            </div>
            <div className="philosophy-img-accent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="philosophy-label">Lfilosofiya</p>
            <h2 className="philosophy-title">
              Kolla T9ti3a
              <br />
              <span style={{ fontStyle: "italic", color: "var(--gold-light)" }}>
                3ndha 9essa
              </span>
            </h2>
            <p className="philosophy-text">
              Kanqaddmo likom makla m9adda b fann w t9an —
              hadi hiya rro7 dyal Nirayas sushi & wok. Men l7arara dyal shari tal
              chffa dyal lmos, kol tfassil mdrus bach n3tiwk
              wa7d tjariba d lmakla makaynch b7alha.
            </p>
            <Link href="/menu" className="btn-outline">
              <span>Ktawf Lmenu Dyalna</span>
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Scroll Progress Bar ────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="scroll-progress">
      <motion.div className="scroll-progress-bar" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}

// ── Loading Curtain ────────────────────────────
function LoadingCurtain() {
  return (
    <motion.div
      className="curtain"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="curtain-logo"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
        transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
      >
        NIRAYAS
      </motion.span>
    </motion.div>
  );
}

// ── Reserve CTA ────────────────────────────────
function ReserveCTA() {
  return (
    <section className="reserve-cta">
      <span className="reserve-cta-jp">予約</span>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="reserve-cta-label">Galsa Khassa</p>
          <h2 className="reserve-cta-title">
            Résiervi
            <br />
            <span style={{ fontStyle: "italic", color: "var(--gold-light)" }}>
              Tjariba Dyalek
            </span>
          </h2>
          <p className="reserve-cta-sub">
            Mra7ba bik t3ich m3ana lila manasich f lmakla lyabaniya l2assiliya
          </p>
          <a href="#" className="btn-outline">
            <span>Résiervi Daba</span>
            <ArrowRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── HOME PAGE ──────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0]);

  return (
    <main>
      <LoadingCurtain />
      <ScrollProgress />
      <Navbar />

      {/* ── HERO ─────────────────────────────── */}
      <section className="hero" ref={heroRef} style={{ position: "relative" }}>
        <div className="hero-bg">
          <motion.div style={{ scale: heroScale, width: "100%", height: "100%", position: "relative" }}>
            <Image
              src="/images/hero.png"
              alt="Nirayas sushi & wok"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
              unoptimized={true}
            />
          </motion.div>
          <motion.div className="hero-overlay" style={{ opacity: heroOpacity }} />
          <div className="hero-overlay" />
          <div className="hero-vignette" />
        </div>

        <Particles />

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="hero-eyebrow anim-up d2">
              <span>Mra7ba bik f 3alam souchi</span>
            </div>
          </motion.div>

          <SplitTitle text="NIRAYAS" />

          <motion.p
            className="hero-jp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            ニラヤス
          </motion.p>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            Fann dyal lkamal
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Link href="/menu" className="hero-cta">
              <span>Ktawf Lmenu Dyalna</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </motion.div>
      </section>

      {/* ── MARQUEE ──────────────────────────── */}
      <Marquee />

      {/* ── FEATURED ─────────────────────────── */}
      <FeaturedSection />

      {/* ── GLOW LINE ────────────────────────── */}
      <div className="glow-line" />

      {/* ── ATMOSPHERE ────────────────────────── */}
      <AtmosphereSection />

      {/* ── STATS ────────────────────────────── */}
      <StatsSection />

      {/* ── PHILOSOPHY ───────────────────────── */}
      <PhilosophySection />

      {/* ── MARQUEE ──────────────────────────── */}
      <Marquee />

      {/* ── RESERVE CTA ──────────────────────── */}
      <ReserveCTA />

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <h2 className="footer-logo">Nirayas sushi & wok</h2>
          <div className="footer-links">
            <Link href="/menu" className="footer-link">Lmenu</Link>
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
