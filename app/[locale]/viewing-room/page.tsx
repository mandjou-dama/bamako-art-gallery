import { getTranslations } from "next-intl/server";
import { getViewingRoomExhibitions } from "@/sanity/sanity.queries";

import { SmallCard } from "@/components/cards/cards";

import "./page.css";

export default async function Page() {
  const t = await getTranslations("viewingRoom.hero");
  const exhibitions = await getViewingRoomExhibitions();

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
            {exhibitions.map((exhibition: any) => (
              <SmallCard
                key={exhibition.title}
                name={exhibition.title}
                subline={
                  exhibition.artists.length > 2
                    ? "exposition collective"
                    : `${exhibition.artists[0]?.fullName}${exhibition.artists[1]?.fullName ? "," : ""} ${exhibition.artists[1]?.fullName || ""}`
                }
                link={`/viewing-room/${exhibition.slug}`}
                image={exhibition.cover}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
