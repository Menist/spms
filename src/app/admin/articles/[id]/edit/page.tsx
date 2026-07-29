"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {useRouter} from "next/navigation";
import type {KnowledgeArticle} from "@/entities/article/model";
import Link from "next/link";

interface AdminEditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditArticlePage({params}: AdminEditArticlePageProps) {
  const {id} = use(params);
  const router = useRouter();

  const [article, setArticle] = useState<KnowledgeArticle | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function load() {
      const allArticles: KnowledgeArticle[] = await fetch("/api/articles").then((res) => res.json());
      const found = allArticles.find((a) => a.id === id) ?? null;

      setArticle(found);
      setTitle(found?.title ?? "");
      setSummary(found?.summary ?? "");
      setContent(found?.content ?? "");
      setIsLoaded(true);
    }

    load();
  }, [id]);

  async function handleSave() {
    await fetch(`/api/admin/articles/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({title, summary, content}),
    });
    router.push("/admin/articles");
  }

  if (!isLoaded) {
    return <main><p className="meta">Загрузка...</p></main>;
  }

  if (!article) {
    return (
      <main>
        <h1>Статья не найдена</h1>
        <p className="meta back-link"><Link href="/admin/articles">Вернуться к списку</Link></p>
      </main>
    );
  }

  return (
    <main>
      <h1>Редактирование: {article.title}</h1>

      <p className="meta back-link"><Link href="/admin/articles">← К списку статей</Link></p>

      <div className="card" style={{display: "flex", flexDirection: "column", gap: "8px"}}>
        <label className="meta">Заголовок</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{padding: "8px"}}
        />

        <label className="meta">Краткое описание (для клиента)</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={2}
          style={{padding: "8px", fontFamily: "inherit"}}
        />

        <label className="meta">Полный текст статьи</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          style={{padding: "8px", fontFamily: "inherit"}}
        />
      </div>

      <div className="summary" style={{display: "flex", gap: "8px", marginTop: "16px"}}>
        <button onClick={handleSave} disabled={!title}>Сохранить изменения</button>
        <Link href="/admin/articles">
          <button type="button">Отмена</button>
        </Link>
      </div>
    </main>
  );
}