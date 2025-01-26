import { defineField } from "sanity";

export const descriptionType = defineField({
  name: "description",
  title: "Description",
  type: "object",
  fields: [defineField({ name: "description", type: "string" })],
});
