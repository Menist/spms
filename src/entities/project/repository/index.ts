import {Project} from "@/entities/project/model";
import {site2uRelaunchProject} from "@/entities/project/data/site2u-relaunch";
import {imcCrmProject} from "@/entities/project/data/imc-crm";
import {loadFromStorage, saveToStorage} from "@/shared/lib/local-storage";

const STORAGE_KEY = "spms:projects";

const seedProjects: Project[] = [
  site2uRelaunchProject,
  imcCrmProject,
];

function readProjects(): Project[] {
  const projects = loadFromStorage<Project>(STORAGE_KEY, seedProjects);

  return projects.map((project) => ({
    ...project,
    status: project.status ?? "active",
  }));
}

function writeProjects(projects: Project[]): void {
  saveToStorage<Project>(STORAGE_KEY, projects);
}

export function getProjects(): Project[] {
  return readProjects();
}

export function getProjectById(id: string): Project | undefined {
  return readProjects().find((project) => project.id === id);
}

export function createProject(project: Project): void {
  writeProjects([...readProjects(), project]);
}

export function updateProject(id: string, updates: Partial<Project>): void {
  const projects = readProjects().map((project) =>
    project.id === id ? {...project, ...updates} : project
  );
  writeProjects(projects);
}

export function deleteProject(id: string): void {
  writeProjects(readProjects().filter((project) => project.id !== id));
}