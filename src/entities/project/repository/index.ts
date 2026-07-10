import {Project} from "@/entities/project/model";
import {site2uRelaunchProject} from "@/entities/project/data/site2u-relaunch";
import {imcCrmProject} from "@/entities/project/data/imc-crm";

const projects: Project[] = [
  site2uRelaunchProject,
  imcCrmProject,
];

export function getProjects(): Project[] {
  return projects;
}