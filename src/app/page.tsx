"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import type {Project} from "@/entities/project/model";

export default function HomePage() {
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
    </main>
  );
}