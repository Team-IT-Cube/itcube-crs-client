"use client"

import {Button} from "@/components/ui/button";

export default function CoursesError({
 error,
 reset,
}: {
    error: Error
    reset: () => void
}) {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16 text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-2">
                Не удалось загрузить курсы. {error.name}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
                Сервер временно недоступен. Попробуйте позже. {error.message}
            </p>
            <Button
                onClick={reset}
                className="cursor-pointer"
            >
                Попробовать снова
            </Button>
        </main>
    )
}