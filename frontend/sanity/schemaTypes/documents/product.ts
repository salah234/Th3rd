import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Product CONTENT. Commerce fields (price, currency, collection membership,
 * inventory) live in Supabase — this document is joined to the Supabase
 * `items` row via `slug` === `items.handle`. Do NOT add price here.
 */
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      description: "Must match the Supabase items.handle (the join key).",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "string",
      group: "content",
      description: "Short descriptor shown under the title (e.g. a colourway).",
    }),
    defineField({
      name: "images",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        }),
      ],
      validation: (rule) => rule.min(1).warning("Add at least one image."),
    }),
    defineField({
      name: "colorOptions",
      title: "Colours",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "colorOption" })],
    }),
    defineField({
      name: "body",
      title: "Description",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "isNew",
      title: "New",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "isBestseller",
      title: "Bestseller",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "images.0" },
  },
});
