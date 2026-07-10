import type {KnowledgeArticle} from "@/entities/article/model";

interface ArticleCardProps {
  article: KnowledgeArticle;
}

export function ArticleCard({article}: ArticleCardProps) {
  return (
    <li>
      <h3>{article.title}</h3>
      <p>{article.content}</p>
    </li>
  );
}