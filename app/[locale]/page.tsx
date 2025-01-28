import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

import { fetchArtist } from "@/sanity/fetch";

import styles from "./page.module.css";

// Define the types for the artist data
type InternationalizedDescription = {
  _type: string;
  _key: string;
  value: string;
};

type Artist = {
  name: string;
  description: InternationalizedDescription[];
};

// Helper function to get description by locale
const getDescriptionByLocale = (
  descriptions: InternationalizedDescription[],
  locale: string
): string => {
  const description = descriptions.find((desc) => desc._key === locale);
  return description
    ? description.value
    : "Description not available in this language.";
};

// Fetch artist data
const getArtist = async (): Promise<Artist[]> => {
  const artists = await fetchArtist();
  return artists;
};

export default async function Home({ params }: { params: { locale: string } }) {
  return (
    <div className="body_container">
      <div className={styles.page}>
        <p>Bonjour</p>
      </div>
    </div>
  );
}
