"use client"

import * as React from "react"
import {
    ChevronRight,
    CircleQuestionMark,
    GraduationCap,
    Home, KeyRound,
    LogIn,
    MenuIcon,
    UserLock
} from "lucide-react"


import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link";
import LogoutButton from "@/components/features/auth/LogoutButton";
import {useAuthStore} from "@/store/authStore";


export default function MenuMobile() {
    const { isAuthenticated } = useAuthStore();

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <MenuIcon className="h-7 w-7 sm:hidden block" />
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>IT-Cube</DrawerTitle>
                        <DrawerDescription>Меню навигации</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <DrawerClose className="flex justify-between items-center mb-10" asChild>
                            <Link
                                href="/"
                            >
                                <div className="flex items-center gap-5">
                                    <Home className="h-8 w-8" />
                                    <span className="text-xl">Главная</span>
                                </div>
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        </DrawerClose>
                        <DrawerClose className="flex justify-between items-center mb-10" asChild>
                            <Link
                                href="/courses"
                            >
                                <div className="flex items-center gap-5">
                                    <GraduationCap className="h-8 w-8" />
                                    <span className="text-xl">Курсы</span>
                                </div>
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        </DrawerClose>
                        <DrawerClose className="flex justify-between items-center mb-10" asChild>
                            <Link
                                href="/faq"
                            >
                                <div className="flex items-center gap-5">
                                    <CircleQuestionMark className="h-8 w-8" />
                                    <span className="text-xl">FAQ</span>
                                </div>
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        </DrawerClose>
                        {isAuthenticated() ?
                        <DrawerClose className="flex justify-between items-center mb-10" asChild>
                            <Link
                                href="/profile"
                            >
                                <div className="flex items-center gap-5">
                                    <UserLock className="h-8 w-8" />
                                    <span className="text-xl">Кабинет</span>
                                </div>
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        </DrawerClose> : <>
                        <DrawerClose className="flex justify-between items-center mb-10" asChild>
                            <Link
                                href="/register"
                            >
                                <div className="flex items-center gap-5">
                                    <KeyRound className="h-8 w-8" />
                                    <span className="text-xl">Регистрация</span>
                                </div>
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        </DrawerClose>
                        <DrawerClose className="flex justify-between items-center mb-10" asChild>
                            <Link
                                href="/login"
                            >
                                <div className="flex items-center gap-5">
                                    <LogIn className="h-8 w-8" />
                                    <span className="text-xl">Войти</span>
                                </div>
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        </DrawerClose>

                            </>
                        }
                    </div>
                    <DrawerFooter>
                        {isAuthenticated() && <LogoutButton />}
                        <DrawerClose asChild>
                            <Button variant="outline">Закрыть</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

