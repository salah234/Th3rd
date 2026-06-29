import { Collection, Item } from "@/lib/types";

/**
 * Centralized mock data for the storefront.
 *
 * This is the single source of truth for collections and items used across the
 * homepage sections (`CollectionsGrid`, `FeaturedProducts`) and the collections
 * route pages. Shapes come straight from `lib/types.ts` — do not invent fields.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 🔌 FASTAPI INTEGRATION POINT — this file is the seam.
 *
 * Everything below is hard-coded mock data. To go live, replace the static
 * `collections` / `items` arrays and the helper functions with fetches to the
 * FastAPI backend. All consumers (server components in app/**) already import
 * from here, so wiring the backend in this one file lights up the whole app.
 *
 * Suggested setup:
 *   const API_URL = process.env.API_URL; // server-only, e.g. http://localhost:8000
 *
 * Suggested endpoints (FastAPI):
 *   GET  /api/collections                 -> Collection[]
 *   GET  /api/items                       -> Item[]
 *   GET  /api/collections/{handle}        -> Collection
 *   GET  /api/collections/{id}/items      -> Item[]
 * ─────────────────────────────────────────────────────────────────────────────
 */

// 🔌 FASTAPI: replace this static array with `GET /api/collections`.
// e.g.  export async function getCollections(): Promise<Collection[]> {
//          const res = await fetch(`${API_URL}/api/collections`, { next: { revalidate: 60 } });
//          return res.json();

//        }



export const collections: Collection[] = [
  {
    id: "everyday-silk",
    handle: "everyday-silk",
    title: "Everyday Silk",
    description: "Refined Essentials",
    accentColor: "#DB7CA1",
  },
  {
    id: "occasion-wear",
    handle: "occasion-wear",
    title: "Occasion Wear",
    description: "Celebration Pieces",
    accentColor: "#E59AB8",
  },
  {
    id: "heritage-collection",
    handle: "heritage",
    title: "Heritage Collection",
    description: "Timeless Craft",
    accentColor: "#F0B7CC",
  },
];

// 🔌 FASTAPI: replace this static array with `GET /api/items`.
// e.g.  export async function getItems(): Promise<Item[]> {
//          const res = await fetch(`${API_URL}/api/items`, { next: { revalidate: 60 } });
//          return res.json();
//        }
export const items: Item[] = [
  // --- Original homepage "New Arrivals" (kept first to preserve the homepage) ---
  {
    id: "silk-medina-ivory",
    title: "Silk Medina Wrap",
    subtitle: "Everyday Silk",
    price: 185,
    currency: "USD",
    isNew: true,
    colorOptions: ["#FAF6EF", "#2C2A28", "#8C7B6B", "#C9A96E"],
    collectionId: "everyday-silk",
  },
  {
    id: "chiffon-drape-blush",
    title: "Chiffon Drape",
    subtitle: "Occasion Wear",
    price: 220,
    originalPrice: 275,
    currency: "USD",
    isBestseller: true,
    colorOptions: ["#EDD9B4", "#D4CDBA", "#9E9289"],
    collectionId: "occasion-wear",
  },
  {
    id: "heritage-linen-sage",
    title: "Heritage Linen",
    subtitle: "Heritage Collection",
    price: 195,
    currency: "USD",
    isNew: true,
    colorOptions: ["#8A9B7E", "#B5C2AD", "#6B7B60"],
    collectionId: "heritage-collection",
  },
  {
    id: "modal-square-stone",
    title: "Modal Square",
    subtitle: "Everyday Silk",
    price: 145,
    currency: "USD",
    colorOptions: ["#9E9289", "#E8E0D5", "#2C2A28", "#8C7B6B"],
    collectionId: "everyday-silk",
  },

  // --- Everyday Silk ---
  {
    id: "silk-twill-almond",
    title: "Silk Twill Scarf",
    subtitle: "Everyday Silk",
    price: 165,
    currency: "USD",
    colorOptions: ["#EDD9B4", "#C9A96E", "#FAF6EF"],
    collectionId: "everyday-silk",
  },
  {
    id: "everyday-jersey-mocha",
    title: "Jersey Daily Wrap",
    subtitle: "Everyday Silk",
    price: 120,
    currency: "USD",
    isBestseller: true,
    colorOptions: ["#8C7B6B", "#9E9289", "#2C2A28"],
    collectionId: "everyday-silk",
  },

  // --- Occasion Wear ---
  {
    id: "satin-evening-champagne",
    title: "Satin Evening Veil",
    subtitle: "Occasion Wear",
    price: 245,
    currency: "USD",
    isNew: true,
    colorOptions: ["#EDD9B4", "#C9A96E", "#FAF6EF"],
    collectionId: "occasion-wear",
  },
  {
    id: "embellished-tulle-rose",
    title: "Embellished Tulle",
    subtitle: "Occasion Wear",
    price: 310,
    originalPrice: 360,
    currency: "USD",
    colorOptions: ["#D4CDBA", "#EDD9B4", "#9E9289"],
    collectionId: "occasion-wear",
  },
  {
    id: "georgette-gala-noir",
    title: "Georgette Gala Drape",
    subtitle: "Occasion Wear",
    price: 265,
    currency: "USD",
    colorOptions: ["#2C2A28", "#8C7B6B", "#1A1816"],
    collectionId: "occasion-wear",
  },

  // --- Heritage Collection ---
  {
    id: "heritage-cashmere-ecru",
    title: "Cashmere Heritage Shawl",
    subtitle: "Heritage Collection",
    price: 290,
    currency: "USD",
    isBestseller: true,
    colorOptions: ["#E8E0D5", "#D4CDBA", "#8A9B7E"],
    collectionId: "heritage-collection",
  },
  {
    id: "heritage-wool-clay",
    title: "Hand-Woven Wool Wrap",
    subtitle: "Heritage Collection",
    price: 230,
    currency: "USD",
    colorOptions: ["#6B7B60", "#8A9B7E", "#B5C2AD"],
    collectionId: "heritage-collection",
  },
];

/**
 * Items shown in the homepage "New Arrivals" section.
 * 🔌 FASTAPI: back this with `GET /api/items?isNew=true` (or `/api/items/featured`).
 */
export const featuredItems: Item[] = items.slice(0, 4);

/**
 * Look up a collection by its public handle (falls back to id).
 * 🔌 FASTAPI: replace the local find with `GET /api/collections/{handle}`.
 */
export function getCollectionByHandle(handle: string): Collection | undefined {
  return collections.find((c) => (c.handle ?? c.id) === handle);
}

/**
 * All items belonging to a given collection id.
 * 🔌 FASTAPI: replace the local filter with `GET /api/collections/{id}/items`.
 */
export function getItemsByCollection(collectionId: string): Item[] {
  return items.filter((item) => item.collectionId === collectionId);
}
