import type { Feature } from "../model";

export const portfolioCasesFeature: Feature = {
  id: "portfolio-cases",
  name: "Портфолио/кейсы",
  description: "Раздел с примерами работ или реализованных проектов.",
  category: "Content",
  status: "optional",
  estimatedHours: {min: 4, max: 8},
  priceRange: {min: 120, max: 500},
  articleId: 'portfolio-cases-explained',
  relatedFeatureIds: ['blog-news'],
  implementationResult: "На сайте доступен раздел портфолио с примерами выполненных работ.",
};