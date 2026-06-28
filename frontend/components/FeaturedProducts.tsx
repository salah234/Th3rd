"use client";
import { EASE_LUXURY } from "@/lib/motion";

import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Item } from "@/lib/types";

const featuredItems: Item[] = [
  {
    id: "silk-medina-ivory",
    title: "Silk Medina Wrap",
    subtitle: "Everyday Silk",
    price: 185,
    currency: "USD",
    isNew: true,
    colorOptions: ["#FAF6EF", "#2C2A28", "#8C7B6B", "#C9A96E"],
  },
  {
    id: "chiffon-drape-blush",
    title: "Chiffon Drape",
    subtitle: "Occasion Wear",
    price: 220,
    originalPrice: 275,
    currency: "USD",
    isBestseller: true,
    colorOptions: ["#EDD9B4", "#D4CDBA", "#9E9289"],
  },
  {
    id: "heritage-linen-sage",
    title: "Heritage Linen",
    subtitle: "Heritage Collection",
    price: 195,
    currency: "USD",
    isNew: true,
    colorOptions: ["#8A9B7E", "#B5C2AD", "#6B7B60"],
  },
  {
    id: "modal-square-stone",
    title: "Modal Square",
    subtitle: "Everyday Silk",
    price: 145,
    currency: "USD",
    colorOptions: ["#9E9289", "#E8E0D5", "#2C2A28", "#8C7B6B"],
  },
];

export default function FeaturedProducts() {
  return (
    <section
      className="py-24 md:py-32 px-6 md:px-10 bg-ivory dark:bg-dk-base"
      aria-labelledby="featured-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE_LUXURY }}
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-3">
              Curated Pieces
            </p>
            <h2
              id="featured-heading"
              className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal dark:text-dk-text leading-tight"
            >
              New Arrivals
            </h2>
          </div>
          <Link
            href="/new-arrivals"
            className="hidden md:inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase text-taupe dark:text-dk-muted hover:text-charcoal dark:hover:text-dk-text transition-colors duration-200 font-medium pb-1 border-b border-current"
          >
            View All
          </Link>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {featuredItems.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Mobile "view all" */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:hidden mt-10 text-center"
        >
          <Link
            href="/new-arrivals"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase text-taupe hover:text-charcoal transition-colors duration-200 font-medium pb-1 border-b border-current"
          >
            View All New Arrivals
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
