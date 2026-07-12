"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {getProjectById} from "@/entities/project/repository";
import {getFeatures} from "@/entities/feature/repository";
import type {Project} from "@/entities/project/model";
import Link from "next/link";

interface TechSpecPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectTechSpecPage({params}: TechSpecPageProps) {
  const {id} = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProject(getProjectById(id) ?? null);
    setIsLoaded(true);
  }, [id]);

  if (!isLoaded) {
    return <main><p className="meta">Загрузка...</p></main>;
  }

  if (!project) {
    return (
      <main>
        <h1>Проект не найден</h1>
        <p className="meta back-link"><Link href="/projects">Вернуться к списку проектов</Link></p>
      </main>
    );
  }

  const projectFeatures = getFeatures().filter((f) => project.featureIds.includes(f.id));

  return (
    <main>
      <h1>Техническое задание: {project.name}</h1>

      <p className="meta back-link">
        <Link href={`/projects/${project.id}`}>← К проекту</Link>
        {" · "}
        <Link href={`/projects/${project.id}/edit`}>Редактировать проект</Link>
      </p>

      {projectFeatures.map((feature) => (
        <section key={feature.id} className="card">
          <h2>{feature.name}</h2>
          <p className="meta">{feature.description}</p>

          {feature.comment && <p className="meta">Примечание: {feature.comment}</p>}

          {feature.estimatedHours && (
            <p className="meta">
              Трудоёмкость: {feature.estimatedHours.min}–{feature.estimatedHours.max} ч.
            </p>
          )}
        </section>
      ))}
    </main>
  );
}