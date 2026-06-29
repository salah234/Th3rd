"use client";

import { motion, useReducedMotion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  /** seconds for one full loop */
  duration?: number;
}

/**
 * Infinite horizontal marquee of words, framed by gold hairlines.
 * Two identical tracks slide left in lockstep for a seamless loop.
 * Reduced-motion → a single static, centered row.
 */
export default function Marquee({ items, duration = 28 }: MarqueeProps) {
  const reduce = useReducedMotion();

  const Word = ({ word }: { word: string }) => (
    <span className="flex items-center gap-8 md:gap-12 shrink-0">
      <span className="font-display text-2xl md:text-4xl font-light italic text-charcoal/70 dark:text-dk-text/60">
        {word}
      </span>
      <span className="text-soft-gold text-lg" aria-hidden>
        &#10022;
      </span>
    </span>
  );

  return (
    <div
      className="relative overflow-hidden border-y border-sand dark:border-dk-border bg-ivory dark:bg-dk-base py-6 md:py-8"
      aria-label="Th3rd in a few words"
    >
      {reduce ? (
        <div className="flex justify-center gap-8 md:gap-12 px-6 flex-wrap">
          {items.map((w) => (
            <Word key={w} word={w} />
          ))}
        </div>
      ) : (
        <motion.div
          className="flex gap-8 md:gap-12 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration }}
        >
          {/* two copies → seamless wrap at -50% */}
          {[0, 1].map((copy) => (
            <div className="flex gap-8 md:gap-12 shrink-0" key={copy} aria-hidden={copy === 1}>
              {items.map((w) => (
                <Word key={`${copy}-${w}`} word={w} />
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
