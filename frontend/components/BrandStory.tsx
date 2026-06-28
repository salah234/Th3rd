"use client";
import { EASE_LUXURY } from "@/lib/motion";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section
      className="py-24 md:py-36 px-6 md:px-10 bg-ivory dark:bg-dk-base"
      aria-labelledby="brand-story-heading"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: decorative visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE_LUXURY }}
            className="relative aspect-[4/5] order-2 md:order-1"
            aria-hidden
          >
            {/* Main block — uses CSS variable that flips in dark mode */}
            <div
              className="absolute inset-0"
              style={{ background: "var(--brand-block-bg)" }}
            />
            {/* Inset accent */}
            <div
              className="absolute bottom-8 right-8 w-[55%] aspect-square border border-champagne/60 dark:border-dk-border/40"
              aria-hidden
            />
            {/* Gold accent line */}
            <div
              className="absolute top-12 left-0 w-16 h-px bg-soft-gold"
              aria-hidden
            />
            {/* Quote overlay */}
            <div className="absolute bottom-12 left-8 right-16">
              <p
                className="font-display text-lg md:text-xl font-light italic text-charcoal/80 dark:text-dk-text/70 leading-relaxed"
                aria-hidden
              >
                &ldquo;Crafted for the woman who moves through the world with
                intention.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE_LUXURY }}
            className="order-1 md:order-2"
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-6">
              Our Philosophy
            </p>
            <h2
              id="brand-story-heading"
              className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal dark:text-dk-text leading-tight mb-8"
            >
              Modesty as a
              <br />
              <em className="italic text-taupe dark:text-dk-muted">form of art</em>
            </h2>
            <p className="text-[15px] leading-relaxed text-taupe dark:text-dk-muted font-light mb-6">
              At Th3rd, we believe modest fashion deserves the same craftsmanship
              and beauty as the world&apos;s finest luxury houses. Every piece is
              developed with obsessive attention to fabric weight, drape, and
              finish.
            </p>
            <p className="text-[15px] leading-relaxed text-taupe dark:text-dk-muted font-light mb-10">
              We source only the finest silk, linen, and modal — then pair each
              fabric with colorways developed in-house by our design team. The
              result: a hijab that moves with you, not against you.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-[12px] tracking-[0.14em] uppercase text-charcoal dark:text-dk-text font-medium pb-1 border-b border-charcoal dark:border-dk-border hover:text-taupe dark:hover:text-dk-muted hover:border-taupe dark:hover:border-dk-border/60 transition-colors duration-200"
            >
              Our Story
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M1 7h12M8 2l6 5-6 5" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
