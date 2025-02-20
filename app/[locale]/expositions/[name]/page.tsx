import React from "react";
import { type PortableTextBlock } from "next-sanity";
import { getLocale, getTranslations } from "next-intl/server";

import {
  getExhibitionViews,
  getExhibitionInfos,
  getExhibitionArtworks,
} from "@/sanity/sanity.queries";
import { ArtworkCard } from "@/components/cards/artwork_card";
import { AnimatedImage } from "@/components/animated_image/animated_image";
import { urlFor } from "@/sanity/lib/image";

import PortableText from "@/components/portable_text/portable_text";

import "./page.css";
import { Link } from "@/i18n/routing";

type Params = Promise<{ name: string }>;

export default async function ExpositionPage({ params }: { params: Params }) {
  const { name } = await params;
  const locale = await getLocale();
  const t = await getTranslations("exposition");
  const t2 = await getTranslations("artiste");

  const exhibitionInfos = await getExhibitionInfos(name);
  const exhibitionArtViews = await getExhibitionViews(name);
  const exhibitionArtworks = await getExhibitionArtworks(name);

  return (
    <div className="exposition_page">
      <div className="exposition_page_hero">
        <AnimatedImage
          src={
            exhibitionInfos.cover
              ? urlFor(exhibitionInfos.cover).auto("format").quality(80).url()
              : "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={`${exhibitionInfos.title} cover image`}
        />

        <section className="section exposition_right">
          <div className="section_header">
            <h4 className="section_title">
              {exhibitionInfos.title || "Nom de l'exposition"}
            </h4>
          </div>

          <div className="separator"></div>

          <div className="exposition_description_container">
            {exhibitionInfos.date && (
              <p className="exposition_date">
                Date : <span>{exhibitionInfos.date}</span>
              </p>
            )}
            <PortableText
              className="portable_text"
              value={
                locale === "fr"
                  ? exhibitionInfos.description_fr
                  : (exhibitionInfos.description_en as PortableTextBlock[])
              }
            />

            <div className="exposition_artists_wrapper">
              <p className="exposition_artist_headline">{t("expoArtistes")}</p>
              <div>
                {exhibitionInfos.artists.map((artist: any) => (
                  <div key={artist.fullName}>
                    <Link
                      href={`/artists/artist/${artist.slug}`}
                      className="expo_artist_name"
                    >
                      {artist.fullName}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {exhibitionArtViews.views?.length > 0 ? (
        <section className="section exposition_images_section">
          <div className="section_header">
            <h4 className="section_title">{t("expoViews")}</h4>
          </div>

          <div className="exposition_images views">
            {exhibitionArtViews.views.map((image: any, index: number) => {
              return (
                <AnimatedImage
                  key={image.image}
                  src={urlFor(image.image).auto("format").quality(80).url()}
                  alt=""
                />
              );
            })}
          </div>
        </section>
      ) : null}

      {exhibitionArtworks.artworks?.length > 0 ||
      exhibitionArtworks.series?.length > 0 ? (
        <section className="section exposition_images_section">
          <div className="section_header">
            <h4 className="section_title">{t("expoArtworks")}</h4>
          </div>

          <div className="exposition_images">
            {exhibitionArtworks.artworks?.map((artwork: any, index: number) => {
              return (
                <ArtworkCard
                  key={`${artwork.slug}+${artwork.title}`}
                  image={artwork.image}
                  title={artwork.title}
                  artist={artwork.artist.fullName}
                  link={`/works/${artwork.slug}`}
                  isAvailable={artwork.vendu === "oui" ? false : true}
                  year={artwork.year}
                />
              );
            })}

            {exhibitionArtworks.series &&
              exhibitionArtworks.series.map((serie: any) => {
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
                      isAvailable={artwork.vendu === "oui" ? false : true}
                      year={artwork.year}
                    />
                  );
                });
              })}
          </div>
        </section>
      ) : null}

      {exhibitionInfos.presses?.length > 0 ? (
        <section className="section">
          <h4 className="section_title">{t2("news")}</h4>
          <div className="section_elements_wrapper presse">
            {exhibitionInfos.presses.map((presse: any) => (
              <Link target="_blank" key={presse.title} href={presse.link}>
                <div className="presse_container">
                  <div className="image_container">
                    <img
                      src={urlFor(presse.image)
                        .auto("format")
                        .quality(80)
                        .url()}
                      alt=""
                    />
                  </div>

                  <div>
                    <p className="from">{presse.journal}</p>
                    <p className="title">{presse.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* <section className="section exposition_artists_section">
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
      </section> */}
    </div>
  );
}
