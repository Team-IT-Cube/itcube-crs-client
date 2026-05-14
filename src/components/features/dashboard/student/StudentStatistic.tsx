"use client";

import { motion } from "framer-motion";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import type { TooltipItem } from "chart.js";
import type { Variants } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Моковые данные
const myAttendance = [
    { course: "Python", visited: 8, total: 10 },
    { course: "Java", visited: 5, total: 8 },
    { course: "VR/AR", visited: 6, total: 6 },
];

const myEnrollments = [
    { name: "Подтверждена", value: 2, color: "#22C55E" },
    { name: "Ожидает", value: 1, color: "#EAB308" },
    { name: "Отклонена", value: 0, color: "#EF4444" },
];

const totalVisited = myAttendance.reduce((acc, c) => acc + c.visited, 0);
const totalLessons = myAttendance.reduce((acc, c) => acc + c.total, 0);
const avgPercent = Math.round((totalVisited / totalLessons) * 100);

const cardVariants: Variants  = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" as const }
    })
}

export default function StudentStatistic() {
    const barData = {
        labels: myAttendance.map(c => c.course),
        datasets: [
            {
                label: "Посещаемость %",
                data: myAttendance.map(c => Math.round((c.visited / c.total) * 100)),
                backgroundColor: "#1D9E75",
                borderRadius: 6,
                borderSkipped: false,
            }
        ]
    }

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx: TooltipItem<'bar'>) => {
                        const item = myAttendance[ctx.dataIndex]
                        return `${item.visited} из ${item.total} занятий (${ctx.raw}%)`
                    }
                }
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 }, color: "#9CA3AF" } },
            y: {
                grid: { color: "#F3F4F6" },
                ticks: { font: { size: 11 }, color: "#9CA3AF" },
                max: 100,
            }
        }
    }

    const doughnutData = {
        labels: myEnrollments.filter(e => e.value > 0).map(e => e.name),
        datasets: [
            {
                data: myEnrollments.filter(e => e.value > 0).map(e => e.value),
                backgroundColor: myEnrollments.filter(e => e.value > 0).map(e => e.color),
                borderWidth: 0,
                hoverOffset: 4,
            }
        ]
    }

    const doughnutOptions = {
        responsive: true,
        cutout: "65%",
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: { font: { size: 11 }, color: "#6B7280", boxWidth: 8, borderRadius: 4 }
            },
        }
    }

    return (
        <div className="space-y-4">

            {/* Карточки */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Посещено занятий", value: totalVisited, sub: `из ${totalLessons} всего` },
                    {
                        label: "Средняя посещаемость",
                        value: `${avgPercent}%`,
                        sub: "по всем курсам",
                        color: avgPercent >= 80 ? "text-green-500" : avgPercent >= 60 ? "text-yellow-500" : "text-red-500"
                    },
                    { label: "Пропущено занятий", value: totalLessons - totalVisited, sub: "за всё время" },
                ].map((card, i) => (
                    <motion.div
                        key={card.label}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="border border-gray-100 rounded-xl p-5"
                    >
                        <p className="text-xs text-gray-400 mb-1">{card.label}</p>
                        <p className={`text-3xl font-semibold ${card.color ?? 'text-gray-900'}`}>{card.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
                    </motion.div>
                ))}
            </div>

            {/* Графики */}
            <div className="grid grid-cols-2 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="border border-gray-100 rounded-xl p-5"
                >
                    <p className="text-sm font-medium text-gray-900 mb-4">Моя посещаемость</p>
                    <Bar data={barData} options={barOptions} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="border border-gray-100 rounded-xl p-5"
                >
                    <p className="text-sm font-medium text-gray-900 mb-4">Мои заявки</p>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                </motion.div>
            </div>

            {/* Детали посещаемости */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="border border-gray-100 rounded-xl p-5"
            >
                <p className="text-sm font-medium text-gray-900 mb-4">Детали посещаемости</p>
                <div className="space-y-4">
                    {myAttendance.map((item, i) => {
                        const percent = Math.round((item.visited / item.total) * 100)
                        return (
                            <div key={item.course}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs text-gray-500">{item.course}</span>
                                    <span className="text-xs text-gray-400">{item.visited} из {item.total} занятий</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percent}%` }}
                                        transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                                        className={`h-1.5 rounded-full ${percent >= 80 ? 'bg-green-500' : percent >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </motion.div>

        </div>
    );
}