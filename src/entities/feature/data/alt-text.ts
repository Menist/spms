import type { Feature } from "../model";

export const altTextFeature: Feature = {
  id: "alt-text",
  name: "Alt-тексты для изображений",
  description: "Заполнение атрибута alt для всех изображений сайта для доступности и SEO.",
  category: "Accessibility",
  status: "included",
  estimatedHours: {min: 1, max: 2},
  priceRange: {min: 30, max: 60},
  articleId: 'alt-text-explained',
  relatedFeatureIds: ['contrast-readability'],
  implementationResult: "Все изображения сайта содержат alt-тексты, описывающие их содержимое для скринридеров и поисковых систем.",
};