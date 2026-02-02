import { create } from "zustand";
import { type Course } from "../types/index";

type CartState = {
  items: Course[];
  add: (course: Course) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  add: (course) =>
    set((state) => ({ items: [...state.items, course] })),
}));
