import {getArticles} from "@/entities/article/repository";
import {ArticleCard} from "@/entities/article/ui/ArticleCard";

export default async function KnowledgePage() {
  const articles = await getArticles();

  return (
    <main>
      <h1>Knowledge Base</h1>

      <ul>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ul>
    </main>
  );
}