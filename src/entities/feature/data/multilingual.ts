import type { Feature } from "../model";

export const multilingualFeature: Feature = {
  id: "multilingual",
  name: "Многоязычность",
  description: "Переключение языка сайта по кнопке с переводом контента на выбранный язык.",
  category: "Content",
  status: "optional",
  estimatedHours: {min: 8, max: 16},
  priceRange: {min: 250, max: 500},
  articleId: 'multilingual-explained',
  implementationResult: "Посетитель может переключить язык сайта, содержимое отображается на выбранном языке.",
};