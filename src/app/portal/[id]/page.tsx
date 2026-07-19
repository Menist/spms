"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {getProjectById} from "@/entities/project/repository";
import {getFeatures} from "@/entities/feature/repository";
import {getArticles} from "@/entities/article/repository";
import {getClients} from "@/entities/client/repository";
import {getProjectTemplates} from "@/entities/project-template/repository";
import {getProjectBriefByProjectId} from "@/entities/project-brief/repository";
import {calculateProjectEstimate} from "@/entities/project/lib/calculate-estimate";
import type {Project} from "@/entities/project/model";
import type {Feature} from "@/entities/feature/model";
import type {FeatureCategory} from "@/entities/feature/category";
import Link from "next/link";

interface PortalPageProps {
  params: Promise<{ id: string }>;
}

const statusLabels: Record<string, string> = {
  active: "В работе",
  archived: "Завершён",
};

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

export default function PortalPage({params}: PortalPageProps) {
  const {id} = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const stageOrder: {value: string; label: string}[] = [
    {value: "brief", label: "Бриф"},
    {value: "proposal", label: "Коммерческое предложение"},
    {value: "tech-spec", label: "Техническое задание"},
    {value: "development", label: "Разработка"},
    {value: "testing", label: "Тестирование"},
    {value: "launched", label: "Запуск"},
  ];

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
        <p className="meta">Проверьте правильность ссылки.</p>
      </main>
    );
  }

  const client = getClients().find((c) => c.id === project.clientId);
  const allFeatures = getFeatures();
  const allArticles = getArticles();
  const projectFeatures = allFeatures.filter((f) => project.featureIds.includes(f.id));
  const template = project.templateId
    ? getProjectTemplates().find((t) => t.id === project.templateId)
    : undefined;
  const brief = getProjectBriefByProjectId(project.id);
  const estimate = calculateProjectEstimate(project, allFeatures);
  const grouped = groupByCategory(projectFeatures);

  return (
    <main>
      <h1>Здравствуйте{client ? `, ${client.name}` : ""}!</h1>

      <div className="card">
        <p className="meta">Ваш проект</p>
        <h2>{project.name}</h2>
        <p className="meta">Статус: {statusLabels[project.status] ?? project.status}</p>
        {template && <p className="meta">Тип проекта: {template.name}</p>}
        {project.updatedAt && (
          <p className="meta">
            Последнее обновление: {new Date(project.updatedAt).toLocaleDateString("ru-RU", {
            day: "numeric", month: "long", year: "numeric",
          })}
          </p>
        )}
      </div>

      <h2 style={{marginTop: "24px"}}>Этап проекта</h2>
      <div className="card">
        {stageOrder.map((stageItem, index) => {
          const currentIndex = stageOrder.findIndex((s) => s.value === (project.stage ?? "brief"));
          const icon = index < currentIndex ? "✓" : index === currentIndex ? "●" : "○";

          return (
            <p key={stageItem.value} className="meta" style={{marginTop: "4px"}}>
              {icon} {stageItem.label}
            </p>
          );
        })}
      </div>

      {brief?.siteSections && brief.siteSections.length > 0 && (
        <>
          <h2 style={{marginTop: "24px"}}>Структура сайта</h2>
          <div className="card">
            {brief.siteSections.map((section) => (
              <p key={section} className="meta" style={{marginTop: "4px"}}>✓ {section}</p>
            ))}
          </div>
        </>
      )}

      <h2 style={{marginTop: "24px"}}>Что входит в проект</h2>
      {Object.entries(grouped).map(([category, categoryFeatures]) => (
        <details key={category} className="card">
          <summary style={{cursor: "pointer", fontWeight: 600}}>
            {category} <span className="meta">— {categoryFeatures.length} функций</span>
          </summary>
          <div style={{marginTop: "8px"}}>
            {categoryFeatures.map((feature) => {
              const article = feature.articleId
                ? allArticles.find((a) => a.id === feature.articleId)
                : undefined;

              return (
                <p key={feature.id} className="meta" style={{marginTop: "4px"}}>
                  ✓{" "}
                  {article ? (
                    <a href={`/portal/knowledge/${article.id}`} target="_blank" rel="noopener noreferrer">
                      {feature.name} ↗
                    </a>
                  ) : (
                    feature.name
                  )}
                </p>
              );
            })}
          </div>
        </details>
      ))}

      <div className="card" style={{marginTop: "24px", borderColor: "var(--color-accent)"}}>
        <p className="meta">Ориентировочная стоимость</p>
        <p className="price" style={{fontSize: "18px", fontWeight: 700}}>
          {estimate.priceMin}–{estimate.priceMax} BYN
        </p>
        <p className="meta" style={{marginTop: "6px"}}>
          Стоимость будет уточнена после окончательного согласования технического задания.
        </p>
      </div>

      <h2 style={{marginTop: "24px"}}>Документы</h2>
      <div className="card" style={{maxWidth: "300px"}}>
        <p style={{fontWeight: 600}}>📄 Коммерческое предложение</p>
        <Link href={`/portal/${project.id}/proposal`}>Открыть</Link>
      </div>
    </main>
  );
}