"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {getProjectById} from "@/entities/project/repository";
import {getFeatures} from "@/entities/feature/repository";
import {calculateProjectEstimate} from "@/entities/project/lib/calculate-estimate";
import type {Project} from "@/entities/project/model";
import Link from "next/link";

interface ProposalPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectProposalPage({params}: ProposalPageProps) {
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

  const allFeatures = getFeatures();
  const projectFeatures = allFeatures.filter((f) => project.featureIds.includes(f.id));
  const estimate = calculateProjectEstimate(project, allFeatures);

  return (
    <main>
      <h1>Коммерческое предложение: {project.name}</h1>

      <p className="meta back-link">
        <Link href={`/projects/${project.id}`}>← К проекту</Link>
        {" · "}
        <Link href={`/projects/${project.id}/edit`}>Редактировать проект</Link>
      </p>

      <ul>
        {projectFeatures.map((feature) => (
          <li key={feature.id} className="card">
            {feature.name}
          </li>
        ))}
      </ul>

      <div className="summary">
        <p>Общая трудоёмкость: {estimate.hoursMin}–{estimate.hoursMax} ч.</p>
        <p>Стоимость: {estimate.priceMin}–{estimate.priceMax} BYN</p>
      </div>
    </main>
  );
}