export const dynamic = "force-static";

import { type PortableTextBlock } from "next-sanity";
import { getLocale, getTranslations } from "next-intl/server";

import {
  getViewingRoomItem,
  getViewingRoomItemArtwork,
  getViewingRoomItems,
} from "@/sanity/sanity.queries";

import { urlFor } from "@/sanity/lib/image";

import PortableText from "@/components/portable_text/portable_text";
import { ArtworkCard } from "@/components/cards/artwork_card";
import { AnimatedImage } from "@/components/animated_image/animated_image";

import "./page.css";

export async function generateStaticParams() {
  const rooms = await getViewingRoomItems();

  if (!rooms) return [];

  return rooms.map((room: { slug: string }) => ({
    name: room.slug,
  }));
}

type Params = Promise<{ name: string; locale: string }>;

export default async function ViewingRoomPage({ params }: { params: Params }) {
  const { name } = await params;
  const locale = await getLocale();

  const t = await getTranslations("viewingRoom");

  const room = await getViewingRoomItem(name);
  const roomArtworks = await getViewingRoomItemArtwork(name);

  return (
    <div className="exposition_page">
      <div className="viewing_page_hero">
        <div className="section_header viewing">
          <h4 className="section_title viewing">
            {room.title || "Nom de l'exposition"}
          </h4>
        </div>

        <AnimatedImage
          src={
            room.image
              ? urlFor(room.image).auto("format").quality(80).url()
              : "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={`${room.title} cover image`}
        />

        <div className="separator"></div>

        {room.description_fr && (
          <div className="exposition_description_container">
            <PortableText
              className="portable_text"
              value={
                locale === "fr"
                  ? room.description_fr
                  : (room.description_en as PortableTextBlock[])
              }
            />
          </div>
        )}
      </div>

      <section
        className={`section ${!room.description_fr ? "exposition_images_section no_desc" : "exposition_images_section"} `}
      >
        <div className="section_header">
          <h4 className="section_title">{t("sections.images")}</h4>
        </div>

        <div className="viewing_images">
          {room.images.map((image: any, index: number) => {
            return (
              <AnimatedImage
                key={image.image}
                src={urlFor(image.image).auto("format").quality(80).url()}
                alt=""
              />
            );
          })}
        </div>
      </section>

      {roomArtworks.artworks?.length > 0 || roomArtworks.series?.length > 0 ? (
        <section className="section exposition_images_section">
          <div className="section_header">
            <h4 className="section_title">{t("sections.artworks")}</h4>
          </div>

          <div className="viewing_artworks">
            {roomArtworks.artworks?.map((artwork: any, index: number) => {
              return (
                <ArtworkCard
                  key={`${artwork.slug}+${artwork.title}`}
                  image={artwork.image}
                  title={artwork.title}
                  artist={artwork.artist.fullName}
                  link={`/works/${artwork.slug}`}
                  year={artwork.year}
                />
              );
            })}

            {roomArtworks.series &&
              roomArtworks.series.map((serie: any) => {
                const serieTitle = serie.title;
                const serieArtist = serie.artists.map((i: any) => i.fullName);

                return serie.artworks.map((artwork: any, index: number) => {
                  return (
                    <ArtworkCard
                      key={`${artwork.slug}+${artwork.title}+${index}`}
                      image={artwork.images}
                      title={`${artwork.title} - ${serieTitle}`}
                      // link={`/works/serie/${artwork.slug}?serie=${serie.slug}`}
                      link={`/works/serie/${serie.slug}/${artwork.slug}`}
                      artist={serieArtist[0]}
                      year={artwork.year}
                    />
                  );
                });
              })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
