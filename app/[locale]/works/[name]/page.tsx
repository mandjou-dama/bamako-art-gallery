import Image from "next/image";
import React from "react";
import { getLocale, getTranslations } from "next-intl/server";

import { getArtworkBySlug } from "@/sanity/sanity.queries";
import { urlFor } from "@/sanity/lib/image";

import PortableText from "@/components/portable_text/portable_text";

import "./page.css";
import { PortableTextBlock } from "next-sanity";
import { AnimatedImage } from "@/components/animated_image/animated_image";

type Params = Promise<{ name: string }>;

export default async function WorkPage({ params }: { params: Params }) {
  const { name } = await params;
  const locale = await getLocale();
  const t = await getTranslations("artwork");

  const artwork = await getArtworkBySlug(name);

  const mailContent = (artwork: any) => {
    if (locale === "fr")
      return `mailto:contact@bamakoartgallery.com?subject=Demande d'information sur ${encodeURIComponent(artwork.title)} de ${encodeURIComponent(artwork.artist.fullName)}&body=Bonjour,%0D%0A%0D%0AJe suis intéressé par '${encodeURIComponent(artwork.title)}' de '${encodeURIComponent(artwork.artist.fullName)}'.%0D%0A%0D%0AMerci !`;
    if (locale === "en")
      return `mailto:contact@bamakoartgallery.com?subject=Inquiry about ${encodeURIComponent(artwork.title)} by ${encodeURIComponent(artwork.artist.fullName)}&body=Hello,%0D%0A%0D%0AI am interested in '${encodeURIComponent(artwork.title)}' by '${encodeURIComponent(artwork.artist.fullName)}'.%0D%0A%0D%0AThanks!`;
  };

  return (
    <div className="work_page">
      <div className="work_page_hero">
        <AnimatedImage
          src={
            artwork.image
              ? urlFor(artwork.image).auto("format").quality(100).url()
              : "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt=""
        />

        <section className="section work_right">
          <div className="section_header">
            <h4 className="section_title">{artwork.title}</h4>
          </div>

          <div className="separator"></div>

          <div className="work_description_container">
            {artwork.description_fr && (
              <PortableText
                className="portable_text"
                value={
                  locale === "fr"
                    ? artwork.description_fr
                    : (artwork.description_en as PortableTextBlock[])
                }
              />
            )}
          </div>

          <div className="work_detail_wrapper">
            <p className="work_detail">
              {t("year")} :{" "}
              <span className="work_detail_span">{artwork.year}</span>
            </p>
            <p className="work_detail">
              {t("technique")} :{" "}
              <span>
                {locale === "fr" ? artwork.technique_fr : artwork.technique_en}
              </span>
            </p>
            <p className="work_detail">
              {t("taille")} :{" "}
              <span className="work_detail_span">{artwork.dimensions}</span>
            </p>
            <p className="work_detail">
              {t("category")} :{" "}
              <span className="work_detail_span">{artwork.category}</span>
            </p>
            <p className="work_detail">
              copyright :{" "}
              <span className="work_detail_span">
                {artwork.artist.fullName}
              </span>
            </p>
          </div>

          {artwork.vendu && artwork.vendu === "non" ? (
            <a href={mailContent(artwork)} className="inquire">
              {locale === "fr" ? "Acquérir" : "Inquire"}
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
          ) : null}
        </section>
      </div>

      {/* <section className="section work_images_section">
        <div className="section_header">
          <h4 className="section_title">Voir plus d'images</h4>
        </div>

        <div className="work_images">
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/30426268/pexels-photo-30426268/free-photo-of-paysage-majestueux-de-montagnes-enneigees-en-hiver.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/30426849/pexels-photo-30426849/free-photo-of-scene-urbaine-a-velo-en-noir-et-blanc.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </section> */}
    </div>
  );
}
