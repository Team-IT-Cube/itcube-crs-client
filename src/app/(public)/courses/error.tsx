"use client"

import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export default function CoursesError({
 error,
 reset,
}: {
    error: Error
    reset: () => void
}) {
    return (
        <main className="max-w-5xl mx-auto px-6 py-12">
            <div className="border border-red-100 bg-red-50 rounded-xl p-10 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TriangleAlert className="w-6 h-6 text-red-500"/>
                </div>

                <h2 className="text-lg font-medium text-gray-900 mb-2">
                    Не удалось загрузить курсы
                </h2>
                <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                    Сервер временно недоступен. Проверьте подключение к интернету и попробуйте снова.
                </p>

                {/* Детали ошибки в dev режиме */}
                {process.env.NODE_ENV === 'development' && (
                    <p className="text-xs text-red-400 mb-4 font-mono">
                        {error.name}: {error.message}
                    </p>
                )}

                <Button onClick={reset} className="cursor-pointer">
                    Попробовать снова
                </Button>
            </div>
        </main>
    )
}