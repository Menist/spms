import {ProjectBrief} from "@/entities/project-brief/model";
import {loadFromStorage, saveToStorage} from "@/shared/lib/local-storage";

const STORAGE_KEY = "spms:project-briefs";

function readBriefs(): ProjectBrief[] {
  return loadFromStorage<ProjectBrief>(STORAGE_KEY, []);
}

function writeBriefs(briefs: ProjectBrief[]): void {
  saveToStorage<ProjectBrief>(STORAGE_KEY, briefs);
}

export function getProjectBriefByProjectId(projectId: string): ProjectBrief | undefined {
  return readBriefs().find((brief) => brief.projectId === projectId);
}

export function createProjectBrief(brief: ProjectBrief): void {
  writeBriefs([...readBriefs(), brief]);
}

export function updateProjectBrief(id: string, updates: Partial<ProjectBrief>): void {
  const briefs = readBriefs().map((brief) =>
    brief.id === id ? {...brief, ...updates} : brief
  );
  writeBriefs(briefs);
}