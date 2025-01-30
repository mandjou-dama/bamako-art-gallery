"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useMenuStore } from "@/store/useMenu";

import styles from "./styles.module.css";

import Logo from "@/public/logo.png";

type NavLink = {
  href: string;
  key: string;
  label: string;
};

const Navbar = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navbar");
  const { setIsOpen } = useMenuStore();

  // Define navigation links
  const navLinks: NavLink[] = useMemo(
    () => [
      { href: "/artists", key: "artistes", label: t("artistes") },
      { href: "/expositions", key: "expositions", label: t("expositions") },
      { href: "/viewing-room", key: "viewingRoom", label: t("viewingRoom") },
      { href: "/art-actu", key: "artActu", label: t("artActu") },
      { href: "/about", key: "aPropos", label: t("aPropos") },
    ],
    [t]
  );

  // Check if a link is active based on the current pathname
  const isActive = (href: string) => pathname.includes(href);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_wrapper}>
        <Link href="/" className="logo">
          <Image width={125} src={Logo} alt="Bamako Art Gallery Logo" />
        </Link>
        <div className={styles.links_container}>
          <div className={styles.links}>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                style={{
                  fontWeight: isActive(link.href) ? "500" : "200",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.lang_container}>
            {["fr", "en"].map((lang) => (
              <button
                key={lang}
                className={
                  locale === lang
                    ? styles.lang_button_active
                    : styles.lang_button_inactive
                }
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Hamburger menu */}
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

export default React.memo(Navbar);
