import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
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
} from "@/sanity/sanity.queries";

//import categories images
import Photography from "@/public/assets/photography.jpeg";
import Design from "@/public/assets/design.jpeg";
import Sculpture from "@/public/assets/sculpture.jpeg";
import Peinture from "@/public/assets/peinture.jpeg";
import Slider from "@/components/slider/slider";

const slides = [
  {
    link: "/expositions/bolon",
    image:
      "https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/475480776_977437894488353_6320175630276585998_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeH479MKMPmdXtft-peptQf8aqFeNBYwiKFqoV40FjCIoURVL_B8u13NnhEcCMM4yeeWGPXmwDhOkvJCkeOJnSaj&_nc_ohc=yBF0hFJDjC8Q7kNvgHbyQVg&_nc_oc=AdhUYGVznn-vUHFofrgLZKVMJICzblk4-ZIKs1-eLZ1_ziSuUmUyGWC6e91675HOUIrcxsLdFqYenR1PbeOTmPIF&_nc_zt=23&_nc_ht=scontent-lhr8-1.xx&_nc_gid=AaKEEPXmVgWgJ49wavFlrmm&oh=00_AYAyTXz6DePAmF7dnSQmyMuFWSYQnYEpBKsJOcZe04HrzA&oe=67B8BBD1",
    name: "Bôlon",
    year: "DU 15 MARS AU 14 JUIN 2025",
  },
  {
    link: "/expositions/bolon",
    image:
      "https://cdn.sanity.io/images/o4huj4e2/production/d1132f330a8ad3526d325572b7062cdd1266281a-1080x1080.jpg",
    name: "Bôlon",
    year: "DU 15 MARS AU 14 JUIN 2025",
  },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const slug = (await params).locale;
  const t = await getTranslations("home");
  const artists = await getArtistsForHome();
  const news = await fetchLatestNews();
  const exhibitions = await fetchHomeExhibitions();

  return (
    <div className="home_page">
      <div className="home_hero">
        <div className="home_hero_infos">
          <p>{t("hero.subtitle")}</p>
          <h1>Bamako Art Gallery</h1>
        </div>

        <div className="separator"></div>

        <Slider slides={slides} />

        <div className="separator"></div>
      </div>

      <section className="section">
        <h4 className="section_title">{t("sections.coupDeCoeur.message")}</h4>
        <div className="section_elements_wrapper four_elements">
          <SmallCard
            image={Peinture}
            name="Peinture"
            link={`/works/category/peinture`}
            fromSanity={false}
          />
          <SmallCard
            image={Photography}
            name="Photographie"
            link={`/works/category/photographie`}
            fromSanity={false}
          />
          <SmallCard
            image={Sculpture}
            name="Sculpture"
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
                  ? "exposition collective"
                  : `${exhibition.artists[0]?.fullName}${exhibition.artists[1]?.fullName ? "," : ""} ${exhibition.artists[1]?.fullName || ""}`
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
          <SeeMore link="/artists" message={t("sections.artistes.link")} />
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

        <Link scroll={true} href={"/art-actu"} className="see_more_actu">
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
