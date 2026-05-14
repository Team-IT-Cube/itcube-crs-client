import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-gray-100 mt-auto">
            <div className="max-w-4xl mx-auto px-6 py-10">

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

                    {/* Лого и описание */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M7 8l-4 4 4 4M14 4l-4 16" />
                                </svg>
                            </div>
                            <span className="font-medium text-sm text-gray-900">IT-Cube Батайск</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Центр цифрового образования для детей и подростков от 10 до 17 лет
                        </p>
                    </div>

                    {/* Навигация */}
                    <div className="space-y-3">
                        <p className="text-xs font-medium text-gray-900 uppercase tracking-wide">Навигация</p>
                        <ul className="space-y-2">
                            {[
                                { label: "Главная", href: "/" },
                                { label: "Курсы", href: "/courses" },
                                { label: "FAQ", href: "/faq" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Контакты */}
                    <div className="space-y-3">
                        <p className="text-xs font-medium text-gray-900 uppercase tracking-wide">Контакты</p>
                        <ul className="space-y-2">
                            <li className="text-xs text-gray-400">г. Батайск, Ростовская область</li>
                            <li>
                                <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                                    ВКонтакте
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Нижняя строка */}
                <div className="border-t border-gray-100 pt-6 flex items-center justify-between flex-wrap gap-2">
                    <p className="text-xs text-gray-400">© 2026 IT-Cube Батайск. Все права защищены.</p>
                    <p className="text-xs text-gray-300">Центр цифрового образования</p>
                </div>

            </div>
        </footer>
    )
}
