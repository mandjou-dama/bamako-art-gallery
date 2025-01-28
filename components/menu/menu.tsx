"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useMenuStore } from "@/store/useMenu";

import "./styles.css";

type Props = {};

const Menu = (props: Props) => {
  const t = useTranslations("navbar");
  const { isOpen, setIsOpen } = useMenuStore();
  //@ts-ignore
  const container = useRef<HTMLDivElement>();
  const tl = useRef<gsap.core.Timeline | null>(null);

  const menuLinks = [
    { path: "/", label: t("home") },
    { path: "/", label: t("artistes") },
    { path: "/", label: t("expositions") },
    { path: "/", label: t("viewingRoom") },
    { path: "/", label: t("artActu") },
    { path: "/", label: t("aPropos") },
  ];

  console.log(isOpen);

  useGSAP(
    () => {
      gsap.set(".menu_link_item_holder", { y: 75 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu_overlay", {
          duration: 1.25,
          clipPath: "0% 0%, 100% 0%, 100% 100%, 0% 100%",
          ease: "power4.inOut",
        })
        .to(".menu_link_item_holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
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

          <div onClick={() => setIsOpen()}>
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
              className="close_menu"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </div>
        </div>

        <div className="links_container">
          {menuLinks.map((link, index) => (
            <div className="menu_link_item" key={index}>
              <div className="menu_link_item_holder">
                <Link className="menu_link" href={link.path}>
                  {link.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
