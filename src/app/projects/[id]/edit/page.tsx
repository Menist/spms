"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {useRouter} from "next/navigation";
import {getProjectById, updateProject} from "@/entities/project/repository";
import {getFeatures} from "@/entities/feature/repository";
import {getProjectTemplates} from "@/entities/project-template/repository";
import {getClients} from "@/entities/client/repository";
import type {Feature} from "@/entities/feature/model";
import type {FeatureCategory} from "@/entities/feature/category";
import type {Client} from "@/entities/client/model";
import type {Project, ProjectStage} from "@/entities/project/model";
import Link from "next/link";

interface EditProjectPageProps {
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

export default function EditProjectPage({params}: EditProjectPageProps) {
  const {id} = use(params);
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [featureIds, setFeatureIds] = useState<string[]>([]);
  const [projectName, setProjectName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [comment, setComment] = useState("");
  const [stage, setStage] = useState<ProjectStage>("brief");

  useEffect(() => {
    const found = getProjectById(id) ?? null;
    setProject(found);
    setFeatureIds(found?.featureIds ?? []);
    setProjectName(found?.name ?? "");
    setClientId(found?.clientId ?? "");
    setComment(found?.comment ?? "");
    setClients(getClients());
    setIsLoaded(true);
    setComment(found?.comment ?? "");
    setStage(found?.stage ?? "brief");
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
  const grouped = groupByCategory(allFeatures);

  const template = project.templateId
    ? getProjectTemplates().find((t) => t.id === project.templateId)
    : undefined;
  const requiredFeatureIds = template?.requiredFeatureIds ?? [];

  function toggleFeature(featureId: string) {
    const isCurrentlyIncluded = featureIds.includes(featureId);

    if (isCurrentlyIncluded && requiredFeatureIds.includes(featureId)) {
      const feature = allFeatures.find((f) => f.id === featureId);
      const confirmed = window.confirm(
        `Функция «${feature?.name ?? featureId}» входит в обязательные функции шаблона «${template?.name ?? ""}». Удалить её из проекта?`
      );

      if (!confirmed) return;
    }

    setFeatureIds((current) =>
      isCurrentlyIncluded
        ? current.filter((f) => f !== featureId)
        : [...current, featureId]
    );
  }

  function handleSave() {
    updateProject(id, {name: projectName, clientId, comment, featureIds, stage});
    router.push(`/projects/${id}?saved=true`);
  }

  return (
    <main>
      <h1>Редактирование: {project.name}</h1>

      <p className="meta back-link"><Link href={`/projects/${project.id}`}>← К проекту</Link></p>

      <div className="card">
        <h2>Название проекта</h2>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          style={{width: "100%", padding: "8px", marginTop: "8px"}}
        />
      </div>

      <div className="card">
        <h2>Клиент</h2>
        {clients.length === 0 && <p className="meta">Пока нет ни одного клиента.</p>}
        {clients.map((client) => (
          <label key={client.id} className="checkbox-row">
            <input
              type="radio"
              name="client"
              checked={clientId === client.id}
              onChange={() => setClientId(client.id)}
            />
            {client.name}
          </label>
        ))}
      </div>

      <div className="card">
        <h2>Комментарий проекта</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Например: клиент требует интеграцию с CRM"
          rows={3}
          style={{width: "100%", padding: "8px", marginTop: "8px", fontFamily: "inherit"}}
        />
      </div>
      <div className="card">
        <h2>Этап проекта</h2>
        {([
          {value: "brief", label: "Бриф"},
          {value: "proposal", label: "Коммерческое предложение"},
          {value: "tech-spec", label: "Техническое задание"},
          {value: "development", label: "Разработка"},
          {value: "testing", label: "Тестирование"},
          {value: "launched", label: "Запуск"},
        ] as const).map((option) => (
          <label key={option.value} className="checkbox-row">
            <input
              type="radio"
              name="stage"
              checked={stage === option.value}
              onChange={() => setStage(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>

      {Object.entries(grouped).map(([category, categoryFeatures]) => (
        <div key={category} className="card">
          <h2>{category}</h2>
          {categoryFeatures.map((feature) => (
            <label key={feature.id} className="checkbox-row">
              <input
                type="checkbox"
                checked={featureIds.includes(feature.id)}
                onChange={() => toggleFeature(feature.id)}
              />
              {feature.name}
              {requiredFeatureIds.includes(feature.id) && (
                <span className="meta" style={{marginLeft: "8px"}}>
                  — обязательная функция шаблона
                </span>
              )}
            </label>
          ))}
        </div>
      ))}

      <div className="summary" style={{display: "flex", gap: "8px"}}>
        <button onClick={handleSave} disabled={!projectName}>Сохранить изменения</button>
        <Link href={`/projects/${project.id}`}>
          <button type="button">Отмена</button>
        </Link>
      </div>
    </main>
  );
}