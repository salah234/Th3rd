"use client";
import { EASE_LUXURY } from "@/lib/motion";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Collection } from "@/lib/types";

interface CollectionCardProps {
  collection: Collection;
  index?: number;
  variant?: "landscape" | "portrait";
}

export default function CollectionCard({
  collection,
  index = 0,
  variant = "portrait",
}: CollectionCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: EASE_LUXURY,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden"
    >
      <Link href={`/collections/${collection.handle ?? collection.id}`} aria-label={`Browse ${collection.title} collection`}>
        {/* Image area */}
        <div
          className={`relative overflow-hidden ${
            variant === "landscape" ? "aspect-[16/9]" : "aspect-[3/4]"
          }`}
        >
          <div
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              background: collection.imageUrl
                ? undefined
                : collection.accentColor
                ? `linear-gradient(135deg, ${collection.accentColor}22 0%, ${collection.accentColor}44 100%)`
                : "linear-gradient(135deg, #F6DBE5 0%, #FAD6E3 100%)",
            }}
            aria-hidden={!collection.imageUrl}
          />

          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(to top, rgba(28,26,24,0.6) 0%, rgba(28,26,24,0.1) 50%, transparent 100%)",
              opacity: hovered ? 0.9 : 0.7,
            }}
            aria-hidden
          />

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <motion.p
              initial={false}
              animate={{ y: hovered ? -4 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-[11px] tracking-[0.18em] uppercase text-champagne/80 mb-2 font-medium"
            >
              {collection.description ?? "Collection"}
            </motion.p>
            <h3 className="font-display text-2xl md:text-3xl font-light text-ivory leading-tight">
              {collection.title}
            </h3>

            <motion.div
              initial={false}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-ivory/80 font-medium"
              aria-hidden={!hovered}
            >
              Shop Now
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M1 7h12M8 2l6 5-6 5" />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
