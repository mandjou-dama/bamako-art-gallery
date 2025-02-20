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
      name: "date",
      title: "Date",
      type: "object",
      fieldsets: [
        {
          name: "date_range",
          title: "Date Range",
        },
      ],
      fields: [
        {
          name: "date_debut",
          title: "Date de début",
          type: "date", // Use "datetime" for date and time, or "date" for just the date
          options: {
            dateFormat: "DD-MM-YYYY", // Customize the date format if needed
          },
        },
        {
          name: "date_fin",
          title: "Date de fin",
          type: "date", // Use "datetime" for date and time, or "date" for just the date
          options: {
            dateFormat: "DD-MM-YYYY", // Customize the date format if needed
          },
        },
      ],
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
        columns: 2, // Defines a grid for the fields and how many columns it should have
        modal: { type: "popover" }, //Makes the modal type a popover
      },
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
      title: "Sur la section Expositions",
      description:
        "Si oui, l'exposition apparaîtra sur la page d'accueil dans la section Expositions",
      type: "boolean",
    }),
    defineField({
      name: "slider",
      title: "Sur le carousel",
      description:
        "Si oui, l'exposition apparaîtra sur le carousel la page d'accueil",
      type: "boolean",
    }),
    defineField({
      name: "slider_images",
      title: "Les images du Slider",
      description: "Sélectionnez les images qui doivent être sur le slider",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isSliderEnabled = context.document?.slider;
          if (isSliderEnabled && !value) {
            return "Les images du slider sont requises lorsque le carousel est activé.";
          }
          return true;
        }),
      hidden: ({ parent }) => !parent?.slider,
    }),
  ],
  initialValue: {
    home: false,
    slider: false,
  },
});
