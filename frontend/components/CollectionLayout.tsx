import { PortableText } from "@portabletext/react";
import type { PortableTextBlock, SanityImage } from "@/lib/types";
import { urlFor } from "@/sanity/image";

/**
 * Renders a collection's editorial layout blocks (authored in Sanity) in order.
 * Server component — content only, no interactivity. Unknown section types are
 * skipped so new Sanity blocks never break the page.
 */

interface HeroSection {
  _type: "sectionHero";
  _key: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  image?: SanityImage;
}

interface ImageTextSection {
  _type: "sectionImageText";
  _key: string;
  image?: SanityImage;
  imagePosition?: "left" | "right";
  heading?: string;
  body?: PortableTextBlock[];
}

interface GallerySection {
  _type: "sectionGallery";
  _key: string;
  heading?: string;
  images?: SanityImage[];
}

type Section = HeroSection | ImageTextSection | GallerySection;

function img(source: SanityImage | undefined, w: number, h: number) {
  return source
    ? (urlFor(source)?.width(w).height(h).fit("crop").auto("format").url() ??
        null)
    : null;
}

export default function CollectionLayout({ sections }: { sections: unknown[] }) {
  const blocks = (sections as Section[]).filter(
    (s) => s && typeof s === "object" && "_type" in s,
  );
  if (blocks.length === 0) return null;

  return (
    <div className="flex flex-col">
      {blocks.map((section) => {
        switch (section._type) {
          case "sectionHero": {
            const src = img(section.image, 1600, 900);
            return (
              <section
                key={section._key}
                className="relative overflow-hidden px-6 md:px-10 py-20 md:py-28"
                style={
                  src
                    ? { background: `url(${src}) center / cover no-repeat` }
                    : undefined
                }
              >
                <div className="max-w-screen-xl mx-auto text-center">
                  {section.eyebrow && (
                    <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-3">
                      {section.eyebrow}
                    </p>
                  )}
                  {section.heading && (
                    <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-charcoal dark:text-dk-text leading-tight">
                      {section.heading}
                    </h2>
                  )}
                  {section.intro && (
                    <p className="mt-4 max-w-xl mx-auto text-[15px] leading-relaxed text-taupe dark:text-dk-muted">
                      {section.intro}
                    </p>
                  )}
                </div>
              </section>
            );
          }
          case "sectionImageText": {
            const src = img(section.image, 1000, 1000);
            const imageRight = section.imagePosition === "right";
            return (
              <section
                key={section._key}
                className="px-6 md:px-10 py-16 md:py-24"
              >
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                  <div
                    className={`relative overflow-hidden bg-warm-white dark:bg-dk-surface aspect-square ${
                      imageRight ? "md:order-2" : ""
                    }`}
                    style={
                      src
                        ? { background: `url(${src}) center / cover no-repeat` }
                        : undefined
                    }
                    aria-hidden={!src}
                  />
                  <div>
                    {section.heading && (
                      <h3 className="font-display text-2xl md:text-3xl font-light text-charcoal dark:text-dk-text mb-4">
                        {section.heading}
                      </h3>
                    )}
                    {section.body && section.body.length > 0 && (
                      <div className="space-y-4 text-[15px] leading-relaxed text-taupe dark:text-dk-muted">
                        <PortableText value={section.body} />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          }
          case "sectionGallery": {
            const images = (section.images ?? [])
              .map((i) => img(i, 800, 800))
              .filter((u): u is string => Boolean(u));
            if (images.length === 0) return null;
            return (
              <section
                key={section._key}
                className="px-6 md:px-10 py-16 md:py-24"
              >
                <div className="max-w-screen-xl mx-auto">
                  {section.heading && (
                    <h3 className="font-display text-2xl md:text-3xl font-light text-charcoal dark:text-dk-text mb-8 text-center">
                      {section.heading}
                    </h3>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                    {images.map((src, i) => (
                      <div
                        key={`${section._key}-${i}`}
                        className="relative overflow-hidden aspect-square bg-warm-white dark:bg-dk-surface"
                        style={{
                          background: `url(${src}) center / cover no-repeat`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </section>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
