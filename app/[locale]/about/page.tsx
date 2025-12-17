import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import { cacheLife } from "next/cache";

import { urlFor } from "@/sanity/lib/image";

import { getBagDetails, getBagSliderImages } from "@/sanity/sanity.queries";

import PortableText from "@/components/portable_text/portable_text";

import "./page.css";
import { PortableTextBlock } from "next-sanity";
import Slider from "@/components/slider/slider";

export default async function Page() {
  "use cache";
  cacheLife("hours");

  const t = await getTranslations("about");
  const locale = await getLocale();
  const bag = await getBagDetails();
  const images = await getBagSliderImages();

  const getDirectrice = bag.team.find((i: any) => i.role === "Directrice");

  return (
    <div className="about_page">
      <div className="about_hero">
        <div className="about_hero_infos">
          <h4>{t("hero.headline")}</h4>
          <p>{t("hero.description")}</p>
        </div>
        <div className="separator"></div>
      </div>

      <div className="about_wrapper">
        <section className="section">
          <div className="section_header">
            <h4 className="section_title">Bamako Art Gallery</h4>
          </div>
          <div className="home_hero">
            {images && <Slider slides={images.about_slider} />}
          </div>

          <div className="bag_description_container">
            <PortableText
              className="portable_text"
              value={
                locale === "fr"
                  ? bag.bio_fr
                  : (bag.bio_en as PortableTextBlock[])
              }
            />
          </div>
        </section>

        {/* <section className="section">
          <div className="section_header">
            <h4 className="section_title">Kadiatou Sylla</h4>
          </div>

          <div className="about_section">
            {getDirectrice.bio_fr ? (
              <PortableText
                className="portable_text"
                value={
                  locale === "fr"
                    ? getDirectrice.bio_fr
                    : (getDirectrice.bio_en as PortableTextBlock[])
                }
              />
            ) : (
              <p className="about_hero_description">
                Biographie de la directrice
              </p>
            )}

            <Image
              width={1260}
              height={750}
              src={
                getDirectrice.image
                  ? urlFor(getDirectrice.image).auto("format").quality(80).url()
                  : "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt=""
            />
          </div>
        </section> */}

        <section className="section">
          <div className="section_header">
            <h4 className="section_title">{t("team.message")}</h4>
          </div>

          <div className="team_container">
            {bag.team.map(({ nom, role, image }: any) => (
              <div key={nom} className="team_card">
                <img
                  src={
                    image
                      ? urlFor(image).auto("format").quality(70).url()
                      : "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  alt={nom}
                />

                <p className="member_role">{role}</p>
                <h2 className="member_name">{nom}</h2>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
