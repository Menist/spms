"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {calculateProjectEstimate} from "@/entities/project/lib/calculate-estimate";
import type {Project} from "@/entities/project/model";
import type {Feature} from "@/entities/feature/model";
import type {FeatureCategory} from "@/entities/feature/category";
import type {Client} from "@/entities/client/model";
import type {ProjectTemplate} from "@/entities/project-template/model";
import type {ProjectBrief} from "@/entities/project-brief/model";
import Link from "next/link";

interface TechSpecPageProps {
  params: Promise<{ id: string }>;
}

const sectionPurposes: Record<string, string> = {
  "Главная": "Первичная презентация компании, основные преимущества и услуги.",
  "О компании": "Информация о компании, её истории и ценностях.",
  "Услуги": "Описание направлений деятельности компании.",
  "Каталог": "Список продукции или услуг с описанием.",
  "Портфолио": "Примеры выполненных работ и проектов.",
  "Цены": "Стоимость услуг или продукции.",
  "Новости": "Актуальные новости и события компании.",
  "Блог": "Регулярные публикации статей по тематике компании.",
  "FAQ": "Ответы на часто задаваемые вопросы клиентов.",
  "Контакты": "Информация о расположении и способах связи.",
};

const contentOwnerLabels: Record<string, string> = {
  client: "Клиент",
  site2u: "SITE2U",
  together: "Совместно",
};

const allMaterialOptions = ["Логотип", "Тексты", "Фотографии", "Видео", "Фирменный стиль", "Домен", "Хостинг"];
const NO_MATERIALS = "Ничего не подготовлено";

const generalRequirements = [
  "Адаптивность — корректное отображение на мобильных устройствах, планшетах и десктопах.",
  "Совместимость с современными браузерами.",
  "Корректная работа на актуальных версиях мобильных ОС.",
];

const nonFunctionalRequirements: Partial<Record<FeatureCategory, {title: string; items: string[]}>> = {
  Performance: {
    title: "Производительность",
    items: ["Оптимизация изображений и статических файлов.", "Быстрая загрузка страниц."],
  },
  Security: {
    title: "Безопасность",
    items: ["Использование защищённого соединения (HTTPS).", "Защита от типовых угроз на уровне заголовков и конфигурации."],
  },
  SEO: {
    title: "SEO",
    items: ["Базовая техническая подготовка для индексации поисковыми системами."],
  },
  Accessibility: {
    title: "Доступность",
    items: ["Соответствие базовым требованиям цифровой доступности."],
  },
};

const scopeExclusions = [
  "Написание уникальных текстов для страниц сайта",
  "Фотографирование и создание иллюстраций",
  "Разработка фирменного стиля и логотипа",
  "Интеграции и функции, не указанные в этом техническом задании",
];

const deliveryStages = [
  "Разработка первой версии сайта.",
  "Проверка результата клиентом.",
  "Внесение правок по замечаниям.",
  "Финальный запуск сайта.",
];

