"use client";
import { EASE_LUXURY } from "@/lib/motion";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Item } from "@/lib/types";

interface ProductCardProps {
  item: Item;
  index?: number;
}

export default function ProductCard({ item, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: item.currency,
    minimumFractionDigits: 0,
  }).format(item.price);

  const formattedOriginalPrice = item.originalPrice
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: item.currency,
        minimumFractionDigits: 0,
      }).format(item.originalPrice)
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: EASE_LUXURY,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
    >
      <Link href={`/products/${item.id}`} aria-label={`${item.title} — ${formattedPrice}`}>
        {/* Image container */}
        <div className="relative overflow-hidden bg-warm-white dark:bg-dk-surface aspect-[3/4] mb-5">
          {/* Placeholder image — elegant gradient */}
          <div
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
              background: item.imageUrl
                ? undefined
                : generatePlaceholderGradient(item.id),
            }}
            aria-hidden={!item.imageUrl}
          >
            {/* Subtle texture */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden>
              <defs>
                <pattern id={`grain-${item.id}`} width="200" height="200" patternUnits="userSpaceOnUse">
                  <filter id={`noise-${item.id}`}>
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect width="200" height="200" filter={`url(#noise-${item.id})`} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grain-${item.id})`} />
            </svg>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {item.isNew && (
              <span className="text-[10px] tracking-[0.12em] uppercase bg-charcoal dark:bg-dk-text text-ivory dark:text-dk-base px-2.5 py-1 font-medium">
                New
              </span>
            )}
            {item.isBestseller && (
              <span className="text-[10px] tracking-[0.12em] uppercase bg-soft-gold text-ivory px-2.5 py-1 font-medium">
                Bestseller
              </span>
            )}
          </div>

          {/* Quick-add overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 p-4 z-10"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="w-full bg-ivory/95 dark:bg-dk-base/95 backdrop-blur-sm text-charcoal dark:text-dk-text text-[11px] tracking-[0.12em] uppercase py-3 font-medium hover:bg-charcoal hover:text-ivory dark:hover:bg-dk-text dark:hover:text-dk-base transition-colors duration-200"
              aria-label={`Add ${item.title} to cart`}
            >
              Add to Bag
            </button>
          </motion.div>

          {/* Wishlist */}
          <button
            onClick={(e) => e.preventDefault()}
            aria-label={`Save ${item.title}`}
            className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-charcoal/60 dark:text-dk-muted hover:text-charcoal dark:hover:text-dk-text"
          >
            <HeartIcon />
          </button>
        </div>

        {/* Card body */}
        <div>
          {item.subtitle && (
            <p className="text-[11px] tracking-[0.1em] uppercase text-stone dark:text-dk-subtle mb-1.5">
              {item.subtitle}
            </p>
          )}
          <h3 className="font-display text-[1.1rem] font-light text-charcoal dark:text-dk-text leading-snug mb-2">
            {item.title}
          </h3>

          {/* Color swatches */}
          {item.colorOptions && item.colorOptions.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3" role="list" aria-label="Available colors">
              {item.colorOptions.map((color) => (
                <div
                  key={color}
                  role="listitem"
                  title={color}
                  className="w-3.5 h-3.5 rounded-full border border-sand/60 dark:border-dk-border/60"
                  style={{ backgroundColor: color }}
                  aria-label={color}
                />
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-[14px] text-charcoal dark:text-dk-text font-medium">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-[13px] text-stone dark:text-dk-subtle line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function generatePlaceholderGradient(id: string): string {
  const palettes = [
    "linear-gradient(140deg, #FAD6E3 0%, #FFF0F4 50%, #F6C8DB 100%)",
    "linear-gradient(140deg, #F6DBE5 0%, #FFF6F9 50%, #FAD6E3 100%)",
    "linear-gradient(140deg, #F1C3D4 0%, #FDECF2 50%, #F4CCDC 100%)",
    "linear-gradient(140deg, #EFB8CD 0%, #FBDEE8 50%, #F1C3D4 100%)",
    "linear-gradient(140deg, #FAD0E0 0%, #FFF0F4 50%, #F6CEDD 100%)",
    "linear-gradient(140deg, #F2C2D5 0%, #FCE6EE 50%, #F4CEDD 100%)",
  ];
  const index = id.charCodeAt(0) % palettes.length;
  return palettes[index];
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
