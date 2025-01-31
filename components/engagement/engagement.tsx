import React from "react";
import "./styles.css";

type Props = {
  title: string;
  content: string;
};

export const EngagementCard = ({ title, content }: Props) => {
  return (
    <div className="engagement_card">
      <div className="engagement_card_icon">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.5827 43.4495V14.8662"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32.7494 25.0745L36.8327 29.1579L44.9994 20.9912"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M44.9993 12.8245V8.74113C44.9993 8.19965 44.7842 7.68034 44.4014 7.29745C44.0185 6.91457 43.4992 6.69946 42.9577 6.69946H32.7493C30.5834 6.69946 28.5062 7.55988 26.9746 9.09142C25.4431 10.623 24.5827 12.7002 24.5827 14.8661C24.5827 12.7002 23.7223 10.623 22.1907 9.09142C20.6592 7.55988 18.5819 6.69946 16.416 6.69946H6.20768C5.6662 6.69946 5.14689 6.91457 4.76401 7.29745C4.38112 7.68034 4.16602 8.19965 4.16602 8.74113V35.2828C4.16602 35.8243 4.38112 36.3436 4.76401 36.7265C5.14689 37.1094 5.6662 37.3245 6.20768 37.3245H18.4577C20.0821 37.3245 21.6401 37.9698 22.7887 39.1184C23.9374 40.2671 24.5827 41.825 24.5827 43.4495C24.5827 41.825 25.228 40.2671 26.3767 39.1184C27.5253 37.9698 29.0832 37.3245 30.7077 37.3245H42.9577C43.4992 37.3245 44.0185 37.1094 44.4014 36.7265C44.7842 36.3436 44.9993 35.8243 44.9993 35.2828V32.6286"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="engagement_card_infos">
        <h6>{title}</h6>
        <p>{content}</p>
      </div>
    </div>
  );
};
