import type {Feature} from "../model";

export const contentSecurityPolicyFeature: Feature = {
  id: "content-security-policy",
  name: "Content Security Policy (CSP)",
  description: "Настройка политики безопасности контента для защиты от XSS и инъекций. Разрешает загрузку ресурсов только с доверенных источников.",
  category: "Security",
  status: "included",
  estimatedHours: {min: 2, max: 4},
  comment: "Список доверенных источников настраивается индивидуально под используемые сервисы (аналитика, CDN, формы).",
  articleId: 'csp-explained',
  priceRange: {min: 80, max: 150},
  relatedFeatureIds: ["security-headers", "rate-limiting"],
  implementationResult: "Настроена политика CSP, ограничивающая источники загрузки скриптов и стилей, что снижает риск внедрения вредоносного кода.",
};