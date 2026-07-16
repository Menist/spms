import type { Feature } from "../model";

export const yandexMetrikaFeature: Feature = {
  id: "yandex-metrika",
  name: "Яндекс.Метрика",
  description: "Установка счётчика Яндекс.Метрики для сбора статистики посещаемости и поведения пользователей.",
  category: "Analytics",
  status: "included",
  estimatedHours: {min: 1, max: 2},
  priceRange: {min: 30, max: 50},
  articleId: 'yandex-metrika-explained',
  relatedFeatureIds: ['yandex-webmaster', 'conversion-tracking'],
  implementationResult: "Счётчик Яндекс.Метрики установлен на сайте, статистика посещаемости и поведения пользователей доступна в личном кабинете.",
};