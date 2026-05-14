"use client";

import {roleLabel, roleColor} from "@/components/features/dashboard/variables";
import {useAuthStore} from "@/store/authStore";

export default function StudentProfile() {
    const { user } = useAuthStore();

    const initials = user?.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
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
    )
}