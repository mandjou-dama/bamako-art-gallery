import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NewsletterStore {
  hasShown: boolean;
  setHasShown: (hasShown: boolean) => void;
}

export const useNewsletterStore = create<NewsletterStore>()(
  persist(
    (set) => ({
      hasShown: false,
      setHasShown: (hasShown) => set({ hasShown }),
    }),
    {
      name: "newsletter-storage", // unique name for the storage
      storage: createJSONStorage(() => localStorage), // or sessionStorage
    }
  )
);
