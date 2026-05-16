"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { endpoint } from "@/endpoints";
import { toast } from "sonner";
import { ArrowLeft, UserCheck, UserX, Clock } from "lucide-react";
import { Course } from "@/interfaces/course";
import { Enrollment } from "@/interfaces/enrollment";
import AttendanceDialog from "./AttendanceDialog";
import { Skeleton } from "@/components/ui/skeleton";

interface TeacherCourseStudentsProps {
    course: Course
    onBack: () => void
}

export default function TeacherCourseStudents({ course, onBack }: TeacherCourseStudentsProps) {
    const { token } = useAuthStore();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);

    const fetchEnrollments = useCallback(async () => {
        try {
            const response = await fetch(`${endpoint.courses}/${course.id}/enrollments`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            });
            const json = await response.json();
            setEnrollments(Array.isArray(json) ? json : (json.data ?? []));
        } catch {
            toast.error("Ошибка загрузки учеников");
        } finally {
            setLoading(false);
        }
    }, [token, course.id])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchEnrollments();
    }, [fetchEnrollments])

    const confirmedEnrollments = enrollments.filter(e => e.status === 'confirmed');
    const pendingEnrollments = enrollments.filter(e => e.status === 'pending');

    return (
        <div className="space-y-4">

            {/* Шапка */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 text-gray-500" />
                </button>
                <div>
                    <h2 className="font-medium text-gray-900 text-sm">{course.title}</h2>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.schedule}
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="w-full h-16 rounded-xl" />
                    ))}
                </div>
            ) : (
                <>
                    {/* Подтверждённые ученики */}
                    {confirmedEnrollments.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide flex items-center gap-1">
                                <UserCheck className="w-3.5 h-3.5" />
                                Подтверждённые — {confirmedEnrollments.length}
                            </p>
                            {confirmedEnrollments.map((enrollment) => (
                                <div
                                    key={enrollment.id}
                                    className="border border-gray-100 rounded-xl p-4 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                                            {enrollment.user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{enrollment.user?.name}</p>
                                            <p className="text-xs text-gray-400">{enrollment.user?.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedEnrollment(enrollment)}
                                        className="px-3 py-1.5 text-xs font-medium text-green-600 border border-green-200 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                    >
                                        Отметить
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Ожидающие */}
                    {pendingEnrollments.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide flex items-center gap-1">
                                <UserX className="w-3.5 h-3.5" />
                                Ожидают подтверждения — {pendingEnrollments.length}
                            </p>
                            {pendingEnrollments.map((enrollment) => (
                                <div
                                    key={enrollment.id}
                                    className="border border-gray-100 rounded-xl p-4 flex items-center gap-3 opacity-50"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                                        {enrollment.user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{enrollment.user?.name}</p>
                                        <p className="text-xs text-gray-400">Ожидает подтверждения</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {enrollments.length === 0 && (
                        <div className="border border-gray-100 rounded-xl p-10 text-center text-gray-400 text-sm">
                            На этот курс пока никто не записался
                        </div>
                    )}
                </>
            )}

            {/* Диалог посещаемости */}
            {selectedEnrollment && (
                <AttendanceDialog
                    enrollment={selectedEnrollment}
                    open={!!selectedEnrollment}
                    onClose={() => setSelectedEnrollment(null)}
                />
            )}

        </div>
    )
}
