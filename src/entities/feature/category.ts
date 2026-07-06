export const FEATURE_CATEGORIES = [
  "SEO",
  "Analytics",
  "Security",
  "Performance",
  "Accessibility",
  "Content",
  "Infrastructure",
  "UI",
] as const;
export type FeatureCategory = typeof FEATURE_CATEGORIES[number];