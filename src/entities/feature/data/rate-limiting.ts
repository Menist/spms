import type {Feature} from "../model";

export const rateLimitingFeature: Feature = {
  id: "rate-limiting",
  name: "Rate Limiting (защита от брутфорса)",
  description: "Ограничение частоты запросов к формам, API и служебным разделам сайта для защиты от подбора паролей и автоматизированных атак.",
  category: "Security",
  status: "included",
  estimatedHours: {min: 1, max: 3},
  priceRange: {min: 50, max: 100},
  relatedFeatureIds: ["security-headers", "recaptcha-antispam"],
  articleId: 'rate-limiting-explained',
  implementationResult: "Настроено ограничение частоты запросов к формам и служебным разделам, снижающее риск подбора паролей и автоматизированных атак.",
};