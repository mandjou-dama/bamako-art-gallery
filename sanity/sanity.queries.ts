import { groq } from "next-sanity";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

const REVALIDATE_TIME = 86400 * 10;

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
  useCdn: false,
});

export const getAllArtworks = async () => {
  const query = groq`
      *[_type == "artwork"] {
      "slug": slug.current,
      }
  `;

  try {
    const artworks = await client.fetch(
      query,
      {},
      {
        next: { revalidate: REVALIDATE_TIME, tags: ["artworks"] },
      },
    );
    return artworks || [];
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return [];
  }
};

export const getArtworksByCategory = async (category: string) => {
  const query = groq`
    *[_type == "artwork" && category == $category] {
      title,
      slug,
      vendu,
      "image": image.asset->url,
      artist->{ fullName },
      year,
      images
    }
  `;

  const params = { category }; // Pass the category as a parameter
  const data = await client.fetch(query, params, {
    next: { revalidate: REVALIDATE_TIME, tags: ["artworks"] },
  });

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
      vendu,
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
    const artwork = await client.fetch(
      query,
      { slug },
      { next: { revalidate: REVALIDATE_TIME, tags: ["artworks"] } },
    );
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
  const data = await client.fetch(query, params, {
    next: { revalidate: REVALIDATE_TIME, tags: ["series"] },
  });

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

  const data = await client.fetch(
    query,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["artists"] } },
  );
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

  const data = await client.fetch(
    query,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["artists"] } },
  );
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
    const artist = await client.fetch(
      query,
      { slug },
      { next: { revalidate: REVALIDATE_TIME, tags: ["artists"] } },
    );
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
    const news = await client.fetch(
      query,
      {},
      { next: { revalidate: REVALIDATE_TIME, tags: ["news"] } },
    );
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
    const news = await client.fetch(
      query,
      {},
      { next: { revalidate: REVALIDATE_TIME, tags: ["news"] } },
    );
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
    const exhibitions = await client.fetch(
      query,
      {},
      { next: { revalidate: REVALIDATE_TIME, tags: ["exhibitions"] } },
    );
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
    const exhibitions = await client.fetch(
      query,
      {},
      { next: { revalidate: REVALIDATE_TIME, tags: ["exhibitions"] } },
    );
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
  const data = await client.fetch(query, params, {
    next: { revalidate: REVALIDATE_TIME, tags: ["exhibitions"] },
  });
  return data;
};

export const getArtworkByArtist = async (artistSlug: string) => {
  const query = groq`
    *[_type == "artwork" && references(*[_type == "artist" && slug.current == $artistSlug]._id)] {
      title,
      slug,
      vendu,
      year,
      "image": image.asset->url,
      artist->{ fullName },
    }
  `;

  const params = { artistSlug }; // Pass the artist slug as a parameter
  const data = await client.fetch(query, params, {
    next: { revalidate: REVALIDATE_TIME, tags: ["artworks"] },
  });
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
        year
      },
      artists[]->{ fullName },
    }
  `;

  const params = { artistSlug }; // Pass the artist slug as a parameter
  const data = await client.fetch(query, params, {
    next: { revalidate: REVALIDATE_TIME, tags: ["series"] },
  });
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
  return await client.fetch(query, params, {
    next: { revalidate: REVALIDATE_TIME, tags: ["exhibitions"] },
  });
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
  return await client.fetch(query, params, {
    next: { revalidate: REVALIDATE_TIME, tags: ["exhibitions"] },
  });
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
  return await client.fetch(query, params, {
    next: { revalidate: REVALIDATE_TIME, tags: ["exhibitions"] },
  });
};

export const getExhibitionArtworks = async (slug: string) => {
  const query = groq`
    *[_type == "exhibition" && slug.current == $slug][0] {
      artworks[]->{
        title,
        vendu,
        "slug": slug.current,
        "image": image.asset->url,
        artist->{ fullName },
        year,
        images
      },
      series[]->{
        title,
        vendu,
        year,
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
  return await client.fetch(query, params, {
    next: { revalidate: REVALIDATE_TIME, tags: ["exhibitions"] },
  });
};

export const getSeriesArtworkBySlug = async (
  seriesSlug: string,
  artworkSlug: string,
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
    const data = await client.fetch(query, params, {
      next: { revalidate: REVALIDATE_TIME, tags: ["series"] },
    });
    return data || null; // Retourne null si l'œuvre n'est pas trouvée
  } catch (error) {
    console.error("Error fetching series artwork:", error);
    return null;
  }
};

