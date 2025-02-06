"use client";

import React, { useEffect, useState } from "react";
import styles from "./NewsletterPopup.module.css"; // Import CSS module
import { useNewsletterStore } from "@/store/useNewsletter";

const NewsletterPopup = () => {
  const { hasShown, setHasShown } = useNewsletterStore();
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <p>
          Ne manquez rien de l’actualité artistique ! Inscrivez-vous à notre
          newsletter pour découvrir en avant-première nos expositions, artistes
          et événements spéciaux
        </p>
        <form className={styles.newsletterForm} onSubmit={handleSubmit}>
          <input type="email" placeholder="Votre adresse email" required />
          <button type="submit">S'inscrire</button>
        </form>
        <button className={styles.closeBtn} onClick={handleClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default NewsletterPopup;
