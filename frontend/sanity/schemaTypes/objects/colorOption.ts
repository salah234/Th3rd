import { defineField, defineType } from "sanity";

/** A selectable colourway: a human name + a hex swatch. */
export const colorOption = defineType({
  name: "colorOption",
  title: "Colour",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hex",
      title: "Hex",
      type: "string",
      description: "Swatch colour, e.g. #C9A96E",
      validation: (rule) =>
        rule
          .required()
          .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
            name: "hex colour",
          }),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Photo shown when this colourway is selected.",
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "hex", media: "image" },
  },
});
