import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Story — Th3rd",
  description:
    "Th3rd brings the craftsmanship of the world's finest luxury houses to modest fashion — fabric, drape, and intention.",
};

const stats = [
  { value: 12, suffix: "+", label: "Fabric types" },
  { value: 40, suffix: "+", label: "Colourways" },
  { value: 3, suffix: "k+", label: "Happy clients" },
  { value: 100, suffix: "%", label: "Hand finished" },
];

const principles = [
  {
    number: "01",
    label: "Craftsmanship",
    copy: "Every piece is developed with obsessive attention to fabric weight, drape, and finish.",
  },
  {
    number: "02",
    label: "Considered Fabrics",
    copy: "We source only the finest silk, linen, and modal — chosen to move with you, not against you.",
  },
  {
    number: "03",
    label: "Worn with Intention",
    copy: "Colourways developed in-house for the woman who moves through the world with purpose.",
  },
];

const steps = [
  { number: "01", label: "Source", copy: "We seek out mills whose silk, linen, and modal meet our standard for hand and drape." },
  { number: "02", label: "Develop", copy: "Colourways are mixed in-house, sampled, and lived with until the tone feels exactly right." },
  { number: "03", label: "Cut & Drape", copy: "Each style is cut to a weight and length tuned for the way a hijab actually moves." },
  { number: "04", label: "Finish", copy: "Edges are finished by hand, pressed, and checked piece by piece before they reach you." },
];

const marqueeWords = ["Modesty", "Craft", "Silk", "Intention", "Drape", "Heritage"];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="bg-ivory dark:bg-dk-base">
        <AboutHero />

        <Marquee items={marqueeWords} />

        <AboutStory />

        {/* By the numbers */}
        <section
          className="px-6 md:px-10 py-20 md:py-28 bg-cream dark:bg-dk-alt"
          aria-label="By the numbers"
        >
          <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="text-center md:text-left">
                <p className="font-display text-4xl md:text-6xl font-light text-charcoal dark:text-dk-text">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[11px] tracking-[0.12em] uppercase text-stone dark:text-dk-subtle mt-3">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="px-6 md:px-10 py-20 md:py-28" aria-label="Our principles">
          <div className="max-w-screen-xl mx-auto">
            <Reveal>
              <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-3">
                What We Stand For
              </p>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light text-charcoal dark:text-dk-text leading-tight mb-14 md:mb-16">
                Three principles, in every piece
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sand dark:bg-dk-border">
              {principles.map((p, i) => (
                <Reveal
                  key={p.number}
                  delay={i * 0.1}
                  className="bg-ivory dark:bg-dk-base px-0 md:px-8 py-2 md:py-4"
                >
                  <p className="font-display text-3xl md:text-4xl font-light text-soft-gold mb-4">
                    {p.number}
                  </p>
                  <h3 className="text-[12px] tracking-[0.14em] uppercase text-charcoal dark:text-dk-text font-medium mb-3">
                    {p.label}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-taupe dark:text-dk-muted font-light">
                    {p.copy}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The Making */}
        <section
          className="px-6 md:px-10 py-20 md:py-28 bg-cream dark:bg-dk-alt"
          aria-label="How it's made"
        >
          <div className="max-w-screen-xl mx-auto">
            <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-3">
                  The Making
                </p>
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light text-charcoal dark:text-dk-text leading-tight">
                  From mill to drape
                </h2>
              </div>
              <p className="md:max-w-xs text-[14px] leading-relaxed text-taupe dark:text-dk-muted font-light">
                Four deliberate stages, each one slow on purpose.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {steps.map((s, i) => (
                <Reveal
                  key={s.number}
                  delay={i * 0.1}
                  className="border-t border-sand dark:border-dk-border pt-5"
                >
                  <p className="text-[11px] tracking-[0.16em] uppercase text-soft-gold font-medium mb-4">
                    {s.number}
                  </p>
                  <h3 className="font-display text-xl font-light text-charcoal dark:text-dk-text mb-3">
                    {s.label}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-taupe dark:text-dk-muted font-light">
                    {s.copy}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section className="px-6 md:px-10 py-24 md:py-36 bg-charcoal dark:bg-dk-deep">
          <Reveal as="div" className="max-w-3xl mx-auto text-center">
            <blockquote>
              <p className="font-display text-[clamp(1.75rem,4vw,3rem)] font-light italic text-ivory leading-snug">
                &ldquo;We don&apos;t follow seasons. We make pieces meant to outlast
                them.&rdquo;
              </p>
              <footer className="mt-8 text-[11px] tracking-[0.18em] uppercase text-champagne/70">
                The Th3rd Atelier
              </footer>
            </blockquote>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-10 py-20 md:py-28 text-center">
          <Reveal>
            <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-5">
              Begin
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light text-charcoal dark:text-dk-text leading-tight mb-10">
              Find your everyday piece
            </h2>
            <Link
              href="/collections"
              className="inline-flex items-center gap-3 bg-charcoal dark:bg-dk-text text-ivory dark:text-dk-base text-[12px] tracking-[0.14em] uppercase px-8 py-4 hover:bg-ink dark:hover:bg-ivory transition-colors duration-300 font-medium"
            >
              Explore the Collections
              <svg
                width="13"
                height="13"
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
            </Link>
          </Reveal>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
