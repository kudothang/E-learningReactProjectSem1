import { useMemo } from "react";

export function usePagination<T>(
  items: T[],
  page: number,
  limit: number
) {
  return useMemo(() => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / limit);

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedItems = items.slice(start, end);

    return {
      paginatedItems,
      totalItems,
      totalPages,
    };
  }, [items, page, limit]);
}
