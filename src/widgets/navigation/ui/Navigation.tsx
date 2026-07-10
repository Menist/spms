import Link from "next/link";

export function Navigation() {
  return (
    <nav>
      <Link href="/">Главная</Link>
      {" | "}
      <Link href="/projects">Проекты</Link>
      {" | "}
      <Link href="/features">Все фичи</Link>
      {" | "}
      <Link href="/knowledge">База знаний</Link>
    </nav>
  );
}