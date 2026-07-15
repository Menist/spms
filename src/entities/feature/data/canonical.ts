import type { Feature } from "../model";

export const canonicalFeature: Feature = {
  id: "canonical",
  name: "Canonical-ссылки",
  description: "Настройка canonical-тегов для предотвращения дублирования контента в поисковой выдаче.",
  category: "SEO",
  status: "included",
  estimatedHours: {min: 1, max: 1},
  priceRange: {min: 20, max: 30},
  articleId: 'canonical-explained',
  relatedFeatureIds: ['schema-org', 'sitemap-xml', 'open-graph'],
};