"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardSkeleton from "@/components/layout/DashboardSkeleton";

const tabs = [
    { id: 1, label: "Профиль", value: "overview" },
    { id: 2, label: "Аналитика", value: "analytics" },
    { id: 3, label: "Мои курсы", value: "courses" },
]

export default function UserDashboard() {
    return (
        <main>
            <div className="mt-5">
                <h1 className="my-5 text-4xl font-bold">Dashboard</h1>
                <Tabs defaultValue="overview">
                    <TabsList variant="line">
                    {tabs.map((tab) =>
                        <TabsTrigger key={tab.id} value={tab.value}>{tab.label}</TabsTrigger>
                    )}
                    </TabsList>
                    {tabs.map((tab) => (
                        <TabsContent key={tab.id} value={tab.value} className="animate-fade-in-up shadow-sm min-h-30 p-3 rounded-md">
                            <DashboardSkeleton />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </main>
    )
}