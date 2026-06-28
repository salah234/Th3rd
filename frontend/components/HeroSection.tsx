"use client";
import { EASE_LUXURY } from "@/lib/motion";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_LUXURY },
  },
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col"
      aria-label="Hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-white via-ivory to-cream dark:from-dk-base dark:via-dk-alt dark:to-dk-surface" />

      {/* Decorative texture stripe */}
      <div className="absolute right-0 top-0 bottom-0 w-[45%] md:w-[42%]">
        <div className="absolute inset-0 bg-gradient-to-l from-champagne/30 dark:from-soft-gold/5 to-transparent" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-texture)" }}
          aria-hidden
        >
          {/* Subtle grid pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]"
            aria-hidden
          >
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>

          {/* Elegance accent line */}
          <div className="absolute left-0 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-transparent via-champagne dark:via-soft-gold/20 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 w-full pt-28 pb-20 md:pt-36 md:pb-28">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.p
              variants={itemVariants}
              className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-6"
            >
              New Season — Summer 2025
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-[clamp(3rem,7vw,6rem)] font-light leading-[1.06] text-charcoal dark:text-dk-text mb-6"
            >
              Draped{" "}
              <em className="italic text-taupe dark:text-dk-muted">in</em>
              <br />
              Grace
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[15px] leading-relaxed text-taupe dark:text-dk-muted max-w-sm mb-10 font-light"
            >
              Handcrafted hijabs for the modern woman. Premium fabrics,
              refined drape — designed with intention.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                href="/collections"
                className="inline-flex items-center gap-3 bg-charcoal dark:bg-dk-text text-ivory dark:text-dk-base text-[12px] tracking-[0.14em] uppercase px-8 py-4 hover:bg-ink dark:hover:bg-ivory transition-colors duration-300 font-medium"
              >
                Explore Collections
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/new-arrivals"
                className="inline-flex items-center gap-3 text-[12px] tracking-[0.14em] uppercase text-taupe dark:text-dk-muted hover:text-charcoal dark:hover:text-dk-text transition-colors duration-300 font-medium py-4"
              >
                New Arrivals
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE_LUXURY }}
            className="mt-20 md:mt-28 flex items-center gap-10 md:gap-16"
          >
            {[
              { value: "12+", label: "Fabric types" },
              { value: "40+", label: "Colorways" },
              { value: "3k+", label: "Happy clients" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-2xl md:text-3xl font-light text-charcoal dark:text-dk-text">
                  {value}
                </p>
                <p className="text-[11px] tracking-[0.1em] uppercase text-stone dark:text-dk-subtle mt-1">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="relative z-10 pb-8 flex justify-center"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-transparent to-stone/40 dark:to-dk-subtle/40"
        />
      </motion.div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}
