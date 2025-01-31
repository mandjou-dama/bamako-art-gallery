import { getTranslations } from "next-intl/server";

import "./page.css";
import ArtistCard from "@/components/cards/artist";

export default async function Page() {
  const t = await getTranslations("artistes.hero");

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
        <ArtistCard />
        <ArtistCard />
        <ArtistCard />
        <ArtistCard />
        <ArtistCard />
        <ArtistCard />
        <ArtistCard />
        <ArtistCard />
      </div>
    </div>
  );
}
