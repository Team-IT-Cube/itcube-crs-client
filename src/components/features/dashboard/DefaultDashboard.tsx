import DashboardSkeleton from "@/components/layout/DashboardSkeleton";

export default function DefaultDashboard() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Личный кабинет</h1>
            <DashboardSkeleton />
        </main>
    )
}