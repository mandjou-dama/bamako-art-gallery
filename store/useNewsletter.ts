import { create } from "zustand";

interface NewsletterState {
  isVisible: boolean;
  dismissNewsletter: () => void;
}

const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

export const useNewsletterStore = create<NewsletterState>((set) => {
  let isVisible = false;

  if (typeof window !== "undefined") {
    const lastShown = localStorage.getItem("newsletter_last_shown");
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown, 10) > THREE_DAYS) {
      isVisible = true;
    }
  }

  return {
    isVisible,
    dismissNewsletter: () => {
      localStorage.setItem("newsletter_last_shown", Date.now().toString());
      set({ isVisible: false });
    },
  };
});
