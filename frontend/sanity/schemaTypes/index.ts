import type { SchemaTypeDefinition } from "sanity";

import { product } from "./documents/product";
import { collection } from "./documents/collection";
import { colorOption } from "./objects/colorOption";
import { seo } from "./objects/seo";
import { layoutSections } from "./objects/layoutSections";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  product,
  collection,
  // Objects
  colorOption,
  seo,
  ...layoutSections,
];
