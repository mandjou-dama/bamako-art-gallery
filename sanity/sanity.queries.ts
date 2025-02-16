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
      year,
      price,
      images
    }
  `;

  const params = { category }; // Pass the category as a parameter
  const data = await client.fetch(query, params);

  return data;
};

export const getArtworkBySlug = async (slug: string) => {
  const query = groq`
    *[_type == "artwork" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      "image": image.asset->url,
      "description_fr": description[_key == "fr"][0].value,
      "description_en": description[_key == "en"][0].value,
      "technique_fr": technique[_key == "fr"][0].value,
      "technique_en": technique[_key == "en"][0].value,
      artist->{ 
        fullName, 
      },
      year,
      price,
      category,
      dimensions,
      "images": images.asset->url,
    }
  `;

  try {
    const artwork = await client.fetch(query, { slug });
    return artwork || null; // Retourne null si l'œuvre n'est pas trouvée
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return null;
  }
};

export const getSeriesWithArtworksByCategory = async (category: string) => {
  const query = groq`
    *[_type == "series" && count(artworks[category == $category]) > 0] {
      title,
      "slug": slug.current,
      artists[]->{ fullName },
      "artworks": artworks[category == $category] {
        title,
        "slug": slug.current,
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

export const getArtistsForArtistsPage = async () => {
  const query = groq`
    *[_type == "artist" && featured == true] {
      fullName,
      slug,
      "image": image.asset->url,
    }
  `;

  const data = await client.fetch(query);
  return data;
};

export async function getArtistBySlug(slug: string) {
  const query = groq`*[_type == "artist" && slug.current == $slug][0] {
    fullName,
    "description_fr": description[_key == "fr"][0].value,
    "description_en": description[_key == "en"][0].value,
    "bio_fr": bio[_key == "fr"][0].value,
    "bio_en": bio[_key == "en"][0].value,
    bio,
    "image": image.asset->url,
  }`;

  try {
    const artist = await client.fetch(query, { slug });
    return artist || null; // Return null if no artist found
  } catch (error) {
    console.error("Error fetching artist:", error);
    return null;
  }
}

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

export async function getAllNews() {
  const query = groq`*[_type == "news"] | order(_createdAt desc) {
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

export async function fetchHomeExhibitions() {
  const query = groq`*[_type == "exhibition" && home == true] | order(_createdAt desc) [0...2] {
    title,
    "slug": slug.current,
    "cover": cover.asset->url,
    artists[]->{ fullName },
  }`;

  try {
    const exhibitions = await client.fetch(query);
    return exhibitions;
  } catch (error) {
    console.error("Error fetching exhibitions:", error);
    return [];
  }
}

export async function getViewingRoomExhibitions() {
  const query = groq`*[_type == "exhibition" && viewingRoom == true] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    "cover": cover.asset->url,
    artists[]->{ fullName },
  }`;

  try {
    const exhibitions = await client.fetch(query);
    return exhibitions;
  } catch (error) {
    console.error("Error fetching exhibitions:", error);
    return [];
  }
}

export const getExhibitionsByArtist = async (artistSlug: string) => {
  const query = groq`
    *[_type == "exhibition" && references(*[_type == "artist" && slug.current == $artistSlug]._id)] {
      title,
      slug,
      "cover": cover.asset->url,
      artists[]->{ fullName, slug },
    }
  `;

  const params = { artistSlug }; // Pass the artist slug as a parameter
  const data = await client.fetch(query, params);
  return data;
};

export const getArtworkByArtist = async (artistSlug: string) => {
  const query = groq`
    *[_type == "artwork" && references(*[_type == "artist" && slug.current == $artistSlug]._id)] {
      title,
      slug,
      "image": image.asset->url,
      artist->{ fullName },
    }
  `;

  const params = { artistSlug }; // Pass the artist slug as a parameter
  const data = await client.fetch(query, params);
  return data;
};

export const getSeriesByArtist = async (artistSlug: string) => {
  const query = groq`
    *[_type == "series" && references(*[_type == "artist" && slug.current == $artistSlug]._id)] {
      title,
      slug,
      artworks[]{
        title,
        "slug": slug.current,
        "image": images.asset->url,
        price,
      },
      artists[]->{ fullName },
    }
  `;

  const params = { artistSlug }; // Pass the artist slug as a parameter
  const data = await client.fetch(query, params);
  return data;
};

// TODO : DELETE THIS FETCH
export const getExhibition = async (slug: string) => {
  const query = groq`
    *[_type == "exhibition" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      "cover": cover.asset->url,
      "description_fr": description[_key == "fr"][0].value,
      "description_en": description[_key == "en"][0].value,
      artists[]->{ 
        fullName,
        "slug": slug.current,
       },
      artworks[]->{
        title,
        "slug": slug.current,
        "image": image.asset->url,
        artist->{ fullName },
        year,
        images
      },
      series[]->{
        title,
        artists[]->{ fullName },
        "slug": slug.current,
        artworks[]{
          "slug": slug.current,
          title,
          year,
          "images": images.asset->url
        }
      }
    }
  `;

  const params = { slug };
  return await client.fetch(query, params);
};

export const getExhibitionInfos = async (slug: string) => {
  const query = groq`
    *[_type == "exhibition" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      "cover": cover.asset->url,
      "description_fr": description[_key == "fr"][0].value,
      "description_en": description[_key == "en"][0].value,
      artists[]->{ 
        fullName,
        "slug": slug.current,
       },
      presses[] {
        "image" : photo.asset->url,
        link,
        title,
        journal
      }
    }
  `;

  const params = { slug };
  return await client.fetch(query, params);
};

export const getExhibitionViews = async (slug: string) => {
  const query = groq`
    *[_type == "exhibition" && slug.current == $slug][0] {
      views[] {
        "image" : asset->url
      }
    }
  `;

  const params = { slug };
  return await client.fetch(query, params);
};

export const getExhibitionArtworks = async (slug: string) => {
  const query = groq`
    *[_type == "exhibition" && slug.current == $slug][0] {
      artworks[]->{
        title,
        "slug": slug.current,
        "image": image.asset->url,
        artist->{ fullName },
        year,
        images
      },
      series[]->{
        title,
        artists[]->{ fullName },
        "slug": slug.current,
        artworks[]{
          "slug": slug.current,
          title,
          year,
          "images": images.asset->url
        }
      }
    }
  `;

  const params = { slug };
  return await client.fetch(query, params);
};

export const getSeriesArtworkBySlug = async (
  seriesSlug: string,
  artworkSlug: string
) => {
  const query = groq`
    *[_type == "series" && slug.current == $seriesSlug][0] {
      title,
      slug,
      artists[]->{ fullName },
      "artwork": artworks[slug.current == $artworkSlug][0] {
        title,
        "slug": slug.current,
        category,
        "technique_fr": technique[_key == "fr"][0].value,
        "technique_en": technique[_key == "en"][0].value,
        dimensions,
        year,
        price,
        "image": images.asset->url
      }
    }
  `;

  const params = { seriesSlug, artworkSlug };

  try {
    const data = await client.fetch(query, params);
    return data || null; // Retourne null si l'œuvre n'est pas trouvée
  } catch (error) {
    console.error("Error fetching series artwork:", error);
    return null;
  }
};

export const getBagDetails = async () => {
  const query = groq`
    *[_type == "bag"][0] {
      "bio_fr": bio[_key == "fr"][0].value,
      "bio_en": bio[_key == "en"][0].value,
      "image": image.asset->url,
      tel,
      email,
      team[]{
        nom,
        role,
        "bio_fr": bio[_key == "fr"][0].value,
        "bio_en": bio[_key == "en"][0].value,
        "image": image.asset->url
      }
    }
  `;

  try {
    const bagDetails = await client.fetch(query);
    return bagDetails || null; // Retourne null si aucun document trouvé
  } catch (error) {
    console.error("Error fetching bag details:", error);
    return null;
  }
};

export const getBagContact = async () => {
  const query = groq`
    *[_type == "bag"][0] {
      tel,
      email,
    }
  `;

  try {
    const bagDetails = await client.fetch(query);
    return bagDetails || null; // Retourne null si aucun document trouvé
  } catch (error) {
    console.error("Error fetching bag details:", error);
    return null;
  }
};

export const getExhibitionsByTimeline = async (timeline: string) => {
  const query = groq`
    *[_type == "exhibition" && timeline == $timeline] {
      title,
      "slug": slug.current,
      "cover": cover.asset->url,
      "description_fr": description[_key == "fr"][0].value,
      "description_en": description[_key == "en"][0].value,
      artists[]->{ fullName },
      artworks[]->{
        title,
        "image": image.asset->url,
        artist->{ fullName }
      },
      series[]->{
        title,
        artists[]->{ fullName }
      }
    }
  `;

  const params = { timeline };

  try {
    const exhibitions = await client.fetch(query, params);
    return exhibitions;
  } catch (error) {
    console.error("Error fetching exhibitions by timeline:", error);
    return [];
  }
};

// FETCHES FOR VIEWING ROOM

export const getViewingRoomItems = async () => {
  const query = groq`
     *[_type == "viewing"] {
        title,
        lieu,
        "slug": slug.current,
        "image": image.asset->url,
    }
  `;

  try {
    const roomItems = await client.fetch(query);
    return roomItems || null; // Retourne null si aucun document trouvé
  } catch (error) {
    console.error("Error fetching viewing room items:", error);
    return null;
  }
};

export const getViewingRoomItem = async (slug: string) => {
  const query = groq`
      *[_type == "viewing" && slug.current == $slug][0] {
        title,
        "image": image.asset->url,
        "description_fr": description[_key == "fr"][0].value,
        "description_en": description[_key == "en"][0].value,
        images[] {
          "image": asset->url
        }
    }
  `;

  const params = { slug };
  return await client.fetch(query, params);
};

export const getViewingRoomItemArtwork = async (slug: string) => {
  const query = groq`
      *[_type == "viewing" && slug.current == $slug] {
        artworks[]->{
        title,
        "slug": slug.current,
        "image": image.asset->url,
        artist->{ fullName },
        year,
        images
      },
      series[]->{
        title,
        artists[]->{ fullName },
        "slug": slug.current,
        artworks[]{
          "slug": slug.current,
          title,
          year,
          "images": images.asset->url
        }
      }
    }
  `;

  const params = { slug };
  return await client.fetch(query, params);
};
