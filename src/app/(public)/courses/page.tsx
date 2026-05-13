import CourseCard from "@/components/features/course/CourseCard";
import {serverFetch} from "@/lib/api";
import {Course} from "@/interfaces/course";
import {endpoint} from "@/endpoints";

export default async function Courses() {
    const courses = await serverFetch<Course[]>(endpoint.courses, {
        next: { revalidate: 120 },
    }).catch((err) => { throw err });

    return (
        <main>
            <h1>Курсы</h1>
            <div className="flex gap-5 flex-wrap items-center justify-center">
                {courses?.data?.map((course: Course) => (
                    <CourseCard key={course.id} course={course} />
                )) || null}
            </div>

        </main>
    )
}