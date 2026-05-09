"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Plus, Minus, Star, ChevronRight, ArrowUpRight,
  Clock, MapPin, Award, Fish, Flame, Leaf,
} from "lucide-react";
import { MENU_DATA } from "../../data";
import { useState, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar";

/* ═══════════════════════════════════════════════════════════════
   PRODUCT PAGE — Nirayas sushi & wok Luxury Experience
   ═══════════════════════════════════════════════════════════════ */
export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  // ── state ──
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // ── data ──
  const item = useMemo(() => MENU_DATA.find((i) => i.id === id), [id]);
  const relatedItems = useMemo(
    () =>
      item
        ? MENU_DATA.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 3)
        : [],
    [item, id]
  );

  // ── scroll transforms (window-based for reliable tracking) ──
  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.75]);

  // ── handlers ──
  const handleAddToOrder = useCallback(() => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  }, []);

  // ── 404 ──
  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-6">
        <h1 className="text-5xl font-serif">Plat Introuvable</h1>
        <p className="text-gray-light text-sm tracking-widest uppercase">
          L'article que vous recherchez n'existe pas.
        </p>
        <Link
          href="/menu"
          className="mt-4 px-8 py-3 border border-gold/30 text-gold text-xs uppercase tracking-[0.4em] hover:bg-gold hover:text-black transition-all duration-500"
        >
          Retour au Menu
        </Link>
      </div>
    );
  }

  /* ── flavor profile data (deterministic from item index) ── */
  const idx = parseInt(item.id.replace("item-", ""), 10);
  const flavorData = [
    { label: "Umami", pct: 60 + ((idx * 17) % 35) },
    { label: "Richness", pct: 50 + ((idx * 13) % 40) },
    { label: "Complexity", pct: 40 + ((idx * 23) % 50) },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold/30">
      <Navbar />

      {/* ═══════════ HERO SPLIT LAYOUT ═══════════ */}
      <section className="flex flex-col lg:flex-row min-h-screen">
        {/* ── LEFT: IMAGE PANEL ── */}
        <div className="lg:w-[52%] h-[65vh] lg:h-screen lg:sticky lg:top-0 relative overflow-hidden bg-[#0a0a0a]">
          {/* Reveal curtain */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="absolute inset-0 bg-black z-30 origin-top"
          />

          {/* Image with parallax */}
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="absolute inset-0 will-change-transform"
          >
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 52vw"
                className="object-cover transition-all duration-[1.5s] opacity-100 scale-100"
                unoptimized={true}
              />
            </div>
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-10 lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 pointer-events-none z-10 hidden lg:block" />
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.4)] pointer-events-none z-10" />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="absolute top-28 left-6 md:left-10 z-20"
          >
            <div className="flex items-center gap-3 bg-black/50 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full">
              <Star size={12} className="text-gold fill-gold" />
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/70">
                Sélection du Chef
              </span>
            </div>
          </motion.div>

          {/* Bottom info bar on mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 lg:hidden">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-2">
              {item.category}
            </p>
            <h1 className="text-4xl font-serif uppercase tracking-tight leading-none">
              {item.name}
            </h1>
          </div>

          {/* Scroll indicator (desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-10 z-20 hidden lg:flex items-center gap-4"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[8px] tracking-[0.5em] text-white/25 uppercase">Scroll</span>
              <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-1/2 bg-gold/40"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: CONTENT PANEL ── */}
        <div className="lg:w-[48%] relative">
          {/* Subtle background texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#060606] to-[#080808] pointer-events-none" />

          <div className="relative px-6 py-12 md:px-12 lg:px-20 xl:px-28 lg:py-28">
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <button
                onClick={() => router.back()}
                className="group inline-flex items-center gap-3 mb-14 text-[9px] uppercase tracking-[0.5em] text-white/40 hover:text-gold transition-colors duration-500"
              >
                <div className="w-9 h-9 rounded-full border border-white/8 flex items-center justify-center group-hover:border-gold/30 transition-colors duration-500">
                  <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
                </div>
                Retour au Menu
              </button>
            </motion.div>

            {/* Category & title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gold text-[11px] tracking-[0.7em] uppercase font-semibold">
                  {item.category}
                </span>
                <div className="h-[1px] w-20 bg-gold/40" />
              </div>
 
              <h1 className="text-6xl md:text-7xl xl:text-8xl font-serif leading-[0.85] uppercase tracking-[-0.02em] mb-4">
                {item.name}
              </h1>
              <p className="text-gold/40 text-3xl xl:text-4xl font-serif italic mb-12">
                {item.jpName}
              </p>
            </motion.div>
 
            {/* Price & Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-16"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-7xl font-serif text-gold leading-none">{item.price}</span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">TVA incl.</span>
              </div>
              
              <div className="mt-8 flex items-center gap-10 text-[9px] uppercase tracking-[0.3em] text-white/40">
                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-gold" />
                  <span>Prép: 15-20 Min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fish size={12} className="text-gold" />
                  <span>Source Durable</span>
                </div>
              </div>
            </motion.div>
 
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mb-16"
            >
              <div className="w-12 h-[1px] bg-white/20 mb-8" />
              <p className="text-white/80 text-xl md:text-2xl leading-relaxed max-w-xl mb-8 font-serif italic">
                &ldquo;{item.description}&rdquo;
              </p>
              <p className="text-white/40 text-sm leading-relaxed max-w-lg">
                Our master chefs dedicate years to perfecting the precise cut and temperature 
                required for this signature dish. Each ingredient is sourced daily from Tokyo's 
                Toyosu Market to ensure an unparalleled dining experience.
              </p>
            </motion.div>

            {/* ── FLAVOR PROFILE ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, duration: 0.8 }}
              className="mb-14 p-8 border border-white/5 bg-white/[0.015] relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                <h4 className="text-[10px] uppercase tracking-[0.5em] text-gold font-semibold">
                  Profil de Saveur
                </h4>
              </div>

              <div className="space-y-5">
                {flavorData.map((stat, i) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-[9px] uppercase tracking-[0.3em] mb-2">
                      <span className="text-white/35">{stat.label}</span>
                      <span className="text-white/50 tabular-nums">{stat.pct}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.6 + i * 0.12, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-gold/60 to-gold rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Provenance icons */}
              <div className="flex gap-6 mt-8 pt-6 border-t border-white/5">
                {[
                  { icon: Fish, label: "Pêche Sauvage" },
                  { icon: Flame, label: "Grillé au Charbon" },
                  { icon: Leaf, label: "Biologique" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="group/i flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full border border-white/6 flex items-center justify-center group-hover/i:border-gold/30 transition-colors duration-500 bg-white/[0.02]">
                      <Icon size={15} className="text-white/20 group-hover/i:text-gold/70 transition-colors duration-500" />
                    </div>
                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/20 group-hover/i:text-white/40 transition-colors">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-stretch gap-4"
            >
              {/* Quantity */}
              <div className="flex items-center justify-center border border-white/8 h-14 px-5 gap-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-white/40 hover:text-white transition-colors active:scale-90 transition-transform"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-serif text-xl tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-white/40 hover:text-white transition-colors active:scale-90 transition-transform"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add button */}
              <button
                onClick={handleAddToOrder}
                className="relative flex-1 h-14 group overflow-hidden bg-gold hover:bg-gold-light transition-colors duration-500"
              >
                <span className="relative z-10 text-black uppercase tracking-[0.4em] text-[10px] font-bold flex items-center justify-center gap-3 h-full">
                  <AnimatePresence mode="wait">
                    {isAdded ? (
                      <motion.span
                        key="ok"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2"
                      >
                        Ajouté <Star size={12} className="fill-black" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2"
                      >
                        Ajouter à la Commande <ChevronRight size={14} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ RELATED ITEMS ═══════════ */}
      {relatedItems.length > 0 && (
        <section className="bg-black py-32 md:py-48 border-t border-white/5 relative overflow-hidden">
          {/* Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] font-serif text-[30vw] whitespace-nowrap leading-none">
            NIRAYAS
          </div>

          <div className="container relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-32 gap-8">
              <div className="max-w-2xl">
                <p className="text-gold text-[11px] tracking-[0.7em] uppercase mb-6 flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-gold/40" />
                  Le Voyage Culinaire
                </p>
                <h2 className="text-5xl md:text-6xl font-serif leading-[1.1] uppercase">
                  Complétez Votre <br /> Expérience
                </h2>
              </div>
              <Link
                href="/menu"
                className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/50 hover:text-gold transition-all duration-500 pb-2 border-b border-white/10 hover:border-gold/30"
              >
                Retour au Menu
                <ArrowUpRight size={14} className="text-gold/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12 lg:gap-16">
              {relatedItems.map((related, i) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={`/menu/${related.id}`} className="group block">
                    <div className="aspect-[3/4] relative overflow-hidden mb-4 border border-white/5 group-hover:border-gold/30 transition-colors duration-700">
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        sizes="(max-width:768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                        unoptimized={true}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />
                      
                      {/* Hover Info */}
                      <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/80 to-transparent">
                        <span className="text-lg md:text-2xl font-serif text-gold">{related.price}</span>
                      </div>
                    </div>

                    <p className="text-gold/40 text-[8px] md:text-[10px] tracking-[0.4em] uppercase mb-1 md:mb-2 line-clamp-1">{related.jpName}</p>
                    <h3 className="text-sm md:text-2xl font-serif group-hover:text-gold transition-colors duration-500 uppercase tracking-tight line-clamp-1 md:line-clamp-none">
                      {related.name}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="footer bg-black border-t border-white/5">
        <div className="container">
          <h2 className="footer-logo">Nirayas sushi & wok</h2>
          <div className="footer-links">
            <Link href="/" className="footer-link">Accueil</Link>
            <Link href="/menu" className="footer-link">Menu</Link>
            <a href="#" className="footer-link">Réservations</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
          <p className="footer-copy">&copy; 2026 NIRAYAS. TOUS DROITS RÉSERVÉS.</p>
        </div>
      </footer>
    </div>
  );
}
