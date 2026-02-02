import { useDeferredValue, useMemo } from "react";
import { type Course } from "../types/index";
import { removeDiacritics } from "../utils/removeDiacritics.";
import { useCourseFilterStore } from "../stores/courseFilterStore";


interface Params {
  search: string;
  category: string;
  sort: string;
  level: string;
}

//Lọc khoá học trong list khoá học
export function useCourseFilter(
  courses: Course[] | undefined,
  params: Params
) {
  const search = useCourseFilterStore((s) => s.search);
  const category = useDeferredValue(params.category);
  const sort = useDeferredValue(params.sort);
  const level = useDeferredValue(params.level);


  return useMemo(() => {
    if (!courses) return [];
    const nomarlizedSearch = removeDiacritics(search);
    let result = [...courses];
    
    
    if (nomarlizedSearch) {
      result = result.filter((c) =>
        removeDiacritics(c.title).includes(nomarlizedSearch) ||
        removeDiacritics(c.instructor).includes(nomarlizedSearch)
      ); 
    }

    if (category) {
      result = result.filter((c) => c.category.toLowerCase() === category.toLowerCase());
    }

    if (level) {
      result = result.filter((c) => c.level.toLowerCase() === level.toLowerCase());
    }

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [courses, search, category, sort, level]);
}

// Suggestion với 5 kết quả
const MAX_RESULTS = 5;

export function useCourseSuggestions(courses: Course[] = []) {
  const search = useCourseFilterStore((s) => s.search);

  return useMemo(() => {
    if (!search) return [];

    const keyword = removeDiacritics(search.toLowerCase());

    return courses
      .filter(
        (course) =>
          removeDiacritics(course.title.toLowerCase()).includes(keyword) ||
          removeDiacritics(course.instructor.toLowerCase()).includes(keyword)
      )
      .slice(0, MAX_RESULTS);
  }, [courses, search]);
}
