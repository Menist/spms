import type { Feature } from "../model";

export const darkLightThemeFeature: Feature = {
  id: "dark-light-theme",
  name: "Тёмная/светлая тема",
  description: "Переключатель между тёмной и светлой темой оформления сайта.",
  category: "UI",
  status: "optional",
  estimatedHours: {min: 4, max: 8},
  priceRange: {min: 150, max: 250},
  articleId: 'dark-light-theme-explained'
};