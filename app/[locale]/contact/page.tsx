import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { getBagContact } from "@/sanity/sanity.queries";
import { cacheLife } from "next/cache";

import PortableText from "@/components/portable_text/portable_text";
import { type PortableTextBlock } from "next-sanity";

import "./page.css";
import {
  Clock,
  Location,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  LinkedIn,
} from "@/icons";
import { Link } from "@/i18n/routing";
import CustomMap from "@/components/map/map";

type Props = {};

async function Page({}: Props) {
  "use cache";
  cacheLife("hours");

  const t = await getTranslations("contact");
  const locale = await getLocale();

  const details = await getBagContact();

  return (
    <div className="contact_page">
      <div className="contact_hero">
        <div className="contact_hero_infos">
          <h4>Contact</h4>
        </div>
        <div className="separator"></div>
      </div>

      <section className="section contact">
        <div className="section_header">
          <h4 className="section_title">Bamako</h4>
        </div>

        <div className="contact_container">
          <div className="contact_element_wrapper">
            <Clock />
            <p>
              {locale === "fr"
                ? details.contact.open_fr
                : details.contact.open_en}
            </p>
          </div>
          <div className="contact_element_wrapper">
            <Location />
            <p>
              {locale === "fr"
                ? details.contact.location_fr
                : details.contact.location_en}
            </p>
          </div>
          <div className="contact_element_wrapper">
            <Phone />
            <a href={`tel:${details.contact.tel}`}>{details.contact.tel}</a>
          </div>
          <div className="contact_element_wrapper">
            <Mail />
            <a href={`mailto:${details.contact.email}`}>
              {details.contact.email}
            </a>
          </div>
        </div>
      </section>

      <section className="section contact">
        <div className="section_header">
          <h4 className="section_title">{t("social")}</h4>
        </div>

        <div className="contact_container">
          <div className="footer_icons contact">
            <Link
              target="_blank"
              className="social_link_wrapper"
              href={
                "https://www.instagram.com/bamakoart?igsh=MWV5MXVyOHVkcGtoNw=="
              }
            >
              <Instagram strokeWidth={1.5} />
              Instagram
            </Link>

            <Link
              target="_blank"
              className="social_link_wrapper"
              href={"https://www.facebook.com/share/1BKiE6QFT4/"}
            >
              <Facebook strokeWidth={1.5} />
              Facebook
            </Link>

            <Link
              target="_blank"
              className="social_link_wrapper"
              href={"https://x.com/ArtBamako?t=OwuHjyTuEF0eSe_dbo_ruQ&s=08"}
            >
              <Twitter strokeWidth={1.5} />
              Formerly Twitter
            </Link>

            <Link
              target="_blank"
              className="social_link_wrapper"
              href={"https://www.linkedin.com/company/bamako-art-gallery/"}
            >
              <LinkedIn strokeWidth={1.5} />
              LinkedIn
            </Link>
          </div>
        </div>
      </section>

      <section className="section contact">
        <div className="section_header">
          <h4 className="section_title">{t("map")}</h4>
        </div>

        <div className="contact_container map_wrapper">
          <CustomMap />
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=12.59914202526509,-8.031052244464721"
            target="_blank"
            rel="noopener noreferrer"
            className="maps_button"
          >
            {t("openMap")}
          </a>
        </div>
      </section>
    </div>
  );
}

export default Page;
