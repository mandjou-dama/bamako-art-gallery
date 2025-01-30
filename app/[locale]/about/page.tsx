import { getTranslations } from "next-intl/server";
import Image from "next/image";

import "./page.css";

const team = [
  {
    name: "Kadiatou Sylla",
    role: "Directrice",
    image:
      "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Madina Bah",
    role: "Art Advisor",
    image:
      "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Kadi Maïga",
    role: "Financière",
    image:
      "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default async function Page() {
  const t = await getTranslations("about");
  return (
    <div className="about_page">
      <div className="about_hero">
        <div className="about_hero_infos">
          <h4>{t("hero.headline")}</h4>
          <p>{t("hero.description")}</p>
        </div>
        <div className="separator"></div>
      </div>

      <div className="about_wrapper">
        <section className="section">
          <div className="section_header">
            <h4 className="section_title">Bamako Art Gallery</h4>
          </div>
          <div className="about_hero_images">
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

          <p className="about_hero_description">
            La Galerie Bamako Art Gallery est ravie de présenter Goumbé, la
            première exposition personnelle de l’artiste Carl-Edouard Keita à
            Abidjan, du 13 février au 12 avril 2025.    Associations culturelles
            fondées par les migrants venus des régions intérieures et de la
            sous-région ivoirienne durant les années post-indépendance, les
            goumbés étaient autrefois très présentes dans les quartiers
            populaires d’Abidjan. Aujourd’hui, les goumbés ont quasiment
            disparu, laissant subsister principalement la danse qui en est issue
            et pratiquée au sein de la communauté malinké dans le nord de la
            Côte d’Ivoire.   S’inspirant de l’effervescence créative de ce
            mouvement, Carl-Edouard Keita explore à travers cette exposition les
            dynamiques sociales, culturelles et spirituelles d’une période clé
            dans la construction d’une identité nationale post-coloniale.
          </p>
        </section>

        <section className="section">
          <div className="section_header">
            <h4 className="section_title">Kadiatou Sylla</h4>
          </div>

          <div className="about_section">
            <p className="about_hero_description">
              La Galerie Bamako Art Gallery est ravie de présenter Goumbé, la
              première exposition personnelle de l’artiste Carl-Edouard Keita à
              Abidjan, du 13 février au 12 avril 2025.    Associations
              culturelles fondées par les migrants venus des régions intérieures
              et de la sous-région ivoirienne durant les années
              post-indépendance, les goumbés étaient autrefois très présentes
              dans les quartiers populaires d’Abidjan. Aujourd’hui, les goumbés
              ont quasiment disparu, laissant subsister principalement la danse
              qui en est issue et pratiquée au sein de la communauté malinké
              dans le nord de la Côte d’Ivoire.   S’inspirant de l’effervescence
              créative de ce mouvement, Carl-Edouard Keita explore à travers
              cette exposition les dynamiques sociales, culturelles et
              spirituelles d’une période clé dans la construction d’une identité
              nationale post-coloniale.
            </p>

            <Image
              width={1260}
              height={750}
              src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
        </section>

        <section className="section">
          <div className="section_header">
            <h4 className="section_title">{t("team.message")}</h4>
          </div>

          <div className="team_container">
            {team.map(({ name, role, image }) => (
              <div key={name} className="team_card">
                <Image width={1260} height={750} src={image} alt="" />

                <p className="member_role">{role}</p>
                <h2 className="member_name">{name}</h2>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
