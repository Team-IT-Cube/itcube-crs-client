import Link from "next/link";

export default function Home() {
    return (
        <main>
            {/* Hero */}
            <section className="border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                    <div className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full mb-6 border border-black">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.636-6.364l.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M12 21v-1" />
                        </svg>
                        Центр цифрового образования — Батайск
                    </div>

                    <h1 className="text-5xl font-medium text-gray-900 leading-tight mb-4">
                        Твой первый шаг<br />
                        в мир технологий
                    </h1>

                    <p className="text-gray-500 text-lg leading-relaxed max-w-lg mx-auto mb-10">
                        Обучаем детей и подростков от 10 до 17 лет программированию, робототехнике и созданию VR/AR приложений в современном формате
                    </p>

                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Смотреть курсы
                        </Link>
                        <Link
                            href="/faq"
                            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                            Частые вопросы
                        </Link>
                    </div>
                </div>
            </section>

            {/* Направления */}
            <section className="max-w-4xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-medium text-gray-900 mb-3">Направления обучения</h2>
                    <p className="text-gray-500 text-sm">Выбери то что тебе интересно — мы научим остальному</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        {
                            title: "Python разработка",
                            desc: "Основы программирования, алгоритмы и работа с данными",
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            )
                        },
                        {
                            title: "Java разработка",
                            desc: "Объектно-ориентированное программирование и backend",
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                            )
                        },
                        {
                            title: "VR/AR приложения",
                            desc: "Создание виртуальной и дополненной реальности",
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            )
                        },
                        {
                            title: "Робототехника",
                            desc: "Программирование роботов и автоматизация процессов",
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            )
                        },
                        {
                            title: "Мобильная разработка",
                            desc: "Создание приложений для iOS и Android",
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            )
                        },
                        {
                            title: "Большие данные",
                            desc: "Анализ данных, визуализация и машинное обучение",
                            icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            )
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 hover:bg-gray-50 transition-colors group"
                        >
                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-400 transition-colors">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    {item.icon}
                                </svg>
                            </div>
                            <h3 className="font-medium text-gray-900 mb-1 text-sm">{item.title}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                        Записаться на курс
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </section>

        </main>
    );
}