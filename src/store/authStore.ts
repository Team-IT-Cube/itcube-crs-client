import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

            setAuth: (user, token) => set({ user, token }),

            logout: () => set({ user: null, token: null }),

            isAuthenticated: () => get().token !== null,
        }),
        {
            name: 'auth-storage', // ключ в localStorage
        }
    )
)