export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";

import {
  getArtworksByCategory,
  getSeriesWithArtworksByCategory,
} from "@/sanity/sanity.queries";

import { ArtworkCard } from "@/components/cards/artwork_card";

import "./page.css";

export async function generateStaticParams() {
  return [
    { name: "photographie" },
    { name: "peinture" },
    { name: "sculpture" },
    { name: "design" },
  ];
}

type Params = Promise<{ name: string }>;

export const metadata = {
  title: "Catégorie",
};

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
            <ArtworkCard
              image={artwork.image}
              link={`/works/${artwork.slug.current}`}
              title={artwork.title}
              artist={artwork.artist.fullName}
              year={artwork.year}
              isAvailable={artwork.vendu === "oui" ? false : true}
              key={`${artwork.slug.current}+${artwork.title}`}
            />
          );
        })}

        {series.map((serie: any, index: number) => {
          const artist = serie.artists.map((i: any) => i.fullName);

          return serie.artworks.map((artwork: any, index: number) => {
            return (
              <ArtworkCard
                key={`${artwork.price}+${artwork.title}+${index}`}
                image={artwork.images}
                // link={`/works/serie/${artwork.slug}?serie=${serie.slug}`}
                link={`/works/serie/${serie.slug}/${artwork.slug}`}
                title={artwork.title}
                artist={artist[0]}
                isAvailable={artwork.vendu === "oui" ? false : true}
                year={artwork.year}
              />
            );
          });
        })}
      </div>
    </div>
  );
}
