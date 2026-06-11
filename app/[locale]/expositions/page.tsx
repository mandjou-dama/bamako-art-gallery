export const dynamic = "force-static";

import { getTranslations, setRequestLocale } from "next-intl/server";
import { SmallCard } from "@/components/cards/cards";

import { getExhibitionsByTimeline } from "@/sanity/sanity.queries";

import "./page.css";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "expositions" });

  const upComing = await getExhibitionsByTimeline("À venir");
  const current = await getExhibitionsByTimeline("En cours");
  const passed = await getExhibitionsByTimeline("Passée");

  return (
    <div className="expositions_page">
      <div className="expositions_hero">
        <div className="expositions_hero_infos">
          <h4>{t("hero.headline")}</h4>
          <p>{t("hero.description")}</p>
        </div>
        <div className="separator"></div>
      </div>

      <div className="expositions_wrapper">
        {current.length === 0 ? null : (
          <section className="section">
            <div className="section_header">
              <h4 className="section_title">{t("sections.enCours")}</h4>
            </div>

            <div className="section_elements_wrapper two_elements">
              {current.map((exhibition: any) => (
                <SmallCard
                  key={exhibition.title}
                  name={exhibition.title}
                  subline={
                    exhibition.artists.length > 2
                      ? locale === "fr"
                        ? "exposition collective"
                        : "group exhibition"
                      : `${exhibition.artists[0]?.fullName}${exhibition.artists[1]?.fullName ? "," : ""} ${exhibition.artists[1]?.fullName || ""}`
                  }
                  link={`/expositions/${exhibition.slug}`}
                  image={exhibition.cover}
                />
              ))}
            </div>
          </section>
        )}

        {upComing.length > 0 ? (
          <section className="section">
            <div className="section_header">
              <h4 className="section_title">{t("sections.aVenir")}</h4>
            </div>

            <div className="section_elements_wrapper two_elements">
              {upComing.map((exhibition: any) => (
                <SmallCard
                  key={exhibition.title}
                  name={exhibition.title}
                  subline={
                    exhibition.artists.length > 2
                      ? locale === "fr"
                        ? "exposition collective"
                        : "group exhibition"
                      : `${exhibition.artists[0]?.fullName}${exhibition.artists[1]?.fullName ? "," : ""} ${exhibition.artists[1]?.fullName || ""}`
                  }
                  link={`/expositions/${exhibition.slug}`}
                  image={exhibition.cover}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="section">
          <h4 className="section_title">{t("sections.passer")}</h4>
          <div className="section_elements_wrapper four_elements">
            {passed.map((exhibition: any) => (
              <SmallCard
                key={exhibition.title}
                name={exhibition.title}
                subline={
                  exhibition.artists.length > 2
                    ? locale === "fr"
                      ? "exposition collective"
                      : "group exhibition"
                    : `${exhibition.artists[0]?.fullName}${exhibition.artists[1]?.fullName ? "," : ""} ${exhibition.artists[1]?.fullName || ""}`
                }
                link={`/expositions/${exhibition.slug}`}
                image={exhibition.cover}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
