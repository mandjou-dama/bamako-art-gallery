import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  link?: string;
  image?: any;
  journal?: string;
  title?: string;
  notArticle?: boolean;
};

import "./styles.css";

const ActuCard = async ({ link, image, journal, title, notArticle }: Props) => {
  const t = await getTranslations("components");

  return (
    <Link target="_blank" href={link ? link : ""} className="actu_card">
      <img src={urlFor(image).auto("format").width(300).url()} alt={title} />

      <div className="actu_card_infos">
        <div>
          {journal && <p className="actu_card_info_subline">{journal}</p>}
          <p className="actu_card_info_title">{title}</p>
        </div>

        <div className="actu_card_link_wrapper">
          <div className="actu_card_link_text">
            <p>{!notArticle ? t("actuCard.link2") : t("actuCard.link")}</p>
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
          <div className="separator"></div>
        </div>
      </div>
    </Link>
  );
};

export default ActuCard;
