import { getTranslations } from "next-intl/server";

import { SmallCard } from "@/components/cards/cards";

import "./page.css";

export default async function Page() {
  const t = await getTranslations("viewingRoom.hero");
  return (
    <div className="viewing_room_page">
      <div className="viewing_room_hero">
        <div className="viewing_room_hero_infos">
          <h4>{t("headline")}</h4>
          <p>{t("description")}</p>
        </div>
        <div className="separator"></div>
      </div>

      <div className="viewing_room_wrapper">
        <section className="section">
          <div className="section_elements_wrapper three_elements">
            <SmallCard link="/expositions/kjhj" />
            <SmallCard link="/expositions/kjhj" />
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
