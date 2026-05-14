"use client";

import {useAuthStore} from "@/store/authStore";
import DefaultDashboard from "@/components/features/dashboard/DefaultDashboard";
import StudentDashboard from "@/components/features/dashboard/student/StudentDashboard";
import TeacherDashboard from "@/components/features/dashboard/teacher/TeacherDashboard";

export default function UserDashboard() {
    const { user } = useAuthStore();
    const role = user?.role;

    if(role === 'student') return <StudentDashboard />
    if(role === 'teacher') return <TeacherDashboard />

    return <DefaultDashboard />;
}