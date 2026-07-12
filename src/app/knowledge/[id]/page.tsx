import {getArticles} from "@/entities/article/repository";
import {getFeatures} from "@/entities/feature/repository";
import {notFound} from "next/navigation";
import Link from "next/link";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({params}: ArticlePageProps) {
  const {id} = await params;
  const article = getArticles().find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  const relatedFeatures = getFeatures().filter((f) => f.articleId === article.id);

  return (
    <main>
      <h1>{article.title}</h1>

      <div className="card">
        <p>{article.content}</p>
      </div>

      {relatedFeatures.length > 0 && (
        <>
          <h2 style={{marginTop: "24px"}}>Связанные фичи</h2>
          <ul>
            {relatedFeatures.map((feature) => (
              <li key={feature.id} className="card">
                <Link href={`/features/${feature.id}`}>{feature.name}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}