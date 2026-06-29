---
name: frontend-skill
description: |
  Build pages and UI for the Th3rd hijab storefront with restrained, editorial
  composition. The authoritative playbook for this project's design system,
  typography scale, animation, React/Next.js patterns, and component architecture.
triggers:
  - "landing page"
  - "frontend playbook"
  - "ui composition"
  - "restrained ui"
  - "new page"
  - "collection page"
  - "product page"
  - "typography"
  - "react patterns"
  - "custom hook"
  - "form validation"
  - "performance"
od:
  mode: design-system
  category: design-systems
  upstream: "https://github.com/openai/skills"
---

> Project playbook for the Th3rd storefront frontend. When this skill conflicts
> with `CLAUDE.md`, follow this skill. For generic, framework-level React/Next.js
> recipes (compound components, virtualization, error boundaries, etc.) the
> companion **`frontend-patterns`** skill is the reference — this file shows how to
> apply those patterns *inside this codebase's conventions*.

## What this skill does

Guides building visually strong, restrained pages and UI for the Th3rd hijab
storefront (`Th3rd/frontend/`). The aesthetic is editorial luxury: generous
whitespace, quiet colour, serif display type, and a single calm motion language.
**Compose the existing components before inventing new ones.**

## Stack

- **Next.js 16** (App Router) + **TypeScript**. Route segments live in `app/`.
- **Tailwind CSS v4** — tokens declared with `@theme inline` in `app/globals.css`.
  There is **no `tailwind.config.ts`**; add new tokens in `globals.css`.
- **Framer Motion 12** — animation lives in client components only.
- **Fonts**: Fraunces (`font-display`) for headings; Jost (`font-sans`) for body.

Anything beyond this set (Zustand, React Query/SWR, `@tanstack/react-virtual`,
Zod) is **not installed** — treat the `frontend-patterns` examples that use them as
optional, and add the dependency before using them.

## Project map

```
app/
  layout.tsx              # root layout, fonts, ThemeProvider
  page.tsx                # homepage — composes section components
  globals.css             # Tailwind v4 tokens + dark-mode variant
  collections/
    page.tsx              # /collections — all collections grid
    [handle]/page.tsx     # /collections/[handle] — single collection
  new-arrivals/page.tsx   # /new-arrivals — full catalogue, new-first
  about/page.tsx          # /about — editorial story page
components/                # Navigation, Footer, Hero, *Card, PageHeader,
                           # AboutVisual, sections, Theme*
lib/
  types.ts                # Item, Collection, Cart, CartItem, Client, Subscriber
  data.ts                 # mock collections/items + lookups (single source of truth)
  motion.ts               # EASE_LUXURY easing tuple
```

## Design tokens

Use semantic token classes (`bg-ivory`, `text-charcoal`, …) — never raw hex in
JSX except for per-item/per-collection `accentColor` gradients.

**Light:** `ivory` (page bg), `cream` (alt section bg), `charcoal` (primary text),
`taupe` (secondary text), `soft-gold` (accent / eyebrow labels), `champagne`
(highlights), `sand` (borders), `ink` (dark CTA / footer). Also seen: `stone`
(muted captions), `warm-white`, `dark-gold`.

**Dark** (`dk-` prefix, paired via `dark:`): `dk-base`, `dk-alt`, `dk-surface`,
`dk-deep`, `dk-text`, `dk-muted`, `dk-subtle`, `dk-border`.

Always pair light + dark: `className="bg-ivory dark:bg-dk-base text-charcoal dark:text-dk-text"`.

## Typography type scale

The type system is a small set of named roles. Reuse these exact recipes; don't
invent new sizes. (Pull live examples from `HeroSection.tsx`, `PageHeader.tsx`,
`BrandStory.tsx`, `ProductCard.tsx`, `NewsletterSection.tsx`.)

