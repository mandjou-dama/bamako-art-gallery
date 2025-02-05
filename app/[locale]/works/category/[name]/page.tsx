import { getTranslations } from "next-intl/server";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import "./page.css";

const categoryDesc = [
  {
    category: "photographie",
    description: "photographie",
  },
  {
    category: "design",
    description: "design",
  },
  {
    category: "sculpture",
    description: "sculpture",
  },
  {
    category: "peinture",
    description: "peinture",
  },
];

type Params = Promise<{ name: string }>;

export default async function Page({ params }: { params: Params }) {
  const t = await getTranslations("artistes.hero");

  const { name } = await params;
  const categoryDescription = categoryDesc.find((el) => name === el.category);

  console.log(name);

  return (
    <div className="works_page">
      <div className="works_hero">
        <div className="works_hero_infos">
          <h4>Oeuvres en {name}</h4>
          <p>{categoryDescription?.description}</p>
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
