import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import type { PortableTextBlock } from "next-sanity";
import PortableText from "@/components/portable_text/portable_text";

import "./page.css";

import { getExhibition } from "@/sanity/sanity.queries";

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("maliArt");
  const exhibition = await getExhibition("entre-deux");

  return (
    <div className="art_club_page">
      <div className="art_club_hero">
        <div className="art_club_hero_infos">
          <h4>Mali Art Club</h4>
          <p>{t("subline")}</p>
        </div>
        <div className="separator"></div>
      </div>

      <div className="art_club_wrapper">
        <section className="section">
          <div className="section_elements_wrapper two_club_elements">
            <PortableText
              className="portable_text"
              value={
                locale === "fr"
                  ? exhibition.description_fr
                  : (exhibition.description_en as PortableTextBlock[])
              }
            />
            <img
              src="https://images.pexels.com/photos/2911540/pexels-photo-2911540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
          </div>
        </section>
        <section className="section">
          <div className="section_elements_wrapper two_club_elements">
            <img
              src="https://images.pexels.com/photos/30622575/pexels-photo-30622575/free-photo-of-couloir-de-galerie-artistique-avec-decor-encadre.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <PortableText
              className="portable_text"
              value={
                locale === "fr"
                  ? exhibition.description_fr
                  : (exhibition.description_en as PortableTextBlock[])
              }
            />
          </div>
        </section>

        <section className="section mali_art_image">
          <img
            src="https://images.pexels.com/photos/1321552/pexels-photo-1321552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </section>
      </div>
    </div>
  );
}
