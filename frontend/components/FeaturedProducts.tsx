"use client";
import { EASE_LUXURY } from "@/lib/motion";

import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { featuredItems } from "@/lib/data";

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
