import Link from "next/link";

export default function AdminPage() {
  return (
    <main>
      <h1>Справочники</h1>

      <p className="meta back-link"><Link href="/">← На главную</Link></p>

      <ul>
        <li className="card">
          <Link href="/admin/features">Функции</Link>
          <p className="meta">Описание, трудоёмкость, стоимость, результат реализации</p>
        </li>
        <li className="card">
          <Link href="/admin/project-templates">Шаблоны проектов</Link>
          <p className="meta">Название и описание типов сайтов</p>
        </li>
        <li className="card">
          <Link href="/admin/articles">База знаний</Link>
          <p className="meta">Статьи для клиентского портала и коммерческих предложений</p>
        </li>
      </ul>
    </main>
  );
}