import type { Feature } from "../model";

export const googleSearchConsoleFeature: Feature = {
  id: "google-search-console",
  name: "Google Search Console",
  description: "Подключение и верификация сайта в Google Search Console для контроля индексации и поисковых ошибок.",
  category: "Analytics",
  status: "included",
  estimatedHours: {min: 1, max: 1},
  priceRange: {min: 20, max: 30},
  articleId: 'google-search-console-explained',
  relatedFeatureIds: ['google-analytics'],
  implementationResult: "Сайт подтверждён в Google Search Console, доступны данные об индексации и поисковых ошибках.",
};