"use client"; // Ensure this is a client component

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { urlFor } from "@/sanity/lib/image";
import { Link } from "@/i18n/routing";

type Props = {
  slides: {
    link: string;
    image: string;
    name: string;
    year: number;
  }[];
};

const Slider = ({ slides }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play configuration
  const autoPlayDelay = 10000; // 5 seconds

  // GSAP animation for fade effect
  useGSAP(() => {
    if (sliderRef.current) {
      const slides = sliderRef.current.children;
      gsap.set(slides, { opacity: 0.8 }); // Start with all slides hidden

      // Fade in the current slide
      gsap.to(slides[currentSlide], {
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      });

      // Fade out the previous slide
      if (currentSlide > 0) {
        gsap.to(slides[currentSlide - 1], {
          opacity: 0.8,
          duration: 1,
          ease: "power4.inOut",
        });
      } else {
        gsap.to(slides[slides.length - 1], {
          opacity: 0.8,
          duration: 1,
          ease: "power4.inOut",
        });
      }
    }
  }, [currentSlide]);

  // Start auto-play
  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear existing interval
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayDelay);
  };

  // Initialize auto-play on mount
  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length]);

  // Handle next slide
  const slideToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startAutoPlay(); // Reset auto-play delay
  };

  // Handle previous slide
  const slideToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    startAutoPlay(); // Reset auto-play delay
  };

  return (
    <div className="home_hero_slider_container" ref={sliderRef}>
      {slides.map((slide, index) => (
        <Link key={index} href={slide.link}>
          <div
            className="home_hero_slider"
            style={{ display: index === currentSlide ? "flex" : "none" }}
          >
            {/* <img src={urlFor(slide.image).url()} alt={slide.name} /> */}
            <img src={slide.image} alt={slide.name} />
            <div className="home_hero_slider_overlay"></div>

            <div className="hero_slider_footer">
              <h3 className="hero_slider_expo_name">{slide.name}</h3>

              <div className="hero_slider_footer_infos">
                <p className="hero_slider_expo_date">{slide.year}</p>

                <div className="hero_slider_footer_arrows">
                  <svg
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      slideToPrev();
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-move-left"
                  >
                    <path d="M6 8L2 12L6 16" />
                    <path d="M2 12H22" />
                  </svg>

                  <svg
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      slideToNext();
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-move-right"
                  >
                    <path d="M18 8L22 12L18 16" />
                    <path d="M2 12H22" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Slider;
