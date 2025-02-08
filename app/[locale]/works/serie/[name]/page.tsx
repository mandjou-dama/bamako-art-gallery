import Image from "next/image";
import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { urlFor } from "@/sanity/lib/image";

import { getSeriesArtworkBySlug } from "@/sanity/sanity.queries";

import PortableText from "@/components/portable_text/portable_text";
import { PortableTextBlock } from "next-sanity";

import "./page.css";

type Params = Promise<{ name: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SeriePage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { name } = await params;
  const { serie } = await searchParams;
  const locale = await getLocale();
  const t = await getTranslations("artwork");

  //@ts-ignore
  const artwork = await getSeriesArtworkBySlug(serie, name);

  return (
    <div className="work_page">
      <div className="work_page_hero">
        <img
          src={
            artwork.artwork.image
              ? urlFor(artwork.artwork.image).auto("format").quality(100).url()
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
                    ? artwork.artwork.description_fr
                    : (artwork.artwork.description_en as PortableTextBlock[])
                }
              />
            )}
          </div>

          <div className="work_detail_wrapper">
            <p className="work_detail">
              {t("year")} :{" "}
              <span className="work_detail_span">{artwork.artwork.year}</span>
            </p>
            <p className="work_detail">
              {t("technique")} :{" "}
              <span>
                {locale === "fr"
                  ? artwork.artwork.technique_fr
                  : artwork.artwork.technique_en}
              </span>
            </p>
            <p className="work_detail">
              {t("taille")} :{" "}
              <span className="work_detail_span">
                {artwork.artwork.dimensions}
              </span>
            </p>
            <p className="work_detail">
              {t("category")} :{" "}
              <span className="work_detail_span">
                {artwork.artwork.category}
              </span>
            </p>
            <p className="work_detail">
              copyright :{" "}
              <span className="work_detail_span">
                {artwork.artists[0].fullName}
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
          </div>
        </section> */}
    </div>
  );
}
