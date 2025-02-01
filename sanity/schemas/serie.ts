import { defineField, defineType } from "sanity";
import { DocumentsIcon } from "@sanity/icons";

export default defineType({
  name: "series",
  title: "Série d'œuvres",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nom de la série",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artists",
      title: "Artistes créateurs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: "artworks",
      title: "Œuvres de la série",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Nom de l'œuvre",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "technique",
              title: "Technique utilisée",
              type: "string",
            }),
            defineField({
              name: "dimensions",
              title: "Taille de l'œuvre",
              type: "string",
            }),
            defineField({
              name: "year",
              title: "Année de création",
              type: "number",
            }),
            defineField({
              name: "price",
              title: "Prix de l'œuvre",
              type: "number",
            }),
            defineField({
              name: "images",
              title: "Photos de l'œuvre",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
  ],
});
