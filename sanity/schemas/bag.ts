import { DashboardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "bag",
  title: "Bamako Art Gallery",
  type: "document",
  icon: DashboardIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio de la galerie",
      type: "internationalizedArrayDescription",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "about_slider",
      title: "Images du slider sur la page À Propos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "tel",
      title: "Numéro de téléphone de la galerie",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email de la galerie",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "art_club",
      title: "Mali Art Club",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "desc",
              title: "Description",
              type: "internationalizedArrayDescription",
            }),
            defineField({
              name: "photo",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(1).length(1),
    }),
    defineField({
      name: "team",
      title: "L'équipe",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "nom",
              title: "Nom complet",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Poste",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "bio",
              title: "Biographie",
              type: "internationalizedArrayDescription",
            }),
            defineField({
              name: "photo",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
  ],
});
