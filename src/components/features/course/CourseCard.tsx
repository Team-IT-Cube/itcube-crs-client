"use client";

import { Course } from "@/interfaces/course";
import { useAuthStore } from "@/store/authStore";
import { endpoint } from "@/endpoints";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, Clock, Users, GraduationCap } from "lucide-react";

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

const statusLabel: Record<string, string> = {
    pending: "Заявка ожидает",
    confirmed: "Вы записаны",
    rejected: "Заявка отклонена",
}

const statusColor: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-600 border border-yellow-200",
    confirmed: "bg-green-50 text-green-600 border border-green-200",
    rejected: "bg-red-50 text-red-500 border border-red-200",
}

import { Enrollment } from "@/interfaces/enrollment";
import {useRouter} from "next/navigation";

interface CourseCardProps {
    course: Course
    enrollment?: Enrollment
    onEnroll: (enrollment: Enrollment) => void
    fetching: boolean
}

export default function CourseCard({ course, enrollment, onEnroll, fetching }: CourseCardProps) {
    const { token, isAuthenticated } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEnroll = async () => {
        if (!isAuthenticated()) {
            toast.warning('Для записи авторизуйтесь в систему!', { position: "top-center" });
            router.push('/login');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(endpoint.enrollments, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ course_id: course.id })
            });

            const json = await response.json();

            if (response.status === 201) {
                toast.success("Заявка успешно подана! Ожидайте подтверждение");
                onEnroll(json.data ?? json);
                return;
            }

            if (response.status === 422) {
                toast.warning(json.message || 'Вы уже записаны на этот курс');
                return;
            }

            if (response.status === 401) {
                toast.warning('Авторизуйтесь чтобы записаться');
                return;
            }

            toast.error(json.message || 'Ошибка при записи на курс');
        } catch {
            toast.error("Неизвестная ошибка");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`border rounded-xl p-5 flex flex-col gap-4 transition-all ${enrollment ? 'border-gray-100 bg-gray-50' : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}>

            {/* Шапка */}
            <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium text-gray-900 text-sm leading-snug">{course.title}</h3>
                <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full border font-medium ${directionColor[course.direction] ?? 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                    {directionLabel[course.direction] ?? course.direction}
                </span>
            </div>

            {/* Детали */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                    {course.teacher.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    {course.schedule}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    <span className={course.free_slots <= 0 ? 'text-red-400' : ''}>
                        {course.free_slots} из {course.max_slots} мест свободно
                    </span>
                </div>
            </div>

            {/* Кнопка или статус */}
            {fetching ?
                <div className="w-full h-9 bg-gray-100 rounded-lg animate-pulse" />
                : enrollment ? (
                <div className={`w-full py-2 text-xs font-medium text-center rounded-lg ${statusColor[enrollment.status]}`}>
                    {statusLabel[enrollment.status]}
                </div>
            ) : course.free_slots <= 0 ? (
                    <div className="w-full py-2 text-xs font-medium text-center rounded-lg bg-gray-50 text-gray-400 border border-gray-200">
                        Мест нет
                    </div> ) : (
                <button
                    onClick={handleEnroll}
                    disabled={loading}
                    className="w-full mt-auto py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {loading ? "Отправка..." : "Записаться"}
                </button>
            )}

        </div>
    )
}