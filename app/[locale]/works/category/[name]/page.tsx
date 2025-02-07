import { getTranslations } from "next-intl/server";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import {
  getArtworksByCategory,
  getSeriesWithArtworksByCategory,
} from "@/sanity/sanity.queries";

import { ArtworkCard } from "@/components/cards/artwork_card";

import "./page.css";

type Params = Promise<{ name: string }>;

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatCurrency(amount: number, locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {}).format(amount);
}

export default async function Page({ params }: { params: Params }) {
  const t = await getTranslations("work");
  const { name } = await params;
  const artworks = await getArtworksByCategory(capitalizeFirstLetter(name));
  const series = await getSeriesWithArtworksByCategory(
    capitalizeFirstLetter(name)
  );

  const getTitle = () => {
    if (name === "photographie") return t("photography.title");
    if (name === "peinture") return t("painting.title");
    if (name === "sculpture") return t("sculpture.title");
    if (name === "design") return t("design.title");
  };

  const getDescription = () => {
    if (name === "photographie") return t("photography.description");
    if (name === "peinture") return t("painting.description");
    if (name === "sculpture") return t("sculpture.description");
    if (name === "design") return t("design.description");
  };

  return (
    <div className="works_page">
      <div className="works_hero">
        <div className="works_hero_infos">
          <h4>Oeuvres en {getTitle()}</h4>
          <p>{getDescription()}</p>
        </div>
        <div className="separator"></div>
      </div>

      <div className="works_wrapper">
        {artworks.map((artwork: any) => {
          return (
            <div key={`${artwork.slug.current}+${artwork.title}`}>
              <Link href={`/works/${artwork.slug.current}`}>
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

        {series.map((serie: any, index: number) => {
          const artist = serie.artists.map((i: any) => i.fullName);

          return serie.artworks.map((artwork: any, index: number) => {
            return (
              <div key={`${artwork.price}+${artwork.title}+${index}`}>
                <Link href={`/works/serie/${artwork.slug}?serie=${serie.slug}`}>
                  <img src={artwork.images} alt="" />
                  <div className="artwork_infos_1">
                    <p className="artwork_infos_artist">{artist[0]}</p>
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
          });
        })}
      </div>
    </div>
  );
}
