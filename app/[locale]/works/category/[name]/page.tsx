import { getTranslations } from "next-intl/server";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import { getArtworksByCategory } from "@/sanity/sanity.queries";
import { Artwork } from "@/sanity/sanity.types";

import "./page.css";

const categoryDesc = [
  {
    category: "photographie",
    description: "photographie",
  },
  {
    category: "design",
    description: "design",
  },
  {
    category: "sculpture",
    description: "sculpture",
  },
  {
    category: "peinture",
    description: "peinture",
  },
];

type Params = Promise<{ name: string }>;

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatCurrency(amount: number, locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {}).format(amount);
}
export default async function Page({ params }: { params: Params }) {
  const t = await getTranslations("artistes.hero");
  const { name } = await params;
  const artworks = await getArtworksByCategory(capitalizeFirstLetter(name));

  const categoryDescription = categoryDesc.find((el) => name === el.category);

  console.log(artworks[0].artist.fullName);

  return (
    <div className="works_page">
      <div className="works_hero">
        <div className="works_hero_infos">
          <h4>Oeuvres en {name}</h4>
          <p>{categoryDescription?.description}</p>
        </div>
        <div className="separator"></div>
      </div>

      <div className="works_wrapper">
        {artworks.map((artwork: any) => (
          <div key={`${artwork.slug}+${artwork.title}`}>
            <Link href={"/works/erer"}>
              <img src={artwork.image} alt="" />
              <div className="artwork_infos_1">
                <p className="artwork_infos_artist">
                  {artwork.artist.fullName}
                </p>
                <p className="artwork_infos_title">{artwork.title}</p>
              </div>
              <div className="artwork_infos_2">
                <p>{formatCurrency(artwork.price)} FCFA</p>
                <p>{artwork.year !== 0 ? artwork.year : ""}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
