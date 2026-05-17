"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "sonner";

import { loginUser } from "@/lib/api";
import { AuthData } from "@/interfaces/auth";
import { useAuthStore } from "@/store/authStore";
import { loginSchema } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function LoginForm() {
    const router = useRouter();
    const { setAuth } = useAuthStore();

    const [data, setData] = useState<AuthData>({
        email: "",
        password: "",
    });

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        // Убираем ошибку поля при изменении
        setFieldErrors(prev => ({ ...prev, [e.target.name]: "" }));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setGlobalError(null);
        setFieldErrors({});

        // Клиентская валидация через Zod
        const result = loginSchema.safeParse(data);
        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.issues.forEach(err => {
                if (err.path[0]) errors[err.path[0] as string] = err.message;
            });
            setFieldErrors(errors);
            return;
        }

        setLoading(true);

        try {
            const response = await loginUser(data);
            setAuth(response.user, response.token);
            toast.success(`Добро пожаловать, ${response.user.name}!`);
            router.push("/profile");
        } catch (err: any) {
            if (err.errors) {
                // 422 — ошибки полей
                const errors: Record<string, string> = {};
                Object.entries(err.errors).forEach(([key, val]) => {
                    errors[key] = (val as string[])[0];
                });
                setFieldErrors(errors);
            } else {
                // 401 — общая ошибка
                setGlobalError(err.message || "Неверный email или пароль");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mb-8 mx-auto border border-gray-100 rounded-xl p-8 shadow-sm">
            <h1 className="text-2xl font-semibold mb-1">Вход</h1>
            <p className="text-gray-500 text-sm mb-6">Введите данные для входа в систему</p>

            {/* Общая ошибка */}
            {globalError && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
                    {globalError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Почта
                    </label>
                    <input
                        className={`w-full h-11 border rounded-lg px-3 text-sm outline-none focus:ring-2 focus:ring-primary transition-colors ${
                            fieldErrors.email
                                ? "border-red-400 focus:ring-red-200"
                                : "border-gray-200 focus:ring-gray-200"
                        }`}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@mail.com"
                        onChange={handleChange}
                        value={data.email}
                        disabled={loading}
                    />
                    {fieldErrors.email && (
                        <span className="text-red-500 text-xs">{fieldErrors.email}</span>
                    )}
                </div>

                {/* Пароль */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Пароль
                    </label>
                    <input
                        className={`w-full h-11 border rounded-lg px-3 text-sm outline-none focus:ring-2 focus:ring-primary transition-colors ${
                            fieldErrors.password
                                ? "border-red-400 focus:ring-red-200"
                                : "border-gray-200 focus:ring-gray-200"
                        }`}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Введите пароль"
                        onChange={handleChange}
                        value={data.password}
                        disabled={loading}
                    />
                    {fieldErrors.password && (
                        <span className="text-red-500 text-xs">{fieldErrors.password}</span>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={loading}
                >
                    {loading ? <> <Spinner /> Входим... </> : "Войти"}
                </Button>

                <p className="text-center text-sm text-gray-500">
                    Нет аккаунта?{" "}
                    <Link href="/register" className="text-primary hover:underline font-medium">
                        Зарегистрироваться
                    </Link>
                </p>
            </form>
        </div>
    );
}