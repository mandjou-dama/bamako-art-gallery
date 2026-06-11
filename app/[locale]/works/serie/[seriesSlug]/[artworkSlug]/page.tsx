export const dynamic = "force-static";
export const dynamicParams = true;

import { getTranslations, setRequestLocale } from "next-intl/server";
import { urlFor } from "@/sanity/lib/image";

import {
  getAllSeriesSlugsWithArtworks,
  getSeriesArtworkBySlug,
} from "@/sanity/sanity.queries";

import PortableText from "@/components/portable_text/portable_text";
import { PortableTextBlock } from "next-sanity";

import "./page.css";

type Params = Promise<{
  locale: string;
  seriesSlug: string;
  artworkSlug: string;
}>;

export async function generateStaticParams({}: {}) {
  const allParams = await getAllSeriesSlugsWithArtworks();
  // Now each param should have both seriesSlug and artworkSlug
  return allParams.map((p) => ({
    seriesSlug: p.serie,
    artworkSlug: p.name,
  }));
}

export default async function SeriePage({ params }: { params: Params }) {
  const { locale, seriesSlug, artworkSlug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "artwork" });

  //@ts-ignore
  const artwork = await getSeriesArtworkBySlug(seriesSlug, artworkSlug);

  const mailContent = (artwork: any) => {
    if (locale === "fr")
      return `mailto:contact@bamakoartgallery.com?subject=Demande d'information sur ${encodeURIComponent(artwork.title)} de ${encodeURIComponent(artwork.artists[0].fullName)}&body=Bonjour,%0D%0A%0D%0AJe suis intéressé par '${encodeURIComponent(artwork.title)}' de '${encodeURIComponent(artwork.artists[0].fullName)}'.%0D%0A%0D%0AMerci !`;
    if (locale === "en")
      return `mailto:contact@bamakoartgallery.com?subject=Inquiry about ${encodeURIComponent(artwork.title)} by ${encodeURIComponent(artwork.artists[0].fullName)}&body=Hello,%0D%0A%0D%0AI am interested in '${encodeURIComponent(artwork.title)}' by '${encodeURIComponent(artwork.artists[0].fullName)}'.%0D%0A%0D%0AThanks!`;
  };

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <div className="work_page">
      <div className="work_page_hero">
        <img
          src={
            artwork.artwork.image
              ? urlFor(artwork.artwork.image)
                  .width(800)
                  .fit("max")
                  .auto("format")
                  .quality(100)
                  .url()
              : "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt=""
        />

        <section className="section work_right">
          <div className="section_header">
            <h4 className="section_title">{artwork.title}</h4>
          </div>

          <div className="separator"></div>

          <div className="work_description_container">
            {artwork.description_fr && (
              <PortableText
                className="portable_text"
                value={
                  locale === "fr"
                    ? artwork.artwork.description_fr
                    : (artwork.artwork.description_en as PortableTextBlock[])
                }
              />
            )}
          </div>

          <div className="work_detail_wrapper">
            <p className="work_detail">
              {t("year")} :{" "}
              <span className="work_detail_span">{artwork.artwork.year}</span>
            </p>
            <p className="work_detail">
              {t("technique")} :{" "}
              <span>
                {locale === "fr"
                  ? artwork.artwork.technique_fr
                  : artwork.artwork.technique_en}
              </span>
            </p>
            <p className="work_detail">
              {t("taille")} :{" "}
              <span className="work_detail_span">
                {artwork.artwork.dimensions}
              </span>
            </p>
            <p className="work_detail">
              {t("category")} :{" "}
              <span className="work_detail_span">
                {artwork.artwork.category}
              </span>
            </p>
            <p className="work_detail">
              copyright :{" "}
              <span className="work_detail_span">
                {artwork.artists[0].fullName}
              </span>
            </p>
          </div>

          <a href={mailContent(artwork)} className="inquire">
            {locale === "fr" ? "Acquérir" : "Inquire"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-up-right"
            >
              <path d="M13 5H19V11" />
              <path d="M19 5L5 19" />
            </svg>
          </a>
        </section>
      </div>
    </div>
  );
}
