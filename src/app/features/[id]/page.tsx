import {getFeatures} from "@/entities/feature/repository";
import {notFound} from "next/navigation";

interface FeaturePageProps {
  params: Promise<{ id: string }>;
}

export default async function FeaturePage({params}: FeaturePageProps) {
  const {id} = await params;
  const feature = getFeatures().find((f) => f.id === id);

  if (!feature) {
    notFound();
  }

  return (
    <main>
      <h1>{feature.name}</h1>
      <p>Категория: {feature.category}</p>
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
    </main>
  );
}