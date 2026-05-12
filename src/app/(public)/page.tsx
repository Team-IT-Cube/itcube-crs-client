import Link from "next/link";

export default function Home() {
    return (
        <main>
            <h1>It-cube цент информационных технологий</h1>
            <p>Здесь становятся лучшими</p>
            <button><Link href="/courses">Наши Курсы</Link></button>
        </main>
    );
}
