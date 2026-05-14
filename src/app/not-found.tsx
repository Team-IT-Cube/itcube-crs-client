import Link from "next/link";
import { FileQuestion, ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
    return (
        <main className="max-w-lg mx-auto px-6 py-24 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileQuestion className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-6xl font-semibold text-gray-900 mb-3">404</h1>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Страница не найдена</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Страница которую вы ищете не существует или была удалена. Проверьте адрес или вернитесь на главную.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    На главную
                </Link>
                <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <BookOpen className="w-4 h-4" />
                    Смотреть курсы
                </Link>
            </div>

        </main>
    )
}