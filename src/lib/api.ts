import axios from "axios";

import {ApiResponse} from "@/interfaces/api";
import {AuthData, AuthUser, RegisterData} from "@/interfaces/auth";

import {base_url, endpoint} from "@/endpoints";

const instance = axios.create({
    baseURL: `${base_url}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

export async function loginUser(data: AuthData): Promise<AuthUser> {
    const response = await instance.post('/auth/login', data)
    return response.data
}

interface RegisterUserData {
    message: string,
    email: string,
}

export async function registerUser(data: RegisterData): Promise<RegisterUserData> {
    const response = await instance.post('/auth/register', data)
    return response.data
}

export async function serverFetch<T>(
    url: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options?.headers
        },
        ...options
    });

    const json = await response.json();

    if (!response.ok) {
        return {
            data: null,
            statusCode: response.status,
            error: {
                message: response.statusText,
            }
        }
    }

    return {
        data: json,
        statusCode: response.status,
        error: null
    }
}

export const loginUserFetch = (data: AuthData) =>
    serverFetch<AuthUser>(endpoint.authorization, {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const registerUserFetch = (data: RegisterData) =>
    serverFetch<AuthUser>(endpoint.registration, {
        method: 'POST',
        body: JSON.stringify(data),
    });