import { create } from "zustand";

export const useCategoryStore = create((set) =>({
    category: "",
    addToCategory: (value) => set({category: value}),
    removeFromCategory: () => set({category: ""})
}))