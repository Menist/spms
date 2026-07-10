import type {FeatureCategory} from "@/entities/feature/category";

export type FeatureStatus =
  | "included"
  | "optional"
  | "notRequired";

export interface Feature {
  id: string;
  name: string;
  description: string;
  category: FeatureCategory;
  status: FeatureStatus;
  estimatedHours?: {
    min: number;
    max: number;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  comment?: string;
  articleId?: string;
}