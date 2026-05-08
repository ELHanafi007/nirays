"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "@/app/data";
import { ArrowUpRight } from "lucide-react";

export default function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <Link href={`/menu/${item.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
        className="menu-card group"
      >
        {/* Top glow line on hover */}
        <div className="menu-card-glow" />

        {/* Image */}
        <div className="menu-card-image relative overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            loading="lazy"
            className="transition-transform duration-1000 group-hover:scale-110"
          />
          
          {/* View Details Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white font-medium border border-white/20 px-6 py-3 bg-black/40">
              <span>View Details</span>
              <ArrowUpRight size={14} className="text-gold" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="menu-card-body">
          <div className="menu-card-top">
            <h3 className="menu-card-name group-hover:text-gold transition-colors duration-500">{item.name}</h3>
            <span className="menu-card-price">{item.price}</span>
          </div>
          <p className="menu-card-jp">{item.jpName}</p>
          <p className="menu-card-desc line-clamp-2">{item.description}</p>
        </div>
      </motion.div>
    </Link>
  );
}

