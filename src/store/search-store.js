import { create } from "zustand";

export const useSearchStore = create((set) => ({
    searchValue: "a",
    addToSearch: (value) => set({
        searchValue: value
    })
}))