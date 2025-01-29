import { create } from "zustand";

interface MenuState {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