export default function ProjectTechSpecPage({params}: TechSpecPageProps) {
  const {id} = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [allFeatures, setAllFeatures] = useState<Feature[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [brief, setBrief] = useState<ProjectBrief | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const projectRes = await fetch(`/api/projects/${id}`);
      const foundProject = projectRes.ok ? await projectRes.json() : null;
      const features = await fetch("/api/features").then((res) => res.json());
      const loadedClients: Client[] = await fetch("/api/clients").then((res) => res.json());
      const loadedTemplates: ProjectTemplate[] = await fetch("/api/project-templates").then((res) => res.json());
      const briefRes = await fetch(`/api/project-briefs/by-project/${id}`);
      const loadedBrief = briefRes.ok ? await briefRes.json() : undefined;

      setProject(foundProject);
      setAllFeatures(features);
      setClients(loadedClients);
      setTemplates(loadedTemplates);
      setBrief(loadedBrief);
      setIsLoaded(true);
    }

    load();
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

  const client = clients.find((c) => c.id === project.clientId);
  const template = project.templateId
    ? templates.find((t) => t.id === project.templateId)
    : undefined;

  const projectFeatures = allFeatures.filter((f) => project.featureIds.includes(f.id));

  const estimate = calculateProjectEstimate(project, allFeatures);

  const formattedDate = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const clientName = client?.name ?? "клиента";
  const projectGoal = template
    ? `Создание ${template.name.toLowerCase()} для компании «${clientName}», который решает задачи, определённые на этапе брифинга.`
    : `Создание сайта для компании «${clientName}».`;

  const providedMaterials = brief?.materials?.includes(NO_MATERIALS)
    ? []
    : (brief?.materials ?? []);
  const missingMaterials = allMaterialOptions.filter((m) => !providedMaterials.includes(m));

  const presentNonFunctionalCategories = Array.from(
    new Set(projectFeatures.map((f) => f.category))
  ).filter((category): category is keyof typeof nonFunctionalRequirements => Boolean(nonFunctionalRequirements[category]));

  return (
    <main>
      <h1>Техническое задание по проекту «{project.name}»</h1>

      <p className="meta back-link">
        <Link href={`/projects/${project.id}`}>← К проекту</Link>
        {" · "}
        <Link href={`/projects/${project.id}/edit`}>Редактировать проект</Link>
      </p>

      <h2>1. Общая информация</h2>
      <div className="card">
        <p className="meta">Дата формирования: {formattedDate}</p>
        <p className="meta">Версия документа: 1.0</p>
        <p className="meta">Статус: Черновик</p>
        <p className="meta">Название проекта: {project.name}</p>
        {client && <p className="meta">Клиент: {client.name}</p>}
        <p className="meta">Тип проекта: {template ? template.name : "не указан"}</p>
        {brief?.pageCountRange && (
          <p className="meta">Количество страниц: {brief.pageCountRange}</p>
        )}
      </div>

      <h2 style={{marginTop: "24px"}}>2. Цель и задачи проекта</h2>
      <p>{projectGoal}</p>

      {brief?.siteSections && brief.siteSections.length > 0 && (
        <>
          <h2 style={{marginTop: "24px"}}>3. Структура сайта</h2>
          {brief.siteSections.map((section, index) => (
            <div key={section} className="card">
              <h3>3.{index + 1}. {section}</h3>
              <p className="meta">
                Назначение: {sectionPurposes[section] ?? "Назначение раздела уточняется индивидуально."}
              </p>
            </div>
          ))}
        </>
      )}

      {brief && (
        <>
          <h2 style={{marginTop: "24px"}}>4. Подготовка материалов</h2>
          <div className="card">
            {providedMaterials.length > 0 && (
              <p className="meta">Клиент предоставляет: {providedMaterials.join(", ")}</p>
            )}
            {missingMaterials.length > 0 && (
              <p className="meta">Требуется подготовить: {missingMaterials.join(", ")}</p>
            )}
            {brief.contentOwner && (
              <p className="meta">
                Ответственный за наполнение сайта: {contentOwnerLabels[brief.contentOwner]}
              </p>
            )}
          </div>
        </>
      )}

      <h2 style={{marginTop: "24px"}}>5. Общие требования</h2>
      <div className="card">
        {generalRequirements.map((req) => (
          <p key={req} className="meta" style={{marginTop: "6px"}}>• {req}</p>
        ))}
      </div>

      <h2 style={{marginTop: "24px"}}>6. Функциональные требования</h2>
      {projectFeatures.map((feature, index) => (
        <section key={feature.id} className="card">
          <h3>6.{index + 1}. {feature.name}</h3>
          <p className="meta">Назначение: {feature.description}</p>

          {feature.comment && <p className="meta">Примечание: {feature.comment}</p>}

          {feature.estimatedHours && (
            <p className="meta">
              Трудоёмкость: {feature.estimatedHours.min}–{feature.estimatedHours.max} ч.
            </p>
          )}

          {feature.implementationResult && (
            <p className="meta" style={{marginTop: "6px"}}>
              Результат: {feature.implementationResult}
            </p>
          )}
        </section>
      ))}

      {presentNonFunctionalCategories.length > 0 && (
        <>
          <h2 style={{marginTop: "24px"}}>7. Нефункциональные требования</h2>
          {presentNonFunctionalCategories.map((category, index) => {
            const section = nonFunctionalRequirements[category]!;
            return (
              <div key={category} className="card">
                <h3>7.{index + 1}. {section.title}</h3>
                {section.items.map((item) => (
                  <p key={item} className="meta" style={{marginTop: "4px"}}>• {item}</p>
                ))}
              </div>
            );
          })}
        </>
      )}

      <h2 style={{marginTop: "24px"}}>8. Ограничения проекта</h2>
      <div className="card">
        <p className="meta">В стоимость не входит:</p>
        {scopeExclusions.map((item) => (
          <p key={item} className="meta" style={{marginTop: "6px"}}>• {item}</p>
        ))}
      </div>

      <h2 style={{marginTop: "24px"}}>9. Порядок сдачи проекта</h2>
      <div className="card">
        {deliveryStages.map((stage, index) => (
          <p key={stage} className="meta" style={{marginTop: "6px"}}>{index + 1}. {stage}</p>
        ))}
      </div>

      <h2 style={{marginTop: "24px"}}>10. Итоговые параметры</h2>
      <div className="card" style={{borderColor: "var(--color-accent)"}}>
        <p className="meta">Количество функциональных требований: {projectFeatures.length}</p>
        <p className="meta">Расчётная трудоёмкость:</p>
        <p style={{fontSize: "18px", fontWeight: 700}}>
          {estimate.hoursMin}–{estimate.hoursMax} ч.
        </p>
        <p className="meta">Дополнительные работы согласовываются отдельно.</p>
      </div>

      {brief?.additionalNotes && (
        <>
          <h2 style={{marginTop: "24px"}}>11. Дополнительные пожелания клиента</h2>
          <div className="card">
            <p className="meta">{brief.additionalNotes}</p>
          </div>
        </>
      )}
    </main>
  );
}