import {User} from "@/interfaces/user";

export interface AuthData {
    email: string,
    password: string
}

export interface RegisterData {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

export interface VerifyCode {
    code: string,
}

export interface AuthUser {
    user: User
    token: string
}