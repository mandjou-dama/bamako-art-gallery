import Image from "next/image";
import React from "react";
import { type PortableTextBlock } from "next-sanity";
import { getLocale, getTranslations } from "next-intl/server";

import { getExhibition } from "@/sanity/sanity.queries";

import { urlFor } from "@/sanity/lib/image";

import PortableText from "@/components/portable_text/portable_text";
import { ArtworkCard } from "@/components/cards/artwork_card";

import "./page.css";

type Params = Promise<{ name: string }>;

export default async function ViewingRoomPage({ params }: { params: Params }) {
  const { name } = await params;
  const locale = await getLocale();
  const t = await getTranslations("exposition");

  const exhibition = await getExhibition(name);

  return (
    <div className="exposition_page">
      <div className="exposition_page_hero">
        <img
          src={
            exhibition.cover
              ? urlFor(exhibition.cover).auto("format").quality(80).url()
              : "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          {exhibition
            ? exhibition.artworks?.map((artwork: any, index: number) => {
                return (
                  <ArtworkCard
                    key={`${artwork.slug}+${artwork.title}`}
                    image={artwork.image}
                    title={artwork.title}
                    artist={artwork.artist.fullName}
                    link={`/works/${artwork.slug}`}
                    year={artwork.year}
                  />
                );
              })
            : null}

          {exhibition.series
            ? exhibition.series.map((serie: any) => {
                const serieTitle = serie.title;
                const serieArtist = serie.artists.map((i: any) => i.fullName);

                return serie.artworks.map((artwork: any, index: number) => {
                  return (
                    <ArtworkCard
                      key={`${artwork.slug}+${artwork.title}+${index}`}
                      image={artwork.images}
                      title={`${artwork.title} - ${serieTitle}`}
                      link={`/works/serie/${artwork.slug}?serie=${serie.slug}`}
                      artist={serieArtist[0]}
                      year={artwork.year}
                    />
                  );
                });
              })
            : null}
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
