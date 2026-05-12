import CourseCard from "@/components/features/course/card";

export default function Courses() {
    return (
        <main>
            <h1>Курсы</h1>
            <div className="flex gap-5 flex-wrap items-center justify-center">
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </div>
        </main>
    )
}