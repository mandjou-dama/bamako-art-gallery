import Image from "next/image";
import React from "react";

import "./page.css";

export default async function ExpositionPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;

  return (
    <div className="work_page">
      <div className="work_page_hero">
        <Image
          width={1260}
          height={750}
          src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />

        <section className="section work_right">
          <div className="section_header">
            <h4 className="section_title">Nom de l'artiste</h4>
          </div>

          <div className="separator"></div>

          <div className="work_description_container">
            <p className="work_date">Nom de l'oeuvre</p>
            <p className="work_description">
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

          <div className="work_detail_wrapper">
            <p className="work_detail">
              Année : <span className="work_detail_span">2023</span>
            </p>
            <p className="work_detail">
              outils :{" "}
              <span className="work_detail_span">
                Acrylique et crayon de couleur sur toile
              </span>
            </p>
            <p className="work_detail">
              taille : <span className="work_detail_span">91 x 61 cm</span>
            </p>
            <p className="work_detail">
              copyright :{" "}
              <span className="work_detail_span">Nom de l'artiste</span>
            </p>
          </div>
        </section>
      </div>

      <section className="section work_images_section">
        <div className="section_header">
          <h4 className="section_title">Voir plus d'images</h4>
        </div>

        <div className="work_images">
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
