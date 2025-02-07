"use client"; // Ensure this is a client component

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger
import Link from "next/link";
import "./styles.css"; // Import your CSS file

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin

interface Artwork {
  slug: string;
  images: string;
  title: string;
  price: number;
  year: number;
}

interface Serie {
  slug: string;
}

interface Artist {
  name: string;
}

interface ArtworkCardProps {
  artwork: Artwork;
  serie: Serie;
  artist: Artist[];
}

function formatCurrency(amount: number, locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {}).format(amount);
}

export const ArtworkCard = ({ artwork, serie, artist }: ArtworkCardProps) => {
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
          toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
        },
      });
    }
  }, []); // Empty dependency array ensures this runs once

  return (
    <div className="artwork_card" ref={cardRef}>
      <Link href={`/works/serie/${artwork.slug}?serie=${serie.slug}`}>
        <img
          src={artwork.images}
          alt={artwork.title}
          className="artwork_image"
        />
        <div className="artwork_infos_1">
          <p className="artwork_infos_artist">{artist[0]?.name}</p>
          <p className="artwork_infos_title">{artwork.title}</p>
        </div>
        <div className="artwork_infos_2">
          <p>
            {artwork.price > 0 ? `${formatCurrency(artwork.price)} FCFA` : null}
          </p>
          <p>{artwork.year !== 0 ? artwork.year : ""}</p>
        </div>
      </Link>
    </div>
  );
};
