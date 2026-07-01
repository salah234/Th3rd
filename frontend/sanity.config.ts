import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

/**
 * Embedded Studio config, mounted at /studio (see app/studio/[[...tool]]).
 * projectId may be empty until Sanity is set up — the Studio validates it in
 * the browser, so the app still builds without it.
 */
export default defineConfig({
  name: "th3rd-studio",
  title: "Th3rd Studio",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
