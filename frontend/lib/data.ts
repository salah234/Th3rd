import { Collection, Item } from "@/lib/types";
import {
  getCollectionContentBySlug,
  getCollectionContentBySlugs,
  getProductContentBySlug,
  getProductContentBySlugs,
  type CollectionContent,
  type ProductContent,
} from "@/sanity/queries";

/**
 * The storefront data seam. Two sources are merged here:
 *   • Supabase (via FastAPI) — commerce: price, currency, collection link, handle
 *   • Sanity (via GROQ)       — content: images, subtitle, colours, body, badges,
 *                               collection hero + layout
 *
 * Join key: `handle` (Supabase) === `slug.current` (Sanity). Supabase wins for
 * commerce fields; Sanity wins for presentation. Missing Sanity content ⇒
 * commerce-only render. Missing/unreachable backend ⇒ local mock fallback.
 *
 * Base URL comes from `NEXT_PUBLIC_API_URL` (falls back to the local dev server).
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─────────────────────────────────────────────────────────────────────────────
// Collections
// ─────────────────────────────────────────────────────────────────────────────

interface ApiCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  accent_color?: string | null;
  created_at: string;
}

/** Default hero accents keyed by the seed handles (backend column may be null). */
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
    handle: c.handle,
    title: c.title,
    description: c.description,
    accentColor: c.accent_color ?? ACCENT_BY_HANDLE[c.handle] ?? DEFAULT_ACCENT,
  };
}

