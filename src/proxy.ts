// here check role
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value
    const pathname = request.nextUrl.pathname

    const authRoutes = ["/login", "/register"]
    const privateRoutes = ["/profile"]

    // Авторизованный пользователь не может зайти на login/register
    if (token && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/profile", request.url))
    }

    // Неавторизованный пользователь не может зайти на приватные страницы
    if (!token && privateRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/login", "/register", "/profile"],
}