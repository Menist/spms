import type { Feature } from "../model";

export const ariaAttributesFeature: Feature = {
  id: "aria-attributes",
  name: "ARIA-атрибуты",
  description: "Добавление ARIA-атрибутов для интерактивных элементов, чтобы сайт корректно работал со скринридерами.",
  category: "Accessibility",
  status: "optional",
  priceRange: {min: 60, max: 120},
  estimatedHours: {min: 2, max: 4},
  articleId: 'aria-attributes-explained'
};