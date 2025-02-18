import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "artwork",
  title: "Œuvre d'Art",
  type: "document",
  icon: DocumentIcon,
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
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo de l'oeuvre",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artist",
      title: "Artiste",
      type: "reference",
      to: [{ type: "artist" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "internationalizedArrayDescription",
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
      title: "Dimensions",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Année",
      type: "number",
      validation: (Rule) => Rule.required(),
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
      title: "Photos supplémentaires de l'œuvre",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
});
