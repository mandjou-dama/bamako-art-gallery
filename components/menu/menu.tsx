"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import styles from "./styles.module.css";

type Props = {};

const Menu = (props: Props) => {
  const t = useTranslations("navbar");

  const menuLinks = [
    { path: "/", label: t("home") },
    { path: "/", label: t("artistes") },
    { path: "/", label: t("expositions") },
    { path: "/", label: t("viewingRoom") },
    { path: "/", label: t("artActu") },
    { path: "/", label: t("aPropos") },
  ];

  const container = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return <div ref={container} className={styles.menu_container}></div>;
};

export default Menu;
