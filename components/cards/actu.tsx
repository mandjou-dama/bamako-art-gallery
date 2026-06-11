"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { urlFor } from "@/sanity/lib/image";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger

type Props = {
  link?: string;
  image?: any;
  journal?: string;
  title?: string;
  notArticle?: boolean;
};

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin

import "./styles.css";

const ActuCard = ({ link, image, journal, title, notArticle }: Props) => {
  const t = useTranslations("components");
  const cardRef = useRef<HTMLAnchorElement>(null); // Ref for the card element

  // GSAP animation
  useGSAP(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50, // Start slightly below
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current, // Trigger animation when the card enters the viewport
          start: "top 80%", // Start animation when the top of the card is 80% in view
          toggleActions: "play none none", // Play animation on enter, reverse on leave
        },
      });
    }
  }, []); // Empty dependency array ensures this runs once

  return (
    <Link
      ref={cardRef}
      target="_blank"
      href={link ? link : ""}
      className="actu_card"
    >
      <img
        src={urlFor(image)
          .width(800)
          .fit("max")
          .auto("format")
          .width(300)
          .url()}
        alt={title}
      />

      <div className="actu_card_infos">
        <div>
          {journal && <p className="actu_card_info_subline">{journal}</p>}
          <p className="actu_card_info_title">{title}</p>
        </div>

        <div className="actu_card_link_wrapper">
          <div className="actu_card_link_text">
            <p>{!notArticle ? t("actuCard.link2") : t("actuCard.link")}</p>
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
          </div>
          <div className="separator"></div>
        </div>
      </div>
    </Link>
  );
};

export default ActuCard;
