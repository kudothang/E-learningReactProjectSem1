import { BookOpen, User } from "lucide-react";

type CourseCardProps = {
  image: string;
};

export default function CourseCard({ image }: CourseCardProps) {
  return (
    <div className="group relative h-115 w-68 overflow-hidden bg-white shadow-md shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg hover:shadow-black/20">
      <div className="absolute transition-opacity duration-300  hover:">
        <div className="thumnail-course h-50  transition-opacity duration-300 ">
            <img src={image} alt="" className="h-full w-full object-cover cursor-pointer" />
            <span className="absolute right-4 top-4 rounded-lg bg-orange-400 px-3 py-1 text-sm font-semibold text-white">
             15 Weeks
            </span>
         </div>
        <div className="content flex flex-col gap-2 px-6 ">
       
        <h1 className="mt-2 px-2 rounded-md w-fit bg-emerald-100  text-sm font-medium text-emerald-600">
          Beginner
        </h1>

        <h3 className="title  text-xl font-semibold cursor-pointer hover:text-green-500">
          Starting SEO as your Home Based Business
        </h3>
        <h3 className=" text-sm text-gray-500">
         Instructors: <span className="font-semibold">Jessica Brown</span>
        </h3>
        <div className=" text-xl font-bold text-rose-500">$30</div>

        <div className=" flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            11 Lessons
          </div>
          <div className="flex items-center gap-2">
            <User size={18} />
            227 Students
          </div>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-rose-500 py-3 font-semibold text-white hover:bg-green-500 cursor-pointer">
              Enroll Now →
        </button>
        </div>
      </div>
    </div>
  );
}
