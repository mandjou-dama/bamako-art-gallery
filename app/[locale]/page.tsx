import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";

import { fetchArtist } from "@/sanity/fetch";

import { SmallCard } from "@/components/cards/cards";

import "./page.css";

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
    <div className="home_page">
      <div className="home_hero">
        <div className="home_hero_infos">
          <p>Bienvenue sur</p>
          <h1>Bamako Art Gallery</h1>
        </div>

        <div className="separator"></div>

        <div className="home_hero_slider">
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <div className="home_hero_slider_overlay"></div>

          <div className="hero_slider_footer">
            <h3 className="hero_slider_expo_name">
              CE QUI NOUS UNIT : exposition collective - Bamako
            </h3>

            <div className="hero_slider_footer_infos">
              <p className="hero_slider_expo_date">22 septembre 2023</p>

              <div className="hero_slider_footer_arrows">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-move-left"
                >
                  <path d="M6 8L2 12L6 16" />
                  <path d="M2 12H22" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-move-right"
                >
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="separator"></div>
      </div>

      <section className="section">
        <h4 className="section_title">
          à la recherche de votre prochain coup de coeur ?
        </h4>
        <div className="section_elements_wrapper four_elements">
          <SmallCard />
          <SmallCard />
          <SmallCard />
          <SmallCard />
        </div>
      </section>

      <section className="section">
        <div>
          <h4 className="section_title">expositions</h4>
        </div>

        <div className="section_elements_wrapper two_elements">
          <SmallCard />
          <SmallCard />
        </div>
      </section>
    </div>
  );
}
