import Image from "next/image";
import React from "react";
import { type PortableTextBlock } from "next-sanity";
import { getLocale, getTranslations } from "next-intl/server";

import { getExhibition } from "@/sanity/sanity.queries";

import PortableText from "@/components/portable_text/portable_text";

import "./page.css";
import { Link } from "@/i18n/routing";

type Params = Promise<{ name: string }>;

function formatCurrency(amount: number, locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {}).format(amount);
}

export default async function ViewingRoomPage({ params }: { params: Params }) {
  const { name } = await params;
  const locale = await getLocale();
  const t = await getTranslations("exposition");

  const exhibition = await getExhibition(name);

  return (
    <div className="exposition_page">
      <div className="exposition_page_hero">
        <Image
          width={1260}
          height={750}
          src={
            exhibition.cover ||
            "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={`${exhibition.title} cover image`}
        />

        <section className="section exposition_right">
          <div className="section_header">
            <h4 className="section_title">
              {exhibition.title || "Nom de l'exposition"}
            </h4>
          </div>

          <div className="separator"></div>

          <div className="exposition_description_container">
            {exhibition.date && (
              <p className="exposition_date">
                Date : <span>{exhibition.date}</span>
              </p>
            )}
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
      </div>

      <section className="section exposition_images_section">
        <div className="section_header">
          <h4 className="section_title">{t("expoImages")}</h4>
        </div>

        <div className="exposition_images">
          {exhibition.artworks?.map((artwork: any, index: number) => {
            return (
              <div key={`${artwork.slug}+${artwork.title}`}>
                <Link href={`/works/${artwork.slug}`}>
                  <img src={artwork.image} alt="" />
                  <div className="artwork_infos_1">
                    <p className="artwork_infos_artist">
                      {artwork.artist.fullName}
                    </p>
                    <p className="artwork_infos_title">{artwork.title}</p>
                  </div>
                  <div className="artwork_infos_2">
                    <p>
                      {artwork.price > 0
                        ? `${formatCurrency(artwork.price)} FCFA`
                        : null}
                    </p>
                    <p>{artwork.year !== 0 ? artwork.year : ""}</p>
                  </div>
                </Link>
              </div>
            );
          })}

          {exhibition.series.map((serie: any) => {
            const serieTitle = serie.title;
            const serieArtist = serie.artists.map((i: any) => i.fullName);

            return serie.artworks.map((artwork: any, index: number) => {
              console.log(artwork);
              return (
                <div key={`${artwork.price}+${artwork.title}+${index}`}>
                  <Link
                    href={`/works/serie/${artwork.slug}?serie=${serie.slug}`}
                  >
                    <img src={artwork.images} alt="" />
                    <div className="artwork_infos_1">
                      <p className="artwork_infos_artist">{serieArtist[0]}</p>
                      <p className="artwork_infos_title">
                        {artwork.title} - {serieTitle}
                      </p>
                    </div>
                    <div className="artwork_infos_2">
                      <p>
                        {artwork.price > 0
                          ? `${formatCurrency(artwork.price)} FCFA`
                          : null}
                      </p>
                      <p>{artwork.year !== 0 ? artwork.year : ""}</p>
                    </div>
                  </Link>
                </div>
              );
            });
          })}
        </div>
      </section>

      <section className="section exposition_artists_section">
        <div className="section_header">
          <h4 className="section_title">{t("expoArtistes")}</h4>
        </div>
        <div className="exposition_artists">
          {exhibition.artists.map((artist: any) => (
            <div key={artist.fullName}>
              <p className="expo_artist_name">{artist.fullName}</p>
              <PortableText
                className="portable_text"
                value={
                  locale === "fr"
                    ? artist.description_fr
                    : (artist.description_en as PortableTextBlock[])
                }
              />
              <PortableText
                className="portable_text"
                value={
                  locale === "fr"
                    ? artist.bio_fr
                    : (artist.bio_en as PortableTextBlock[])
                }
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
