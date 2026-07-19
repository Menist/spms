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
import type {Feature} from "@/entities/feature/model";
import type {FeatureCategory} from "@/entities/feature/category";
import Link from "next/link";

interface ProposalPageProps {
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

export default function ProjectProposalPage({params}: ProposalPageProps) {
  const {id} = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPrintInstructions, setShowPrintInstructions] = useState(false);

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
  const allArticles = getArticles();
  const client = getClients().find((c) => c.id === project.clientId);
  const template = project.templateId
    ? getProjectTemplates().find((t) => t.id === project.templateId)
    : undefined;
  const projectFeatures = allFeatures.filter((f) => project.featureIds.includes(f.id));
  const estimate = calculateProjectEstimate(project, allFeatures);
  const grouped = groupByCategory(projectFeatures);

  const formattedDate = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const presentCategories = Array.from(new Set(projectFeatures.map((f) => f.category)));
  const resultItems = [
    "Разработка сайта",
    ...presentCategories.map((category) => categoryResultLabels[category]),
    "Тестирование и запуск",
  ];

  const clientName = client?.name ?? "клиента";
  const projectGoal = template && templateGoalText[template.id]
    ? templateGoalText[template.id](clientName)
    : `Разработка сайта для компании «${clientName}».`;

  return (
    <main>
      <h1>Коммерческое предложение по проекту «{project.name}»</h1>

      <p className="meta back-link no-print">
        <Link href={`/projects/${project.id}`}>← К проекту</Link>
        {" · "}
        <Link href={`/projects/${project.id}/edit`}>Редактировать проект</Link>
      </p>

      <div className="no-print" style={{marginBottom: "16px"}}>
        <button onClick={() => setShowPrintInstructions(true)}>Экспорт в PDF</button>
      </div>

      {showPrintInstructions && (
        <div
          className="no-print"
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 100,
          }}
        >
          <div className="card" style={{maxWidth: "400px", background: "white"}}>
            <h2>Перед печатью</h2>
            <p className="meta">
              В открывшемся окне печати разверните «Дополнительные настройки» и снимите галочку
              «Колонтитулы» (Headers and footers) — иначе браузер добавит сверху дату, а снизу адрес страницы.
            </p>
            <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
              <button
                onClick={() => {
                  setShowPrintInstructions(false);
                  window.print();
                }}
              >
                Понятно, печатать
              </button>
              <button type="button" onClick={() => setShowPrintInstructions(false)}>Отмена</button>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <p className="meta">Дата формирования: {formattedDate}</p>
        <p className="meta">Статус: Черновик</p>
        <p className="meta">Компания: SITE2U</p>
        {client && <p className="meta">Клиент: {client.name}</p>}
        <p className="meta">Проект: {project.name}</p>
      </div>

      <p style={{marginTop: "20px"}}>
        Благодарим за интерес к услугам компании IMC COMPUTERS!<br/>
        На основании обсуждения требований подготовлено предварительное коммерческое предложение на разработку сайта. Ниже представлен состав работ, ориентировочная трудоёмкость и стоимость проекта.
      </p>

      <h2 style={{marginTop: "24px"}}>Цель проекта</h2>
      <p>{projectGoal}</p>

      <h2 style={{marginTop: "24px"}}>Что входит в стоимость</h2>
      <div className="card">
        {resultItems.map((item) => (
          <p key={item} className="meta" style={{marginTop: "6px"}}>✔ {item}</p>
        ))}
      </div>

      <h2 style={{marginTop: "24px"}}>Детальный состав</h2>
      {Object.entries(grouped).map(([category, categoryFeatures]) => (
        <div key={category} className="card">
          <h3 style={{borderBottom: "1px solid var(--color-border)", paddingBottom: "8px", marginBottom: "8px"}}>
            {category}
          </h3>
          {categoryFeatures.map((feature) => {
            const article = feature.articleId
              ? allArticles.find((a) => a.id === feature.articleId)
              : undefined;

            return (
              <div key={feature.id} style={{marginTop: "10px"}}>
                <p style={{fontWeight: 600}}>✔ {feature.name}</p>
                <p className="meta">{article ? article.summary : feature.description}</p>
              </div>
            );
          })}
        </div>
      ))}

      <h2 style={{marginTop: "24px"}}>Итоги проекта</h2>
      <div className="card" style={{borderColor: "var(--color-accent)"}}>
        <p className="price" style={{fontSize: "20px", fontWeight: 700}}>
          {estimate.priceMin}–{estimate.priceMax} BYN
        </p>
        <p className="meta">Трудоёмкость: {estimate.hoursMin}–{estimate.hoursMax} ч.</p>
      </div>

      <p className="meta" style={{marginTop: "16px"}}>
        Все перечисленные работы подобраны исходя из типа проекта и рекомендуются для создания современного, безопасного и удобного сайта.
      </p>

      <h2 style={{marginTop: "24px"}}>Что не входит</h2>
      <div className="card">
        {notIncludedItems.map((item) => (
          <p key={item} className="meta" style={{marginTop: "6px"}}>• {item}</p>
        ))}
      </div>

      <h2 style={{marginTop: "24px"}}>Контакты</h2>
      <div className="card">
        <p className="meta">SITE2U</p>
        <p className="meta">Телефон: +375 (29) 319-52-65</p>
        <p className="meta">Email: imc@imc.by</p>
        <p className="meta">Сайт: site2u.by</p>
      </div>

      <p className="meta" style={{marginTop: "24px"}}>
        После согласования коммерческого предложения будет подготовлено техническое задание и согласованы сроки выполнения работ.
      </p>

      <div style={{display: "flex", justifyContent: "space-between", marginTop: "32px"}}>
        <div>
          <p className="meta">Составил</p>
          <p style={{fontWeight: 600}}>Новогран С.А.</p>
        </div>
        <div>
          <p className="meta">Место печати</p>
        </div>
      </div>
    </main>
  );
}