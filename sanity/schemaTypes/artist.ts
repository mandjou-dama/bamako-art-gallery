import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { baseLanguage } from "./localeStringType";

export default defineType({
  title: "Presenter",
  name: "presenter",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: baseLanguage ? `title.${baseLanguage.id}` : "title",
    },
  },
});
