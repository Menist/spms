import type { Feature } from "../model";

export const securityHeadersFeature: Feature = {
  id: "security-headers",
  name: "HTTP-заголовки безопасности",
  description: "Настройка заголовков X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, HSTS, Referrer-Policy и Permissions-Policy.",
  category: "Security",
  status: "included",
  estimatedHours: {min: 1, max: 2},
  articleId: 'security-headers-explained',
  priceRange:{min: 50, max: 80},
};