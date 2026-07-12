export type ProjectStatus = "active" | "archived";

export interface Project {
  id: string;
  name: string;
  clientId: string;
  featureIds: string[];
  status: ProjectStatus;
  comment?: string;
  templateId?: string;
}