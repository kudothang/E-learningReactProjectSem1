import { create } from "zustand";

interface CourseFilterState {
  search: string;
  setSearch: (value: string) => void;
  resetSearch: () => void;

}

export const useCourseFilterStore = create<CourseFilterState>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
  resetSearch: () =>set({ search: "" }),
}));