/** Overlay Sanity content onto a commerce collection (Sanity wins for content). */
function mergeCollectionContent(
  c: Collection,
  content?: CollectionContent | null,
): Collection {
  if (!content) return c;
  return {
    ...c,
    title: content.title ?? c.title,
    description: content.description ?? c.description,
    heroImage: content.heroImage ?? c.heroImage,
    accentColor: content.accentColor ?? c.accentColor,
    layout: content.layout ?? c.layout,
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

/** Commerce collections from FastAPI, enriched with Sanity content. */
export async function getCollections(): Promise<Collection[]> {
  let collections: Collection[];
  try {
    const res = await fetch(`${API_URL}/collections`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`GET /collections failed: ${res.status}`);
    const data: { collections: ApiCollection[]; total: number } =
      await res.json();
    collections = (data.collections ?? []).map(mapCollection);
  } catch (err) {
    console.error("[collections] backend unreachable, using fallback:", err);
    collections = FALLBACK_COLLECTIONS;
  }

  const handles = collections
    .map((c) => c.handle)
    .filter((h): h is string => Boolean(h));
  const content = await getCollectionContentBySlugs(handles);
  return collections.map((c) =>
    mergeCollectionContent(c, c.handle ? content.get(c.handle) : undefined),
  );
}

/** Single collection by public handle (falls back to id), with Sanity content. */
export async function getCollectionByHandle(
  handle: string,
): Promise<Collection | undefined> {
  const collections = await getCollections();
  const match = collections.find((c) => (c.handle ?? c.id) === handle);
  if (!match) return undefined;
  // getCollections already merged in batch, but fetch single in case the batch
  // missed (e.g. handle differs from id). Cheap and keeps the page correct.
  if (match.handle && !match.heroImage && !match.layout) {
    const content = await getCollectionContentBySlug(match.handle);
    return mergeCollectionContent(match, content);
  }
  return match;
}

// ─────────────────────────────────────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────────────────────────────────────

/** Commerce shape from the backend (aligned to models.py Item). */
interface ApiProduct {
  id: string;
  title: string;
  price: number;
  original_price?: number | null;
  currency: string;
  collection_id?: string | null;
  handle?: string | null;
  sanity_id?: string;
  created_at?: string;
}

function mapProduct(p: ApiProduct): Item {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    originalPrice: p.original_price ?? undefined,
    currency: p.currency,
    collectionId: p.collection_id ?? undefined,
    handle: p.handle ?? undefined,
  };
}

/** Overlay Sanity content onto a commerce product (Sanity wins for content). */
function mergeProductContent(
  item: Item,
  content?: ProductContent | null,
): Item {
  if (!content) return item;
  return {
    ...item,
    title: content.title ?? item.title,
    subtitle: content.subtitle ?? item.subtitle,
    images: content.images ?? item.images,
    body: content.body ?? item.body,
    colorOptions: content.colorOptions ?? item.colorOptions,
    isNew: content.isNew ?? item.isNew,
    isBestseller: content.isBestseller ?? item.isBestseller,
  };
}

/**
 * Low-level fetch of the products route. Tolerates a bare `Item[]` or an
 * `{ items: [...] }` envelope. A 404 means "no products" (the backend 404s on
 * empty) → returns `[]`. Other HTTP/network failures throw so callers can fall
 * back to the mock.
 */
async function fetchProducts(
  params: Record<string, string> = {},
): Promise<Item[]> {
  const qs = new URLSearchParams(params).toString();
  const url = `${API_URL}/api/products${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
  const data: ApiProduct[] | { items?: ApiProduct[] } = await res.json();
  const list: ApiProduct[] = Array.isArray(data) ? data : (data.items ?? []);
  return list.map(mapProduct);
}

/** Merge a list of commerce items with their Sanity content (one batched query). */
async function withProductContent(items: Item[]): Promise<Item[]> {
  const handles = items
    .map((i) => i.handle)
    .filter((h): h is string => Boolean(h));
  const content = await getProductContentBySlugs(handles);
  return items.map((i) =>
    mergeProductContent(i, i.handle ? content.get(i.handle) : undefined),
  );
}

/** All products, commerce + Sanity content. */
export async function getItems(): Promise<Item[]> {
  let items: Item[];
  try {
    items = await fetchProducts();
  } catch (err) {
    console.error("[products] backend unreachable, using fallback:", err);
    return MOCK_ITEMS;
  }
  return withProductContent(items);
}

/** Homepage "New Arrivals" strip. */
export async function getFeaturedItems(): Promise<Item[]> {
  const items = await getItems();
  return items.slice(0, 4);
}

/** Products in a given collection via `?collection=<id>`, plus Sanity content. */
export async function getItemsByCollection(
  collection: Pick<Collection, "id" | "handle">,
): Promise<Item[]> {
  let items: Item[];
  try {
    items = await fetchProducts({ collection: collection.id });
  } catch (err) {
    console.error("[products] backend unreachable, using fallback:", err);
    const key = collection.handle ?? collection.id;
    items = MOCK_ITEMS.filter((item) => item.collectionId === key);
  }
  return withProductContent(items);
}

/**
 * A single product via `GET /api/products/{id}` (returns a bare Item; 404 when
 * not found). Missing ⇒ undefined (so the page 404s); backend down ⇒ mock.
 */
export async function getItemById(id: string): Promise<Item | undefined> {
  let item: Item | undefined;
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`GET /api/products/${id} failed: ${res.status}`);
    const raw: ApiProduct = await res.json();
    item = mapProduct(raw);
  } catch (err) {
    console.error("[products] backend unreachable, using fallback:", err);
    item = MOCK_ITEMS.find((i) => i.id === id);
  }
  if (!item) return undefined;
  const content = item.handle
    ? await getProductContentBySlug(item.handle)
    : null;
  return mergeProductContent(item, content);
}

/**
 * Local commerce fallback, keyed by the real collection handles. Used only when
 * the backend is unreachable. Content (images/colours) comes from Sanity, so
 * these carry commerce fields plus a handle to join on.
 */
const MOCK_ITEMS: Item[] = [
  { id: "22222222-2222-2222-2222-222222222201", handle: "mulberry-silk-hijab", title: "Mulberry Silk Hijab", subtitle: "Ivory", price: 68, currency: "USD", isNew: true, isBestseller: true, collectionId: "silk-series" },
  { id: "22222222-2222-2222-2222-222222222202", handle: "silk-twill-hijab", title: "Silk Twill Hijab", subtitle: "Soft Gold", price: 72, originalPrice: 90, currency: "USD", isBestseller: true, collectionId: "silk-series" },
  { id: "22222222-2222-2222-2222-222222222203", handle: "everyday-modal-hijab", title: "Everyday Modal Hijab", subtitle: "Taupe", price: 38, currency: "USD", isNew: true, collectionId: "everyday-modal" },
  { id: "22222222-2222-2222-2222-222222222204", handle: "ribbed-modal-hijab", title: "Ribbed Modal Hijab", subtitle: "Cream", price: 42, currency: "USD", collectionId: "everyday-modal" },
  { id: "22222222-2222-2222-2222-222222222205", handle: "chiffon-hijab", title: "Chiffon Hijab", subtitle: "Champagne", price: 34, originalPrice: 45, currency: "USD", isBestseller: true, collectionId: "chiffon-edit" },
  { id: "22222222-2222-2222-2222-222222222206", handle: "crinkle-chiffon-hijab", title: "Crinkle Chiffon Hijab", subtitle: "Sand", price: 36, currency: "USD", isNew: true, collectionId: "chiffon-edit" },
  { id: "22222222-2222-2222-2222-222222222207", handle: "hand-rolled-silk-hijab", title: "Hand-Rolled Silk Hijab", subtitle: "Atelier No.1", price: 145, currency: "USD", isNew: true, collectionId: "limited-atelier" },
  { id: "22222222-2222-2222-2222-222222222208", handle: "embroidered-edge-hijab", title: "Embroidered Edge Hijab", subtitle: "Atelier No.2", price: 120, originalPrice: 160, currency: "USD", isBestseller: true, collectionId: "limited-atelier" },
];
