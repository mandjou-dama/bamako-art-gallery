import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { baseLanguage } from "./localeStringType";

export default defineType({
  title: "Artist",
  name: "artist",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "internationalizedArrayDescription",
      //of: [{ type: "block" }],
    }),
  ],
});
