import type { Feature } from "../model";

export const scrollAnimationsFeature: Feature = {
  id: "scroll-animations",
  name: "Анимации при скролле",
  description: "Плавное появление элементов при прокрутке страницы.",
  category: "UI",
  status: "optional",
  estimatedHours: {min: 2, max: 4},
  priceRange: {min: 60, max: 120},
  articleId: 'scroll-animations-explained',
  relatedFeatureIds: ['dark-light-theme', 'carousel-slider'],
  implementationResult: "Элементы страницы плавно появляются при прокрутке, что делает восприятие сайта более живым.",
};