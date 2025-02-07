"use client"; // Ensure this is a client component

import React, { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger

import "./styles.css";

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin

export const SmallCard = ({
  subline,
  image,
  name,
  link,
  hideCategory = false,
}: {
  subline?: string;
  name?: string;
  image?: any;
  link?: string;
  hideCategory?: boolean;
}) => {
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
    <div className="small_card" ref={cardRef}>
      <Link scroll={true} href={link ? link : ""}>
        <div className="small_card_image_container">
          <Image
            width={1260}
            height={750}
            src={
              image ||
              "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt=""
          />
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

        <div className="separator"></div>
      </Link>
    </div>
  );
};
