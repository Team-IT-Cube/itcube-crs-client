// components/layout/Header.tsx
"use client";

import Image from "next/image"
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import LogoutButton from "@/components/features/auth/LogoutButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const navLinks = [
    { label: "Главная", href: "/" },
    { label: "Курсы", href: "/courses" },
    { label: "FAQ", href: "/faq" },
]

export default function Header() {
    const { isAuthenticated } = useAuthStore();
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true)
    }, [])

    return (
        <header className="border-b border-gray-100 px-6 py-3 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
            <div className="max-w-5xl mx-auto flex items-center justify-between">

                {/* Левая часть — лого и навигация */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <Image width={32} height={35} src="/logo.png" alt="IT-Cube" priority />
                        <span className="font-medium text-sm text-gray-900 hidden sm:block">IT-Cube Батайск</span>
                    </Link>

                    <nav>
                        <ul className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            {isClient && isAuthenticated() && (
                                <li>
                                    <Link
                                        href="/profile"
                                        className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        Кабинет
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>

                {/* Правая часть — кнопки */}
                <div className="flex items-center gap-2">
                    {!isClient ? (
                        <>
                            <Skeleton className="h-8 w-16 rounded-lg" />
                            <Skeleton className="h-8 w-28 rounded-lg" />
                        </>
                    ) : isAuthenticated() ? (
                        <LogoutButton />
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Войти
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Зарегистрироваться
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </header>
    )
}