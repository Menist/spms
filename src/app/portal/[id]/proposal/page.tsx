"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {getProjectById} from "@/entities/project/repository";
import {getFeatures} from "@/entities/feature/repository";
import {getArticles} from "@/entities/article/repository";
import {getClients} from "@/entities/client/repository";
import {getProjectTemplates} from "@/entities/project-template/repository";
import {calculateProjectEstimate} from "@/entities/project/lib/calculate-estimate";
import type {Project} from "@/entities/project/model";
import type {FeatureCategory} from "@/entities/feature/category";
import Link from "next/link";

interface PortalProposalPageProps {
  params: Promise<{ id: string }>;
}

const categoryResultLabels: Record<FeatureCategory, string> = {
  SEO: "Базовая SEO-подготовка",
  Security: "Настройка безопасности сайта",
  Analytics: "Настройка аналитики и статистики посещений",
  UI: "Адаптивный дизайн и удобный интерфейс",
  Content: "Разработка основных разделов сайта",
  Performance: "Оптимизация скорости загрузки",
  Accessibility: "Обеспечение доступности сайта",
  Infrastructure: "Базовая техническая настройка",
};

const templateGoalText: Record<string, (clientName: string) => string> = {
  landing: (clientName) =>
    `Разработка современного лендинга для компании «${clientName}», предназначенного для привлечения клиентов и увеличения количества обращений.`,
  corporate: (clientName) =>
    `Разработка современного корпоративного сайта для компании «${clientName}», который расскажет о её услугах и повысит доверие потенциальных клиентов.`,
  promo: (clientName) =>
    `Разработка промо-страницы для компании «${clientName}», предназначенной для продвижения акции или нового предложения.`,
};

const notIncludedItems = [
  "Написание текстов для страниц сайта",
  "Фотографирование и создание иллюстраций",
  "Покупка домена и хостинга",
  "Техническая поддержка после сдачи проекта",
];

export default function PortalProposalPage({params}: PortalProposalPageProps) {
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
    return <main><h1>Проект не найден</h1></main>;
  }

  const allFeatures = getFeatures();
  const allArticles = getArticles();
  const client = getClients().find((c) => c.id === project.clientId);
  const template = project.templateId
    ? getProjectTemplates().find((t) => t.id === project.templateId)
    : undefined;
  const projectFeatures = allFeatures.filter((f) => project.featureIds.includes(f.id));
  const estimate = calculateProjectEstimate(project, allFeatures);

  const formattedDate = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const clientName = client?.name ?? "клиента";
  const projectGoal = template && templateGoalText[template.id]
    ? templateGoalText[template.id](clientName)
    : `Разработка сайта для компании «${clientName}».`;

  const presentCategories = Array.from(new Set(projectFeatures.map((f) => f.category)));

  return (
    <main>
      <h1>Коммерческое предложение</h1>
      <p className="meta">Для компании «{clientName}» · Проект: «{project.name}»</p>
      <p className="meta">Дата: {formattedDate}</p>

      <p style={{marginTop: "20px"}}>
        Здравствуйте!<br/>
        Благодарим за интерес к услугам компании SITE2U. Мы подготовили предложение по разработке вашего сайта.
        Ниже представлен состав работ и стоимость проекта.
      </p>

      <h2 style={{marginTop: "24px"}}>Цель проекта</h2>
      <p>{projectGoal}</p>

      <h2 style={{marginTop: "24px"}}>Что входит</h2>
      <p className="meta">Проект включает следующие основные работы:</p>
      {presentCategories.map((category) => {
        const categoryFeatures = projectFeatures.filter((f) => f.category === category);

        return (
          <details key={category} className="card">
            <summary style={{cursor: "pointer", fontWeight: 600}}>
              ✔ {categoryResultLabels[category]}
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
        );
      })}

      <h2 style={{marginTop: "24px"}}>Ориентировочная стоимость проекта</h2>
      <div className="card" style={{borderColor: "var(--color-accent)"}}>
        <p className="price" style={{fontSize: "20px", fontWeight: 700}}>
          {estimate.priceMin}–{estimate.priceMax} BYN
        </p>
        <p className="meta" style={{marginTop: "6px"}}>
          Стоимость будет уточнена после окончательного согласования состава проекта.
        </p>
      </div>

      <h2 style={{marginTop: "24px"}}>Что не входит</h2>
      <p className="meta">В стоимость проекта не входят:</p>
      <div className="card">
        {notIncludedItems.map((item) => (
          <p key={item} className="meta" style={{marginTop: "6px"}}>• {item}</p>
        ))}
      </div>

      <p className="meta" style={{marginTop: "24px"}}>
        Если предложение вас устраивает, мы подготовим техническое задание, согласуем детали проекта и приступим к разработке.
      </p>

      <h2 style={{marginTop: "24px"}}>Контакты</h2>
      <p className="meta">Если у вас возникнут вопросы по коммерческому предложению, свяжитесь с нами удобным способом.</p>

      <h2 style={{marginTop: "24px"}}>Контакты</h2>
      <div className="card">
        <p className="meta">SITE2U</p>
        <p className="meta">Телефон: +375 (29) 319-52-65</p>
        <p className="meta">Email: imc@imc.by</p>
        <p className="meta">Сайт: site2u.by</p>
      </div>

      <p className="meta" style={{marginTop: "24px"}}>
        <Link href={`/portal/${project.id}`}>← Вернуться к проекту</Link>
      </p>
    </main>
  );
}