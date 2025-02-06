import { DashboardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "bag",
  title: "Bamako Art Gallery",
  type: "document",
  icon: DashboardIcon,
  fields: [
    defineField({
      name: "bio",
      title: "Bio de la galerie",
      type: "internationalizedArrayDescription",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo de couverture",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
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