// New: fetch the series and artwork by artwork slug only (when no series slug in search params)
export const getSeriesArtworkByArtworkSlug = async (artworkSlug: string) => {
  const query = groq`
    *[_type == "series" && count(artworks[slug.current == $artworkSlug]) > 0][0] {
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

  try {
    const data = await client.fetch(
      query,
      { artworkSlug },
      {
        next: { revalidate: REVALIDATE_TIME, tags: ["series"] },
      },
    );
    return data || null;
  } catch (error) {
    console.error("Error fetching series artwork by artwork slug:", error);
    return null;
  }
};

export const getAllSeriesSlugsWithArtworks = async () => {
  const query = groq`
    *[_type == "series"] {
      "seriesSlug": slug.current,
      "artworks": artworks[] { "slug": slug.current }
    }
  `;

  try {
    const series = await client.fetch(
      query,
      {},
      { next: { revalidate: REVALIDATE_TIME, tags: ["series"] } },
    );
    // Retourne un tableau de { seriesSlug, artworkSlug }
    const params: { name: string; serie: string }[] = [];
    series.forEach((s: any) => {
      s.artworks.forEach((a: any) => {
        params.push({ name: a.slug, serie: s.seriesSlug });
      });
    });
    return params;
  } catch (error) {
    console.error("Error fetching series slugs:", error);
    return [];
  }
};

export const getBagDetails = async () => {
  const query = groq`
    *[_type == "bag"][0] {
      "bio_fr": bio[_key == "fr"][0].value,
      "bio_en": bio[_key == "en"][0].value,
      team[]{
        nom,
        role,
        "bio_fr": bio[_key == "fr"][0].value,
        "bio_en": bio[_key == "en"][0].value,
        "image": photo.asset->url
      }
    }
  `;

  try {
    const bagDetails = await client.fetch(
      query,
      {},
      { next: { revalidate: REVALIDATE_TIME, tags: ["bag"] } },
    );
    return bagDetails || null; // Retourne null si aucun document trouvé
  } catch (error) {
    console.error("Error fetching bag details:", error);
    return null;
  }
};

export const getBagContact = async () => {
  const query = groq`
    *[_type == "bag"][0] {
      contact {
        tel,
        email,
        "open_fr": open[_key == "fr"][0].value,
        "open_en": open[_key == "en"][0].value,
        "location_fr": location[_key == "fr"][0].value,
        "location_en": location[_key == "en"][0].value,
      }
    }
  `;

  try {
    const bagDetails = await client.fetch(
      query,
      {},
      { next: { revalidate: REVALIDATE_TIME, tags: ["bag"] } },
    );
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
    const exhibitions = await client.fetch(query, params, {
      next: { revalidate: REVALIDATE_TIME, tags: ["exhibitions"] },
    });
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
    const roomItems = await client.fetch(
      query,
      {},
      { next: { revalidate: REVALIDATE_TIME, tags: ["viewing"] } },
    );
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
  return await client.fetch(query, params, {
    next: { revalidate: REVALIDATE_TIME, tags: ["viewing"] },
  });
};

export const getViewingRoomItemArtwork = async (slug: string) => {
  const query = groq`
      *[_type == "viewing" && slug.current == $slug][0] {
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
  return await client.fetch(query, params, {
    next: { revalidate: REVALIDATE_TIME, tags: ["viewing"] },
  });
};

export const getBagSliderImages = async () => {
  const query = groq`
    *[_type == "bag"][0] {
      about_slider[] {
          "image": asset->url
        }
    }
  `;

  try {
    const bagDetails = await client.fetch(
      query,
      {},
      { next: { revalidate: REVALIDATE_TIME, tags: ["bag"] } },
    );
    return bagDetails || null; // Retourne null si aucun document trouvé
  } catch (error) {
    console.error("Error fetching bag details:", error);
    return null;
  }
};

export const getMaliArtClubInfos = async () => {
  const query = groq`
     *[_type == "bag"][0] {
      art_club[0] {
        "description_fr": desc[_key == "fr"][0].value,
        "description_en": desc[_key == "en"][0].value,
        links[] {
          link,
          "image": photo.asset->url,
          title
        }
      } 
    }
  `;

  try {
    const bagDetails = await client.fetch(
      query,
      {},
      { next: { revalidate: REVALIDATE_TIME, tags: ["bag"] } },
    );
    return bagDetails || null; // Retourne null si aucun document trouvé
  } catch (error) {
    console.error("Error fetching bag details:", error);
    return null;
  }
};

export async function getHomeSliderExhibitions() {
  const query = groq`*[_type == "exhibition" && slider == true] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    timeline,
    date,
    slider_images[] {
      "image": asset->url
    }
  }`;

  try {
    const exhibitions = await client.fetch(
      query,
      {},
      { next: { revalidate: REVALIDATE_TIME, tags: ["exhibitions"] } },
    );
    return exhibitions;
  } catch (error) {
    console.error("Error fetching exhibitions:", error);
    return [];
  }
}

export const getHomeSliderImages = async () => {
  const query = groq`
    *[_type == "bag"][0] {
      home_slider[] {
          "image": asset->url
        }
    }
  `;

  try {
    const bagDetails = await client.fetch(
      query,
      {},
      { next: { revalidate: REVALIDATE_TIME, tags: ["bag"] } },
    );
    return bagDetails || null; // Retourne null si aucun document trouvé
  } catch (error) {
    console.error("Error fetching bag details:", error);
    return null;
  }
};
