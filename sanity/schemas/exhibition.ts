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
      name: "home",
      title: "Sur la page d'accueil",
      type: "boolean",
    }),
    defineField({
      name: "viewingRoom",
      title: "Dans la viewing Room",
      type: "boolean",
    }),
  ],
});
