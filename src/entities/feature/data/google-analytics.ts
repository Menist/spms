import type { Feature } from "../model";

export const googleAnalyticsFeature: Feature = {
  id: "google-analytics",
  name: 'Google Analytics',
  description: 'Настройка счётчика Google Analytics для сбора статистики посещаемости сайта.',
  category: 'Analytics',
  status: 'included',
  estimatedHours: {min: 1, max: 2},
  priceRange: {min: 50, max: 100},
  articleId: 'google-analytics-explained'
};