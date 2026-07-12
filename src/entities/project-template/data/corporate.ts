import type {ProjectTemplate} from "../model";

export const corporateTemplate: ProjectTemplate = {
  id: "corporate",
  name: "Корпоративный сайт",
  description: "многостраничный сайт компании (3–10 страниц): сайт услуг, сайт-визитка, корпоративный сайт — с разделами услуг, портфолио и блогом.",
  requiredFeatureIds: [
    "ssl-certificate",
    "robots-txt",
    "sitemap-xml",
    "canonical",
    "adaptive-layout",
    "mobile-menu",
    "google-analytics",
    "google-search-console",
    "schema-org",
    "contact-form",
    "location-map",
  ],
  optionalFeatureIds: [
    "blog-news",
    "portfolio-cases",
    "multilingual",
    "online-chat",
    "breadcrumbs-microdata",
  ],
};