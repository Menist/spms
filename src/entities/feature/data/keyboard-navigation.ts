import type { Feature } from "../model";

export const keyboardNavigationFeature: Feature = {
  id: "keyboard-navigation",
  name: "Навигация с клавиатуры",
  description: "Обеспечение возможности полноценно пользоваться сайтом с клавиатуры без мыши.",
  category: "Accessibility",
  status: "optional",
  estimatedHours: {min: 2, max: 4},
  priceRange: {min: 60, max: 120},
  articleId: 'keyboard-navigation-explained',
  relatedFeatureIds: ['aria-attributes'],
};