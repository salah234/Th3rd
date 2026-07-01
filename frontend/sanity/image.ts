import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, isSanityConfigured, projectId } from "./env";

const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId, dataset })
  : null;

/**
 * Build a CDN URL for a Sanity image, or `null` if Sanity isn't configured or
 * the source is empty. Consumers should treat `null` as "no image".
 */
export function urlFor(source: SanityImageSource | undefined | null) {
  if (!builder || !source) return null;
  return builder.image(source);
}
