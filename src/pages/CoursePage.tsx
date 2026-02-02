import { useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { useCourseFilter } from "../hooks/useCourseFilter";
import { CourseGrid } from "../components/ui/CourseGrid";
import { CourseFilterBar } from "../components/ui/CourseFilterBar";
import { Pagination } from "../components/ui/Pagination";
import { usePagination } from "../hooks/usePagnition";
import { useFilterWithPagination } from "../hooks/useFilterAndPagination";
import { useCourseFilterStore } from "../stores/courseFilterStore";




export default function CourseListPage() {

  const { data, isLoading } = useCourses();
  const { search, setSearch } = useCourseFilterStore();
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [level, setLevel] = useState("");
  const LIMIT = 8;


  // FILTERING

  const filteredCourses = useCourseFilter(data, {
    search,
    category,
    sort,
    level
  });
  
    // PAGINATION
  const { paginatedItems, totalPages } = usePagination(
    filteredCourses,
    page,
    LIMIT
  );

  // reset page khi filter thay đổi
const onSearchChange = useFilterWithPagination(
  setSearch,
  () => setPage(1)
);
const onCategoryChange = useFilterWithPagination(
  setCategory,
  () => setPage(1)
);
const onLevelChange = useFilterWithPagination(
  setLevel,
  () => setPage(1)
);
const onSortChange = useFilterWithPagination(
  setSort,
  () => setPage(1)
);

  return (

    <div className="p-6 space-y-6 sm:space-y-8 md:space-y-10">
      <h1 className="text-2xl font-bold">Danh sách khoá học</h1>
      <div className="header flex justify-between items-center">
      <CourseFilterBar
        search={search}
        setSearch={onSearchChange}
        category={category}
        setCategory={onCategoryChange}
        level={level}
        setLevel={onLevelChange}
        sort={sort}
        setSort={onSortChange}
      />
      {!isLoading && (
        <p className="text-md text-gray-500 mr-10">
          {filteredCourses.length} khoá học được tìm thấy
        </p> )}
      </div>

      <CourseGrid courses={paginatedItems} isLoading={isLoading} />
        <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
}
