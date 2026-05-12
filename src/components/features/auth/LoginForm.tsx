"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {auth} from "@/lib/api";
import {AuthData} from "@/interfaces/api";
import {useState} from "react";

type Status = '' | 'Успешно' | 'Ошибка';

export function LoginForm() {
    const [data, setData] = useState<AuthData>({
        email: "",
        password: "",
    });

    const [status, setStatus] = useState<Status>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const response = await auth(data);

        if (response.status === 200) {
            // token save in cookie
            // setAuth store
            // redirect
            console.log(response);
            setStatus('Успешно');
            setLoading(false);
            return;
        }


        setStatus('Ошибка');
        setLoading(false);
    }
    return (
        <div className="max-w-xl mx-auto border rounded-lg p-6">
            <h1 className="text-4xl font-extrabold mb-3">Авторизация</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">Почта</label>
                    <input
                        className="w-full border h-11 rounded-xl p-3"
                        type="email"
                        id="email"
                        placeholder="example@mail.com"
                        onChange={handleChange}
                        name="email"
                        value={data.email}
                    />
                    <span className="text-red-600">Ошибка</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Пароль</label>
                    <input
                        className="w-full h-11 border rounded-xl p-3"
                        type="password"
                        id="password"
                        placeholder="Пароль"
                        onChange={handleChange}
                        name="password"
                        value={data.password}
                    />
                    <span className="text-red-600">Ошибка</span>
                </div>
                <Button className="cursor-pointer" type="submit">Войти</Button>
                <Link href="/register" className="cursor-pointer mx-3">Регистрация</Link>
                {status === "Успешно" && <span className="text-green-400">{status}</span>}
                {status === "Ошибка" && <span className="text-red-600">{status}</span>}
                {loading ? "Загрузка" : null}
            </form>
        </div>
    )
}