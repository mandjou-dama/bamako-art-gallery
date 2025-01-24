import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "exposition",
  title: "Exposition",
  icon: DocumentsIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
});
