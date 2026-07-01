import { Collection, Item } from "@/lib/types";

/**
 * Centralized storefront data — the single seam the app fetches through.
 *
 * Both collections and products are served by the FastAPI backend:
 *   GET /collections            -> { collections: Collection[], total }   (live, queries Supabase)
 *   GET /api/products           -> { items: Item[], collection, limit, offset, total }
 *   GET /api/products?collection=<id>                                     (collection filter)
 *
 * NOTE: the products route is currently a backend stub that returns an empty
 * `items` array — until it's implemented, product sections render empty on a
 * running backend. When the backend is *unreachable* (e.g. frontend-only dev),
 * both fetchers fall back to the local mock below so the site still renders.
 *
 * Base URL comes from `NEXT_PUBLIC_API_URL` (falls back to the local dev server).
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─────────────────────────────────────────────────────────────────────────────
// Collections
// ─────────────────────────────────────────────────────────────────────────────

/** Shape the backend returns (snake_case, no presentation-only fields). */
interface ApiCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  accent_color?: string | null;
  image_url?: string | null;
  created_at: string;
}

/**
 * The Collection type carries an `accentColor` used by hero/cards. The backend
 * column exists (`accent_color`) but may be null; key a sensible default by the
 * real seed handles so the palette holds even without a stored colour.
 */
const ACCENT_BY_HANDLE: Record<string, string> = {
  "silk-series": "#C9A96E",
  "everyday-modal": "#8C7B6B",
  "chiffon-edit": "#EDD9B4",
  "limited-atelier": "#2C2A28",
};

const DEFAULT_ACCENT = "#C9A96E";

function mapCollection(c: ApiCollection): Collection {
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    handle: c.handle,
    imageUrl: c.image_url ?? undefined,
    accentColor: c.accent_color ?? ACCENT_BY_HANDLE[c.handle] ?? DEFAULT_ACCENT,
  };
}

/** Mirrors the seed `collections` so pages still render if the backend is down. */
const FALLBACK_COLLECTIONS: Collection[] = [
  {
    id: "11111111-1111-1111-1111-111111111101",
    handle: "silk-series",
    title: "Silk Series",
    description: "Pure mulberry silk hijabs with a liquid drape.",
    accentColor: "#C9A96E",
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    handle: "everyday-modal",
    title: "Everyday Modal",
    description: "Breathable modal for effortless daily wear.",
    accentColor: "#8C7B6B",
  },
  {
    id: "11111111-1111-1111-1111-111111111103",
    handle: "chiffon-edit",
    title: "Chiffon Edit",
    description: "Featherlight chiffon in seasonal tones.",
    accentColor: "#EDD9B4",
  },
  {
    id: "11111111-1111-1111-1111-111111111104",
    handle: "limited-atelier",
    title: "Limited Atelier",
    description: "Numbered, hand-finished pieces in small runs.",
    accentColor: "#2C2A28",
  },
];

/**
 * Fetch all collections from the FastAPI backend, newest first.
 * Falls back to `FALLBACK_COLLECTIONS` only if the request itself fails.
 */
export async function getCollections(): Promise<Collection[]> {
  try {
    const res = await fetch(`${API_URL}/collections`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`GET /collections failed: ${res.status}`);
    const data: { collections: ApiCollection[]; total: number } =
      await res.json();
    return (data.collections ?? []).map(mapCollection);
  } catch (err) {
    console.error("[collections] backend unreachable, using fallback:", err);
    return FALLBACK_COLLECTIONS;
  }
}

/**
 * Look up a single collection by its public handle (falls back to id).
 * The backend's `GET /collections/{id}` keys on UUID, so we resolve via the list.
 */
export async function getCollectionByHandle(
  handle: string,
): Promise<Collection | undefined> {
  const collections = await getCollections();
  return collections.find((c) => (c.handle ?? c.id) === handle);
}

// ─────────────────────────────────────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────────────────────────────────────

/** Shape the backend product route returns (mirrors backend/app/models.py Item). */
interface ApiProduct {
  id: string;
  title: string;
  subtitle?: string | null;
  price: number;
  original_price?: number | null;
  currency: string;
  image_url?: string | null;
  color_options?: string[] | null;
  is_new?: boolean;
  is_bestseller?: boolean;
  collection_id?: string | null;
}

function mapProduct(p: ApiProduct): Item {
  return {
    id: p.id,
    title: p.title,
    subtitle: p.subtitle ?? undefined,
    price: p.price,
    originalPrice: p.original_price ?? undefined,
    currency: p.currency,
    imageUrl: p.image_url ?? undefined,
    colorOptions: p.color_options ?? undefined,
    isNew: p.is_new ?? false,
    isBestseller: p.is_bestseller ?? false,
    collectionId: p.collection_id ?? undefined,
  };
}

/**
 * Low-level fetch of the products route. Throws on network/HTTP failure.
 * Tolerates the payload being either a bare `Item[]` or an `{ items: [...] }`
 * envelope — the route returns items either way.
 */
