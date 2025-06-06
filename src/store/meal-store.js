import { create } from "zustand";

export const useMealStore = create((set) => ({
    meal: "",
    photo: "",

})) 