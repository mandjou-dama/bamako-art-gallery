import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

import "./styles.css";

export const SmallCard = async ({
  subline,
  image,
  name,
  link,
  hideCategory = false,
}: {
  subline?: string;
  name?: string;
  image?: any;
  link?: string;
  hideCategory?: boolean;
}) => {
  const local = await getLocale();

  return (
    <div className="small_card">
      <Link scroll={true} href={link ? link : ""}>
        <div className="small_card_image_container">
          <Image
            width={1260}
            height={750}
            src={
              image ||
              "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt=""
          />
        </div>

        <div className="small_card_footer">
          {!hideCategory && (
            <p className="small_card_footer_headline">
              {subline ? subline : "Catégorie"}
            </p>
          )}
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

        <p className="small_card_footer_name">
          {name ? name : "Lorem ipsum, dolor sit amet consectetur adipisicing."}
        </p>

        <div className="separator"></div>
      </Link>
    </div>
  );
};
