"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { EASE_LUXURY } from "@/lib/motion";
import { urlFor } from "@/sanity/image";
import type { ColorOption, PortableTextBlock, SanityImage } from "@/lib/types";

interface ProductViewProps {
  title: string;
  subtitle?: string;
  price: string;
  originalPrice?: string | null;
  images: SanityImage[];
  colorOptions?: ColorOption[];
  body?: PortableTextBlock[];
  /** Gradient fallback when there is no image at all. */
  placeholder: string;
}

function toUrl(
  img: SanityImage | undefined,
  width: number,
  height: number,
): string | null {
  if (!img) return null;
  return (
    urlFor(img)?.width(width).height(height).fit("crop").auto("format").url() ??
    null
  );
}

export default function ProductView({
  title,
  subtitle,
  price,
  originalPrice,
  images,
  colorOptions = [],
  body,
  placeholder,
}: ProductViewProps) {
  // Product gallery URLs (large + thumbnail sizes).
  const gallery = useMemo(
    () =>
      images
        .map((img) => toUrl(img, 1000, 1333))
        .filter((u): u is string => Boolean(u)),
    [images],
  );

  // Selected colourway (by index). null = show the default product gallery.
  const [activeColor, setActiveColor] = useState<number | null>(null);

  // The image driving the main frame: selected colour's photo when it has one,
  // otherwise the first product image.
  const colorImage =
    activeColor !== null
      ? toUrl(colorOptions[activeColor]?.image, 1000, 1333)
      : null;
  const mainImage = colorImage ?? gallery[0] ?? null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
      {/* Gallery */}
      <div className="flex flex-col gap-4">
        <div
          className="relative overflow-hidden bg-warm-white dark:bg-dk-surface aspect-[3/4]"
          style={{ background: mainImage ? undefined : placeholder }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mainImage && (
              <motion.img
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE_LUXURY }}
                src={mainImage}
                alt={
                  activeColor !== null
                    ? `${title} — ${colorOptions[activeColor]?.name}`
                    : title
                }
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Thumbnail strip — clears the colour selection back to the gallery. */}
        {gallery.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {gallery.slice(1, 5).map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveColor(null)}
                className="relative overflow-hidden bg-warm-white dark:bg-dk-surface aspect-square"
                aria-label={`${title} — view ${i + 2}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${title} — view ${i + 2}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="md:pt-6">
        {subtitle && (
          <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-4">
            {subtitle}
          </p>
        )}
        <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal dark:text-dk-text leading-[1.1] mb-6">
          {title}
        </h1>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-[20px] text-charcoal dark:text-dk-text font-medium">
            {price}
          </span>
          {originalPrice && (
            <span className="text-[16px] text-taupe dark:text-dk-subtle line-through">
              {originalPrice}
            </span>
          )}
        </div>

        {/* Colour selector */}
        {colorOptions.length > 0 && (
          <div className="mb-8">
            <p className="text-[11px] tracking-[0.12em] uppercase text-taupe dark:text-dk-muted mb-3">
              {activeColor !== null ? colorOptions[activeColor].name : "Colours"}
            </p>
            <div
              className="flex items-center gap-2"
              role="radiogroup"
              aria-label="Available colours"
            >
              {colorOptions.map((color, i) => {
                const selected = activeColor === i;
                return (
                  <button
                    key={color.name}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    title={color.name}
                    aria-label={color.name}
                    onClick={() => setActiveColor(selected ? null : i)}
                    className={`w-6 h-6 rounded-full border transition-[box-shadow,transform] duration-200 hover:scale-110 ${
                      selected
                        ? "border-charcoal dark:border-dk-text ring-2 ring-offset-2 ring-charcoal dark:ring-dk-text ring-offset-ivory dark:ring-offset-dk-base"
                        : "border-sand/60 dark:border-dk-border/60"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Add to bag */}
        <button
          type="button"
          className="w-full md:w-auto md:min-w-[280px] bg-charcoal dark:bg-dk-text text-ivory dark:text-dk-base text-[12px] tracking-[0.14em] uppercase py-4 px-10 font-medium hover:bg-ink dark:hover:opacity-90 transition-colors duration-200"
        >
          Add to Bag
        </button>

        {body && body.length > 0 ? (
          <div className="mt-8 max-w-md space-y-4 text-[15px] leading-relaxed text-taupe dark:text-dk-muted [&_a]:text-soft-gold [&_a]:underline [&_strong]:text-charcoal dark:[&_strong]:text-dk-text">
            <PortableText value={body} />
          </div>
        ) : (
          <p className="mt-8 text-[14px] leading-relaxed text-taupe dark:text-dk-muted max-w-md">
            Considered fabric, quiet colour, and a drape made to be worn for
            years. Each piece is finished by hand in small runs.
          </p>
        )}
      </div>
    </div>
  );
}
