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
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (doc, context) => {
                  // @ts-ignore
                  const seriesTitle = context.parent.title || "untitled-series";
                  const artworkTitle = doc.title || "untitled-artwork";
                  return `${seriesTitle}-${artworkTitle}`
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                },
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "category",
              title: "Catégorie",
              type: "string",
              options: {
                list: ["Photographie", "Peinture", "Sculpture", "Design"],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "technique",
              title: "Technique de fabrication",
              type: "internationalizedArrayString",
              validation: (Rule) => Rule.required(),
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
              name: "vendu",
              title: "Disponibilité",
              description: "Est-ce que l'oeuvre à été vendu ?",
              type: "string",
              options: {
                list: [
                  { title: "Oui", value: "oui" },
                  { title: "Non", value: "non" },
                ],
                layout: "radio",
              },
              initialValue: "non",
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
