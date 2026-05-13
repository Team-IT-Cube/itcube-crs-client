"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardSkeleton from "@/components/layout/DashboardSkeleton";
import {useAuthStore} from "@/store/authStore";

const tabs: TabsData[] = [
    { id: 1, label: "Профиль", value: "overview" },
    { id: 2, label: "Аналитика", value: "analytics" },
    { id: 3, label: "Мои курсы", value: "courses" },
];

interface TabsData {
    id: number
    label: string
    value: string
}

const roleLabel: Record<string, string> = {
    student: "Ученик",
    teacher: "Преподаватель",
    admin: "Администратор",
}

const roleColor: Record<string, string> = {
    student: "bg-blue-50 text-blue-600 border-blue-100",
    teacher: "bg-green-50 text-green-600 border-green-100",
    admin: "bg-purple-50 text-purple-600 border-purple-100",
}

export default function UserDashboard() {
    const { user } = useAuthStore();

    const initials = user?.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <main className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Личный кабинет</h1>
            <Tabs defaultValue="overview">
                <TabsList variant="line">
                    {tabs.map((tab: TabsData) =>
                        <TabsTrigger key={tab.id} value={tab.value}>{tab.label}</TabsTrigger>
                    )}
                </TabsList>

                {/* Профиль */}
                <TabsContent value="overview" className="animate-fade-in-up mt-6">
                    <div className="border border-gray-100 rounded-xl p-6 space-y-6">

                        {/* Аватар и имя */}
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gray-900 text-white flex items-center justify-center text-lg font-medium">
                                {initials}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{user?.name}</p>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                            <span className={`ml-auto text-xs px-3 py-1 rounded-full border font-medium ${roleColor[user?.role ?? 'student']}`}>
                                {roleLabel[user?.role ?? 'student']}
                            </span>
                        </div>

                        {/* Разделитель */}
                        <div className="border-t border-gray-100" />

                        {/* Данные */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Имя</span>
                                <span className="text-sm text-gray-900 font-medium">{user?.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Email</span>
                                <span className="text-sm text-gray-900 font-medium">{user?.email}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Роль</span>
                                <span className="text-sm text-gray-900 font-medium">{roleLabel[user?.role ?? 'student']}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">ID</span>
                                <span className="text-sm text-gray-400">#{user?.id}</span>
                            </div>
                        </div>

                    </div>
                </TabsContent>

                {/* Аналитика */}
                <TabsContent value="analytics" className="animate-fade-in-up mt-6">
                    <div className="border border-gray-100 rounded-xl p-6 text-center text-gray-400 text-sm">
                        <DashboardSkeleton />
                    </div>
                </TabsContent>

                {/* Мои курсы */}
                <TabsContent value="courses" className="animate-fade-in-up mt-6">
                    <div className="border border-gray-100 rounded-xl p-6 text-center text-gray-400 text-sm">
                        <DashboardSkeleton />
                    </div>
                </TabsContent>

            </Tabs>
        </main>
    )
}