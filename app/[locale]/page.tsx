export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import "./page.css";

//import components
import { SmallCard } from "@/components/cards/cards";
import { EngagementCard } from "@/components/engagement/engagement";
import ActuCard from "@/components/cards/actu";
import SeeMore from "@/components/see_more/see_more";

//import fetches
import {
  getArtistsForHome,
  fetchLatestNews,
  fetchHomeExhibitions,
  getHomeSliderExhibitions,
  getHomeSliderImages,
} from "@/sanity/sanity.queries";

//import categories images
import Photography from "@/public/assets/photography.jpeg";
import Design from "@/public/assets/design.jpeg";
import Sculpture from "@/public/assets/sculpture.jpeg";
import Peinture from "@/public/assets/peinture.jpeg";
import Slider from "@/components/slider/slider";

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const slug = locale;
  const t = await getTranslations({ locale, namespace: "home" });
  // const locale = await getLocale();
  const [artists, news, exhibitions, sliderExhibitions, sliderSimpleImages] =
    await Promise.all([
      getArtistsForHome(),
      fetchLatestNews(),
      fetchHomeExhibitions(),
      getHomeSliderExhibitions(),
      getHomeSliderImages(),
    ]);

  const slides = sliderExhibitions.flatMap((item: any) => {
    const link = `/expositions/${item.slug}`; // Create the link dynamically
    const name = item.title; // Use the title as the name
    const year = `${formatDate(item.date.date_debut)} - ${formatDate(
      item.date.date_fin
    )}`; // Format the date range

    // Map over slider_images to create individual slides
    return item.slider_images.map((image: any) => ({
      link,
      image: image.image, // Use the image URL directly
      name,
      year,
    }));
  });

  // Helper function to format the date
  function formatDate(dateString: any) {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="home_page">
      <div className="home_hero">
        <div className="home_hero_infos">
          <p>{t("hero.subtitle")}</p>
          <h1>Bamako Art Gallery</h1>
        </div>

        <div className="separator"></div>

        <Slider
          slides={slides.length > 0 ? slides : sliderSimpleImages.home_slider}
        />

        <div className="separator"></div>
      </div>

      <section className="section">
        <h4 className="section_title">{t("sections.coupDeCoeur.message")}</h4>
        <div className="section_elements_wrapper four_elements">
          <SmallCard
            image={Peinture}
            name={locale === "fr" ? "Peinture" : "Painting"}
            link={`/works/category/peinture`}
            fromSanity={false}
          />
          <SmallCard
            image={Photography}
            name={locale === "fr" ? "Photographie" : "Photography"}
            link={`/works/category/photographie`}
            fromSanity={false}
          />
          <SmallCard
            image={Sculpture}
            name={locale === "fr" ? "Sculpture" : "Sculpture"}
            link={`/works/category/sculpture`}
            fromSanity={false}
          />
          <SmallCard
            image={Design}
            name="Design"
            link={`/works/category/design`}
            fromSanity={false}
          />
        </div>
      </section>

      <section className="section">
        <div className="section_header">
          <h4 className="section_title">{t("sections.expositions.message")}</h4>
          <SeeMore
            locale={locale}
            link="/expositions"
            message={t("sections.expositions.link")}
          />
        </div>

        <div className="section_elements_wrapper two_elements">
          {exhibitions.map((exhibition: any) => (
            <SmallCard
              key={exhibition.title}
              name={exhibition.title}
              subline={
                exhibition.artists.length > 2
                  ? locale === "fr"
                    ? "exposition collective"
                    : "group exhibition"
                  : `${exhibition.artists[0]?.fullName}${
                      exhibition.artists[1]?.fullName ? "," : ""
                    } ${exhibition.artists[1]?.fullName || ""}`
              }
              link={`/expositions/${exhibition.slug}`}
              fromSanity={true}
              image={exhibition.cover}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section_header">
          <h4 className="section_title">{t("sections.artistes.message")}</h4>
          <SeeMore
            locale={locale}
            link="/artists"
            message={t("sections.artistes.link")}
          />
        </div>

        <div className="section_elements_wrapper rounded_four_elements">
          {artists.map((artist: any) => (
            <SmallCard
              hideCategory
              key={artist.fullName}
              name={artist.fullName}
              image={artist.image}
              link={`/artists/artist/${artist.slug.current}`}
              fromSanity={true}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <h4 className="section_title">{t("sections.artActu.message")}</h4>

        <div className="section_elements_wrapper four_actu_elements">
          {news.map((info: any) => (
            <ActuCard
              image={info.photo}
              title={info.title}
              journal={info.journal}
              key={info.title}
              link={info.link}
            />
          ))}
        </div>

        <Link
          scroll={true}
          href={"/art-actu"}
          locale={locale}
          className="see_more_actu"
        >
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
