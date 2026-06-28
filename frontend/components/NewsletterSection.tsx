"use client";
import { EASE_LUXURY } from "@/lib/motion";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    // Subscriber creation hook — connect to backend /api/subscribers
    try {
      await new Promise((res) => setTimeout(res, 800)); // placeholder
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className="bg-charcoal dark:bg-dk-alt py-24 md:py-32 px-6 md:px-10"
      aria-labelledby="newsletter-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE_LUXURY }}
        className="max-w-xl mx-auto text-center"
      >
        <p className="text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium mb-6">
          Stay Close
        </p>
        <h2
          id="newsletter-heading"
          className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-ivory leading-tight mb-5"
        >
          The Edit
        </h2>
        <p className="text-[14px] leading-relaxed text-stone mb-10 font-light">
          New arrivals, behind-the-scenes stories, and exclusive early access —
          delivered to your inbox.
        </p>

        {status === "success" ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[13px] tracking-[0.08em] text-champagne font-light"
          >
            You&apos;re on the list. Thank you.
          </motion.p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            aria-label="Newsletter signup form"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-transparent border border-stone/40 text-ivory placeholder-stone/60 text-[13px] px-5 py-3.5 focus:outline-none focus:border-soft-gold transition-colors duration-200 font-light"
              aria-describedby={status === "error" ? "newsletter-error" : undefined}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-soft-gold text-ivory text-[11px] tracking-[0.14em] uppercase px-7 py-3.5 font-medium hover:bg-dark-gold transition-colors duration-200 disabled:opacity-60 disabled:cursor-wait shrink-0"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p id="newsletter-error" className="mt-3 text-[12px] text-red-400" role="alert">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="mt-5 text-[11px] text-stone/50 font-light">
          No spam, ever. Unsubscribe at any time.
        </p>
      </motion.div>
    </section>
  );
}
