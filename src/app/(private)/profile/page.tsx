"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {motion} from "framer-motion";
import DashboardSkeleton from "@/components/layout/DashboardSkeleton";

export default function UserDashboard() {
    return (
        <motion.main >
            <div className="mt-5">
                <h1 className="my-5 text-4xl font-bold">Dashboard</h1>
                <Tabs defaultValue="overview">
                    <TabsList variant="line">
                        <TabsTrigger value="overview">Профиль</TabsTrigger>
                        <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                        <TabsTrigger value="reports">Мои курсы</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="shadow-sm min-h-30 p-3 rounded-md">
                    <DashboardSkeleton />
                </div>
            </div>

        </motion.main>
    )
}