| Role | Where | Classes |
|---|---|---|
| **Display** | Hero `<h1>` | `font-display font-light leading-[1.06] text-[clamp(3rem,7vw,6rem)] text-charcoal dark:text-dk-text` |
| **H1 / Page title** | `PageHeader` | `font-display font-light leading-tight text-[clamp(2.25rem,5vw,3.5rem)] text-charcoal dark:text-dk-text` |
| **H2 / Section** | section headers | `font-display font-light leading-tight text-[clamp(2rem,4vw,3rem)] text-charcoal dark:text-dk-text` |
| **H3 / Card title** | product/collection card | `font-display font-light leading-snug text-[1.1rem]` (collection: `text-2xl md:text-3xl`) |
| **Eyebrow** | label above headings | `text-[11px] tracking-[0.22em] uppercase text-soft-gold font-medium` |
| **Lede** | intro paragraph | `text-[15px] leading-relaxed text-taupe dark:text-dk-muted` |
| **Body** | running copy | `text-[15px] leading-relaxed text-taupe dark:text-dk-muted font-light` |
| **Caption / meta** | card subtitle, stat label | `text-[11px] tracking-[0.1em] uppercase text-stone dark:text-dk-subtle` |
| **Price** | product price | `text-[14px] font-medium text-charcoal dark:text-dk-text` (struck original: `text-[13px] text-stone dark:text-dk-subtle line-through`) |
| **Quote** | editorial pull-quote | `font-display font-light italic text-lg md:text-xl` |
| **Badge** | New/Bestseller | `text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 font-medium` |
| **CTA link** | inline action | `text-[12px] tracking-[0.14em] uppercase border-b border-current pb-1 hover:text-charcoal dark:hover:text-dk-text` |
| **CTA button** | primary action | `bg-charcoal dark:bg-dk-text text-ivory dark:text-dk-base text-[12px] tracking-[0.14em] uppercase px-8 py-4` |

**Rules of thumb**
- Headings: `font-display font-light` always; emphasise with `<em class="italic text-taupe dark:text-dk-muted">`.
- Body never uses `font-display`; secondary copy is `font-light`.
- Uppercase microcopy (eyebrow/caption/CTA/badge) always carries letter-spacing
  (`tracking-[0.1em]`–`tracking-[0.22em]`); the smaller the text, the wider —
  except eyebrows, which are widest.
- Fluid headings use `clamp()`, never fixed `px`.

> If a typed token map is ever wanted, add `lib/typography.ts` exporting a
> `Record<Role, string>` of these class strings and reference it from components —
> guidance only; not implemented yet.

## Animation conventions

- Import the shared easing: `import { EASE_LUXURY } from "@/lib/motion"`
  (`[0.22, 1, 0.36, 1]`). Use it for every transition.
- Scroll reveal: `initial={{ opacity: 0, y: 20–32 }}` →
  `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-60px" }}`,
  `transition={{ duration: 0.6–0.9, ease: EASE_LUXURY }}`.
- Stagger lists by passing `index` to cards and using `delay: index * 0.1`. For a
  parent-driven stagger use `Variants` with `staggerChildren` (see `HeroSection`).
- Continuous ambient motion (e.g. `AboutVisual` postcards) uses
  `animate={{ y:[…], rotate:[…] }}` with `repeat: Infinity, ease: "easeInOut"` and
  per-layer `delay` so layers drift out of phase.
- Keep motion subtle: one reveal per element; hover scale ≤ 1.05.

## Page & component patterns

- **Page shell**: every route renders `<Navigation />` + `<main>…</main>` +
  `<Footer />` (see `app/page.tsx`, `app/collections/page.tsx`, `app/about/page.tsx`).
- **Shared header**: use `<PageHeader eyebrow title intro align />` for non-hero
  pages — it already supplies the eyebrow/H1/lede and the top padding that clears
  the fixed nav.
- **Clear the fixed header**: `Navigation` is `fixed` and `h-16 md:h-20`. A page's
  first section needs top padding (`pt-28 md:pt-36`); `PageHeader` does this for you.
- **Server vs client**: route pages and `Footer` are server components. Add
  `"use client"` **only** for interactivity/animation (`Navigation`, all `*Card`s,
  `AboutVisual`, section components, `Theme*`). Server pages may freely render
  client components — keep motion in a small client leaf (see `AboutVisual`) rather
  than converting a whole page.
- **Reuse cards**: `CollectionCard` takes `{ collection, index, variant }`;
  `ProductCard` takes `{ item, index }` and already handles price formatting,
  placeholder gradients, badges, swatches, and quick-add. Do not reimplement these.
- **Composition over inheritance**: build sections by composing small pieces and
  passing `children`/props, not by forking a component. For multi-part widgets use
  the **compound-component** pattern (a Context provider + sub-components) from the
  `frontend-patterns` skill, keeping the provider in a `"use client"` leaf.
