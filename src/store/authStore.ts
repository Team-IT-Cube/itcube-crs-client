import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from "js-cookie";

interface User {
    id: number
    name: string
    email: string
    role: 'student' | 'teacher' | 'admin'
}

interface AuthStore {
    user: User | null
    token: string | null
    setAuth: (user: User, token: string) => void
    logout: () => void
    isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,

            setAuth: (user, token) => {
                Cookies.set('token', token, { expires: 7, secure: true }) // хранится 7 дней
                set({ user, token })
            },

            logout: () => {
                Cookies.remove('token')
                set({ user: null, token: null })
            },

            isAuthenticated: () => get().token !== null,
        }),
        {
            name: 'auth-storage', // ключ в localStorage
        }
    )
)