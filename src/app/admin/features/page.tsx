import {getFeatures} from "@/entities/feature/repository";
import Link from "next/link";

export default async function AdminFeaturesPage() {
  const features = await getFeatures();

  return (
    <main>
      <h1>Справочники: Функции</h1>

      <p className="meta back-link"><Link href="/">← На главную</Link></p>

      <ul>
        {features.map((feature) => (
          <li key={feature.id} className="card">
            <span className="tag tag--category">{feature.category}</span>{" "}
            {feature.name}
            {" · "}
            <Link href={`/admin/features/${feature.id}/edit`}>Редактировать</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}