- **Dynamic routes (Next 16)**: `params` is a Promise — type it as
  `Promise<{ … }>` and `await` it. Use `notFound()` for missing records and
  `generateStaticParams()` to pre-render known segments (see `collections/[handle]`).

## State management

Escalate only as needed — don't reach for a store prematurely:

1. **`useState`** for local component state (most cases here, e.g. `hovered`,
   `menuOpen`, newsletter `email`/`status`).
2. **`useReducer`** when several values change together or transitions get complex.
3. **Context + reducer** to share that state across a subtree (provider in a client
   leaf, a `useX()` hook that throws if used outside the provider — see the
   `frontend-patterns` `MarketProvider`/`useMarkets` shape).

Zustand / React Query are **not installed**; add them deliberately if global state
or server-cache truly warrants it.

## Custom hooks

Extract reusable client logic into `lib/` hooks. Useful candidates from
`frontend-patterns`, adapted here:

- **`useToggle`** — for `menuOpen`, drawers, disclosure.
- **`useDebounce`** — for the `Navigation` search input before querying.
- **`useQuery`-style async** — when wiring the newsletter/cart to a real API; keep
  `fetcher`/`options` in `useRef` so `refetch` stays referentially stable (avoids an
  effect-driven infinite fetch loop).

These are net-new; create them under `lib/` when first needed, typed generically.

## Forms & validation

Follow the in-repo example `components/NewsletterSection.tsx`: controlled inputs,
a `status: "idle" | "loading" | "success" | "error"` state machine, `sr-only`
labels, `aria-describedby` wiring to error text, and disabled/`aria-busy` on submit.
For richer forms use the controlled `formData` + `validate()` → `errors` pattern
from `frontend-patterns`; introduce Zod only after adding it as a dependency.

## Performance

- `useMemo` for expensive derived data (copy before sorting — `Array.sort` mutates:
  `[...items].sort(...)`, as in `new-arrivals/page.tsx`).
- `useCallback` for handlers passed to memoised children; `React.memo` for pure
  presentational components.
- Code-split heavy/client-only widgets with `next/dynamic` (or `lazy` + `Suspense`)
  and a skeleton fallback.
- For very long lists, virtualization (`@tanstack/react-virtual`) is the pattern —
  **optional, not yet a dependency**; current grids are small enough to render fully.

## Error boundaries

Wrap heavy or third-party client trees in a class `ErrorBoundary`
(`getDerivedStateFromError` + `componentDidCatch`) with a restrained fallback using
the token palette (`bg-cream`, `text-charcoal`, a CTA link to retry). See
`frontend-patterns` for the canonical implementation.

## Data

- Import all mock data from `lib/data.ts` (`collections`, `items`,
  `featuredItems`, `getCollectionByHandle`, `getItemsByCollection`). It is the
  single source of truth — don't re-inline arrays in components or pages.
- Never invent data shapes outside `lib/types.ts`. Components map 1:1 to those
  entities (`ProductCard → Item`, `CollectionCard → Collection`, etc.).

## Dark mode

Class-based (`.dark` on `<html>`), enabled via
`@variant dark (&:where(.dark, .dark *))` in `globals.css`. `ThemeProvider` reads
`localStorage["th3rd-theme"]` then `prefers-color-scheme`. For inline styles that
need dark variants (gradients), define a CSS var in `:root`, override it in
`.dark {}`, and reference `var(--name)` (see `--hero-texture`, `--brand-block-bg`).

## Accessibility

- Semantic landmarks (`<main>`, `<section aria-label…>`, `<nav>`) and a single
  `<h1>` per page (supplied by `PageHeader`).
- `aria-label` interactive controls and icon-only buttons; mark decorative SVGs and
  visual-only blocks `aria-hidden` (see `AboutVisual`).
- **Keyboard navigation** for menus/dropdowns: handle Arrow/Enter/Escape, expose
  `role`/`aria-expanded`/`aria-haspopup` (pattern in `frontend-patterns`).
- **Focus management** for modals/drawers: save `document.activeElement` on open,
  focus the dialog (`role="dialog" aria-modal`), restore focus on close.
- Preserve visible hover/focus states; keep colour contrast within the token pairs.

## Workflow

- Prefer incremental changes; preserve folder structure and conventions.
- Reuse before building; keep new motion in small client leaves.
- Run `npm run lint` and `npm run build` before considering a change done — the
  build validates the `params` Promise typing and server/client boundaries.
