"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import {getProjectById, updateProject, deleteProject} from "@/entities/project/repository";
import {getFeatures} from "@/entities/feature/repository";
import {getClients} from "@/entities/client/repository";
import type {Feature} from "@/entities/feature/model";
import type {FeatureCategory} from "@/entities/feature/category";
import Link from "next/link";
import {getProjectTemplates} from "@/entities/project-template/repository";
import {calculateProjectEstimate} from "@/entities/project/lib/calculate-estimate";
import {getProjectBriefByProjectId} from "@/entities/project-brief/repository";
import {getBriefRecommendations} from "@/entities/project-brief/lib/get-brief-recommendations";
import type {Project} from "@/entities/project/model";
interface ProjectPageProps {
  params: Promise<{ id: string }>;
}
function groupByCategory(features: Feature[]): Record<FeatureCategory, Feature[]> {
  const result = {} as Record<FeatureCategory, Feature[]>;

  for (const feature of features) {
    if (!result[feature.category]) {
      result[feature.category] = [];
    }
    result[feature.category].push(feature);
  }

  return result;
}

export default function ProjectPage({params}: ProjectPageProps) {
  const {id} = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCreatedBanner, setShowCreatedBanner] = useState(false);

  useEffect(() => {
    setProject(getProjectById(id) ?? null);
    setIsLoaded(true);
  }, [id]);

  useEffect(() => {
    if (searchParams.get("created") === "true") {
      setShowCreatedBanner(true);
      router.replace(`/projects/${id}`);
    }
  }, []);

  if (!isLoaded) {
    return <main><p className="meta">Загрузка...</p></main>;
  }

  if (!project) {
    return (
      <main>
        <h1>Проект не найден</h1>
        <p className="meta"><Link href="/projects">Вернуться к списку проектов</Link></p>
      </main>
    );
  }

  const client = getClients().find((c) => c.id === project.clientId);
  const allFeatures = getFeatures();
  const projectFeatures = allFeatures.filter((f) =>
    project.featureIds.includes(f.id)
  );
  const template = project.templateId
    ? getProjectTemplates().find((t) => t.id === project.templateId)
    : undefined;
  const estimate = calculateProjectEstimate(project, allFeatures);
  const brief = getProjectBriefByProjectId(project.id);
  const recommendations = getBriefRecommendations(brief, project.featureIds);

  function toggleArchiveStatus() {
    if (!project) return;

    const newStatus = project.status === "active" ? "archived" : "active";
    updateProject(project.id, {status: newStatus});
    setProject({...project, status: newStatus});
  }
  function handleDeleteProject() {
    if (!project) return;

    const confirmed = window.confirm(
      `Удалить проект «${project.name}» без возможности восстановления?`
    );

    if (confirmed) {
      deleteProject(project.id);
      router.push("/projects");
    }
  }
  function addRecommendedFeature(featureId: string) {
    if (!project) return;

    const updatedFeatureIds = [...project.featureIds, featureId];
    updateProject(project.id, {featureIds: updatedFeatureIds});
    setProject({...project, featureIds: updatedFeatureIds});
  }
  return (
    <main>
      {showCreatedBanner && (
        <div className="card" style={{
          borderColor: "var(--color-included)",
          background: "var(--color-included-bg)",
          marginBottom: "16px",
        }}>
          <p style={{color: "var(--color-included)", fontWeight: 600}}>
            ✓ Проект создан
          </p>
        </div>
      )}

      <h1>{project.name}</h1>

      <p className="meta back-link">
        <Link href="/projects">← Все проекты</Link>
        {" · "}
        <Link href="/projects/new">+ Новый проект</Link>
        {" · "}
        <Link href={`/projects/${project.id}/edit`}>Редактировать проект</Link>
        {" · "}
        <Link href={`/portal/${project.id}`} target="_blank" rel="noopener noreferrer">Открыть клиентский портал</Link>
      </p>

      <p className="meta">
        <button onClick={toggleArchiveStatus}>
          {project.status === "active" ? "Архивировать проект" : "Вернуть из архива"}
        </button>
        {" "}
        <button onClick={handleDeleteProject} className="danger-button">
          Удалить проект
        </button>
      </p>
      <div className="card">
        {client && (
          <p className="meta">
            Клиент: <Link href={`/clients/${client.id}`}>{client.name}</Link>
          </p>
        )}

        <p className="meta">
          Тип: {template ? template.name : "не указан"}
        </p>

        <p className="meta">
          Клиентский портал: <Link href={`/portal/${project.id}`} target="_blank" rel="noopener noreferrer">Открыть</Link>
        </p>

        <p className="meta">
          Функций: {projectFeatures.length}
        </p>

        <p className="meta">
          Трудоёмкость: {estimate.hoursMin}–{estimate.hoursMax} ч.
        </p>

        <p className="meta">
          Стоимость: {estimate.priceMin}–{estimate.priceMax} BYN
        </p>

        {project.comment && (
          <p className="meta">
            Комментарий: {project.comment}
          </p>
        )}
      </div>

      {brief && (
        <div className="card">
          <h2>Бриф проекта</h2>
          {brief.pageCountRange && (
            <p className="meta">Количество страниц: {brief.pageCountRange}</p>
          )}
          {(brief.siteSections?.length ?? 0) > 0 && (
            <p className="meta">Структура сайта: {brief.siteSections?.join(", ")}</p>
          )}
          {(brief.materials?.length ?? 0) > 0 && (
            <p className="meta">Материалы: {brief.materials?.join(", ")}</p>
          )}
          {brief.contentOwner && (
            <p className="meta">
              Наполнение: {
              {client: "Клиент", site2u: "SITE2U", together: "Совместно"}[brief.contentOwner]
            }
            </p>
          )}
          {brief.desiredDeadline && (
            <p className="meta">Желаемый срок: {brief.desiredDeadline}</p>
          )}
          {brief.additionalNotes && (
            <p className="meta">Доп. пожелания: {brief.additionalNotes}</p>
          )}
        </div>
      )}


      {recommendations.length > 0 && (
        <div className="card" style={{borderColor: "var(--color-included)"}}>
          <h2>Рекомендации</h2>
          {recommendations.map((rec) => {
            if (rec.type === "warning") {
              return (
                <p key={rec.id} className="meta" style={{marginTop: "8px", color: "var(--color-optional)"}}>
                  ⚠ {rec.message}
                </p>
              );
            }

            const feature = rec.featureId ? allFeatures.find((f) => f.id === rec.featureId) : undefined;
            if (!feature) return null;

            return (
              <div key={rec.id} style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px"}}>
                <div>
                  <p className="meta">{rec.message}</p>
                  <p>Рекомендуем добавить: <strong>{feature.name}</strong></p>
                </div>
                <button onClick={() => addRecommendedFeature(rec.featureId!)}>Добавить</button>
              </div>
            );
          })}
        </div>
      )}

      <p className="summary">
        <Link href={`/projects/${project.id}/proposal`}>Коммерческое предложение</Link>
        {" · "}
        <Link href={`/projects/${project.id}/tech-spec`}>Техническое задание</Link>
      </p>

      <h2>Состав проекта</h2>

      {Object.entries(groupByCategory(projectFeatures)).map(([category, categoryFeatures]) => (
        <div key={category} className="card">
          <h3>{category} <span className="meta">— {categoryFeatures.length}</span></h3>
          <ul>
            {categoryFeatures.map((feature) => (
              <li key={feature.id}>
                <Link href={`/features/${feature.id}`}>{feature.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}