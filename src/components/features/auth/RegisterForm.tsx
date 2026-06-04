"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { motion } from "framer-motion";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

import { registerUser } from "@/lib/api";
import { RegisterData } from "@/interfaces/auth";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";

export default function RegisterForm() {
    const router = useRouter();
    const { setAuth } = useAuthStore();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
    });

    const translate: Record<string, string> = {
        email: "Адрес электронной почты уже занят"
    }

    const responseServer: Record<string, string> = {
        email: 'The email has already been taken.'
    }

    async function onSubmit(data: RegisterData) {
        try {
            const response = await registerUser(data);

            setAuth(response.user, response.token);
            toast.success(`Добро пожаловать, ${response.user.name}!`);
            router.push("/profile");
        } catch (err) {
            if (err instanceof AxiosError) {
                const errors = err.response?.data?.errors;
                if (errors) {
                    // 422 — ошибки полей от Laravel через setError
                    Object.entries(errors).forEach(([key, val]) => {
                        const value = (val as string[])[0] === responseServer[key] 
                            ? translate[key]
                            : (val as string[])[0]
                        
                        setError(key as keyof RegisterData, {
                            message: value,
                        }); 
                    });
                } else {
                    toast.error(err.response?.data?.message || "Ошибка регистрации");
                }
            } else {
                toast.error("Неизвестная ошибка");
            }
        }
    }

    return (
        <div className="max-w-md mb-8 mx-auto border border-gray-100 rounded-xl p-8 shadow-sm">
            <h1 className="text-2xl font-semibold mb-1">Регистрация</h1>
            <p className="text-gray-500 text-sm mb-6">Создайте аккаунт чтобы записаться на курсы</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Имя */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Имя
                    </label>
                    <input
                        {...register("name")}
                        className={`w-full h-11 border rounded-lg px-3 text-sm outline-none focus:ring-2 transition-colors ${
                            errors.name
                                ? "border-red-400 focus:ring-red-200"
                                : "border-gray-200 focus:ring-gray-200"
                        }`}
                        type="text"
                        id="name"
                        placeholder="Иван Иванов"
                        disabled={isSubmitting}
                    />
                    {errors.name && (
                        <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs"
                        >
                            {errors.name.message}
                        </motion.span>
                    )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Почта
                    </label>
                    <input
                        {...register("email")}
                        className={`w-full h-11 border rounded-lg px-3 text-sm outline-none focus:ring-2 transition-colors ${
                            errors.email
                                ? "border-red-400 focus:ring-red-200"
                                : "border-gray-200 focus:ring-gray-200"
                        }`}
                        type="email"
                        id="email"
                        placeholder="example@mail.com"
                        disabled={isSubmitting}
                    />
                    {errors.email && (
                        <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs"
                        >
                            {errors.email.message}
                        </motion.span>
                    )}
                </div>

                {/* Пароль */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Пароль
                    </label>
                    <input
                        {...register("password")}
                        className={`w-full h-11 border rounded-lg px-3 text-sm outline-none focus:ring-2 transition-colors ${
                            errors.password
                                ? "border-red-400 focus:ring-red-200"
                                : "border-gray-200 focus:ring-gray-200"
                        }`}
                        type="password"
                        id="password"
                        placeholder="Минимум 8 символов"
                        disabled={isSubmitting}
                    />
                    {errors.password && (
                        <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs"
                        >
                            {errors.password.message}
                        </motion.span>
                    )}
                </div>

                {/* Подтверждение пароля */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                        Повторите пароль
                    </label>
                    <input
                        {...register("password_confirmation")}
                        className={`w-full h-11 border rounded-lg px-3 text-sm outline-none focus:ring-2 transition-colors ${
                            errors.password_confirmation
                                ? "border-red-400 focus:ring-red-200"
                                : "border-gray-200 focus:ring-gray-200"
                        }`}
                        type="password"
                        id="password_confirmation"
                        placeholder="Повторите пароль"
                        disabled={isSubmitting}
                    />
                    {errors.password_confirmation && (
                        <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs"
                        >
                            {errors.password_confirmation.message}
                        </motion.span>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <> <Spinner /> Регистрируемся... </> : "Зарегистрироваться"}
                </Button>

                <p className="text-center text-sm text-gray-500">
                    Уже есть аккаунт?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    );
}