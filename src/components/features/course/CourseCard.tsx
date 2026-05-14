// components/features/course/CourseCard.tsx
import { Course } from "@/interfaces/course";

const directionLabel: Record<string, string> = {
    python: "Python",
    java: "Java",
    vrar: "VR/AR",
    robotics: "Робототехника",
    mobile: "Мобильная разработка",
    bigdata: "Большие данные",
}

const directionColor: Record<string, string> = {
    python: "bg-blue-50 text-blue-600 border-blue-100",
    java: "bg-orange-50 text-orange-600 border-orange-100",
    vrar: "bg-purple-50 text-purple-600 border-purple-100",
    robotics: "bg-red-50 text-red-600 border-red-100",
    mobile: "bg-green-50 text-green-600 border-green-100",
    bigdata: "bg-yellow-50 text-yellow-600 border-yellow-100",
}

interface CourseCardProps {
    course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
    return (
        <div className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 hover:shadow-sm transition-all flex flex-col gap-4">

            {/* Шапка карточки */}
            <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium text-gray-900 text-sm leading-snug">{course.title}</h3>
                <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full border font-medium ${directionColor[course.direction] ?? 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                    {directionLabel[course.direction] ?? course.direction}
                </span>
            </div>

            {/* Детали */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {course.teacher.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.schedule}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {course.max_slots} мест
                </div>
            </div>

            {/* Кнопка */}
            <button className="w-full mt-auto py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                Записаться
            </button>

        </div>
    )
}