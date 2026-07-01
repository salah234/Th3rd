import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Editorial layout blocks for a collection page. The frontend renders these in
 * order; add section types here as the design grows.
 */

export const sectionHero = defineType({
  name: "sectionHero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({ title: title ?? "Hero", media }),
  },
});

export const sectionImageText = defineType({
  name: "sectionImageText",
  title: "Image + Text",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "imagePosition",
      type: "string",
      options: { list: ["left", "right"], layout: "radio" },
      initialValue: "left",
    }),
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({ title: title ?? "Image + Text", media }),
  },
});

export const sectionGallery = defineType({
  name: "sectionGallery",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({
      name: "images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading", media: "images.0" },
    prepare: ({ title, media }) => ({ title: title ?? "Gallery", media }),
  },
});

export const layoutSections = [sectionHero, sectionImageText, sectionGallery];
