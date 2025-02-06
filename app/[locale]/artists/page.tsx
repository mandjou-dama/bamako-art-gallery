import { getTranslations } from "next-intl/server";
import ArtistCard from "@/components/cards/artist";

import { getArtistsForArtistsPage } from "@/sanity/sanity.queries";

import "./page.css";

export default async function Page() {
  const t = await getTranslations("artistes.hero");
  const artists = await getArtistsForArtistsPage();

  return (
    <div className="artists_page">
      <div className="artists_hero">
        <div className="artists_hero_infos">
          <h4>{t("headline")}</h4>
          <p>{t("description")}</p>
        </div>
        <div className="separator"></div>
      </div>

      <div className="artists_wrapper">
        {artists.map((artist: any) => (
          <ArtistCard
            key={artist.name}
            image={artist.image}
            name={artist.fullName}
            slug={artist.slug.current}
          />
        ))}
      </div>
    </div>
  );
}
