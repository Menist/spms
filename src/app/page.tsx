"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {getProjects} from "@/entities/project/repository";
import type {Project} from "@/entities/project/model";

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProjects(getProjects());
    setIsLoaded(true);
  }, []);

  return (
    <main>
      <h1>SITE2U Project Management System</h1>

      <h2>Проекты</h2>

      {!isLoaded && <p className="meta">Загрузка...</p>}

      <ul>
        {projects.map((project) => (
          <li key={project.id} className="card">
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>

      <p className="summary">
        <Link href="/features">Все фичи</Link>
        {" · "}
        <Link href="/knowledge">База знаний</Link>
      </p>
    </main>
  );
}