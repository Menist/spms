import type { Feature } from "../model";

export const sslCertificateFeature: Feature = {
  id: "ssl-certificate",
  name: 'SSL-сертификат',
  description: 'Подключение SSL-сертификата и принудительное перенаправление с HTTP на HTTPS.',
  category: 'Security',
  status: 'included',
  estimatedHours: {min: 1, max: 1},
  priceRange: {min: 50, max: 100},
  articleId: 'ssl-explained',
  relatedFeatureIds: ["security-headers", "content-security-policy"],
  implementationResult: "Сайт работает по HTTPS, данные между пользователем и сервером передаются в зашифрованном виде, браузеры не показывают предупреждений безопасности.",
};