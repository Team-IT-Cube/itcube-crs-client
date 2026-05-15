import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from "js-cookie";
import {User} from "@/interfaces/user";

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
                Cookies.set('token', token, { expires: 7 }) // хранится 7 дней
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