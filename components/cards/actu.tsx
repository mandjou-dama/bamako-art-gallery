import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

import "./styles.css";

const ActuCard = (props: Props) => {
  return (
    <Link href={""} className="actu_card">
      <Image
        width={1260}
        height={750}
        src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />

      <div className="actu_card_infos">
        <div>
          <p className="actu_card_info_subline">Jeune Afrique</p>
          <p className="actu_card_info_title">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatem, earum.
          </p>
        </div>

        <div className="actu_card_link_wrapper">
          <div className="actu_card_link_text">
            <p>Lire l'article</p>
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
