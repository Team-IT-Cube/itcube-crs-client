import CourseCard from "@/components/features/course/CourseCard";
import { serverFetch } from "@/lib/api";
import { Course } from "@/interfaces/course";
import { endpoint } from "@/endpoints";

export default async function Courses() {
    const courses = await serverFetch<Course[]>(endpoint.courses, {
        next: { revalidate: 60 },
    }).catch((err) => { throw err });

    return (
        <main className="max-w-5xl mx-auto px-6 py-12">

            {/* Заголовок */}
            <div className="mb-10">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">Курсы</h1>
                <p className="text-gray-500 text-sm">Выберите направление и запишитесь на курс</p>
            </div>

            {/* Сетка карточек */}
            {courses?.data && courses.data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.data.map((course: Course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-400 text-sm">
                    Курсы пока не добавлены
                </div>
            )}

        </main>
    )
}