import Image from "next/image";
import React from "react";
import { getLocale, getTranslations } from "next-intl/server";

import { getArtworkBySlug } from "@/sanity/sanity.queries";
import { urlFor } from "@/sanity/lib/image";

import PortableText from "@/components/portable_text/portable_text";

import "./page.css";
import { PortableTextBlock } from "next-sanity";

type Params = Promise<{ name: string }>;

export default async function WorkPage({ params }: { params: Params }) {
  const { name } = await params;
  const locale = await getLocale();
  const t = await getTranslations("artwork");

  const artwork = await getArtworkBySlug(name);

  return (
    <div className="work_page">
      <div className="work_page_hero">
        <img
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
