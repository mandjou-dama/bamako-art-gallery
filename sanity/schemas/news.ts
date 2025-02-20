import { StringIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "news",
  title: "Art News",
  type: "document",
  icon: StringIcon,
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
      validation: (Rule) => Rule.required(),
    }),
  ],
});
