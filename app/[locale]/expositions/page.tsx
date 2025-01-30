import { getTranslations } from "next-intl/server";
import { SmallCard } from "@/components/cards/cards";

import "./page.css";

export default function Page() {
  <div className="expositions_page">
    <div className="expositions_hero">
      <div className="expositions_hero_infos">
        <h4>Expositions</h4>
        <p>
          Plongez dans un univers artistique captivant à travers nos expositions
          uniques. Explorez des œuvres qui racontent des histoires, éveillent
          des émotions et célèbrent la créativité sous toutes ses formes.
        </p>
      </div>
      <div className="separator"></div>
    </div>

    <div className="expositions_wrapper">
      <section className="section">
        <div className="section_header">
          <h4 className="section_title">Expositions en cours</h4>
        </div>

        <div className="section_elements_wrapper two_elements">
          <SmallCard />
          <SmallCard />
        </div>
      </section>

      <section className="section">
        <div className="section_header">
          <h4 className="section_title">Expositions à venir</h4>
        </div>

        <div className="section_elements_wrapper two_elements">
          <SmallCard />
          <SmallCard />
        </div>
      </section>

      <section className="section">
        <h4 className="section_title">Expositions passées</h4>
        <div className="section_elements_wrapper four_elements">
          <SmallCard />
          <SmallCard />
          <SmallCard />
          <SmallCard />
        </div>
      </section>
    </div>
  </div>;
}
