export const dynamic = "force-static";

import { getTranslations, setRequestLocale } from "next-intl/server";
import ActuCard from "@/components/cards/actu";

import { getAllNews } from "@/sanity/sanity.queries";

import "./page.css";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("artActu.hero");
  const news = await getAllNews();

  return (
    <div className="art_actu_page">
      <div className="art_actu_hero">
        <div className="art_actu_hero_infos">
          <h4>{t("headline")}</h4>
          <p>{t("description")}</p>
        </div>
        <div className="separator"></div>
      </div>

      <div className="art_actu_wrapper">
        <section className="section">
          <div className="section_elements_wrapper four_actu_elements">
            {news.map((info: any) => (
              <ActuCard
                image={info.photo}
                title={info.title}
                journal={info.journal}
                key={info.title}
                link={info.link}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
