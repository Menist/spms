import type {Feature} from "../model";

export const recaptchaAntispamFeature: Feature = {
  id: "recaptcha-antispam",
  name: "reCAPTCHA / антиспам-защита форм",
  description: "Защита форм обратной связи от спама и автоматических ботов с помощью reCAPTCHA или аналогичного механизма.",
  category: "Security",
  status: "included",
  estimatedHours: {min: 1, max: 2},
  priceRange: {min: 30, max: 60},
  relatedFeatureIds: ["contact-form", "rate-limiting"],
  articleId: 'recaptcha-antispam-explained',
};