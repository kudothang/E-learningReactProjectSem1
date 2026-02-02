import CourseCard from "./CourseCard";
import { type Course } from "../../types/index";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CourseCardSkeleton() {
  return (
    
    <div className="group relative h-120 w-68 overflow-hidden bg-white shadow-md shadow-black/10">
      <div className="thumnail-course h-50 relative">
        <Skeleton height={200} className="w-full" />
        <div className="absolute right-4 top-4">
          <Skeleton width={60} height={24} />
        </div>
        <div className="absolute left-4 top-4">
          <Skeleton width={60} height={24} />
        </div>
      </div>
      <div className="content flex flex-col gap-2 px-6">
        <Skeleton width={80} height={24} className="mt-2" />
        <Skeleton height={24} count={2} />
        <Skeleton width={120} height={20} />
        <div className="flex items-center gap-2">
          <Skeleton width={60} height={24} />
          <Skeleton width={80} height={20} />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton width={100} height={20} />
          <Skeleton width={100} height={20} />
        </div>
        <Skeleton height={48} className="w-full" />
      </div>
    </div>
  );
}

export function CourseGrid({ 
  courses, 
  isLoading,
  limit = 8
}: { 
  courses?: Course[];
  isLoading?: boolean;
  limit?: number;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-x-1 gap-y-5">
        {[...Array(limit)].map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!courses?.length) return <p>Không có khoá học</p>;

  return (
    <div className="grid grid-cols-4 gap-x-1 gap-y-5">
      {courses.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </div>
  );
}
