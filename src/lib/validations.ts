// here zod validation
import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(1, "Введите пароль"),
})

export const registerSchema = z.object({
    name: z.string().min(2, "Минимум 2 символа"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(8, "Минимум 8 символов"),
    password_confirmation: z.string().min(1, "Подтвердите пароль"),
}).refine(data => data.password === data.password_confirmation, {
    message: "Пароли не совпадают",
    path: ["password_confirmation"],
})

export const verifyCodeSchema = z.object({
    code: z.string()
        .min(6, "Должно быть не менее 6 цифр")
        .max(6, "Должно быть не более 6 цифр")
})