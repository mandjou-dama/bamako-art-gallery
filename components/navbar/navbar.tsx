"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useMenuStore } from "@/store/useMenu";

import styles from "./styles.module.css";

import Logo from "@/public/logo.png";

type Props = {};

const Navbar = (props: Props) => {
  const locale = useLocale();
  const t = useTranslations("navbar");
  const { setIsOpen } = useMenuStore();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_wrapper}>
        <Link href={"/"} className="logo">
          <Image width={125} src={Logo} alt="Bamako Art Gallery Logo" />
        </Link>
        <div className={styles.links_container}>
          <div className={styles.links}>
            <Link href="/artists">{t("artistes")}</Link>
            <Link href="/expositions">{t("expositions")}</Link>
            <Link href="/viewing-room">{t("viewingRoom")}</Link>
            <Link href="/art-actu">{t("artActu")}</Link>
            <Link href="/about">{t("aPropos")}</Link>
          </div>

          <div className={styles.lang_container}>
            <button
              className={
                locale === "fr"
                  ? styles.lang_button_active
                  : styles.lang_button_inactive
              }
            >
              fr
            </button>
            <button
              className={
                locale === "en"
                  ? styles.lang_button_active
                  : styles.lang_button_inactive
              }
            >
              en
            </button>
          </div>
        </div>

        {/* hamburger menu */}
        <div onClick={setIsOpen} className={styles.hamburger_menu_container}>
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
            className="menu_icon"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
