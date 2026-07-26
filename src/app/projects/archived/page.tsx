"use client";

import {useEffect, useState} from "react";
import type {Project} from "@/entities/project/model";
import Link from "next/link";

export default function ArchivedProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setIsLoaded(true);
      });
  }, []);

  const archivedProjects = projects.filter((p) => p.status === "archived");

  return (
    <main>
      <h1>Архив проектов</h1>

      <p className="meta back-link">
        <Link href="/projects">← Активные проекты</Link>
      </p>

      {!isLoaded && <p className="meta">Загрузка...</p>}
      {isLoaded && archivedProjects.length === 0 && (
        <p className="meta">В архиве пока пусто.</p>
      )}

      <ul>
        {archivedProjects.map((project) => (
          <li key={project.id} className="card">
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}