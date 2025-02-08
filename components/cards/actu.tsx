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
};

import "./styles.css";

const ActuCard = async ({ link, image, journal, title }: Props) => {
  const t = await getTranslations("components");

  return (
    <Link target="_blank" href={link ? link : ""} className="actu_card">
      <Image
        width={1260}
        height={750}
        src={urlFor(image).auto("format").width(300).url()}
        alt=""
      />

      <div className="actu_card_infos">
        <div>
          <p className="actu_card_info_subline">{journal || "Jeune Afrique"}</p>
          <p className="actu_card_info_title">{title || "Titre"}</p>
        </div>

        <div className="actu_card_link_wrapper">
          <div className="actu_card_link_text">
            <p>{t("actuCard.link")}</p>
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
