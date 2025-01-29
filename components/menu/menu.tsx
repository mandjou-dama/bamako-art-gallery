"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useMenuStore } from "@/store/useMenu";

import "./styles.css";

type Props = {};

const Menu = (props: Props) => {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const { isOpen, setIsOpen } = useMenuStore();
  //@ts-ignore
  const container = useRef<HTMLDivElement>();
  const tl = useRef<gsap.core.Timeline | null>(null);

  const menuLinks = [
    { path: "/", label: t("home") },
    { path: "/artists", label: t("artistes") },
    { path: "/expositions", label: t("expositions") },
    { path: "/viewing-room", label: t("viewingRoom") },
    { path: "/art-actu", label: t("artActu") },
    { path: "/about", label: t("aPropos") },
  ];

  console.log(isOpen);

  useGSAP(
    () => {
      gsap.set(".menu_link_item_holder", { y: 75 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu_overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu_link_item_holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        })
        .to(".hamburger_separator", {
          duration: 1,
          width: "100%",
          delay: -0.65,
        })
        .to(".hamburger_menu_link_item_holder", {
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.55,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isOpen) {
      tl.current && tl.current.play();
    } else {
      tl.current && tl.current.reverse();
    }
  }, [isOpen]);

  return (
    <div className="menu_wrapper" ref={container}>
      <div className="menu_overlay">
        <div className="header">
          <div></div>

          <div className="hamburger_close_menu_container" onClick={setIsOpen}>
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
              className="hamburger_close_menu"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </div>
        </div>

        <div className="hamburger_links_container">
          {menuLinks.map((link, index) => (
            <div className="menu_link_item" key={index}>
              <div className="menu_link_item_holder">
                <Link
                  onClick={setIsOpen}
                  className="menu_link"
                  href={link.path}
                >
                  {link.label}
                </Link>
              </div>
            </div>
          ))}

          <div className="hamburger_separator"></div>

          <div className="hamburger_lang_container">
            <div className="hamburger_menu_link_item_holder">
              <button
                className={
                  locale === "fr"
                    ? "hamburger_lang_button_active"
                    : "hamburger_lang_button_inactive"
                }
              >
                fr
              </button>
            </div>

            <div className="hamburger_menu_link_item_holder">
              <button
                className={
                  locale === "en"
                    ? "hamburger_lang_button_active"
                    : "hamburger_lang_button_inactive"
                }
              >
                en
              </button>
            </div>
          </div>
        </div>

        <div className="hamburger_menu_footer"></div>
      </div>
    </div>
  );
};

export default Menu;
