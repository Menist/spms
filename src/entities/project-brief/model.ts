export interface ProjectBrief {
  id: string;
  projectId: string;
  pageCountRange?: string;
  siteSections?: string[];
  materials?: string[];
  contentOwner?: "client" | "site2u" | "together";
  desiredDeadline?: string;
  additionalNotes?: string;
}