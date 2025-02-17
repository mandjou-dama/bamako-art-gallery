"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AnimatedImage = ({ src, alt }: { src: string; alt: string }) => {
  const divRef = useRef<HTMLDivElement>(null);

  // GSAP animation
  useGSAP(() => {
    if (divRef.current) {
      gsap.from(divRef.current, {
        opacity: 0,
        y: 50, // Start slightly below
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: divRef.current, // Trigger animation when the card enters the viewport
          start: "top 80%", // Start animation when the top of the card is 80% in view
          toggleActions: "play none none none", // Play animation on enter, reverse on leave
          // toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
        },
      });
    }
  }, []); // Empty dependency array ensures this runs once

  return (
    <div ref={divRef}>
      <img src={src} alt={alt} />
    </div>
  );
};
