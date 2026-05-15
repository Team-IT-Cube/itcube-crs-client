"use client";

import DashboardSkeleton from "@/components/layout/DashboardSkeleton";
import { useEffect, useState } from "react";
import { serverFetch } from "@/lib/api";
import { endpoint } from "@/endpoints";
import { toast } from "sonner";
import { statusLabel, statusColor } from "@/components/features/dashboard/variables";
import Cookie from "js-cookie";
import { Enrollment } from "../../../../interfaces/enrollment";
import Link from "next/link";
import StudentStatistic from "@/components/features/dashboard/student/StudentStatistic";

export default function StudentCourse() {
    const [loading, setLoading] = useState(true);
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

    const fetchEnrollments = async () => {
        try {
            const response = await serverFetch<Enrollment[]>(endpoint.myEnrollments, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${Cookie.get('token')}`,
                },
            });
            setEnrollments(response.data ?? []);
        } catch {
            toast.error("Ошибка получения данных");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchEnrollments();
    }, []);

    if (loading) return <DashboardSkeleton />

    if (enrollments.length === 0) {
        return (
            <div className="border border-gray-100 rounded-xl p-10 text-center">
                <p className="text-gray-400 text-sm">Вы ещё не записаны ни на один курс</p>
                <Link href="/courses" className="inline-block mt-3 text-sm text-primary-400 hover:underline">
                    Перейти в каталог курсов
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {enrollments.map((enrollment) => (
                <div
                    key={enrollment.id}
                    className="border border-gray-100 rounded-xl p-5 flex items-center justify-between gap-4"
                >
                    {/* Левая часть */}
                    <div className="space-y-1">
                        <p className="font-medium text-gray-900 text-sm">
                            {enrollment.course.title}
                        </p>
                        <p className="text-xs text-gray-400">
                            {enrollment.course.schedule}
                        </p>
                        <p className="text-xs text-gray-400">
                            Записан: {new Date(enrollment.created_at).toLocaleDateString('ru-RU')}
                        </p>
                    </div>

                    <StudentStatistic key={enrollment.id} id={enrollment.id} />
                    {/* Правая часть — статус */}
                    <span className={`shrink-0 text-xs px-3 py-1 rounded-full border font-medium ${statusColor[enrollment.status]}`}>
                        {statusLabel[enrollment.status]}
                    </span>
                </div>
            ))}
        </div>
    )
}