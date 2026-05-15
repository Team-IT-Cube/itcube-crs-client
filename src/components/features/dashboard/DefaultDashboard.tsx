import DashboardSkeleton from "@/components/layout/DashboardSkeleton";
// import {endpoint} from "@/endpoints";
// import {useAuthStore} from "@/store/authStore";
// import Cookie from "js-cookie";
// import {useCallback, useEffect, useState} from "react";
// import {User} from "@/interfaces/user";
// import {roleColor, roleLabel} from "@/components/features/dashboard/variables";
// import {toast} from "sonner";
// import {redirect} from "next/navigation";

export default function DefaultDashboard() {
    // const { token, isAuthenticated } = useAuthStore();
    // const [user, setUser] = useState<User | null>(null);
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);
    //
    // const fetchUser = useCallback(async () => {
    //     if (!isAuthenticated()) {
    //         redirect("/login")
    //         return;
    //     }
    //
    //     try {
    //         setIsLoading(true);
    //
    //         const response = await fetch(endpoint.me, {
    //             method: "GET",
    //             headers: {
    //                 "Authorization": `Bearer ${Cookie.get("token") || token}`,
    //                 "Content-Type": "application/json",
    //             }
    //         })
    //
    //         if(!response.ok) {
    //             setError("Ошибка данных");
    //             throw new Error('Failed to fetch user')
    //         }
    //
    //         const json = await response.json();
    //         setUser(json);
    //     } catch (err) {
    //         if (err instanceof Error) {
    //             toast.error(err.message);
    //             return;
    //         }
    //         console.error(err);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }, [token, isAuthenticated]);
    //
    // useEffect(() => {
    //     // eslint-disable-next-line react-hooks/set-state-in-effect
    //     fetchUser();
    // }, [fetchUser]);

    return (
        <main className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Личный кабинет</h1>
            <DashboardSkeleton />
            {/*{isLoading ? <DashboardSkeleton /> : !error ? (*/}
            {/*    <div className="border border-gray-100 rounded-xl p-6 space-y-6">*/}
            {/*        /!* имя *!/*/}
            {/*        <div className="flex items-center gap-4">*/}
            {/*            <div>*/}
            {/*                <p className="font-medium text-gray-900">{user?.name}</p>*/}
            {/*                <p className="text-sm text-gray-500">{user?.email}</p>*/}
            {/*            </div>*/}
            {/*            <span className={`ml-auto text-xs px-3 py-1 rounded-full border font-medium ${roleColor[user?.role ?? 'student']}`}>*/}
            {/*                    {roleLabel[user?.role ?? 'student']}*/}
            {/*                </span>*/}
            {/*        </div>*/}

            {/*        /!* Разделитель *!/*/}
            {/*        <div className="border-t border-gray-100" />*/}

            {/*        /!* Данные *!/*/}
            {/*        <div className="space-y-4">*/}
            {/*            <div className="flex items-center justify-between">*/}
            {/*                <span className="text-sm text-gray-500">Имя</span>*/}
            {/*                <span className="text-sm text-gray-900 font-medium">{user?.name}</span>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center justify-between">*/}
            {/*                <span className="text-sm text-gray-500">Email</span>*/}
            {/*                <span className="text-sm text-gray-900 font-medium">{user?.email}</span>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center justify-between">*/}
            {/*                <span className="text-sm text-gray-500">Роль</span>*/}
            {/*                <span className="text-sm text-gray-900 font-medium">{roleLabel[user?.role ?? 'student']}</span>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center justify-between">*/}
            {/*                <span className="text-sm text-gray-500">ID</span>*/}
            {/*                <span className="text-sm text-gray-400">#{user?.id}</span>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*) : (*/}
            {/*    <div className="border border-gray-100 rounded-xl p-10 text-center">*/}
            {/*    <p className="text-gray-400 text-sm">{error}</p>*/}
            {/*    </div>*/}
            {/*)}*/}
        </main>
    )
}