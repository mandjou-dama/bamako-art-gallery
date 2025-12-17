import React, { Suspense } from "react";

import PortableText from "@/components/portable_text/portable_text";
import { type PortableTextBlock } from "next-sanity";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { urlFor } from "@/sanity/lib/image";

import {
  getArtistBySlug,
  getExhibitionsByArtist,
  getArtworkByArtist,
  getSeriesByArtist,
} from "@/sanity/sanity.queries";

import { SmallCard } from "@/components/cards/cards";
import { ArtworkCard } from "@/components/cards/artwork_card";

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

type Params = Promise<{ name: string; locale: string }>;

export default function ArtistPage({ params }: { params: Params }) {
  return (
    <div className="artist_page">
      <Suspense fallback={<div>Loading…</div>}>
        <ArtistContent params={params} />
      </Suspense>
    </div>
  );
}

async function ArtistContent({ params }: { params: Params }) {
  const { name, locale } = await params;
  // Use the locale from params for server translations
  setRequestLocale(locale);
  const t = await getTranslations("artiste");

  const artist = await getArtistBySlug(name);
  const exhibitions = await getExhibitionsByArtist(name);
  const artworks = await getArtworkByArtist(name);
  const series = await getSeriesByArtist(name);

  return (
    <>
      <section
        className={`section ${!artist.image ? "artist_page_hero no_image" : "artist_page_hero"} `}
      >
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
        {artist.image ? (
          <img
            src={
              artist.image
                ? urlFor(artist.image).auto("format").quality(80).url()
                : "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt=""
          />
        ) : null}
      </section>

      {exhibitions.length > 0 || artworks.length > 0 ? (
        <div className="separator section"></div>
      ) : null}

      {exhibitions.length > 0 ? (
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
      ) : null}

      {artworks.length > 0 ? (
        <section className="section">
          <h4 className="section_title">{t("work")}</h4>
          <div className="exposition_images">
            {artworks.map((artwork: any) => (
              <ArtworkCard
                key={`${artwork.slug.current}+${artwork.title}`}
                image={artwork.image}
                title={artwork.title}
                artist={artwork.artist.fullName}
                link={`/works/${artwork.slug.current}`}
                isAvailable={artwork.vendu === "oui" ? false : true}
                year={artwork.year}
              />
            ))}

            {series.map((serie: any) => {
              return serie.artworks.map((artwork: any) => (
                <ArtworkCard
                  key={`${artwork.slug.current}+${artwork.title}`}
                  image={artwork.image}
                  title={artwork.title}
                  artist={artist.fullName}
                  link={`/works/serie/${artwork.slug}?serie=${serie.slug.current}`}
                  isAvailable={artwork.vendu === "oui" ? false : true}
                  year={artwork.year}
                />
              ));
            })}
          </div>
        </section>
      ) : null}

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
    </>
  );
}
