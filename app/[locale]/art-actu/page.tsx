import ActuCard from "@/components/cards/actu";

import "./page.css";

export default function Page() {
  return (
    <div className="art_actu_page">
      <div className="art_actu_hero">
        <div className="art_actu_hero_infos">
          <h4>Art'Actu</h4>
          <p>
            Art'Actu est votre source quotidienne pour les dernières actualités
            de la scène artistique. Des interviews d'artistes, des aperçus
            d'expositions et des tendances émergentes : tout ce qu'il faut pour
            nourrir votre passion pour l'art se trouve ici. Ne manquez rien de
            ce qui fait vibrer le monde artistique.
          </p>
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
