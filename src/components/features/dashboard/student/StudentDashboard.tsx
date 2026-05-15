import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentCourse from "@/components/features/dashboard/student/StudentCourse";
import StudentProfile from "@/components/features/dashboard/student/StudentProfile";
import {tabs} from "@/components/features/dashboard/variables";

export default function StudentDashboard() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Личный кабинет</h1>
            <Tabs defaultValue="overview">
                <TabsList variant="line">
                    {tabs.map((tab) =>
                        <TabsTrigger key={tab.id} value={tab.value}>{tab.label}</TabsTrigger>
                    )}
                </TabsList>

                {/* Профиль */}
                <TabsContent value="overview" className="animate-fade-in-up mt-6">
                    <StudentProfile />
                </TabsContent>

                {/* Мои курсы */}
                <TabsContent value="courses" className="animate-fade-in-up mt-6">
                    <StudentCourse />
                </TabsContent>
            </Tabs>
        </main>
    )
}