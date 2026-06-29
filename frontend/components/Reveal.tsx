"use client";
import { EASE_LUXURY } from "@/lib/motion";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  /** vertical travel in px */
  y?: number;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}

/**
 * Scroll-reveal wrapper — fade + slide up once in view.
 * Honours `prefers-reduced-motion` (renders content immediately, no transform).
 */
export default function Reveal({
  children,
  y = 28,
  delay = 0,
  duration = 0.8,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE_LUXURY }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
