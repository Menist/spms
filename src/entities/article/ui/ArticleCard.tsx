import type {KnowledgeArticle} from "@/entities/article/model";
import {Collapsible} from "@/shared/ui/Collapsible";

interface ArticleCardProps {
  article: KnowledgeArticle;
}

export function ArticleCard({article}: ArticleCardProps) {
  return (
    <Collapsible summary={article.title}>
      <p>{article.content}</p>
    </Collapsible>
  );
}