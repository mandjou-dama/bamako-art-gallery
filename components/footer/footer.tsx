"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

import "./styles.css";

type Props = {};

const Footer = (props: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("/api/brevo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setLoading(false);
      setEmail("");
      console.log("Contact created successfully:", result.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setEmail("");
    }
  };

  const t = useTranslations("footer");

  return (
    <div className="footer">
      <div className="separator"></div>
      <div className="footer_elements_wrapper">
        <div className="footer_column infos">
          <div className="footer_row links">
            <div className="footer_row_link_wrapper">
              <div className="footer_row_link_container">
                <p className="footer_headline">{t("liensUtils.message")}</p>
                <Link href="mailto:contact@bamakoartgallery.com">
                  contact@bamakoartgallery.com
                </Link>
                <Link href={"tel:+22366667932"}>+223 66667932</Link>
                <Link href="mailto:contact@bamakoartgallery.com">
                  {t("liensUtils.inscription")}
                </Link>
              </div>

              <div>
                <p className="footer_headline">{t("reseaux.message")}</p>
                <div className="footer_icons">
                  <Link
                    target="_blank"
                    href={
                      "https://www.instagram.com/bamakoart?igsh=MWV5MXVyOHVkcGtoNw=="
                    }
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_25_503)">
                        <path
                          d="M5.68155 9.90609C5.68155 8.62421 6.19077 7.39483 7.0972 6.4884C8.00363 5.58198 9.233 5.07275 10.5149 5.07275H20.1815C21.4634 5.07275 22.6928 5.58198 23.5992 6.4884C24.5057 7.39483 25.0149 8.62421 25.0149 9.90609V19.5728C25.0149 20.8546 24.5057 22.084 23.5992 22.9904C22.6928 23.8969 21.4634 24.4061 20.1815 24.4061H10.5149C9.233 24.4061 8.00363 23.8969 7.0972 22.9904C6.19077 22.084 5.68155 20.8546 5.68155 19.5728V9.90609Z"
                          stroke="#202217"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.7232 14.7393C11.7232 15.7007 12.1051 16.6227 12.7849 17.3025C13.4648 17.9823 14.3868 18.3643 15.3482 18.3643C16.3096 18.3643 17.2316 17.9823 17.9115 17.3025C18.5913 16.6227 18.9732 15.7007 18.9732 14.7393C18.9732 13.7778 18.5913 12.8558 17.9115 12.176C17.2316 11.4962 16.3096 11.1143 15.3482 11.1143C14.3868 11.1143 13.4648 11.4962 12.7849 12.176C12.1051 12.8558 11.7232 13.7778 11.7232 14.7393Z"
                          stroke="#202217"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20.7857 9.30176V9.31301"
                          stroke="#202217"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_25_503">
                          <rect
                            width="29"
                            height="29"
                            fill="white"
                            transform="translate(0.848206 0.239258)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>

                  <Link
                    target="_blank"
                    href={"https://www.facebook.com/share/1BKiE6QFT4/"}
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_25_499)">
                        <path
                          d="M9.30655 12.3226V17.1559H12.9315V25.6143H17.7649V17.1559H21.3899L22.5982 12.3226H17.7649V9.90592C17.7649 9.58545 17.8922 9.27811 18.1188 9.0515C18.3454 8.8249 18.6527 8.69759 18.9732 8.69759H22.5982V3.86426H18.9732C17.3709 3.86426 15.8341 4.50079 14.7011 5.63382C13.5681 6.76685 12.9315 8.30357 12.9315 9.90592V12.3226H9.30655Z"
                          stroke="#202217"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_25_499">
                          <rect
                            width="29"
                            height="29"
                            fill="white"
                            transform="translate(0.848206 0.239258)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>

                  <Link
                    target="_blank"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    href={
                      "https://x.com/ArtBamako?t=OwuHjyTuEF0eSe_dbo_ruQ&s=08"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      stroke="#202217"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                    </svg>
                  </Link>

                  <Link
                    target="_blank"
                    href={
                      "https://www.linkedin.com/company/bamako-art-gallery/"
                    }
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_25_517)">
                        <path
                          d="M10.5149 13.5308V19.5724"
                          stroke="#202217"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.5149 9.90576V9.91701"
                          stroke="#202217"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.3482 19.5724V13.5308"
                          stroke="#202217"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20.1815 19.5724V15.9474C20.1815 15.3065 19.9269 14.6918 19.4737 14.2386C19.0205 13.7854 18.4058 13.5308 17.7649 13.5308C17.1239 13.5308 16.5092 13.7854 16.056 14.2386C15.6028 14.6918 15.3482 15.3065 15.3482 15.9474"
                          stroke="#202217"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.47321 8.69759C4.47321 7.41571 4.98243 6.18633 5.88886 5.27991C6.79528 4.37348 8.02466 3.86426 9.30654 3.86426H21.3899C22.6718 3.86426 23.9011 4.37348 24.8076 5.27991C25.714 6.18633 26.2232 7.41571 26.2232 8.69759V20.7809C26.2232 22.0628 25.714 23.2922 24.8076 24.1986C23.9011 25.105 22.6718 25.6143 21.3899 25.6143H9.30654C8.02466 25.6143 6.79528 25.105 5.88886 24.1986C4.98243 23.2922 4.47321 22.0628 4.47321 20.7809V8.69759Z"
                          stroke="#202217"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_25_517">
                          <rect
                            width="29"
                            height="29"
                            fill="white"
                            transform="translate(0.848206 0.239258)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="footer_newsletter_wrapper">
              <p className="footer_headline">Newsletter</p>
              <form method="POST" onSubmit={onSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  suppressHydrationWarning
                  placeholder={t("newsletter.placeholder")}
                  autoFocus={false}
                />
                <button disabled={loading} type="submit">
                  {loading ? t("newsletter.loading") : t("newsletter.button")}

                  {!loading ? (
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
                  ) : (
                    <div className="loader loader--style3" title="2">
                      <svg
                        version="1.1"
                        id="loader-1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="40px"
                        height="40px"
                        viewBox="0 0 50 50"
                      >
                        <path
                          fill="#000"
                          d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                        >
                          <animateTransform
                            attributeType="xml"
                            attributeName="transform"
                            type="rotate"
                            from="0 25 25"
                            to="360 25 25"
                            dur="0.6s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </svg>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="footer_row copyright">
            <p>{t("copyright.message")}</p>
            <div>
              <Link href={""}>{t("copyright.mention")}</Link>
              <Link href={""}>{t("copyright.cookies")}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
