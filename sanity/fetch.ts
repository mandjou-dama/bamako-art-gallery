import { groq } from "next-sanity";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
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
