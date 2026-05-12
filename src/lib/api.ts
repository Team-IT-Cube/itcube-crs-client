import axios from "axios";
import {AuthData, RegisterData} from "@/interfaces/api";

const server = "http://localhost:8000/api";

interface ResponseData {
    data: any;
    status: number;
    statusText: string;
}

export async function auth(data: AuthData): Promise<ResponseData> {
    try {
        const response = await axios.post(`${server}/auth/login`, {
            email: data.email,
            password: data.password,
        });

        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
        };
    } catch(err) {
        return {
            data: err,
            status: 500,
            statusText: "Internal Server Error",
        }
    }
}

export async function registration(data: RegisterData): Promise<ResponseData> {
    try {
        const response = await axios.post(`${server}/auth/register`, {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
        });

        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
        };
    } catch(err) {
        return {
            data: err,
            status: 500,
            statusText: "Internal Server Error",
        }
    }
}