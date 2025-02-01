"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

import Logo from "@/public/logo.png";
import "./styles.css";

type Props = {};

const Footer = (props: Props) => {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const t = useTranslations("footer");

  return (
    <div className="footer">
      <div className="separator"></div>
      <div className="footer_elements_wrapper">
        {/* <div className="footer_column logo">
          <Link href={"/"} className="logo">
            <Image width={125} src={Logo} alt="Bamako Art Gallery Logo" />
          </Link>
        </div> */}

        <div className="footer_column infos">
          <div className="footer_row links">
            <div className="footer_row_link_wrapper">
              <div className="footer_row_link_container">
                <p className="footer_headline">{t("liensUtils.message")}</p>
                <Link href="mailto:mandjoudama@gmail.com">
                  {t("liensUtils.contact")}
                </Link>
                <Link href="mailto:mandjoudama@gmail.com">
                  {t("liensUtils.inscription")}
                </Link>
              </div>

              <div>
                <p className="footer_headline">{t("reseaux.message")}</p>
                <div className="footer_icons">
                  <Link href={"instagram"}>
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

                  <Link href={"tiktok"}>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_25_509)">
                        <path
                          d="M26.2232 9.80563V14.6801C24.0314 14.4626 21.9414 13.6471 20.1815 12.3226V17.7601C20.1812 19.2356 19.7652 20.6812 18.9813 21.9313C18.1973 23.1813 17.0771 24.1852 15.749 24.828C14.4208 25.4708 12.9384 25.7265 11.4717 25.5658C10.0049 25.405 8.61314 24.8343 7.45574 23.9191C6.29834 23.0039 5.42216 21.7812 4.92757 20.391C4.43299 19.0008 4.34 17.4994 4.65928 16.0589C4.97855 14.6183 5.69716 13.2968 6.73279 12.2458C7.76842 11.1947 9.07917 10.4567 10.5149 10.1162V15.3434C10.1029 15.6524 9.77681 16.0615 9.56747 16.5319C9.35812 17.0024 9.2725 17.5185 9.31875 18.0314C9.36499 18.5442 9.54156 19.0367 9.83168 19.4621C10.1218 19.8875 10.5159 20.2317 10.9764 20.462C11.437 20.6923 11.9488 20.801 12.4632 20.7779C12.9776 20.7547 13.4775 20.6005 13.9155 20.3298C14.3535 20.0591 14.7151 19.6809 14.9658 19.2311C15.2166 18.7814 15.3482 18.275 15.3482 17.7601V3.86426H20.2818C20.5334 5.34858 21.2405 6.71789 22.305 7.78243C23.3696 8.84698 24.7389 9.55404 26.2232 9.80563Z"
                          stroke="#202217"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_25_509">
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

                  <Link href={"facebook"}>
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

                  <Link href={"snapchat"}>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_25_513)">
                        <path
                          d="M4.47321 19.5255C9.30654 16.9662 9.30654 14.5495 5.68154 10.9245M26.2232 19.5255C21.3899 16.9662 21.3899 14.5495 25.0149 10.9245M21.2473 9.715C21.2473 8.15047 20.6258 6.65001 19.5195 5.54372C18.4132 4.43743 16.9127 3.81592 15.3482 3.81592C13.7837 3.81592 12.2832 4.43743 11.1769 5.54372C10.0706 6.65001 9.44912 8.15047 9.44912 9.715C9.44912 14.8782 9.19175 17.4592 4.47321 19.5243C6.88987 20.59 6.88987 20.59 8.09821 23.1493C11.7232 23.1493 12.9315 25.5659 15.3482 25.5659C17.7649 25.5659 18.9732 23.1493 22.5982 23.1493C23.8065 20.59 23.8065 20.59 26.2232 19.5243C21.5035 17.4592 21.2473 14.8782 21.2473 9.715Z"
                          stroke="#202217"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_25_513">
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

                  <Link href={"linkedin"}>
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
              <form action="" onSubmit={onSubmit}>
                <input
                  type="email"
                  required
                  suppressHydrationWarning
                  placeholder={t("newsletter.placeholder")}
                  autoFocus={false}
                  onFocus={() => ""}
                />
                <button type="submit">
                  {t("newsletter.button")}
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
