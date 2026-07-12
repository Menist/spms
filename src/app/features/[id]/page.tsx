import {getFeatures} from "@/entities/feature/repository";
import {getArticles} from "@/entities/article/repository";
import {notFound} from "next/navigation";
import Link from "next/link";

interface FeaturePageProps {
  params: Promise<{ id: string }>;
}

export default async function FeaturePage({params}: FeaturePageProps) {
  const {id} = await params;
  const feature = getFeatures().find((f) => f.id === id);

  if (!feature) {
    notFound();
  }

  const article = feature.articleId
    ? getArticles().find((a) => a.id === feature.articleId)
    : undefined;

  return (
    <main>
      <h1>{feature.name}</h1>

      <div className="card">
        <div className="meta">
          <span className="tag tag--category">{feature.category}</span>{" "}
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

        {feature.comment && <p className="meta">Комментарий: {feature.comment}</p>}

        {feature.comment && <p className="meta">Комментарий: {feature.comment}</p>}

        {article && (
          <p className="meta" style={{marginTop: "8px"}}>
            Статья базы знаний: <Link href={`/knowledge/${article.id}`}>{article.title}</Link>
          </p>
        )}
      </div>
    </main>
  );
}