import Link from "next/link";

export function Navigation() {
  return (
    <nav className="nav">
      <Link href="/">Главная</Link>
      <Link href="/projects">Проекты</Link>
      <Link href="/clients">Клиенты</Link>
      <Link href="/features">Возможности сайта</Link>
      <Link href="/knowledge">База знаний</Link>
      <Link href="/admin">Справочники (admin)</Link>
    </nav>
  );
}