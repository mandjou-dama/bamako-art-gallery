import { getTranslations } from "next-intl/server";
import { SmallCard } from "@/components/cards/cards";

import "./page.css";

export default async function Page() {
  const t = await getTranslations("expositions");

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
        <section className="section">
          <div className="section_header">
            <h4 className="section_title">{t("sections.enCours")}</h4>
          </div>

          <div className="section_elements_wrapper two_elements">
            <SmallCard link="/expositions/kjhj" />
            <SmallCard link="/expositions/kjhj" />
          </div>
        </section>

        <section className="section">
          <div className="section_header">
            <h4 className="section_title">{t("sections.aVenir")}</h4>
          </div>

          <div className="section_elements_wrapper two_elements">
            <SmallCard link="/expositions/kjhj" />
            <SmallCard link="/expositions/kjhj" />
          </div>
        </section>

        <section className="section">
          <h4 className="section_title">{t("sections.passer")}</h4>
          <div className="section_elements_wrapper four_elements">
            <SmallCard link="/expositions/kjhj" />
            <SmallCard link="/expositions/kjhj" />
            <SmallCard link="/expositions/kjhj" />
            <SmallCard link="/expositions/kjhj" />
          </div>
        </section>
      </div>
    </div>
  );
}
