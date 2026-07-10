import Link from "next/link";
import {getProjects} from "@/entities/project/repository";

export default function HomePage() {
  const projects = getProjects();

  return (
    <main>
      <h1>SITE2U Project Management System</h1>

      <h2>Проекты</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>

      <p>
        <Link href="/features">Все фичи</Link>
        {" | "}
        <Link href="/knowledge">База знаний</Link>
      </p>
    </main>
  );
}