import { getTranslations } from "next-intl/server";
import ActuCard from "@/components/cards/actu";

import "./page.css";

export default async function Page() {
  const t = await getTranslations("artActu.hero");

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
            <ActuCard />
            <ActuCard />
            <ActuCard />
            <ActuCard />
            <ActuCard />
            <ActuCard />
            <ActuCard />
            <ActuCard />
            <ActuCard />
            <ActuCard />
            <ActuCard />
            <ActuCard />
            <ActuCard />
            <ActuCard />
            <ActuCard />
          </div>
        </section>
      </div>
    </div>
  );
}
