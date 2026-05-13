"use client";

import Image from "next/image"
import Link from "next/link";

import {useAuthStore} from "@/store/authStore";
import LogoutButton from "@/components/features/auth/LogoutButton";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function Header() {
    const { isAuthenticated } = useAuthStore();
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true)
    }, [])

    return (!isClient ?
        <header className="p-5 shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <Link href="/">
                        <Image width={103} height={112} src="/logo.png" alt="ЦИТ" priority />
                    </Link>
                    <ul className="flex gap-5">
                        <li><Link href="/">Главная</Link></li>
                        <li><Link href="/courses">Курсы</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                        <li><Skeleton className="h-6 w-17"></Skeleton></li>
                        <li><Skeleton className="h-6 w-17"></Skeleton></li>
                    </ul>
                </div>

                <div className="flex gap-3">
                    <Skeleton className="h-6 w-22"></Skeleton>
                    <Skeleton className="h-6 w-22"></Skeleton>
                </div>
            </div>
        </header>
        : <header className="p-5 shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <Link href="/">
                        <Image width={103} height={112} src="/logo.png" alt="ЦИТ" priority />
                    </Link>
                    <ul className="flex gap-5">
                        <li><Link href="/">Главная</Link></li>
                        <li><Link href="/courses">Курсы</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                        {isAuthenticated() && (
                            <li><Link href="/profile">Кабинет</Link></li>
                        )}
                    </ul>
                </div>
                <div>
                    {isAuthenticated() ?
                        <LogoutButton />
                        :
                        <div className="flex gap-3">
                            <Link href="/login">Вход</Link>
                            <Link href="/register">Регистрация</Link>
                        </div>
                    }
                </div>

            </div>
        </header>
    )
}