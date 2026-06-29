"use client";
import { EASE_LUXURY } from "@/lib/motion";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_LUXURY } },
};

/** Cinematic, parallaxing hero with a kinetic word-by-word headline. */
export default function AboutHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background layers drift at different rates; foreground lifts and fades.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      aria-label="About hero"
    >
      {/* Texture background (parallax) */}
      <motion.div
        style={{ background: "var(--hero-texture)", y: reduce ? 0 : bgY }}
        className="absolute inset-0 -z-10"
        aria-hidden
      />
      {/* Grain */}
      <svg
        className="absolute inset-0 -z-10 w-full h-full opacity-[0.05] dark:opacity-[0.07] mix-blend-multiply dark:mix-blend-screen"
        aria-hidden
      >
        <filter id="about-hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#about-hero-grain)" />
      </svg>

      {/* Drifting gold hairlines */}
      <motion.div
        style={{ y: reduce ? 0 : lineY }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute top-[18%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-soft-gold/40 to-transparent" />
        <div className="absolute top-[64%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
        <div className="absolute left-[14%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-soft-gold/20 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentOpacity }}
        className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-10 pt-28 md:pt-32"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_LUXURY }}
          className="text-[11px] tracking-[0.28em] uppercase text-soft-gold font-medium mb-8"
        >
          Our Story — Est. 2021
        </motion.p>

        {/* Kinetic headline */}
        <motion.h1
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          className="font-display font-light leading-[0.98] text-charcoal dark:text-dk-text text-[clamp(3rem,11vw,9rem)]"
        >
          <span className="block overflow-hidden">
            <motion.span variants={reduce ? undefined : word} className="inline-block">
              Modesty,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={reduce ? undefined : word}
              className="inline-block italic text-taupe dark:text-dk-muted"
            >
              elevated.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE_LUXURY }}
          className="mt-10 max-w-md text-[15px] md:text-base leading-relaxed text-taupe dark:text-dk-muted font-light"
        >
          We make hijabs the way the great houses make couture — slowly,
          deliberately, and with reverence for the material.
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-transparent to-stone/50 dark:to-dk-subtle/50"
        />
      </motion.div>
    </section>
  );
}
