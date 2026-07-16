import type { Feature } from "../model";

export const openGraphFeature: Feature = {
  id: "open-graph",
  name: "Open Graph",
  description: "Настройка мета-тегов Open Graph для корректного отображения ссылок при публикации в соцсетях и мессенджерах.",
  category: "SEO",
  status: "included",
  estimatedHours: {min: 1, max: 2},
  priceRange: {min: 30, max: 50},
  articleId: 'open-graph-explained',
  relatedFeatureIds: ['schema-org', 'canonical'],
  implementationResult: "При публикации ссылки на сайт в соцсетях и мессенджерах корректно отображаются заголовок, описание и изображение.",
};