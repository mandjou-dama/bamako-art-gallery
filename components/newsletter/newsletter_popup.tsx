"use client";

import React, { useEffect, useState } from "react";
import styles from "./NewsletterPopup.module.css"; // Import CSS module
import { useNewsletterStore } from "@/store/useNewsletter";
import { ToastContainer, toast } from "react-toastify";
import { useTranslations } from "next-intl";

const NewsletterPopup = () => {
  const { hasShown, setHasShown } = useNewsletterStore();
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const t = useTranslations("footer");

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
      toast(t("newsletter.message"));
      setEmail("");
      setIsVisible(false);
      setHasShown(true);
      console.log("Contact created successfully:", result.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("newsletter.error"));
      setEmail("");
      setLoading(false);
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      setIsVisible(!hasShown);
    }
  }, [hasMounted, hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    setHasShown(true);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.newsletterPopup}>
      <div className={styles.newsletterContent}>
        <h2>Newsletter</h2>
        <p>{t("newsletter.popupDescription")}</p>
        <form className={styles.newsletterForm} onSubmit={onSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletter.placeholder")}
            required
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
        <button className={styles.closeBtn} onClick={handleClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default NewsletterPopup;
