import { groq } from "next-sanity";
import { createClient } from "next-sanity";
import { apiVersion } from "./env";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const client = createClient({
  projectId: projectId || "o4huj4e2",
  dataset: dataset || "production",
  apiVersion: apiVersion || "2025-01-25",
  useCdn: false,
});

export const fetchArtist = () => {
  return client.fetch(groq`
        *[_type == "artist" && name == "Kankou Fofana" && !(_id in path("drafts.**"))] {
            name,
            description,
        }
    `);
};
