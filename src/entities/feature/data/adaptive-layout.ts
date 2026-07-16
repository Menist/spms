import type { Feature } from "../model";

export const adaptiveLayoutFeature: Feature = {
  id: "adaptive-layout",
  name: 'Адаптивная вёрстка',
  description: 'Корректное отображение сайта на мобильных устройствах, планшетах и десктопах.',
  category: 'UI',
  status: 'included',
  estimatedHours: {min: 8, max: 16},
  priceRange:{min: 250, max: 500},
  articleId: 'adaptive-layout-explained',
  relatedFeatureIds: ['mobile-menu'],
  implementationResult: "Сайт корректно отображается на мобильных устройствах, планшетах и десктопах с сохранением удобства использования.",
};