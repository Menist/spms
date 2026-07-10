import type { Feature } from "../model";

export const conversionTrackingFeature: Feature = {
  id: "conversion-tracking",
  name: "Отслеживание конверсий",
  description: "Настройка событий (отправка форм, клики по кнопкам) для отслеживания целевых действий пользователей.",
  category: "Analytics",
  status: "optional",
  estimatedHours: {min: 2, max: 4},
  priceRange: {min: 60, max: 120},
  articleId: 'conversion-tracking-explained'
};