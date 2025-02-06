import React from "react";
import Image from "next/image";
import Link from "next/link";
import PortableText from "@/components/portable_text/portable_text";
import { type PortableTextBlock } from "next-sanity";
import { getLocale, getTranslations } from "next-intl/server";

import {
  getArtistBySlug,
  getExhibitionsByArtist,
  getArtworkByArtist,
  getSeriesByArtist,
} from "@/sanity/sanity.queries";

import { SmallCard } from "@/components/cards/cards";

import "./page.css";

const presses = [
  {
    image:
      "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    from: "Jeune Afrique",
    title: "La foire investic monte en puissance",
    link: "https://google.com",
  },
  {
    image:
      "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    from: "The New York Times",
    title:
      "Bringing Anne Frank’s Secret Annex to New York, and the World Covered windows, peeling ",
    link: "https://google.com",
  },
];

type Params = Promise<{ name: string }>;

export default async function ArtistPage({ params }: { params: Params }) {
  const { name } = await params;
  const locale = await getLocale();
  const t = await getTranslations("artiste");

  const artist = await getArtistBySlug(name);
  const exhibitions = await getExhibitionsByArtist(name);
  const artworks = await getArtworkByArtist(name);
  const series = await getSeriesByArtist(name);

  return (
    <div className="artist_page">
      <section className="section artist_page_hero">
        <div className="artist_page_hero_left">
          <div>
            <div className="section_header">
              <h4 className="section_title">
                {artist.fullName || "Kankou Fofana"}
              </h4>
            </div>
            <PortableText
              className="portable_text"
              value={
                locale === "fr"
                  ? artist.description_fr
                  : (artist.description_en as PortableTextBlock[])
              }
            />
          </div>

          <div>
            <div className="section_header">
              <h4 className="section_title">{t("bio")}</h4>
            </div>
            <PortableText
              className="portable_text"
              value={
                locale === "fr"
                  ? artist.bio_fr
                  : (artist.bio_en as PortableTextBlock[])
              }
            />
          </div>
        </div>
        <Image
          width={1260}
          height={750}
          src={
            artist.image ||
            "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt=""
        />
      </section>

      <div className="separator section"></div>

      <section className="section">
        <div className="section_header">
          <h4 className="section_title">{t("expo")}</h4>
        </div>

        <div className="section_elements_wrapper two_elements">
          {exhibitions.map((exhibition: any) => (
            <SmallCard
              key={exhibition.title}
              name={exhibition.title}
              subline={
                exhibition.artists.length > 2
                  ? "exposition collective"
                  : `${exhibition.artists[0]?.fullName}${exhibition.artists[1]?.fullName ? "," : ""} ${exhibition.artists[1]?.fullName || ""}`
              }
              link={`/expositions/${exhibition.slug.current}`}
              image={exhibition.cover}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <h4 className="section_title">{t("work")}</h4>
        <div className="section_elements_wrapper four_elements">
          {artworks.map((artwork: any) => (
            <SmallCard
              key={artwork.title}
              name={artwork.title}
              link={`/works/${artwork.slug.current}`}
              subline={artwork.artist.fullName}
              image={artwork.image}
            />
          ))}

          {series.map((serie: any) => {
            return serie.artworks.map((artwork: any) => (
              <SmallCard
                key={artwork.title}
                name={artwork.title}
                link={`/works/${artwork.title}`}
                subline={artist.fullName}
                image={artwork.image}
              />
            ));
          })}
        </div>
      </section>

      {/* <section className="section">
        <h4 className="section_title">{t("news")}</h4>
        <div className="section_elements_wrapper presse">
          {presses.map((presse) => (
            <Link target="_blank" key={presse.title} href={presse.link}>
              <div className="presse_container">
                <div className="image_container">
                  <Image width={1260} height={750} src={presse.image} alt="" />
                </div>

                <div>
                  <p className="from">{presse.from}</p>
                  <p className="title">{presse.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section> */}
    </div>
  );
}
