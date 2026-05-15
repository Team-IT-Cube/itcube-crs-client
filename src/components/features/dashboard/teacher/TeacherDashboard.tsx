"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { endpoint } from "@/endpoints";
import { toast } from "sonner";
import { BookOpen, Users, Clock, ChevronRight } from "lucide-react";
import { Course } from "@/interfaces/course";
import TeacherCourseStudents from "./TeacherCourseStudents";
import DashboardSkeleton from "@/components/layout/DashboardSkeleton";

export default function TeacherDashboard() {
    const { token } = useAuthStore();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const fetchCourses = useCallback(async () => {
        try {
            const response = await fetch(endpoint.courses, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            });
            const json = await response.json();
            setCourses(Array.isArray(json) ? json : (json.data ?? []));
        } catch {
            toast.error("Ошибка загрузки курсов");
        } finally {
            setLoading(false);
        }
    }, [token])

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses])

    if (loading) return <DashboardSkeleton />

    if (selectedCourse) {
        return (
            <TeacherCourseStudents
                course={selectedCourse}
                onBack={() => setSelectedCourse(null)}
            />
        )
    }

    return (
        <div className="space-y-3">
            {courses.length === 0 ? (
                <div className="border border-gray-100 rounded-xl p-10 text-center text-gray-400 text-sm">
                    У вас пока нет курсов
                </div>
            ) : courses.map((course) => (
                <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className="w-full border border-gray-100 rounded-xl p-5 hover:border-gray-200 hover:shadow-sm transition-all flex items-center justify-between gap-4 text-left"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                            <BookOpen className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-medium text-gray-900 text-sm">{course.title}</p>
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                    <Clock className="w-3 h-3" />
                                    {course.schedule}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                    <Users className="w-3 h-3" />
                                    {course.max_slots} мест
                                </span>
                            </div>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </button>
            ))}
        </div>
    )
}
