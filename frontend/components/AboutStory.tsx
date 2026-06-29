"use client";

import AboutVisual from "@/components/AboutVisual";
import Reveal from "@/components/Reveal";

const blocks = [
  {
    eyebrow: "Our Philosophy",
    heading: (
      <>
        Modesty as a
        <br />
        <em className="italic text-taupe dark:text-dk-muted">form of art</em>
      </>
    ),
    body: "We began in a small atelier with a single question: why should modest dressing mean compromising on beauty? It shouldn't. So we set out to make hijabs the way the great houses make couture.",
  },
  {
    eyebrow: "The Material",
    heading: <>Sourced for the hand</>,
    body: "Each fabric is chosen for its weight and drape, then paired with colourways developed in-house. Nothing is left to chance — every tone is sampled and lived with until it feels exactly right.",
  },
  {
    eyebrow: "The Finish",
    heading: <>Made to last years</>,
    body: "Edges are finished by hand, pressed, and checked piece by piece. The result is a hijab that feels considered — one made to be worn for years, not seasons.",
  },
];

/**
 * Sticky scrollytelling story.
 * On md+ the visual pins while the narrative blocks scroll past it.
 * On mobile it stacks normally (visual first, then the blocks).
 */
export default function AboutStory() {
  return (
    <section
      className="px-6 md:px-10 py-20 md:py-28"
      aria-labelledby="about-story-heading"
    >
      <h2 id="about-story-heading" className="sr-only">
        Our story
      </h2>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Pinned visual */}
        <div className="md:sticky md:top-28 md:self-start">
          <AboutVisual />
        </div>

        {/* Narrative blocks */}
        <div className="flex flex-col gap-20 md:gap-[42vh] md:py-[12vh]">
          {blocks.map((b, i) => (
            <Reveal key={i} className="max-w-md">
              <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-5">
                {b.eyebrow}
              </p>
              <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light text-charcoal dark:text-dk-text leading-tight mb-6">
                {b.heading}
              </h3>
              <p className="text-[15px] leading-relaxed text-taupe dark:text-dk-muted font-light">
                {b.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