async function fetchProducts(
  params: Record<string, string> = {},
): Promise<Item[]> {
  const qs = new URLSearchParams(params).toString();
  const url = `${API_URL}/api/products${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
  const data: ApiProduct[] | { items?: ApiProduct[] } = await res.json();
  const list: ApiProduct[] = Array.isArray(data) ? data : (data.items ?? []);
  return list.map(mapProduct);
}

/**
 * All products from `GET /api/products`.
 * Falls back to `MOCK_ITEMS` only if the request itself fails (backend down).
 */
export async function getItems(): Promise<Item[]> {
  try {
    return await fetchProducts();
  } catch (err) {
    console.error("[products] backend unreachable, using fallback:", err);
    return MOCK_ITEMS;
  }
}

/**
 * A single product via `GET /api/products/{id}` (which returns `{ product: [...] }`).
 * Falls back to the mock by id if the backend is unreachable.
 */
export async function getItemById(id: string): Promise<Item | undefined> {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`GET /api/products/${id} failed: ${res.status}`);
    const data: { product?: ApiProduct[] | ApiProduct } = await res.json();
    const raw = Array.isArray(data.product) ? data.product[0] : data.product;
    return raw ? mapProduct(raw) : undefined;
  } catch (err) {
    console.error("[products] backend unreachable, using fallback:", err);
    return MOCK_ITEMS.find((item) => item.id === id);
  }
}

/**
 * Products for the homepage "New Arrivals" strip.
 * 🔌 backs onto `GET /api/products?isNew=true` once the backend supports it.
 */
export async function getFeaturedItems(): Promise<Item[]> {
  const items = await getItems();
  return items.slice(0, 4);
}

/**
 * Products in a given collection via `GET /api/products?collection=<id>`.
 * On backend failure, falls back to the mock filtered by handle.
 */
export async function getItemsByCollection(
  collection: Pick<Collection, "id" | "handle">,
): Promise<Item[]> {
  try {
    return await fetchProducts({ collection: collection.id });
  } catch (err) {
    console.error("[products] backend unreachable, using fallback:", err);
    const key = collection.handle ?? collection.id;
    return MOCK_ITEMS.filter((item) => item.collectionId === key);
  }
}

/**
 * Local fallback catalogue, keyed by the real collection handles and mirroring
 * the seed in backend/db/schema.sql. Used only when the backend is unreachable.
 */
const MOCK_ITEMS: Item[] = [
  {
    id: "22222222-2222-2222-2222-222222222201",
    title: "Mulberry Silk Hijab",
    subtitle: "Ivory",
    price: 68,
    currency: "USD",
    isNew: true,
    isBestseller: true,
    colorOptions: ["#FAF6EF", "#EDD9B4", "#2C2A28"],
    collectionId: "silk-series",
  },
  {
    id: "22222222-2222-2222-2222-222222222202",
    title: "Silk Twill Hijab",
    subtitle: "Soft Gold",
    price: 72,
    originalPrice: 90,
    currency: "USD",
    isBestseller: true,
    colorOptions: ["#C9A96E", "#FAF6EF"],
    collectionId: "silk-series",
  },
  {
    id: "22222222-2222-2222-2222-222222222203",
    title: "Everyday Modal Hijab",
    subtitle: "Taupe",
    price: 38,
    currency: "USD",
    isNew: true,
    colorOptions: ["#8C7B6B", "#E8E0D5", "#1A1816"],
    collectionId: "everyday-modal",
  },
  {
    id: "22222222-2222-2222-2222-222222222204",
    title: "Ribbed Modal Hijab",
    subtitle: "Cream",
    price: 42,
    currency: "USD",
    colorOptions: ["#FAF6EF", "#2C2A28"],
    collectionId: "everyday-modal",
  },
  {
    id: "22222222-2222-2222-2222-222222222205",
    title: "Chiffon Hijab",
    subtitle: "Champagne",
    price: 34,
    originalPrice: 45,
    currency: "USD",
    isBestseller: true,
    colorOptions: ["#EDD9B4", "#FAF6EF", "#E8E0D5"],
    collectionId: "chiffon-edit",
  },
  {
    id: "22222222-2222-2222-2222-222222222206",
    title: "Crinkle Chiffon Hijab",
    subtitle: "Sand",
    price: 36,
    currency: "USD",
    isNew: true,
    colorOptions: ["#E8E0D5", "#8C7B6B"],
    collectionId: "chiffon-edit",
  },
  {
    id: "22222222-2222-2222-2222-222222222207",
    title: "Hand-Rolled Silk Hijab",
    subtitle: "Atelier No.1",
    price: 145,
    currency: "USD",
    isNew: true,
    colorOptions: ["#FAF6EF", "#C9A96E"],
    collectionId: "limited-atelier",
  },
  {
    id: "22222222-2222-2222-2222-222222222208",
    title: "Embroidered Edge Hijab",
    subtitle: "Atelier No.2",
    price: 120,
    originalPrice: 160,
    currency: "USD",
    isBestseller: true,
    colorOptions: ["#2C2A28", "#EDD9B4"],
    collectionId: "limited-atelier",
  },
];
