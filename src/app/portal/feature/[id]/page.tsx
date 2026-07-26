import {getFeatures} from "@/entities/feature/repository";
import {getArticles} from "@/entities/article/repository";
import {notFound} from "next/navigation";
import Link from "next/link";

interface PortalFeaturePageProps {
  params: Promise<{ id: string }>;
}

export default async function PortalFeaturePage({params}: PortalFeaturePageProps) {
  const {id} = await params;
  const allFeatures = await getFeatures();
  const feature = allFeatures.find((f) => f.id === id);

  if (!feature) {
    notFound();
  }

  const allArticles = await getArticles();
  const article = feature.articleId
    ? allArticles.find((a) => a.id === feature.articleId)
    : undefined;

  return (
    <main>
      <h1>{feature.name}</h1>

      <div className="card">
        <span className="tag tag--category">{feature.category}</span>

        <p className="meta" style={{marginTop: "8px"}}>{feature.description}</p>

        {feature.implementationResult && (
          <p className="meta" style={{marginTop: "8px"}}>{feature.implementationResult}</p>
        )}

        {article && (
          <p className="meta" style={{marginTop: "8px"}}>
            Статья базы знаний: <Link href={`/knowledge/${article.id}`}>{article.title}</Link>
          </p>
        )}

        {feature.relatedFeatureIds && feature.relatedFeatureIds.length > 0 && (
          <div style={{marginTop: "16px"}}>
            <p className="meta">Связанные возможности:</p>
            <ul>
              {feature.relatedFeatureIds.map((relatedId) => {
                const relatedFeature = allFeatures.find((f) => f.id === relatedId);
                if (!relatedFeature) return null;

                return (
                  <li key={relatedId}>
                    <Link href={`/portal/feature/${relatedFeature.id}`}>{relatedFeature.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}