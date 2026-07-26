"use client";

import {useEffect, useState} from "react";
import type {Project} from "@/entities/project/model";
import Link from "next/link";

export default function ProjectsPage() {
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

  const activeProjects = projects.filter((p) => p.status === "active");

  return (
    <main>
      <h1>Проекты</h1>

      <p className="summary">
        <Link href="/projects/new">+ Новый проект</Link>
        {" · "}
        <Link href="/projects/archived">Архив</Link>
      </p>

      {!isLoaded && <p className="meta">Загрузка...</p>}

      <ul>
        {activeProjects.map((project) => (
          <li key={project.id} className="card">
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}