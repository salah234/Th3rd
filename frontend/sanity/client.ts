import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

/**
 * Shared Sanity read client, or `null` when Sanity isn't configured yet.
 * `useCdn: true` serves published content from the edge cache.
 */
export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

/**
 * Run a GROQ query, returning `null` if Sanity isn't configured or the request
 * fails — callers then fall back to commerce-only rendering.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (err) {
    console.error("[sanity] query failed, falling back:", err);
    return null;
  }
}
