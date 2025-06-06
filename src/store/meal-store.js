import { create } from "zustand";

export const useMealStore = create((set) => ({
  meal: JSON.parse(localStorage.getItem("meal")) || null,
  addToMeal: (item) => {
    localStorage.setItem("meal", JSON.stringify(item));
    set({ meal: item });
  },
}));