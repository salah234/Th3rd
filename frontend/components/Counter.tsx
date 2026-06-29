"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  /** the final numeric value to count to */
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

const easeOut = (t: number) => {
  // cubic-bezier(0.22, 1, 0.36, 1) approximation for a luxe ease-out
  return 1 - Math.pow(1 - t, 3);
};

/**
 * Counts up to `value` once when scrolled into view.
 * Reduced-motion → renders the final value immediately.
 */
export default function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      setDisplay(Math.round(easeOut(t) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
