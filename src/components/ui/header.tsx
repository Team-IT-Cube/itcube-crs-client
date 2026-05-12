import Image from "next/image"
import Link from "next/link";

export function Header() {
    const isAuth = true;

    return (
        <header className="p-6 border-b">
            <div>
                <Link href="/">
                    <Image
                        width={103}
                        height={112}
                        src="/logo.png"
                        alt="ЦИТ"
                        priority
                    />
                </Link>
                {isAuth ?
                    <ul>
                        <li><Link href="/">Главная</Link></li>
                        <li><Link href="/courses">Курсы</Link></li>
                        <li><Link href="/profile">Кабинет</Link></li>
                    </ul> :
                    <ul>
                        <li><Link href="/">Главная</Link></li>
                        <li><Link href="/courses">Курсы</Link></li>
                    </ul>
                }
            </div>
            <div>
                <Link href="/login">Вход</Link>
                <Link href="/register">Регистрация</Link>
                <Link href="/faq">FAQ</Link>
            </div>
        </header>
    )
}