import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";

import "./page.css";
import ArtistCard from "@/components/cards/artist";

export default function Page() {
  return (
    <div className="artists_page">
      <div className="artists_hero">
        <div className="artists_hero_infos">
          <h4>Artistes</h4>
          <p>
            Explorez les œuvres et l'univers de nos artistes, des talents
            uniques qui repoussent les limites de la créativité.
          </p>
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
