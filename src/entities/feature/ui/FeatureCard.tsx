import type {Feature} from "@/entities/feature/model";
import {getArticles} from "@/entities/article/repository";
import Link from "next/link";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({feature}: FeatureCardProps) {
  const article = getArticles().find((a) => a.id === feature.articleId);

  return (
    <li>
      <h3>
        <Link href={`/features/${feature.id}`}>{feature.name}</Link>
      </h3>
      <p>Статус: {feature.status}</p>
      <p>{feature.description}</p>

      {feature.estimatedHours && (
        <p>
          Оценка: {feature.estimatedHours.min}–{feature.estimatedHours.max} ч.
        </p>
      )}
      {feature.priceRange && (
        <p>
          Стоимость: {feature.priceRange.min}–{feature.priceRange.max} BYN
        </p>
      )}
      {feature.comment && <p>Комментарий: {feature.comment}</p>}

      {article && (
        <p>
          <Link href={`/knowledge/${article.id}`}>Статья: {article.title}</Link>
        </p>
      )}
    </li>
  );
}