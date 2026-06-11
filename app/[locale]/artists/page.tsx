export const dynamic = "force-static";

import { getTranslations, setRequestLocale } from "next-intl/server";
import ArtistCard from "@/components/cards/artist";

import { getArtistsForArtistsPage } from "@/sanity/sanity.queries";

import "./page.css";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "artistes.hero" });
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

      <div key={"o"} className="artists_wrapper">
        {artists.map((artist: any) => (
          <ArtistCard
            key={artist.fullName}
            image={artist.image}
            name={artist.fullName}
            slug={artist.slug.current}
          />
        ))}
      </div>
    </div>
  );
}
