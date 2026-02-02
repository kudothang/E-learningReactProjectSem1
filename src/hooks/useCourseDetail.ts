import { useQuery } from "@tanstack/react-query";
import { courseApi } from "../api/courseApi";

export function useCourseDetail(id: string) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => courseApi.getById(id),
    enabled: !!id,
  });
}
