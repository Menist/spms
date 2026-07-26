import type {Feature} from "@/entities/feature/model";
import type {FeatureCategory} from "@/entities/feature/category";
import {Collapsible} from "@/shared/ui/Collapsible";
import {getArticles} from "@/entities/article/repository";
import {getFeatures} from "@/entities/feature/repository";
import {FeatureCard} from "@/entities/feature/ui/FeatureCard";

function groupByCategory(features: Feature[]): Record<FeatureCategory, Feature[]> {
  const result = {} as Record<FeatureCategory, Feature[]>;

  for (const feature of features) {
    if (!result[feature.category]) {
      result[feature.category] = [];
    }
    result[feature.category].push(feature);
  }

  return result;
}

function sumIncludedHours(features: Feature[]): { min: number; max: number } {
  let min = 0;
  let max = 0;

  for (const feature of features) {
    if (feature.status === "included" && feature.estimatedHours) {
      min += feature.estimatedHours.min;
      max += feature.estimatedHours.max;
    }
  }

  return {min, max};
}

export default async function FeaturesPage() {
  const features = await getFeatures();
  const articles = await getArticles();
  const grouped = groupByCategory(features);
  const total = sumIncludedHours(features);

  return (
    <main>
      <h1>Все функции сайта</h1>

      <p className="summary">Итого часов (included): {total.min}–{total.max} ч.</p>

      {Object.entries(grouped).map(([category, categoryFeatures]) => {
        const categoryTotal = sumIncludedHours(categoryFeatures);

        return (
          <Collapsible
            key={category}
            summary={`${category} (${categoryTotal.min}–${categoryTotal.max} ч.)`}
          >
            <ul>
              {categoryFeatures.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} articles={articles} />
              ))}
            </ul>
          </Collapsible>
        );
      })}
    </main>
  );
}