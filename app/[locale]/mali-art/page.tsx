import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import type { PortableTextBlock } from "next-sanity";
import PortableText from "@/components/portable_text/portable_text";
import { getMaliArtClubInfos } from "@/sanity/sanity.queries";

import "./page.css";
import ActuCard from "@/components/cards/actu";

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("maliArt");
  const artClub = await getMaliArtClubInfos();

  console.log(artClub);
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
        {/* <section className="section">
          <div className="section_elements_wrapper two_club_elements">
            <img
              src={urlFor(artClub.art_club.image)
                .auto("format")
                .format("webp")
                .quality(80)
                .url()}
              alt=""
            />
          </div>
        </section> */}
        {/* <section className="section">
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
        </section> */}

        {/* <section className="section mali_art_image">
          <img
            src="https://images.pexels.com/photos/1321552/pexels-photo-1321552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </section> */}

        <section className="section mali_art_image">
          <div className="club_desc_container">
            <PortableText
              className="portable_text"
              value={
                locale === "fr"
                  ? artClub.art_club.description_fr
                  : (artClub.art_club.description_en as PortableTextBlock[])
              }
            />
          </div>

          <a
            href={`mailto:?subject=${encodeURIComponent(
              locale === "fr"
                ? "Demande d'inscription à Mali Art Club"
                : "Request for Membership at Mali Art Club"
            )}&body=${encodeURIComponent(
              locale === "fr"
                ? "Bonjour,\n\nJe souhaite m'inscrire au Mali Art Club. Pouvez-vous m'envoyer plus d'informations ?\n\nMerci."
                : "Hello,\n\nI would like to join the Mali Art Club. Could you send me more information?\n\nThank you."
            )}`}
            className="join_club"
          >
            {t("join")}
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
          </a>
        </section>

        <section className="section club_links_container">
          <div className="section_header">
            <h4 className="section_title">Ressources externes</h4>
          </div>

          <div className="section_elements_wrapper four_actu_elements">
            {artClub.art_club.links?.map((info: any) => (
              <ActuCard
                image={info.image}
                title={info.title}
                journal={info.journal}
                key={info.title}
                link={info.link}
                notArticle={false}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
