export type ProjectStatus = "active" | "archived";
export type ProjectStage = "brief" | "proposal" | "tech-spec" | "development" | "testing" | "launched";

export interface Project {
  id: string;
  name: string;
  clientId: string;
  featureIds: string[];
  status: ProjectStatus;
  comment?: string;
  templateId?: string;
  stage?: ProjectStage;
  updatedAt?: string;
}
