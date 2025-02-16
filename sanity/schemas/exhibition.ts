import { BookIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "exhibition",
  title: "Exposition",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nom de l'exposition",
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
      name: "cover",
      title: "Photo de couverture de l'exposition",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "views",
      title: "Vues de l'exposition",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "timeline",
      title: "Chronologie",
      type: "string",
      options: {
        list: ["En cours", "À venir", "Passée"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "internationalizedArrayDescription",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artists",
      title: "Artistes participants",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artworks",
      title: "Œuvres exposées",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artwork" }] }],
    }),
    defineField({
      name: "series",
      title: "Séries exposées",
      type: "array",
      of: [{ type: "reference", to: [{ type: "series" }] }],
    }),
    defineField({
      name: "presses",
      title: "Revues de presses",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titre de l'article",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "journal",
              title: "Nom du journal",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Lien vers l'article",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "photo",
              title: "Photo ou logo du journal ou de l'article",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "home",
      title: "Sur la page d'accueil",
      type: "boolean",
    }),
  ],
  initialValue: {
    home: false,
  },
});
