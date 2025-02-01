import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// export default defineType({
//   title: "Artist",
//   name: "artist",
//   type: "document",
//   fields: [
//     defineField({
//       name: "name",
//       type: "string",
//     }),
//     defineField({
//       name: "description",
//       type: "internationalizedArrayDescription",
//     }),
//   ],
// });

export default defineType({
  name: "artist",
  title: "Artiste",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "fullName",
      title: "Nom complet",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "fullName", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "internationalizedArrayDescription",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Biographie",
      type: "internationalizedArrayDescription",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo de l'artiste",
      type: "image",
      options: { hotspot: true },
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
  ],
});
