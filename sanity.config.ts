"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig, defineField } from "sanity";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";

import { structure } from "./sanity/sanity-structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemas";

export default defineConfig({
  basePath: "/studio",
  projectId: "o4huj4e2",
  dataset: "production",
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    internationalizedArray({
      languages: [
        { id: "fr", title: "French" },
        { id: "en", title: "English" },
      ],
      // defaultLanguages: ["fr"],
      fieldTypes: [
        defineField({
          name: "description",
          type: "array",
          of: [{ type: "block" }],
        }),
        defineField({
          name: "string",
          type: "string",
        }),
      ],
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
