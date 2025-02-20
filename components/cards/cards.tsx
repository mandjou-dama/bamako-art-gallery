"use client"; // Ensure this is a client component

import React, { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger
import { urlFor } from "@/sanity/lib/image";
import { useTranslations } from "next-intl";

import "./styles.css";

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin

export const SmallCard = ({
  subline,
  image,
  name,
  link,
  hideCategory = false,
  fromSanity = false,
  isAvailable = false,
}: {
  subline?: string;
  name?: string;
  image?: any;
  link?: string;
  hideCategory?: boolean;
  fromSanity?: boolean;
  isAvailable?: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null); // Ref for the card element

  const t = useTranslations("components");

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

  const getImage = (image: any) => {
    if (image && fromSanity) return;
    if (image && fromSanity === false) return image;
  };

  return (
    <div className="small_card" ref={cardRef}>
      <Link scroll={true} href={link ? link : ""}>
        <div className="small_card_image_container">
          {fromSanity && (
            <img src={urlFor(image).auto("format").width(720).url()} alt="" />
          )}
          {!fromSanity && <Image width={600} height={750} src={image} alt="" />}
        </div>

        <div className="small_card_footer">
          {!hideCategory && (
            <p className="small_card_footer_headline">
              {subline ? subline : "Catégorie"}
            </p>
          )}
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

        <p className="small_card_footer_name">
          {name ? name : "Lorem ipsum, dolor sit amet consectetur adipisicing."}
        </p>

        {isAvailable ? (
          <p className="artwork_available">{t("artworkCard.available")}</p>
        ) : null}

        <div className="separator"></div>
      </Link>
    </div>
  );
};
