"use client";
import { EASE_LUXURY } from "@/lib/motion";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_LUXURY }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/95 dark:bg-dk-base/95 backdrop-blur-md border-b border-sand dark:border-dk-border shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl md:text-2xl tracking-[0.12em] font-light text-charcoal dark:text-dk-text hover:text-soft-gold dark:hover:text-soft-gold transition-colors duration-300"
          aria-label="Th3rd — Home"
        >
          TH3RD
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[13px] tracking-[0.1em] uppercase text-taupe dark:text-dk-muted hover:text-charcoal dark:hover:text-dk-text transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            className="hidden md:flex text-taupe dark:text-dk-muted hover:text-charcoal dark:hover:text-dk-text transition-colors duration-200"
          >
            <SearchIcon />
          </button>
          <ThemeToggle />
          <button
            aria-label="Cart (0 items)"
            className="relative text-taupe dark:text-dk-muted hover:text-charcoal dark:hover:text-dk-text transition-colors duration-200"
          >
            <BagIcon />
          </button>
          {/* Mobile menu toggle */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-charcoal dark:text-dk-text"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: EASE_LUXURY }}
          className="md:hidden bg-ivory dark:bg-dk-base border-t border-sand dark:border-dk-border px-6 pb-6"
        >
          <ul className="flex flex-col gap-6 pt-6" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[13px] tracking-[0.1em] uppercase text-taupe dark:text-dk-muted hover:text-charcoal dark:hover:text-dk-text transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
