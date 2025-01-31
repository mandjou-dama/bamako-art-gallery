import Image from "next/image";
import React from "react";

import "./page.css";

export default function ExpositionPage({
  params,
}: {
  params: { name: string };
}) {
  return (
    <div className="exposition_page">
      <div className="exposition_page_hero">
        <Image
          width={1260}
          height={750}
          src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />

        <section className="section exposition_right">
          <div className="section_header">
            <h4 className="section_title">Nom de l'exposition</h4>
          </div>

          <div className="separator"></div>

          <div className="exposition_description_container">
            <p className="exposition_date">
              Date : <span>08 Novembre 2024</span>
            </p>
            <p className="exposition_description">
              <span>
                La Galerie Bamako Art Gallery est ravie de présenter Goumbé, la
                première exposition personnelle de l’artiste Carl-Edouard Keita
                à Abidjan, du 13 février au 12 avril 2025. 
              </span>
              <span>
                Associations culturelles fondées par les migrants venus des
                régions intérieures et de la sous-région ivoirienne durant les
                années post-indépendance, les goumbés étaient autrefois très
                présentes dans les quartiers populaires d’Abidjan. Aujourd’hui,
                les goumbés ont quasiment disparu, laissant subsister
                principalement la danse qui en est issue et pratiquée au sein de
                la communauté malinké dans le nord de la Côte d’Ivoire.
              </span>
              <span>
                S’inspirant de l’effervescence créative de ce mouvement,
                Carl-Edouard Keita explore à travers cette exposition les
                dynamiques sociales, culturelles et spirituelles d’une période
                clé dans la construction d’une identité nationale
                post-coloniale.
              </span>
            </p>
          </div>
        </section>
      </div>

      <section className="section exposition_images_section">
        <div className="section_header">
          <h4 className="section_title">Vues de l'exposition</h4>
        </div>

        <div className="exposition_images">
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/30426268/pexels-photo-30426268/free-photo-of-paysage-majestueux-de-montagnes-enneigees-en-hiver.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/30426849/pexels-photo-30426849/free-photo-of-scene-urbaine-a-velo-en-noir-et-blanc.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </section>
    </div>
  );
}
