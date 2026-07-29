import {getArticles} from "@/entities/article/repository";
import Link from "next/link";

export default async function AdminArticlesPage() {
  const articles = await getArticles();

  return (
    <main>
      <h1>Справочники: База знаний</h1>

      <p className="meta back-link"><Link href="/">← На главную</Link></p>

      <ul>
        {articles.map((article) => (
          <li key={article.id} className="card">
            <strong>{article.title}</strong>
            <p className="meta">{article.summary}</p>
            <Link href={`/admin/articles/${article.id}/edit`}>Редактировать</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}