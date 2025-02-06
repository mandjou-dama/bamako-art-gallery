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
      "image": image.asset->url,
      artist->{ fullName },
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

export const getSeriesWithArtworksByCategory = async (category: string) => {
  const query = groq`
    *[_type == "series" && count(artworks[category == $category]) > 0] {
      title,
      slug,
      artists[]->{ fullName },
      "artworks": artworks[category == $category] {
        title,
        category,
        technique,
        dimensions,
        year,
        price,
        "images": images.asset->url
      }
    }
  `;

  const params = { category }; // Pass the category as a parameter
  const data = await client.fetch(query, params);

  return data;
};

export const getArtistsForHome = async () => {
  const query = groq`
    *[_type == "artist" && home == true] {
      fullName,
      slug,
      "image": image.asset->url,
    }
  `;

  const data = await client.fetch(query);
  return data;
};

export async function fetchLatestNews() {
  const query = groq`*[_type == "news"] | order(_createdAt desc) [0...6] {
    title,
    journal,
    link,
    "photo": photo.asset->url
  }`;

  try {
    const news = await client.fetch(query);
    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
