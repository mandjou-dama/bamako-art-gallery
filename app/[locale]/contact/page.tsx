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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d124602.83320480409!2d-8.077256513259481!3d12.592890841970243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d12.597119399999999!2d-8.0336452!5e0!3m2!1sfr!2sml!4v1739753934147!5m2!1sfr!2sml"
            width="100%"
            height="100%"
            style={{ border: 0, marginBottom: 30 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
            allow="geolocation"
          ></iframe>

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
