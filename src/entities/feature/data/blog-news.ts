import type { Feature } from "../model";

export const blogNewsFeature: Feature = {
  id: "blog-news",
  name: "Блог/новости",
  description: "Раздел блога или новостей с возможностью добавления и публикации статей.",
  category: "Content",
  status: "optional",
  estimatedHours: {min: 8, max: 16},
  priceRange: {min: 250, max: 500},
  articleId: 'blog-news-explained',
  relatedFeatureIds: ['portfolio-cases'],
};