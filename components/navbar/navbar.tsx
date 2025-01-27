import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";

import styles from "./styles.module.css";

import Logo from "@/public/logo.png";

type Props = {};

const Navbar = async (props: Props) => {
  const locale = await getLocale();
  const t = await getTranslations("navbar");

  return (
    <nav className={styles.navbar}>
      <div className="logo">
        <Image width={125} src={Logo} alt="Bamako Art Gallery Logo" />
      </div>
      <div className={styles.links_container}>
        <div className={styles.links}>
          <Link href="#">{t("artistes")}</Link>
          <Link href="#">{t("expositions")}</Link>
          <Link href="#">{t("viewingRoom")}</Link>
          <Link href="#">{t("artActu")}</Link>
          <Link href="#">{t("aPropos")}</Link>
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
      <div className={styles.hamburger_menu_container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="menu_icon"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
