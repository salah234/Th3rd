/**
 * Sanity environment config.
 *
 * These are read lazily and NOT asserted — a missing projectId is a valid state
 * (Sanity simply isn't configured yet). Consumers guard on `isSanityConfigured`
 * so the storefront renders commerce-only from Supabase until Sanity is wired.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True once a projectId is present, i.e. Sanity is set up. */
export const isSanityConfigured = projectId.length > 0;
