import React from "react";
import Image from "next/image";
import { getLocale, getMessages } from "next-intl/server";

import styles from "./styles.module.css";

import Logo from "@/public/logo.png";

type Props = {};

const Navbar = async (props: Props) => {
  const locale = await getLocale();
  const messages = await getMessages();

  console.log(locale);

  return (
    <nav className={styles.navbar}>
      <div className="logo">
        <Image width={125} src={Logo} alt="Bamako Art Gallery Logo" />
      </div>
      <div className={styles.links_container}>
        <div className={styles.links}>
          <a href="#">Artistes</a>
          <a href="#">Expositions</a>
          <a href="#">Viewing Room</a>
          <a href="#">Art'Actu</a>
          <a href="#">À propos</a>
        </div>

        <div className={styles.lang_container}>
          <button className={locale === "fr" ? styles.lang_button_active : ""}>
            fr
          </button>
          <button>en</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
