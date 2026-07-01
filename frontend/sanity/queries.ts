import type { PortableTextBlock, SanityImage } from "@/lib/types";

import { sanityFetch } from "./client";

/**
 * Content shapes returned by the projections below. These are the Sanity half of
 * the merge in lib/data.ts — commerce fields (price, currency, collection) are
 * NOT here; they come from Supabase.
 */
export interface ProductContent {
  handle: string;
  title?: string;
  subtitle?: string;
  images?: SanityImage[];
  colorOptions?: { name: string; hex: string; image?: SanityImage }[];
  body?: PortableTextBlock[];
  isNew?: boolean;
  isBestseller?: boolean;
  seo?: { metaTitle?: string; metaDescription?: string };
}

export interface CollectionContent {
  handle: string;
  title?: string;
  description?: string;
  heroImage?: SanityImage;
  accentColor?: string;
  layout?: unknown[];
  seo?: { metaTitle?: string; metaDescription?: string };
}

const PRODUCT_PROJECTION = `{
  "handle": slug.current,
  title,
  subtitle,
  images,
  colorOptions,
  body,
  isNew,
  isBestseller,
  seo
}`;

const COLLECTION_PROJECTION = `{
  "handle": slug.current,
  title,
  description,
  heroImage,
  accentColor,
  layout,
  seo
}`;

/** Content for a batch of product handles, keyed by handle. */
export async function getProductContentBySlugs(
  slugs: string[],
): Promise<Map<string, ProductContent>> {
  if (slugs.length === 0) return new Map();
  const rows = await sanityFetch<ProductContent[]>(
    `*[_type == "product" && slug.current in $slugs]${PRODUCT_PROJECTION}`,
    { slugs },
  );
  return new Map((rows ?? []).map((row) => [row.handle, row]));
}

/** Content for a single product handle. */
export async function getProductContentBySlug(
  slug: string,
): Promise<ProductContent | null> {
  return sanityFetch<ProductContent | null>(
    `*[_type == "product" && slug.current == $slug][0]${PRODUCT_PROJECTION}`,
    { slug },
  );
}

/** Content for a batch of collection handles, keyed by handle. */
export async function getCollectionContentBySlugs(
  slugs: string[],
): Promise<Map<string, CollectionContent>> {
  if (slugs.length === 0) return new Map();
  const rows = await sanityFetch<CollectionContent[]>(
    `*[_type == "collection" && slug.current in $slugs]${COLLECTION_PROJECTION}`,
    { slugs },
  );
  return new Map((rows ?? []).map((row) => [row.handle, row]));
}

/** Content for a single collection handle. */
export async function getCollectionContentBySlug(
  slug: string,
): Promise<CollectionContent | null> {
  return sanityFetch<CollectionContent | null>(
    `*[_type == "collection" && slug.current == $slug][0]${COLLECTION_PROJECTION}`,
    { slug },
  );
}
