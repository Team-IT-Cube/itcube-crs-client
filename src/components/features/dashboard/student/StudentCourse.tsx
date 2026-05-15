"use client";

import DashboardSkeleton from "@/components/layout/DashboardSkeleton";
import { useCallback, useEffect, useState } from "react";
import { endpoint } from "@/endpoints";
import { toast } from "sonner";
import { statusLabel, statusColor } from "@/components/features/dashboard/variables";
import Cookie from "js-cookie";
import { Enrollment } from "@/interfaces/enrollment";
import Link from "next/link";
import {BookOpen, Clock, CalendarDays, ChevronRight, Loader2} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import StudentStatistic from "@/components/features/dashboard/student/StudentStatistic";

export default function StudentCourse() {
    const [loading, setLoading] = useState(true);
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

    const fetchEnrollments = useCallback(async () => {
        try {
            const response = await fetch(endpoint.myEnrollments, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${Cookie.get('token')}`,
                    'Accept': 'application/json',
                },
            });
            const json = await response.json();
            setEnrollments(Array.isArray(json) ? json : (json.data ?? []));
        } catch {
            toast.error("Ошибка получения данных");
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchEnrollments();
    }, [fetchEnrollments]);

    if (loading) return <DashboardSkeleton />

    if (enrollments.length === 0) {
        return (
            <div className="border border-gray-100 rounded-xl p-10 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm mb-3">Вы ещё не записаны ни на один курс</p>
                <Link
                    href="/courses"
                    className="inline-flex items-center gap-1 text-sm text-green-600 hover:underline"
                >
                    Перейти в каталог курсов
                    <ChevronRight className="w-3.5 h-3.5" />
                </Link>
            </div>
        )
    }

    const confirmed = enrollments.filter(e => e.status === 'confirmed');
    const pending = enrollments.filter(e => e.status === 'pending');
    const rejected = enrollments.filter(e => e.status === 'rejected');

    return (
        <div className="space-y-6">
            {confirmed.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Активные курсы — {confirmed.length}
                    </p>
                    {confirmed.map((enrollment) => (
                        <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                    ))}
                </div>
            )}
            {pending.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Ожидают подтверждения — {pending.length}
                    </p>
                    {pending.map((enrollment) => (
                        <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                    ))}
                </div>
            )}
            {rejected.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Отклонённые — {rejected.length}
                    </p>
                    {rejected.map((enrollment) => (
                        <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                    ))}
                </div>
            )}
        </div>
    )
}

function EnrollmentCard({ enrollment }: { enrollment: Enrollment }) {
    const [open, setOpen] = useState<boolean>(false);

    const onClose = () => {
        if(enrollment.status === 'confirmed') {
            setOpen(!open);
        }
        return;
    }

    return (
        <div onClick={onClose} className={`border rounded-xl p-5 flex items-center justify-between gap-4 transition-all ${
            enrollment.status === 'rejected'
                ? 'border-gray-100 opacity-50'
                : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
        }`}>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-1">
                    <p className="font-medium text-gray-900 text-sm">
                        {enrollment.course.title}
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {enrollment.course.schedule}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                            <CalendarDays className="w-3 h-3" />
                            {new Date(enrollment.created_at).toLocaleDateString('ru-RU')}
                        </span>
                    </div>
                </div>
            </div>
            <span className={`shrink-0 text-xs px-3 py-1 rounded-full border font-medium ${statusColor[enrollment.status]}`}>
                {statusLabel[enrollment.status]}
            </span>

            {open && <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Статистика</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <StudentStatistic id={enrollment.id} />
                    <div className="flex gap-2 pt-2">
                        <Button className="w-full" onClick={onClose}>Закрыть</Button>
                    </div>
                </DialogContent>
            </Dialog>}
        </div>
    )
}