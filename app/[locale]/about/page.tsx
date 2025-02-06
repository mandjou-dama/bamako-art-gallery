import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";

import { getBagDetails } from "@/sanity/sanity.queries";

import PortableText from "@/components/portable_text/portable_text";

import "./page.css";
import { PortableTextBlock } from "next-sanity";

const team = [
  {
    name: "Kadiatou Sylla",
    role: "Directrice",
    image:
      "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Madina Bah",
    role: "Art Advisor",
    image:
      "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Kadi Maïga",
    role: "Financière",
    image:
      "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default async function Page() {
  const t = await getTranslations("about");
  const locale = await getLocale();
  const bag = await getBagDetails();

  const getDirectrice = bag.team.find((i: any) => i.role === "Directrice");

  console.log(getDirectrice);
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
          <div className="about_hero_images">
            <Image
              width={1260}
              height={750}
              src={
                bag.image ||
                "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt=""
            />
          </div>

          <PortableText
            className="portable_text"
            value={
              locale === "fr" ? bag.bio_fr : (bag.bio_en as PortableTextBlock[])
            }
          />
        </section>

        <section className="section">
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
                getDirectrice.image ||
                "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt=""
            />
          </div>
        </section>

        <section className="section">
          <div className="section_header">
            <h4 className="section_title">{t("team.message")}</h4>
          </div>

          <div className="team_container">
            {bag.team.map(({ nom, role, image }: any) => (
              <div key={nom} className="team_card">
                <Image
                  width={1260}
                  height={750}
                  src={
                    image ||
                    "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
