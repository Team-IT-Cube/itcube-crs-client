import CourseCard from "@/components/features/course/CourseCard";
import {serverFetch} from "@/lib/api";
import {Course} from "@/interfaces/course";
import {endpoint} from "@/endpoints";

export const dynamic = 'force-dynamic';

export default async function Courses() {
    const courses = await serverFetch<Course[]>(endpoint.courses, {
        method: "GET",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }).catch(() => console.error("Error fetching courses"));

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