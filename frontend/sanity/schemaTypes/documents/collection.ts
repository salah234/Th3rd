import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Collection CONTENT + editorial layout. The canonical list of collections and
 * their commerce link lives in Supabase; this document is joined via
 * `slug` === Supabase `collections.handle`.
 */
export const collection = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "layout", title: "Layout" },
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
      description: "Must match the Supabase collections.handle (the join key).",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      group: "content",
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "accentColor",
      title: "Accent colour",
      type: "string",
      group: "content",
      description: "Hex, e.g. #C9A96E — used for the collection hero gradient.",
      validation: (rule) =>
        rule.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
          name: "hex colour",
        }),
    }),
    defineField({
      name: "layout",
      title: "Page layout",
      type: "array",
      group: "layout",
      of: [
        defineArrayMember({ type: "sectionHero" }),
        defineArrayMember({ type: "sectionImageText" }),
        defineArrayMember({ type: "sectionGallery" }),
      ],
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "heroImage" },
  },
});
