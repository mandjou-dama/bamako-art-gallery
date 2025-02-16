import { getTranslations } from "next-intl/server";
import {
  getViewingRoomExhibitions,
  getViewingRoomItems,
} from "@/sanity/sanity.queries";

import { SmallCard } from "@/components/cards/cards";

import "./page.css";

export default async function Page() {
  const t = await getTranslations("viewingRoom.hero");
  const exhibitions = await getViewingRoomExhibitions();
  const roomItems = await getViewingRoomItems();

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
            {roomItems.map(({ title, lieu, slug, image }: any) => (
              <SmallCard
                key={title}
                name={title}
                subline={lieu}
                link={`/viewing-room/${slug}`}
                image={image}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
