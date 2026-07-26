import type {Feature} from "@/entities/feature/model";
import type {KnowledgeArticle} from "@/entities/article/model";
import Link from "next/link";

interface FeatureCardProps {
  feature: Feature;
  articles: KnowledgeArticle[];
}

export function FeatureCard({feature, articles}: FeatureCardProps) {
  const article = articles.find((a) => a.id === feature.articleId);

  return (
    <li className="card">
      <h3>
        <Link href={`/features/${feature.id}`}>{feature.name}</Link>
      </h3>

      <div className="meta">
        <span className={`tag tag--category`}>{feature.category}</span>{" "}
        <span className={`tag tag--${feature.status}`}>{feature.status}</span>
      </div>

      <p className="meta">{feature.description}</p>

      {feature.estimatedHours && (
        <p className="meta">
          Оценка: {feature.estimatedHours.min}–{feature.estimatedHours.max} ч.
        </p>
      )}

      {feature.priceRange && (
        <p className="price">
          {feature.priceRange.min}–{feature.priceRange.max} BYN
        </p>
      )}

      {feature.comment && <p className="meta">Примечание: {feature.comment}</p>}

      {article && (
        <p className="meta">
          <Link href={`/knowledge/${article.id}`}>Статья: {article.title}</Link>
        </p>
      )}
    </li>
  );
}