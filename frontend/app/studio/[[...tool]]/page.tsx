"use client";

/**
 * Embedded Sanity Studio at /studio (client-only — Sanity is not RSC-safe).
 * Full-page tool; renders its own chrome, not the site Navigation/Footer.
 */
import { NextStudio } from "next-sanity/studio";

import config from "../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
