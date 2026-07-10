import type { Feature } from "../model";

export const mobileMenuFeature: Feature = {
  id: "mobile-menu",
  name: "Мобильное меню",
  description: "Адаптивное бургер-меню для мобильных устройств.",
  category: "UI",
  status: "included",
  estimatedHours: {min: 2, max: 4},
  priceRange:{min: 60, max: 120},
  articleId: 'mobile-menu-explained'
};