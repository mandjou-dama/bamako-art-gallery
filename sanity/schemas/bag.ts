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
      title: "Images du carrousel de la page À Propos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "home_slider",
      title: "Images du carrousel sur la page d'accueil",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    // defineField({
    //   name: "tel",
    //   title: "Numéro de téléphone de la galerie",
    //   type: "string",
    //   validation: (Rule) => Rule.required(),
    // }),
    // defineField({
    //   name: "email",
    //   title: "Email de la galerie",
    //   type: "string",
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: "contact",
      title: "Informations Générales",
      description: "Veuillez saisir les informations générales de la galerie.",
      type: "object",
      fieldsets: [
        {
          name: "contact_infos",
          title: "Contact Infos",
        },
      ],
      fields: [
        {
          name: "tel",
          title: "Numéro de téléphone de la galerie",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "email",
          title: "Email de la galerie",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "open",
          title: "Heure d'ouverture",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "location",
          title: "Adresse",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        },
      ],
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
        modal: { type: "popover" }, //Makes the modal type a popover
      },
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
              name: "links",
              title: "Liens Externes",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Titre de la page",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "link",
                      title: "Lien vers la page",
                      type: "url",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "photo",
                      title: "Photo ou logo du journal ou de la page",
                      type: "image",
                      options: { hotspot: true },
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                },
              ],
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
