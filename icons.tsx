import * as React from "react";
import { SVGProps } from "react";

export const Clock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    className="lucide lucide-clock"
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const Location = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    className="lucide lucide-map-pinned"
    {...props}
  >
    <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
    <circle cx={12} cy={8} r={2} />
    <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
  </svg>
);

export const Phone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    className="lucide lucide-phone-call"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92zM14.05 2a9 9 0 0 1 8 7.94M14.05 6A5 5 0 0 1 18 10" />
  </svg>
);

export const Mail = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    className="lucide lucide-mail"
    {...props}
  >
    <rect width={20} height={16} x={2} y={4} rx={2} />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const Instagram = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <g stroke="#202217">
      <path d="M5.682 9.906a4.833 4.833 0 0 1 4.833-4.833h9.666a4.833 4.833 0 0 1 4.834 4.833v9.667a4.833 4.833 0 0 1-4.834 4.833h-9.666a4.833 4.833 0 0 1-4.833-4.833V9.906Z" />
      <path d="M11.723 14.74a3.625 3.625 0 1 0 7.25 0 3.625 3.625 0 0 0-7.25 0ZM20.786 9.302v.011" />
    </g>
  </svg>
);

export const Facebook = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <path
      stroke="#202217"
      d="M9.307 12.323v4.833h3.624v8.458h4.834v-8.458h3.625l1.208-4.833h-4.833V9.906a1.208 1.208 0 0 1 1.208-1.208h3.625V3.864h-3.625a6.042 6.042 0 0 0-6.041 6.042v2.417H9.306Z"
    />
  </svg>
);

export const Twitter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 25 25"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    {...props}
  >
    <path stroke="none" d="M0 0h30v30H0z" />
    <path d="m5 5 14.667 20H25L10.333 5zM5 25l8.46-8.46m3.077-3.077L25 5" />
  </svg>
);

export const LinkedIn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <g stroke="#202217">
      <path d="M10.515 13.53v6.042M10.515 9.906v.011M15.348 19.572v-6.041M20.181 19.572v-3.625a2.417 2.417 0 0 0-4.833 0" />
      <path d="M4.473 8.698a4.833 4.833 0 0 1 4.834-4.834H21.39a4.833 4.833 0 0 1 4.833 4.834V20.78a4.833 4.833 0 0 1-4.833 4.833H9.307a4.833 4.833 0 0 1-4.834-4.833V8.698Z" />
    </g>
  </svg>
);
