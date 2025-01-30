import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import "./styles.css";

type Props = {};

const ArtistCard = (props: Props) => {
  return (
    <div className="artist_wrapper">
      <Link href={"/artist"}>
        <Image
          width={1260}
          height={750}
          src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </Link>

      <button>Kankou fofana</button>
    </div>
  );
};

export default ArtistCard;
