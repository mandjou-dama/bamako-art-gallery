import { defineField } from "sanity";

export const contentType = defineField({
  title: "Content",
  name: "content",
  type: "object",
  fields: [
    defineField({ name: "content", type: "array", of: [{ type: "block" }] }),
  ],
});
