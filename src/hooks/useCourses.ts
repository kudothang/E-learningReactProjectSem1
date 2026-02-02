import { useQuery } from "@tanstack/react-query";
import { courseApi } from "../api/courseApi";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: courseApi.getAll,
    staleTime: Infinity,
  });
}
