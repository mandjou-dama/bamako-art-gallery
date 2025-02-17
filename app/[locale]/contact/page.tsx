import React from "react";

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

function Page({}: Props) {
  return (
    <div className="contact_page">
      <div className="contact_hero">
        <div className="contact_hero_infos">
          <h4>Contact</h4>
          <p>Blablabla</p>
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
            <p>Du Lundi au Samedi, De 10H à 18H</p>
          </div>
          <div className="contact_element_wrapper">
            <Location />
            <p>
              Baco Djicoroni ACI, Rue: 636, Porte:528 Près de la sotelma
              Malitel, Bamako, Mali
            </p>
          </div>
          <div className="contact_element_wrapper">
            <Phone />
            <a href="tel:+22366667932">+223 66 66 79 32</a>
          </div>
          <div className="contact_element_wrapper">
            <Mail />
            <a href="mailto:contact@bamakoartgallery.com">
              contact@bamakoartgallery.com
            </a>
          </div>
        </div>
      </section>

      <section className="section contact">
        <div className="section_header">
          <h4 className="section_title">Réseaux</h4>
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
          <h4 className="section_title">Carte</h4>
        </div>

        <div className="contact_container map_wrapper">
          <CustomMap />

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=12.597119399999999,-8.0336452"
            target="_blank"
            rel="noopener noreferrer"
            className="maps_button"
          >
            Open Google Maps
          </a>
        </div>
      </section>
    </div>
  );
}

export default Page;
