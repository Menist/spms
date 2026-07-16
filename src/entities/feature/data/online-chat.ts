import type { Feature } from "../model";

export const onlineChatFeature: Feature = {
  id: "online-chat",
  name: "Онлайн-чат с менеджером",
  description: "Виджет онлайн-чата для связи с менеджером прямо с сайта.",
  category: "Content",
  status: "optional",
  estimatedHours: {min: 2, max: 4},
  priceRange: {min: 60, max: 120},
  articleId: 'online-chat-explained',
  relatedFeatureIds: ['contact-form'],
  implementationResult: "На сайте работает виджет онлайн-чата для связи посетителей с менеджером.",
};