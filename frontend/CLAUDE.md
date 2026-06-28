# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This project uses the **frontend-skill** from the Open Design Skills collection.

## Stack

- **Next.js 16** (App Router) with TypeScript
- **Tailwind CSS v4** — custom tokens via `@theme inline` in `globals.css` (no `tailwind.config.ts`)
- **Framer Motion 12** — all animations live in client components
- **Fonts**: Cormorant Garamond (display/serif) via `--font-cormorant`, DM Sans (body) via `--font-dm-sans`

## Commands

```bash
npm run dev      # start dev server on localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Architecture

```
app/
  layout.tsx             # root layout, fonts, ThemeProvider wrapper
  page.tsx               # homepage, composes section components
  globals.css            # Tailwind v4 tokens, dark mode tokens, @variant dark
components/
  ThemeProvider.tsx      # client component — reads localStorage/system pref, sets html.dark
  ThemeToggle.tsx        # sun/moon icon button in Navigation
  Navigation.tsx         # fixed header, scroll-aware bg, mobile menu, theme toggle
  HeroSection.tsx        # full-screen editorial hero, staggered Framer Motion
  FeaturedProducts.tsx   # new arrivals grid with ProductCard
  ProductCard.tsx        # item card, hover reveal, color swatches, quick-add
  CollectionsGrid.tsx    # collections layout with CollectionCard
  CollectionCard.tsx     # image card with overlay text + hover
  BrandStory.tsx         # editorial 2-col brand philosophy section
  NewsletterSection.tsx  # email capture → creates Subscriber
  Footer.tsx             # brand links, social, legal
lib/
  types.ts               # Item, Collection, Cart, CartItem, Client, Subscriber
  motion.ts              # EASE_LUXURY constant (typed Framer Motion bezier tuple)
```

## Design System

Custom color tokens (defined in `globals.css`, used as `text-charcoal`, `bg-ivory`, etc.):

**Light palette:**

| Token | Hex | Use |
|---|---|---|
| `ivory` | `#FDFBF7` | Page background |
| `cream` | `#FAF6EF` | Section alternate bg |
| `charcoal` | `#2C2A28` | Primary text |
| `taupe` | `#8C7B6B` | Secondary text |
| `soft-gold` | `#C9A96E` | Accent, labels |
| `champagne` | `#EDD9B4` | Highlights |
| `sand` | `#E8E0D5` | Borders, dividers |
| `ink` | `#1A1816` | Footer bg, dark CTA |

**Dark palette (prefixed `dk-`, used as `dark:bg-dk-base` etc.):**

| Token | Hex | Use |
|---|---|---|
| `dk-base` | `#1C1A18` | Dark page background |
| `dk-alt` | `#222019` | Dark alternate section bg |
| `dk-surface` | `#282522` | Dark card/elevated surface |
| `dk-deep` | `#0E0D0C` | Footer in dark mode |
| `dk-text` | `#EFE9E1` | Primary text in dark |
| `dk-muted` | `#A89990` | Secondary text in dark |
| `dk-subtle` | `#6D6360` | Captions/labels in dark |
| `dk-border` | `#383230` | Borders in dark |

Display text uses `font-display` (Cormorant Garamond). Body uses `font-sans` (DM Sans).

## Dark Mode

Dark mode is **class-based** (`.dark` on `<html>`), enabled via `@variant dark (&:where(.dark, .dark *))` in `globals.css`.

**ThemeProvider** (`components/ThemeProvider.tsx`) reads `localStorage` key `th3rd-theme` on mount, falls back to `prefers-color-scheme`, and applies `.dark` to `<html>`. It is rendered server-side (no flicker on SSR because it's a client component that runs before paint).

**ThemeToggle** (`components/ThemeToggle.tsx`) — moon/sun icon button in the Navigation — writes to `localStorage` and toggles the class directly.

**Adding dark styles to a component:** use `dark:` prefix with the `dk-*` tokens:
```jsx
<div className="bg-ivory dark:bg-dk-base text-charcoal dark:text-dk-text">
```

**Inline styles that need dark mode** (e.g., gradient backgrounds): define a CSS variable in `:root` and override it in `.dark {}` in `globals.css`. Then reference `var(--my-var)` in the `style` prop. See `--hero-texture` and `--brand-block-bg` as examples.

## Data Model

Components map directly to backend entities:

- `ProductCard` → accepts `Item`
- `CollectionCard` → accepts `Collection`
- `CartDrawer` → accepts `Cart`
- `NewsletterSection` → creates `Subscriber`

Do not invent data structures outside `lib/types.ts`.

## Animations

All Framer Motion animations use `[0.22, 1, 0.36, 1]` easing (luxury feel). Use `whileInView` + `viewport={{ once: true }}` for scroll reveals. Never add `"use client"` to server components — only components with interactivity or animations need it.

## Frontend Development

- Use the installed **frontend-skill** as the primary source of guidance for UI and frontend implementation.
- Follow the design patterns, architecture, and coding conventions defined in the skill.
- Keep components accessible, responsive, and consistent with the design system.
- Prefer incremental changes over large rewrites.
- Preserve the project's existing folder structure and styling conventions.

## Notes

The frontend-skill is considered the authoritative guide for component architecture, UI/UX implementation, styling conventions, accessibility, design system usage, and frontend workflows. If guidance in this file conflicts with the installed skill, follow the installed skill.
