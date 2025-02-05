import { groq } from "next-sanity";
import { createClient } from "next-sanity";
import { apiVersion } from "./env";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
  useCdn: false,
});

export const getArtworksByCategory = async (category: string) => {
  const query = groq`
    *[_type == "artwork" && category == $category] {
      title,
      slug,
      image,
      artist->{ name },
      description,
      technique,
      dimensions,
      year,
      price,
      images
    }
  `;

  const params = { category }; // Pass the category as a parameter
  const data = await client.fetch(query, params);

  return data;
};
