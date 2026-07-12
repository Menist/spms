export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  requiredFeatureIds: string[];
  optionalFeatureIds: string[];
}