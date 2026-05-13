"use client";

import Image from "next/image"
import Link from "next/link";

import {toast} from "sonner";

import {useAuthStore} from "@/store/authStore";
import {Button} from "@/components/ui/button";

export function Header() {
    const { isAuthenticated } = useAuthStore();

    return (
        <header className="p-6 border-b">
            <div>
                <Link href="/">
                    <Image
                        width={103}
                        height={112}
                        src="/logo.png"
                        alt="ЦИТ"
                        priority
                    />
                </Link>
                {!isAuthenticated() ?
                    <ul>
                        <li><Link href="/">Главная</Link></li>
                        <li><Link href="/courses">Курсы</Link></li>
                        <li><Link href="/profile">Кабинет</Link></li>
                    </ul> :
                    <ul>
                        <li><Link href="/">Главная</Link></li>
                        <li><Link href="/courses">Курсы</Link></li>
                    </ul>
                }
            </div>
            <div>
                {!isAuthenticated() ?
                    <>
                        <Link href="/login">Вход</Link>
                        <Link href="/register">Регистрация</Link>
                    </> :
                    <Button className="bg-red-600 cursor-pointer"
                        onClick={() => toast.success("la-la-la")}
                    >
                        Выйти
                    </Button>
                }
                <Link href="/faq">FAQ</Link>
            </div>
        </header>
    )
}