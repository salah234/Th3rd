"use client";
import { EASE_LUXURY } from "@/lib/motion";

import { motion } from "framer-motion";
import Link from "next/link";
import CollectionCard from "@/components/CollectionCard";
import { collections } from "@/lib/data";

export default function CollectionsGrid() {
  return (
    <section
      className="py-24 md:py-32 px-6 md:px-10 bg-cream dark:bg-dk-alt"
      aria-labelledby="collections-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE_LUXURY }}
          className="text-center mb-14 md:mb-18"
        >
          <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-3">
            Shop by World
          </p>
          <h2
            id="collections-heading"
            className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal dark:text-dk-text"
          >
            Our Collections
          </h2>
        </motion.div>

        {/* Grid: large card + two smaller */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {/* Large featured collection */}
          <div className="md:row-span-2">
            <CollectionCard
              collection={collections[0]}
              index={0}
              variant="portrait"
            />
          </div>

          {/* Two smaller on the right */}
          <CollectionCard
            collection={collections[1]}
            index={1}
            variant="landscape"
          />
          <CollectionCard
            collection={collections[2]}
            index={2}
            variant="landscape"
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_LUXURY }}
          className="text-center mt-12"
        >
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase text-taupe dark:text-dk-muted hover:text-charcoal dark:hover:text-dk-text transition-colors duration-200 font-medium pb-1 border-b border-current"
          >
            View All Collections
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
