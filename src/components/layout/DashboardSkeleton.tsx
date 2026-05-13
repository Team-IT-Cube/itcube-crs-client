import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
    return (
        <div className="space-y-4">

            {/* Верхняя строка — две карточки */}
            <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-xl p-5 space-y-3">
                    <Skeleton className="w-24 h-3" />
                    <Skeleton className="w-16 h-7" />
                    <Skeleton className="w-32 h-3" />
                </div>
                <div className="border border-gray-100 rounded-xl p-5 space-y-3">
                    <Skeleton className="w-24 h-3" />
                    <Skeleton className="w-16 h-7" />
                    <Skeleton className="w-32 h-3" />
                </div>
            </div>

            {/* Таблица */}
            <div className="border border-gray-100 rounded-xl p-5 space-y-3">
                <Skeleton className="w-32 h-4" />
                <div className="space-y-2 pt-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-8 h-8 rounded-full" />
                                <Skeleton className="w-32 h-3" />
                            </div>
                            <Skeleton className="w-16 h-5 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}