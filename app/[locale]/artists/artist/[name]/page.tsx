import React from "react";
import Image from "next/image";
import Link from "next/link";
import PortableText from "@/components/portable_text/portable_text";
import { type PortableTextBlock } from "next-sanity";

import { getArtistBySlug } from "@/sanity/sanity.queries";

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

type Params = Promise<{ name: string }>;

export default async function ArtistPage({ params }: { params: Params }) {
  const { name } = await params;
  console.log(name);

  const artist = await getArtistBySlug(name);

  return (
    <div className="artist_page">
      <section className="section artist_page_hero">
        <div className="artist_page_hero_left">
          <div>
            <div className="section_header">
              <h4 className="section_title">
                {artist.fullName || "Kankou Fofana"}
              </h4>
            </div>
            <PortableText
              className="portable_text"
              value={artist.description_fr as PortableTextBlock[]}
            />
          </div>

          <div>
            <div className="section_header">
              <h4 className="section_title">Biographie</h4>
            </div>
            <PortableText
              className="portable_text"
              value={artist.bio_fr as PortableTextBlock[]}
            />
          </div>
        </div>
        <Image
          width={1260}
          height={750}
          src={
            artist.image ||
            "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
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
