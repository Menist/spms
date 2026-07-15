import type { Feature } from "../model";

export const contrastReadabilityFeature: Feature = {
  id: "contrast-readability",
  name: "Контрастность и читаемость",
  description: "Проверка и настройка контрастности текста относительно фона согласно стандартам доступности.",
  category: "Accessibility",
  status: "optional",
  estimatedHours: {min: 1, max: 2},
  priceRange: {min: 30, max: 50},
  articleId: 'contrast-readability-explained',
  relatedFeatureIds: ['alt-text'],
};