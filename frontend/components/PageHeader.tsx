import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "center" | "left";
}

/**
 * Shared editorial page header — eyebrow label, display heading, optional lede.
 * Includes the top padding needed to clear the fixed Navigation.
 */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  align = "center",
}: PageHeaderProps) {
  const isCenter = align === "center";

  return (
    <section className="px-6 md:px-10 pt-28 md:pt-36 pb-12 md:pb-16">
      <div
        className={`max-w-screen-xl mx-auto ${isCenter ? "text-center" : "text-left"}`}
      >
        <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-3">
          {eyebrow}
        </p>
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-light text-charcoal dark:text-dk-text leading-tight">
          {title}
        </h1>
        {intro && (
          <p
            className={`mt-5 max-w-xl text-[15px] leading-relaxed text-taupe dark:text-dk-muted ${
              isCenter ? "mx-auto" : ""
            }`}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
