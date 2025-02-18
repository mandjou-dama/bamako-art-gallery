"use client"; // Ensure this is a client component

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger
import { Link } from "@/i18n/routing";
import { urlFor } from "@/sanity/lib/image";

import "./styles.css"; // Import your CSS file

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin

type ArtworkType = {
  image: string;
  link: string;
  title: string;
  artist: string;
  year: number;
  isAvailable?: boolean;
};

export const ArtworkCard = ({
  image,
  link,
  title,
  artist,
  year,
  isAvailable,
}: ArtworkType) => {
  const cardRef = useRef<HTMLDivElement>(null); // Ref for the card element

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
          toggleActions: "play none none none", // Play animation on enter, reverse on leave
          // toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
        },
      });
    }
  }, []); // Empty dependency array ensures this runs once

  return (
    <div className="artwork_card" ref={cardRef}>
      <Link href={link}>
        <img
          src={urlFor(image).auto("format").width(720).url()}
          alt={title}
          className="artwork_image"
        />
        <div className="artwork_infos_1">
          <p className="artwork_infos_artist">{artist}</p>
          <p className="artwork_infos_title">{title}</p>
        </div>
        <div className="artwork_infos_2">
          <p>{year !== 0 ? year : ""}</p>
          {isAvailable ? <p className="artwork_available">Disponible</p> : null}
        </div>
      </Link>
    </div>
  );
};
