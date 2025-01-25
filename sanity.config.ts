"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas/documents";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export default defineConfig({
  projectId: projectId!,
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
