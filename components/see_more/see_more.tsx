import React from "react";
import { Link } from "@/i18n/routing";

type Props = {
  message: string;
  link?: string;
};

function SeeMore({ message, link }: Props) {
  return (
    <Link
      href={link ? link : ""}
      style={{
        display: "flex",
        alignItems: "center",
        textTransform: "uppercase",
        fontSize: "14px",
        fontWeight: "300",
        gap: "5px",
      }}
    >
      {message}
      <svg
        style={{
          width: "14px",
          height: "14px",
        }}
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
    </Link>
  );
}

export default SeeMore;
