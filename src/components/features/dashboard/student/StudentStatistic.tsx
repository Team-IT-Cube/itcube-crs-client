"use client";

import { motion } from "framer-motion";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Filler,
} from "chart.js";

import { Doughnut, Line, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Filler
);

export default function StudentStatistic() {
    // Пример данных
    const attendance = 82;

    const doughnutData = {
        labels: ["Посещено", "Пропущено"],
        datasets: [
            {
                data: [attendance, 100 - attendance],
                backgroundColor: ["#3b82f6", "#e5e7eb"],
                borderWidth: 0,
                cutout: "78%",
            },
        ],
    };

    const lineData = {
        labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        datasets: [
            {
                label: "Активность",
                data: [3, 5, 4, 7, 6, 8],
                fill: true,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.15)",
                tension: 0.4,
            },
        ],
    };

    const barData = {
        labels: ["HTML", "CSS", "JS", "React", "Next.js"],
        datasets: [
            {
                label: "Прогресс",
                data: [95, 88, 72, 65, 40],
                borderRadius: 12,
                backgroundColor: "#3b82f6",
            },
        ],
    };

    return (
        <div className="grid gap-5 lg:grid-cols-3">
            {/* Attendance Circle */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
            >
                <div className="mb-5">
                    <p className="text-sm text-gray-400">
                        Посещаемость
                    </p>

                    <h2 className="text-xl font-semibold text-gray-900">
                        Общая статистика
                    </h2>
                </div>

                <div className="relative mx-auto h-[220px] w-[220px]">
                    <Doughnut
                        data={doughnutData}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                            maintainAspectRatio: false,
                        }}
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-gray-900">
                            {attendance}%
                        </span>

                        <span className="text-sm text-gray-400">
                            посещено
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Activity Graph */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2"
            >
                <div className="mb-5">
                    <p className="text-sm text-gray-400">
                        Активность
                    </p>

                    <h2 className="text-xl font-semibold text-gray-900">
                        Посещение занятий
                    </h2>
                </div>

                <div className="h-[250px]">
                    <Line
                        data={lineData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                            scales: {
                                x: {
                                    grid: {
                                        display: false,
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        color: "#f3f4f6",
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </motion.div>

            {/* Course Progress */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-3"
            >
                <div className="mb-5">
                    <p className="text-sm text-gray-400">
                        Прогресс по темам
                    </p>

                    <h2 className="text-xl font-semibold text-gray-900">
                        Освоение курса
                    </h2>
                </div>

                <div className="h-[320px]">
                    <Bar
                        data={barData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                            scales: {
                                x: {
                                    grid: {
                                        display: false,
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    max: 100,
                                    grid: {
                                        color: "#f3f4f6",
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
}