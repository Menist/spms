import type {ProjectTemplate} from "../model";

export const landingTemplate: ProjectTemplate = {
  id: "landing",
  name: "Лендинг",
  description: "одностраничный сайт для презентации услуги или продукта.",
  requiredFeatureIds: [
    "ssl-certificate",
    "robots-txt",
    "sitemap-xml",
    "adaptive-layout",
    "mobile-menu",
    "google-analytics",
    "contact-form",
  ],
  optionalFeatureIds: [
    "multilingual",
    "online-chat",
    "carousel-slider",
    "scroll-animations",
  ],
};