import Image from "next/image";
import React from "react";
import { getLocale, getTranslations } from "next-intl/server";

import { getSeriesArtworkBySlug } from "@/sanity/sanity.queries";

import PortableText from "@/components/portable_text/portable_text";

import "./page.css";
import { PortableTextBlock } from "next-sanity";

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

  //@ts-ignore
  const artwork = await getSeriesArtworkBySlug(serie, name);

  return (
    <div className="work_page">
      <div className="work_page_hero">
        <Image
          width={1260}
          height={750}
          src={
            artwork.artwork.image ||
            "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
              Année :{" "}
              <span className="work_detail_span">{artwork.artwork.year}</span>
            </p>
            <p className="work_detail">
              Technique :{" "}
              <span>
                {locale === "fr"
                  ? artwork.artwork.technique_fr
                  : artwork.artwork.technique_en}
              </span>
            </p>
            <p className="work_detail">
              taille :{" "}
              <span className="work_detail_span">
                {artwork.artwork.dimensions}
              </span>
            </p>
            <p className="work_detail">
              prix :{" "}
              <span className="work_detail_span">
                {artwork.artwork.price} FCFA
              </span>
            </p>
            <p className="work_detail">
              category :{" "}
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
