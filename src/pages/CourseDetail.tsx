import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BookOpen, Users, BarChart3, Globe, Award, Clock } from "lucide-react";
import type { CurriculumItem } from "../types";
import { useCourseDetail } from "../hooks/useCourseDetail";


export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading, error } = useCourseDetail(id || "");
 

  if (error) return <div className="p-8">Error loading course details</div>;
  if (!course && !isLoading) return <div className="p-8">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden bg-gray-900">
        {isLoading ? (
          <Skeleton height={384} />
        ) : (
          <>
            <img
              src={course?.image}
              alt={course?.title}
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/60 to-transparent p-8">
              <div className="max-w-4xl">
                <h1 className="text-4xl font-bold text-white mb-4">{course?.title}</h1>
                <div className="flex flex-wrap gap-4 text-white">
                  <span className="inline-block rounded-lg bg-emerald-600 px-3 py-1 text-sm font-medium">
                    {course?.level}
                  </span>
                  {course?.badge && (
                    <span className="inline-block rounded-lg bg-red-500 px-3 py-1 text-sm font-medium">
                      {course?.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-6xl px-8 py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Course Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About this course</h2>
              {isLoading ? (
                <Skeleton count={3} />
              ) : (
                <p className="text-gray-700 leading-relaxed">{course?.description}</p>
              )}
            </div>

            {/* Instructor */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-4">Instructor</h2>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton circle height={64} width={64} />
                  <Skeleton count={2} />
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                    <Users size={24} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{course?.instructor}</h3>
                    <p className="text-gray-600">{course?.instructorRole}</p>
                  </div>
                </div>
              )}
            </div>

            {/* What You'll Learn */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              {isLoading ? (
                <Skeleton count={4} />
              ) : (
                <ul className="grid grid-cols-2 gap-4">
                  {course?.whatYouLearn?.map((item: string, index: number) => (
                    <li key={index} className="flex gap-3 text-gray-700">
                      <span className="text-green-500 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Requirements */}
            {!isLoading && course?.requirements && course.requirements.length > 0 && (
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {course.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex gap-3 text-gray-700">
                      <span className="text-gray-400">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Curriculum */}
            {!isLoading && course?.curriculum && course.curriculum.length > 0 && (
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
                <div className="space-y-3">
                  {course.curriculum.map((item:CurriculumItem, index:number) => (
                    <div key={index} className="flex items-start gap-4 rounded-lg border p-4 hover:bg-gray-50">
                      <Clock size={20} className="text-green-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.type} • {item.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
              {/* Price */}
              {isLoading ? (
                <div className="space-y-4 mb-8">
                  <Skeleton height={40} />
                  <Skeleton height={20} />
                </div>
              ) : (
                <div className="mb-8">
                  <div className="mb-2 text-3xl font-bold text-rose-500">${course?.price}</div>
                  <span className="text-sm line-through text-gray-400">${course?.originalPrice}</span>
                </div>
              )}

              {/* CTA Button */}
              {isLoading ? (
                <Skeleton height={48} className="mb-4" />
              ) : (
                <button className="w-full rounded-lg bg-green-500 py-3 font-bold text-white hover:bg-green-600 transition-colors mb-4">
                  Enroll Now
                </button>
              )}

              {/* Course Stats */}
              <div className="space-y-4 border-t pt-6">
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} height={40} />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 text-gray-700">
                      <BookOpen size={20} className="text-green-500 shrink-0" />
                      <div>
                        <div className="text-sm text-gray-600">Lessons</div>
                        <div className="font-semibold">{course?.lessons}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Users size={20} className="text-green-500 shrink-0" />
                      <div>
                        <div className="text-sm text-gray-600">Students</div>
                        <div className="font-semibold">{course?.students}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock size={20} className="text-green-500 shrink-0" />
                      <div>
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="font-semibold">{course?.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Globe size={20} className="text-green-500 shrink-0" />
                      <div>
                        <div className="text-sm text-gray-600">Language</div>
                        <div className="font-semibold">{course?.language}</div>
                      </div>
                    </div>

                    {course?.certificate && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <Award size={20} className="text-green-500 shrink-0" />
                        <div>
                          <div className="text-sm text-gray-600">Certificate</div>
                          <div className="font-semibold">Included</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-gray-700">
                      <BarChart3 size={20} className="text-green-500 shrink-0" />
                      <div>
                        <div className="text-sm text-gray-600">Level</div>
                        <div className="font-semibold">{course?.level}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Last Updated */}
              {!isLoading && course?.lastUpdated && (
                <div className="mt-6 border-t pt-4 text-xs text-gray-500">
                  Last updated: {new Date(course?.lastUpdated).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
