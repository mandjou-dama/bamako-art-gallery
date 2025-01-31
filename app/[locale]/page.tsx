import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";

import { fetchArtist } from "@/sanity/fetch";

import { SmallCard } from "@/components/cards/cards";

import "./page.css";
import SeeMore from "@/components/see_more/see_more";
import ActuCard from "@/components/cards/actu";
import { EngagementCard } from "@/components/engagement/engagement";

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
  const t = await getTranslations("home");

  return (
    <div className="home_page">
      <div className="home_hero">
        <div className="home_hero_infos">
          <p>{t("hero.subtitle")}</p>
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
        <h4 className="section_title">{t("sections.coupDeCoeur.message")}</h4>
        <div className="section_elements_wrapper four_elements">
          <SmallCard name="Peinture" link="/works" />
          <SmallCard name="Photographie" link="/works" />
          <SmallCard name="Sculpture" link="/works" />
          <SmallCard name="Design" link="/works" />
        </div>
      </section>

      <section className="section">
        <div className="section_header">
          <h4 className="section_title">{t("sections.expositions.message")}</h4>
          <SeeMore
            link="/expositions"
            message={t("sections.expositions.link")}
          />
        </div>

        <div className="section_elements_wrapper two_elements">
          <SmallCard
            name="Les vestiges de l'ancien monde"
            subline="exposition collective"
            link="/expositions/dhd"
          />
          <SmallCard
            name="Devenir un bout d'homme"
            subline="Moussa Diallo"
            link="/expositions/lkl"
          />
        </div>
      </section>

      <section className="section">
        <div className="section_header">
          <h4 className="section_title">{t("sections.artistes.message")}</h4>
          <SeeMore link="/artists" message={t("sections.artistes.link")} />
        </div>

        <div className="section_elements_wrapper rounded_four_elements">
          <SmallCard
            subline="Peinture"
            name="Kankou Fofana"
            link="/artists/artist/dsds"
          />
          <SmallCard
            subline="Photographie"
            name="Alfousseiny Coulibaly"
            link="/artists/artist/dsds"
          />
          <SmallCard
            subline="Design"
            name="Boubacar Berthé"
            link="/artists/artist/dsds"
          />
          <SmallCard
            subline="Sculpture"
            name="Fanta Mady Doucouré"
            link="/artists/artist/dsds"
          />
        </div>
      </section>

      <section className="section">
        <h4 className="section_title">{t("sections.artActu.message")}</h4>

        <div className="section_elements_wrapper four_actu_elements">
          <ActuCard link="https://google.com" />
          <ActuCard link="https://google.com" />
          <ActuCard link="https://google.com" />
          <ActuCard link="https://google.com" />
          <ActuCard link="https://google.com" />
          <ActuCard link="https://google.com" />
        </div>

        <Link href={"/art-actu"} className="see_more_actu">
          {t("sections.artActu.link")}
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
            className="lucide lucide-move-up-right"
          >
            <path d="M13 5H19V11" />
            <path d="M19 5L5 19" />
          </svg>
        </Link>
      </section>

      <section className="section">
        <div className="section_header engagement">
          <h4 className="section_title">{t("sections.engagement.message")}</h4>
        </div>

        <div className="section_elements_wrapper engagement_three_elements">
          <EngagementCard
            title={t("sections.engagement.engagement_1")}
            content={t("sections.engagement.engagement_1_content")}
          />
          <EngagementCard
            title={t("sections.engagement.engagement_2")}
            content={t("sections.engagement.engagement_2_content")}
          />
          <EngagementCard
            title={t("sections.engagement.engagement_3")}
            content={t("sections.engagement.engagement_3_content")}
          />
        </div>
      </section>
    </div>
  );
}
