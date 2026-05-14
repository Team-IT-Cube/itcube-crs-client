// app/courses/error.tsx
"use client"

import { Button } from "@/components/ui/button";

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

                {/* Иконка */}
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
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