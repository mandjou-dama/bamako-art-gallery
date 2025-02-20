import { PresentationIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "viewing",
  title: "Viewing Room",
  type: "document",
  icon: PresentationIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre de l'évènement",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lieu",
      title: "Lieu de l'évènement",
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
      title: "Photo de couverture de l'évènement",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "internationalizedArrayDescription",
    }),
    defineField({
      name: "images",
      title: "Images de l'évènement",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
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
  ],
});
