import { getTranslations } from "next-intl/server";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import "./page.css";

export default async function Page() {
  const t = await getTranslations("artistes.hero");

  return (
    <div className="works_page">
      <div className="works_hero">
        <div className="works_hero_infos">
          <h4>Oeuvres peinture</h4>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
            culpa quis reiciendis. Cumque voluptas facilis sint.
          </p>
        </div>
        <div className="separator"></div>
      </div>

      <div className="works_wrapper">
        <Link href={"/works/erer"}>
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </Link>
        <Link href={"/works/erer"}>
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </Link>
        <Link href={"/works/erer"}>
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </Link>
        <Link href={"/works/erer"}>
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </Link>
        <Link href={"/works/erer"}>
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </Link>
        <Link href={"/works/erer"}>
          <Image
            width={1260}
            height={750}
            src="https://images.pexels.com/photos/14867613/pexels-photo-14867613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}
