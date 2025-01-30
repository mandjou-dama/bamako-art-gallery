import { SmallCard } from "@/components/cards/cards";

import "./page.css";

export default function Page() {
  return (
    <div className="viewing_room_page">
      <div className="viewing_room_hero">
        <div className="viewing_room_hero_infos">
          <h4>Viewing Room</h4>
          <p>
            La Viewing Room vous offre une expérience immersive dans nos
            collections les plus captivantes. Que vous soyez chez vous ou en
            déplacement, découvrez des œuvres uniques, accompagnées de récits et
            d'histoires exclusives.
          </p>
        </div>
        <div className="separator"></div>
      </div>

      <div className="viewing_room_wrapper">
        <section className="section">
          <div className="section_elements_wrapper three_elements">
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
          </div>
        </section>
      </div>
    </div>
  );
}
