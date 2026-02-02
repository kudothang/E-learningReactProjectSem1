import { BookOpen, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router";
import type { Course } from "../../types";
import { formatPriceVn } from "../../utils/Format";


type CourseCardProps = {
  course?: Course;
};

const CourseCard = function CourseCard({ course }: CourseCardProps) {
 
            
  return (
    <div className="group relative h-120 w-72 overflow-hidden bg-white shadow-md shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg hover:shadow-black/20">
      <div className="absolute transition-opacity duration-300 hover:">
        <div className="thumnail-course h-50 transition-opacity duration-300 relative">
           <Link
            to={`/courses/${course?.id}`}>
          <img
            src={course?.image}
            alt={course?.title}
            className="h-50 w-full object-cover cursor-pointer"
            loading="lazy"
            decoding="async"
          />
          </Link>
          <span className="absolute right-4 top-4 rounded-lg bg-orange-400 px-3 py-1 text-sm font-semibold text-white">
            {course?.duration}
          </span>
          {course?.badge && (
            <span className="absolute left-4 top-4 rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white">
              {course.badge}
            </span>
          )}
        </div>
        <div className="content flex flex-col gap-2 px-6">
          <h1
            className={`mt-2 px-2 rounded-md w-fit text-sm font-medium bg-emerald-600 text-white `}
          >
            {course?.level}
          </h1>
          <Link
            to={`/courses/${course?.id}`}>
            <h3 className="title text-xl font-semibold cursor-pointer hover:text-green-500 line-clamp-2">
              {course?.title}
            </h3>
          </Link>
          <h3 className="text-sm text-gray-500 max-w-full truncate">
            Instructors: <span className="font-semibold">{course?.instructor}</span>
          </h3>
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold text-green-500">{formatPriceVn(course?.price || 0)}</div>
            <span className="text-sm line-through text-gray-400">
              {formatPriceVn(course?.originalPrice || 0)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2"> 
              <BookOpen size={18} />
              {course?.lessons} Lessons
            </div>
            <div className="flex items-center gap-2">
              <User size={18} />
              {course?.students} Students
            </div>
          </div>
          <div className="cart-buy flex gap-2 truncate mt-2">
          <Link
            to={`/courses/${course?.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-400 p-2 font-semibold text-white text-sm hover:bg-green-600 cursor-pointer transition-colors"
          >
            Đăng ký ngay
          </Link>
          <Link
            to={`/courses/${course?.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-400 p-2 font-semibold text-white text-sm hover:bg-green-600 cursor-pointer transition-colors"
          >
            Thêm giỏ hàng <ShoppingCart size={14}/>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
