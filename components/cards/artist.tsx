"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { urlFor } from "@/sanity/lib/image";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import "./styles.css";

type Props = {
  image: string;
  name: string;
  slug: string;
};

const ArtistCard = ({ image, name, slug }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

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
    <div ref={cardRef} className="artist_wrapper">
      <Link scroll={true} href={`/artists/artist/${slug}`}>
        <img
          src={
            image
              ? urlFor(image).auto("format").quality(70).url()
              : "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={`${name} cover image`}
        />
        <button>{name || "Kankou fofana"}</button>
      </Link>
    </div>
  );
};

export default ArtistCard;
