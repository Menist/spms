import {getFeatures} from "@/entities/repository";

export default function FeaturesPage() {
  const features = getFeatures();

  return (
    <main>
      <h1>Feature Catalog</h1>

      <ul>
        {features.map((feature) => (
          <li key={feature.id}>
            {feature.name}
          </li>
        ))}
      </ul>
    </main>
  );
}