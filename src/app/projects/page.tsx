import {getProjects} from "@/entities/project/repository";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main>
      <h1>Проекты</h1>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}