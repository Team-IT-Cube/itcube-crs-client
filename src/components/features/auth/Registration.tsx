"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, SetStateAction, Dispatch, useEffect } from "react";

import { toast } from "sonner";
import { motion } from "framer-motion";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Loader2, Mail, ShieldCheck } from "lucide-react";

import { registerUser } from "@/lib/api";
import { RegisterData, VerifyCode } from "@/interfaces/auth";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, verifyCodeSchema } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import { endpoint } from "@/endpoints";

const MAX_ATTEMPTS = 4;
const MAX_COUNTDOWN = 300;

interface RegisterFormProps {
    setStep: Dispatch<SetStateAction<number>>
    setEmail: Dispatch<SetStateAction<string>>
}
 
interface VerifyCodeFormProps {
    email: string;
}

export default function Registration() {
    const [step, setStep] = useState<number>(1);
    const [email, setEmail] = useState<string>("");

    return (
        step === 1 ? 
            <RegisterForm setStep={setStep} setEmail={setEmail} /> 
        : step === 2 ?
            <VerifyCodeForm email={email} /> 
        : "Упс, что то пошло не так."
    );
}

function RegisterForm({ setStep, setEmail }: RegisterFormProps) {
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
            // запрос регистрации
            const response = await registerUser(data);
            // сохранить email для формы подверждения
            setEmail(response.email);
            // следующая форма
            setStep(2);
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
                    toast.error(err.response?.data?.message || "Ошибка сервера");
                }
            } else {
                toast.error("Неизвестная ошибка");
            }
        }
    }

    return (
        <motion.div
            exit={{ opacity: 0, x: 100 }}
            className="max-w-md mb-8 mx-auto border border-gray-100 rounded-xl p-8 shadow-sm"
        >
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
                    {isSubmitting ? <> <Spinner /> Регистрируем... </> : "Зарегистрироваться"}
                </Button>

                <p className="text-center text-sm text-gray-500">
                    Уже есть аккаунт?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                        Войти
                    </Link>
                </p>
            </form>
        </motion.div>
    )
}

function useCountdown(seconds: number) {
    const [timeLeft, setTimeLeft] = useState(seconds)

    useEffect(() => {
        if (timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    const minutes = Math.floor(timeLeft / 60)
    const secs = timeLeft % 60
    const formatted = `${minutes}:${secs.toString().padStart(2, "0")}`
    const expired = timeLeft <= 0

    return { timeLeft, formatted, expired }
}
 
function VerifyCodeForm({ email }: VerifyCodeFormProps) {
    const router = useRouter();
    const { setAuth } = useAuthStore();
    const { expired, formatted } = useCountdown(MAX_COUNTDOWN);
    const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
    const [blocked, setBlocked] = useState(false);
 
    const {
        register,
        handleSubmit,
        watch,
        setError,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<VerifyCode>({
        resolver: zodResolver(verifyCodeSchema),
    });
 
    const codeValue = watch("code") ?? "";
    const isCodeFull = String(codeValue).length === 6;
 
    async function onSubmit(data: VerifyCode) {
        const newAttempts = attemptsLeft - 1;
        setAttemptsLeft(newAttempts);
 
        if (newAttempts <= 0) {
            setBlocked(true);
            toast.warning("Попытки исчерпаны. Попробуйте зарегистрироваться заново.");
            return;
        }
 
        try {
            const response = await fetch(endpoint.verifyCode, {
                method: "POST",
                body: JSON.stringify({ email, code: data.code }),
                headers: { "Content-Type": "application/json" },
            });
 
            const json = await response.json();
 
            if (response.status === 422) {
                setError("code", { message: json.message });
                return;
            }
 
            if (!response.ok) {
                throw new Error(json.message || "Неизвестная ошибка");
            }
 
            setAuth(json.user, json.token);
            toast.success(`Добро пожаловать, ${json.user.name}!`);
            router.push("/profile");
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Ошибка клиента");
            }
        }
    }
 
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="max-w-md mx-auto border border-gray-100 rounded-xl p-8 shadow-sm"
        >
            {/* Шапка */}
            <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">Подтверждение email</h1>
                <p className="text-sm text-gray-500">
                    Введите 6-значный код отправленный на
                </p>
                <div className="flex items-center gap-1.5 mt-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-200">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-sm text-gray-700 font-medium">{email}</span>
                </div>
            </div>
 
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
 
                {/* Поле кода */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="code" className="text-sm font-medium text-gray-700">
                        Код подтверждения
                    </label>
                    <input
                        {...register("code")}
                        type="text"
                        id="code"
                        placeholder="000000"
                        maxLength={6}
                        pattern="[0-9]*"
                        disabled={blocked || isSubmitting}
                        inputMode="numeric"
                        autoComplete="off"
                        onKeyDown={(e) => {
                            if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const clean = e.target.value.replace(/\D/g, "").slice(0, 6);                            
                            setValue("code", clean, { shouldValidate: true });
                        }}
                        className={`w-full h-12 border rounded-lg px-4 text-lg text-center tracking-[0.4em] font-mono outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                            errors.code
                                ? "border-red-400 focus:ring-red-200"
                                : blocked
                                ? "border-gray-200 bg-gray-50"
                                : "border-gray-200 focus:ring-gray-200"
                        }`}
                    />
                    {errors.code && (
                        <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs"
                        >
                            {errors.code.message}
                        </motion.span>
                    )}
                </div>
 
                {/* Кнопка */}
                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isSubmitting || blocked || !isCodeFull || expired}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Проверяем...
                        </>
                    ) : blocked ? (
                        "Попытки исчерпаны"
                    ) : (
                        "Подтвердить"
                    )}
                </Button>
 
            </form>
 
            {/* Попытки */}
            <div className="mt-4 text-center">
                {blocked ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-500"
                    >
                        Попытки исчерпаны. Попробуйте зарегистрироваться заново.
                    </motion.p>
                ) : attemptsLeft < MAX_ATTEMPTS ? (
                    <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-amber-600"
                    >
                        Осталось попыток: {attemptsLeft}
                    </motion.p>
                ) : (
                    <p className="text-sm text-gray-400">
                        Не получили код? Проверьте папку «Спам»
                    </p>
                )}
            </div>
            <div className="mt-2 text-center">
                {expired ? (
                    <p className="text-sm text-red-500">
                        Код истёк. Попробуйте зарегистрироваться заново.
                    </p>
                ) : (
                    <p className="text-sm text-gray-400">
                        Код действителен ещё {formatted}
                    </p>
                )}
            </div>
    
        </motion.div>
    );
}
