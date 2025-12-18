export const dynamic = "force-static";

import { getTranslations, setRequestLocale } from "next-intl/server";
import { getViewingRoomItems } from "@/sanity/sanity.queries";

import { SmallCard } from "@/components/cards/cards";

import "./page.css";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("viewingRoom");
  const roomItems = await getViewingRoomItems();

  return (
    <div className="viewing_room_page">
      <div className="viewing_room_hero">
        <div className="viewing_room_hero_infos">
          <h4>{t("hero.headline")}</h4>
          <p>{t("hero.description")}</p>
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

      <section className="section">
        <div className="section_header">
          <h4 className="section_title">{t("sections.catalog")}</h4>
        </div>
        <div className="iframe_container">
          <iframe
            style={{
              border: "none",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
            }}
            src="https://online.fliphtml5.com/cgphb/cyff/"
            seamless
            scrolling="no"
            frameBorder={0}
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
}
