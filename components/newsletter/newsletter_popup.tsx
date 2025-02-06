"use client";

import React from "react";
import styles from "./NewsletterPopup.module.css"; // Import CSS module

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleClose = () => {
    setIsVisible(false); // Hide the popup
    console.log("Popup closed");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log("Form submitted");
    setIsVisible(false); // Hide the popup
  };

  // If the popup is not visible, return null (don't render anything)
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
