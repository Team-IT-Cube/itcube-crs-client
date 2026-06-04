"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {useCallback, useEffect, useState} from "react";
import {endpoint} from "@/endpoints";
import Cookie from "js-cookie";
import {Skeleton} from "@/components/ui/skeleton";

const cardVariants: Variants  = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" as const }
    })
}

interface StatProps { id: number }
interface DataStats {
    title: string,
    stats: {
        total: number
        present: number
        percentage: number
    }
}

export default function StudentStatistic({ id }: StatProps) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataStats>({
        title: '',
        stats: {
            total: 0,
            present: 0,
            percentage: 0,
        }
    });

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetch(`${endpoint.attendance}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookie.get("token")}`,
                }
            })
            const json = await response.json();
            setData(json ?? []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [id])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData();
    }, [fetchData])

    if (loading) return (
            <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-xl p-5 space-y-3">
                    <Skeleton className="w-24 h-3" />
                    <Skeleton className="w-16 h-7" />
                    <Skeleton className="w-32 h-3" />
                </div>
                <div className="border border-gray-100 rounded-xl p-5 space-y-3">
                    <Skeleton className="w-24 h-3" />
                    <Skeleton className="w-16 h-7" />
                    <Skeleton className="w-32 h-3" />
                </div>
            </div>
        );

    return (
        <div className="space-y-4">
            {/* Карточки */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    {
                        label: "Средняя посещаемость",
                        value: `${data?.stats?.percentage}%`,
                        sub: "по всем курсам",
                        color: data?.stats?.percentage >= 80 ? "text-green-500" : data?.stats?.percentage >= 60 ? "text-yellow-500" : "text-red-500",
                        class: "border border-gray-100 rounded-xl p-5 col-span-2 text-center"
                    },
                    { label: "Посещено занятий", value: data.stats?.present , sub: `из ${data.stats.total} всего`, class: "border border-gray-100 rounded-xl p-5" },
                    { label: "Пропущено занятий", value: data.stats.total - data.stats.present, sub: "за всё время", class: "border border-gray-100 rounded-xl p-5" },
                ].map((card, i) => (
                    <motion.div
                        key={card.label}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className={card.class}
                    >
                        <p className="text-xs text-gray-400 mb-1">{card.label}</p>
                        <p className={`text-3xl font-semibold ${card.color ?? 'text-gray-900'}`}>{card.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
                    </motion.div>
                ))}
            </div>

            {/* Прогресс бар */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="border border-gray-100 rounded-xl p-5"
            >
                <p className="text-sm font-medium text-gray-900 mb-4">Прогресс бар</p>
                <div className="space-y-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">{data?.title}</span>
                        <span className="text-xs text-gray-400">{data?.stats?.present} из {data?.stats?.total} занятий</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${data?.stats?.percentage}%` }}
                            transition={{ delay: 0.6 * 0.1, duration: 0.5, ease: "easeOut" }}
                            className={`h-1.5 rounded-full ${data?.stats?.percentage >= 80 ? 'bg-green-500' : data?.stats?.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}