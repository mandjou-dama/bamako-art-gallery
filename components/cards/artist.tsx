import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import "./styles.css";

type Props = {
  image: string;
  name: string;
  slug: string;
};

const ArtistCard = ({ image, name, slug }: Props) => {
  return (
    <div className="artist_wrapper">
      <Link scroll={true} href={`/artists/artist/${slug}`}>
        <Image
          width={1260}
          height={750}
          src={
            image ||
            "https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={`${name} cover image`}
        />
      </Link>

      <button>{name || "Kankou fofana"}</button>
    </div>
  );
};

export default ArtistCard;
