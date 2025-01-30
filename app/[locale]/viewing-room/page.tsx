import { SmallCard } from "@/components/cards/cards";

import "./page.css";

export default function Page() {
  return (
    <div className="viewing_room_page">
      <div className="viewing_room_hero">
        <div className="viewing_room_hero_infos">
          <h4>Viewing Room</h4>
          <p>
            Plongez dans un univers artistique captivant à travers nos
            expositions uniques. Explorez des œuvres qui racontent des
            histoires, éveillent des émotions et célèbrent la créativité sous
            toutes ses formes.
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
