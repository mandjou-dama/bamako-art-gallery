import React from "react";
import Image from "next/image";
import Link from "next/link";

import "./styles.css";

export const SmallCard = ({
  subline,
  image,
  name,
}: {
  subline?: string;
  name?: string;
  image?: string;
}) => {
  return (
    <div className="small_card">
      <Link href={"/"}>
        <Image
          width={1260}
          height={750}
          src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />

        <div className="small_card_footer">
          <p className="small_card_footer_headline">Catégorie</p>
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
          Lorem ipsum, dolor sit amet consectetur adipisicing.
        </p>

        <div className="separator"></div>
      </Link>
    </div>
  );
};
