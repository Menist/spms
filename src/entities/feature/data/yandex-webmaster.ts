import type { Feature } from "../model";

export const yandexWebmasterFeature: Feature = {
  id: "yandex-webmaster",
  name: "Яндекс.Вебмастер",
  description: "Подключение и верификация сайта в Яндекс.Вебмастере для контроля индексации в поиске Яндекса.",
  category: "Analytics",
  status: "included",
  estimatedHours: {min: 1, max: 1},
  priceRange: {min: 20, max: 30},
  articleId: 'yandex-webmaster-explained',
  relatedFeatureIds: ['yandex-metrika'],
};