import React from "react";
import Image from "next/image";
import Link from "next/link";

import { SmallCard } from "@/components/cards/cards";

import "./page.css";

const presses = [
  {
    image:
      "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    from: "Jeune Afrique",
    title: "La foire investic monte en puissance",
    link: "https://google.com",
  },
  {
    image:
      "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    from: "The New York Times",
    title:
      "Bringing Anne Frank’s Secret Annex to New York, and the World Covered windows, peeling ",
    link: "https://google.com",
  },
];

export default function ArtistPage() {
  return (
    <div className="artist_page">
      <section className="section artist_page_hero">
        <div className="artist_page_hero_left">
          <div>
            <div className="section_header">
              <h4 className="section_title">Kankou Fofana</h4>
            </div>
            <p>
              <span>
                Kankou Fofana est une artiste peintre et sculptrice reconnue
                pour ses œuvres captivantes qui célèbrent les traditions
                maliennes tout en leur apportant une touche contemporaine.
              </span>
              <span>
                Inspirée par la richesse culturelle de son pays, ses créations
                mêlent harmonieusement couleurs vives, symbolisme ancestral et
                modernité, traduisant une quête perpétuelle d'équilibre entre le
                passé et le présent.
              </span>
            </p>
          </div>

          <div>
            <div className="section_header">
              <h4 className="section_title">Biographie</h4>
            </div>
            <p>
              <span>
                Née à Bamako, Mali, Kankou Fofana a grandi dans un environnement
                où l'art et la culture occupaient une place centrale. Dès son
                plus jeune âge, elle s'est passionnée pour le dessin et la
                peinture, s'inspirant des paysages vibrants et des motifs
                traditionnels qui l'entouraient. Après des études aux Beaux-Arts
                de Bamako, Kankou a poursuivi sa formation en arts plastiques à
                Paris, où elle a perfectionné ses techniques tout en explorant
                de nouvelles perspectives artistiques.
              </span>
              <span>
                Au fil des années, Kankou a développé un style unique qui
                combine peinture, sculpture et installations artistiques. Ses
                œuvres ont été exposées dans des galeries et des musées
                prestigieux à travers l'Afrique et l'Europe, attirant
                l'attention pour leur profondeur émotionnelle et leur esthétique
                singulière.
              </span>
              <span>
                Engagée dans la préservation de l'héritage culturel malien,
                Kankou Fofana anime également des ateliers pour initier les
                jeunes à l'art et pour promouvoir l'importance de la créativité
                dans l'éducation. Aujourd'hui, elle continue d'innover et de
                raconter des histoires à travers ses œuvres, faisant de l'art un
                pont entre les générations et les cultures.
              </span>
            </p>
          </div>
        </div>
        <Image
          width={1260}
          height={750}
          src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </section>

      <div className="separator section"></div>

      <section className="section">
        <div className="section_header">
          <h4 className="section_title">Expositions</h4>
        </div>

        <div className="section_elements_wrapper two_elements">
          <SmallCard link="/expositions/dfdf" />
          <SmallCard link="/expositions/dfdf" />
        </div>
      </section>

      <section className="section">
        <h4 className="section_title">Oeuvres</h4>
        <div className="section_elements_wrapper four_elements">
          <SmallCard link="/works/sder" />
          <SmallCard link="/works/sder" />
          <SmallCard link="/works/sder" />
          <SmallCard link="/works/sder" />
        </div>
      </section>

      <section className="section">
        <h4 className="section_title">Presses</h4>
        <div className="section_elements_wrapper presse">
          {presses.map((presse) => (
            <Link target="_blank" key={presse.title} href={presse.link}>
              <div className="presse_container">
                <div className="image_container">
                  <Image width={1260} height={750} src={presse.image} alt="" />
                </div>

                <div>
                  <p className="from">{presse.from}</p>
                  <p className="title">{presse.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
