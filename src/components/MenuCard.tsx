"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "@/app/data";
import { ArrowUpRight } from "lucide-react";

export default function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <Link href={`/menu/${item.id}`} className="menu-card-link block">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="menu-card"
      >
        {/* Image */}
        <div className="menu-card-image">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width:768px) 75vw, 450px"
            loading="lazy"
          />
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 group-hover:border-gold/50 transition-colors duration-500" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 group-hover:border-gold/50 transition-colors duration-500" />
        </div>

        {/* Body */}
        <div className="menu-card-body">
          <div className="menu-card-top">
            <h3 className="menu-card-name">{item.name}</h3>
            <span className="menu-card-price">{item.price}</span>
          </div>
          <p className="menu-card-jp">{item.jpName}</p>
          <p className="menu-card-desc">{item.description}</p>
        </div>
      </motion.div>
    </Link>
  );
}
