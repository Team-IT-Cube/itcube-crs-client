"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { endpoint } from "@/endpoints";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, CalendarDays } from "lucide-react";
import { Enrollment } from "@/interfaces/enrollment";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface AttendanceDialogProps {
    enrollment: Enrollment
    open: boolean
    onClose: () => void
}

export default function AttendanceDialog({ enrollment, open, onClose }: AttendanceDialogProps) {
    const { token } = useAuthStore();
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [present, setPresent] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (present === null) {
            toast.warning("Выберите статус присутствия");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(endpoint.attendance, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    enrollment_id: enrollment.id,
                    lesson_date: date,
                    present: present,
                })
            });

            const json = await response.json();

            if (response.status === 201) {
                toast.success(`Посещаемость отмечена для ${enrollment.user?.name}`);
                onClose();
                return;
            }

            if (response.status === 422) {
                toast.warning(json.message || "Посещаемость на эту дату уже отмечена");
                return;
            }

            toast.error(json.message || "Ошибка при отметке посещаемости");
        } catch {
            toast.error("Неизвестная ошибка");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Отметить посещаемость</DialogTitle>
                    <DialogDescription>
                        {enrollment.user?.name}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">

                    {/* Дата */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5" />
                            Дата занятия
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                        />
                    </div>

                    {/* Присутствие */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-700">Статус</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setPresent(true)}
                                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                                    present === true
                                        ? 'bg-green-50 text-green-600 border-green-200'
                                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                <CheckCircle className="w-4 h-4" />
                                Присутствовал
                            </button>
                            <button
                                onClick={() => setPresent(false)}
                                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                                    present === false
                                        ? 'bg-red-50 text-red-500 border-red-200'
                                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                <XCircle className="w-4 h-4" />
                                Отсутствовал
                            </button>
                        </div>
                    </div>

                </div>

                {/* Кнопки */}
                <div className="flex gap-2 pt-2">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || present === null}
                        className="flex-1 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? "Сохраняем..." : "Сохранить"}
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    )
}
