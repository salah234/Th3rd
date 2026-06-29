"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Layered "postcard" composition for the About page.
 *
 * An asymmetric grid — one tall feature card beside two stacked cards. As the
 * section scrolls, each card drifts at its own rate for a parallax depth effect.
 * Reduced-motion → a clean static grid.
 */

interface LayoutCard {
  index: string;
  accent: string;
  gradient: string;
  label: string;
  text: string;
  feature?: boolean;
  /** parallax travel range in px, [enter, exit] */
  range: [number, number];
}

const cards: LayoutCard[] = [
  {
    index: "01",
    accent: "#DB7CA1",
    gradient:
      "linear-gradient(150deg, rgba(219,124,161,0.26) 0%, rgba(250,214,227,0.16) 55%, rgba(219,124,161,0.32) 100%)",
    label: "Our Philosophy",
    text: "Crafted for the woman who moves through the world with intention.",
    feature: true,
    range: [40, -40],
  },
  {
    index: "02",
    accent: "#E59AB8",
    gradient:
      "linear-gradient(150deg, rgba(229,154,184,0.26) 0%, rgba(250,214,227,0.18) 100%)",
    label: "Fabric",
    text: "Considered, quiet colour.",
    range: [80, -70],
  },
  {
    index: "03",
    accent: "#F0B7CC",
    gradient:
      "linear-gradient(150deg, rgba(240,183,204,0.28) 0%, rgba(253,236,242,0.16) 100%)",
    label: "Craft",
    text: "Finished by hand.",
    range: [10, -20],
  },
];

export default function AboutVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 aspect-[4/5] order-2 md:order-1"
      aria-hidden
    >
      {cards.map((card) => (
        <Card key={card.index} card={card} progress={scrollYProgress} reduce={!!reduce} />
      ))}
    </div>
  );
}

function Card({
  card,
  progress,
  reduce,
}: {
  card: LayoutCard;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
}) {
  const y = useTransform(progress, [0, 1], card.range);

  return (
    <motion.article
      style={{ y: reduce ? 0 : y }}
      className={`group relative overflow-hidden bg-cream dark:bg-dk-surface border border-sand dark:border-dk-border shadow-[0_28px_55px_-32px_rgba(28,26,24,0.55)] ${
        card.feature ? "row-span-2" : ""
      }`}
    >
      {/* Duotone gradient wash */}
      <div className="absolute inset-0" style={{ background: card.gradient }} />

      {/* Top-left sheen */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 28% 18%, rgba(255,255,255,0.28) 0%, transparent 58%)",
        }}
      />

      {/* Fine grain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] mix-blend-multiply dark:mix-blend-screen"
        aria-hidden
      >
        <filter id={`grain-${card.index}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${card.index})`} />
      </svg>

      {/* Bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "linear-gradient(to top, rgba(28,26,24,0.22) 0%, rgba(28,26,24,0.04) 45%, transparent 100%)",
        }}
      />

      {/* Matte inner frame */}
      <div className="absolute inset-[10px] border border-ivory/55 dark:border-dk-text/10 pointer-events-none" />

      {/* Index numeral */}
      <span
        className={`absolute font-display font-light text-soft-gold/70 ${
          card.feature ? "top-6 right-7 text-3xl" : "top-5 right-5 text-xl"
        }`}
      >
        {card.index}
      </span>

      {/* Inset accent square — feature card only */}
      {card.feature && (
        <div className="absolute top-1/3 right-7 w-[42%] aspect-square border border-champagne/50 dark:border-dk-border/40" />
      )}

      {/* Caption */}
      <div className={`absolute left-7 right-7 ${card.feature ? "bottom-8" : "bottom-6 left-6 right-6"}`}>
        <div className="w-8 h-px bg-soft-gold mb-3" />
        <p className="text-[10px] tracking-[0.2em] uppercase text-soft-gold font-medium mb-2">
          {card.label}
        </p>
        <p
          className={`font-display font-light italic text-charcoal/85 dark:text-dk-text/75 leading-relaxed ${
            card.feature ? "text-lg md:text-xl" : "text-[13px]"
          }`}
        >
          {card.feature ? `“${card.text}”` : card.text}
        </p>
      </div>
    </motion.article>
  );
}
