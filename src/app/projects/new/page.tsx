"use client";

import {Suspense, useEffect, useState} from "react";
import type {Feature} from "@/entities/feature/model";
import type {ProjectTemplate} from "@/entities/project-template/model";
import type {BriefQuestionOption} from "@/entities/brief-question/model";
import {useRouter, useSearchParams} from "next/navigation";
import {Client} from "@/entities/client/model";

const transliterationMap: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
  ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function transliterate(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((char) => transliterationMap[char] ?? char)
    .join("");
}

function toKebabId(text: string): string {
  return transliterate(text)
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function generateUniqueId(baseText: string, existingIds: string[]): string {
  const baseId = toKebabId(baseText);
  let finalId = baseId;
  let counter = 2;

  while (existingIds.includes(finalId)) {
    finalId = `${baseId}-${counter}`;
    counter++;
  }

  return finalId;
}

function getSuggestedFeatureIds(
  checkedOptionalIds: string[],
  template: ProjectTemplate | undefined,
  allFeatures: Feature[]
): string[] {
  if (!template) return [];

  const suggested = new Set<string>();

  for (const checkedId of checkedOptionalIds) {
    const feature = allFeatures.find((f) => f.id === checkedId);
    if (!feature?.relatedFeatureIds) continue;

    for (const relatedId of feature.relatedFeatureIds) {
      const alreadyIncluded =
        template.requiredFeatureIds.includes(relatedId) ||
        checkedOptionalIds.includes(relatedId);
      const availableAsOptional = template.optionalFeatureIds.includes(relatedId);

      if (!alreadyIncluded && availableAsOptional) {
        suggested.add(relatedId);
      }
    }
  }

  return Array.from(suggested);
}

const structureStepTitles: Record<string, string> = {
  corporate: "Структура сайта",
  landing: "Структура лендинга",
  promo: "Структура промо-страницы",
};

const TEMPLATES_WITH_PAGE_COUNT = ["corporate"];

function NewProjectPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [briefOptions, setBriefOptions] = useState<BriefQuestionOption[]>([]);

  const [clientMode, setClientMode] = useState<"existing" | "new">("existing");

  const [step, setStep] = useState(1);
  const [clientId, setClientId] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newClientContactPerson, setNewClientContactPerson] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientReason, setNewClientReason] = useState("");

  const [projectName, setProjectName] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [pageCountRange, setPageCountRange] = useState("");
  const [siteSections, setSiteSections] = useState<string[]>([]);
  const [optionalFeatureIds, setOptionalFeatureIds] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [contentOwner, setContentOwner] = useState<"client" | "site2u" | "together" | "">("");
  const [desiredDeadline, setDesiredDeadline] = useState("");
  const [deadlineType, setDeadlineType] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    async function load() {
      const loadedClients: Client[] = await fetch("/api/clients").then((res) => res.json());
      const loadedFeatures = await fetch("/api/features").then((res) => res.json());
      const loadedTemplates: ProjectTemplate[] = await fetch("/api/project-templates").then((res) => res.json());
      const loadedBriefOptions: BriefQuestionOption[] = await fetch("/api/brief-questions").then((res) => res.json());

      setClients(loadedClients);
      setFeatures(loadedFeatures);
      setTemplates(loadedTemplates);
      setTemplateId(loadedTemplates[0]?.id ?? "");
      setBriefOptions(loadedBriefOptions);

      const clientIdFromUrl = searchParams.get("clientId");
      const matchedClient = loadedClients.find((c) => c.id === clientIdFromUrl);

      if (matchedClient) {
        setClientId(matchedClient.id);
        setClientMode("existing");
      } else {
        setClientId(loadedClients[0]?.id ?? "");
      }
    }

    load();
  }, []);

  const siteSectionOptions = briefOptions.filter((o) => o.questionKey === "siteSections");
  const materialOptions = briefOptions.filter((o) => o.questionKey === "materials" && !o.isExclusive);
  const exclusiveMaterialOption = briefOptions.find((o) => o.questionKey === "materials" && o.isExclusive);
  const pageCountOptions = briefOptions.filter((o) => o.questionKey === "pageCount");
  const deadlineOptions = briefOptions.filter((o) => o.questionKey === "deadline");

  const selectedTemplate = templates.find((t) => t.id === templateId);
  const needsPageCount = selectedTemplate ? TEMPLATES_WITH_PAGE_COUNT.includes(selectedTemplate.id) : false;
  const suggestedFeatureIds = getSuggestedFeatureIds(optionalFeatureIds, selectedTemplate, features);

  function goToStepAfterType() {
    setStep(needsPageCount ? 4 : 5);
  }

  function goBackFromRequiredFeatures() {
    setStep(needsPageCount ? 4 : 3);
  }

  function toggleSiteSection(section: string) {
    setSiteSections((current) =>
      current.includes(section) ? current.filter((s) => s !== section) : [...current, section]
    );
  }

  function toggleOptionalFeature(featureId: string) {
    if (optionalFeatureIds.includes(featureId)) {
      setOptionalFeatureIds(optionalFeatureIds.filter((id) => id !== featureId));
    } else {
      setOptionalFeatureIds([...optionalFeatureIds, featureId]);
    }
  }

  function toggleMaterial(label: string, isExclusive: boolean) {
    if (isExclusive) {
      setMaterials((current) => (current.includes(label) ? [] : [label]));
      return;
    }

    setMaterials((current) => {
      const withoutExclusive = exclusiveMaterialOption
        ? current.filter((m) => m !== exclusiveMaterialOption.label)
        : current;

      return withoutExclusive.includes(label)
        ? withoutExclusive.filter((m) => m !== label)
        : [...withoutExclusive, label];
    });
  }

  async function handleCreateProject() {
    if (!selectedTemplate) return;

    let finalClientId = clientId;

    if (clientMode === "new") {
      const existingClients = await fetch("/api/clients").then((res) => res.json());
      const existingClientIds = existingClients.map((c: {id: string}) => c.id);
      const newId = generateUniqueId(newClientName, existingClientIds);

      await fetch("/api/clients", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: newId,
          name: newClientName,
          contactPerson: newClientContactPerson,
          phone: newClientPhone,
          contactDate: new Date().toISOString().slice(0, 10),
          contactReason: newClientReason,
        }),
      });

      finalClientId = newId;
    }

    const existingProjects = await fetch("/api/projects").then((res) => res.json());
    const existingProjectIds = existingProjects.map((p: {id: string}) => p.id);
    const newProjectId = generateUniqueId(projectName, existingProjectIds);

    await fetch("/api/projects", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: newProjectId,
        name: projectName,
        clientId: finalClientId,
        featureIds: [...selectedTemplate.requiredFeatureIds, ...optionalFeatureIds],
        status: "active",
        templateId: selectedTemplate.id,
      }),
    });

    await fetch("/api/project-briefs", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: generateUniqueId(`brief-${newProjectId}`, []),
        projectId: newProjectId,
        pageCountRange: needsPageCount ? pageCountRange : undefined,
        siteSections,
        materials,
        contentOwner: contentOwner || undefined,
        desiredDeadline,
        additionalNotes,
      }),
    });

    router.push(`/projects/${newProjectId}?created=true`);
  }

  const canProceedFromStep1 =
    clientMode === "existing" ? Boolean(clientId) : Boolean(newClientName);

  return (
    <main>
      <h1>Новый проект</h1>

      {step === 1 && (
        <div className="card">
          <h2>Клиент</h2>

          <div className="toggle-group">
            <button
              className={`toggle-button ${clientMode === "existing" ? "toggle-button--active" : ""}`}
              onClick={() => setClientMode("existing")}
            >
              Выбрать существующего
            </button>
            <button
              className={`toggle-button ${clientMode === "new" ? "toggle-button--active" : ""}`}
              onClick={() => setClientMode("new")}
              disabled={newClientName.trim().length > 0}
            >
              Добавить нового
            </button>
          </div>

          {clientMode === "existing" && (
            <>
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
            </>
          )}

          {clientMode === "new" && (
            <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
              <input
                type="text"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                placeholder="Название компании"
                style={{padding: "8px"}}
              />
              <input
                type="text"
                value={newClientContactPerson}
                onChange={(e) => setNewClientContactPerson(e.target.value)}
                placeholder="Контактное лицо"
                style={{padding: "8px"}}
              />
              <input
                type="text"
                value={newClientPhone}
                onChange={(e) => setNewClientPhone(e.target.value)}
                placeholder="Телефон"
                style={{padding: "8px"}}
              />
              <input
                type="text"
                value={newClientReason}
                onChange={(e) => setNewClientReason(e.target.value)}
                placeholder="Причина обращения"
                style={{padding: "8px"}}
              />
            </div>
          )}

          <div style={{marginTop: "16px"}}>
            <button onClick={() => setStep(2)} disabled={!canProceedFromStep1}>Далее</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2>Название проекта</h2>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Например: Сайт для кафе «Ромашка»"
            style={{width: "100%", padding: "8px", marginTop: "8px"}}
          />
          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={() => setStep(1)}>Назад</button>
            <button onClick={() => setStep(3)} disabled={!projectName}>Далее</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h2>Тип сайта</h2>
          {templates.map((template) => (
            <label key={template.id} className="checkbox-row">
              <input
                type="radio"
                name="template"
                checked={templateId === template.id}
                onChange={() => setTemplateId(template.id)}
              />
              {template.name} — <span className="meta">{template.description}</span>
            </label>
          ))}
          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={() => setStep(2)}>Назад</button>
            <button onClick={goToStepAfterType}>Далее</button>
          </div>
        </div>
      )}

      {step === 4 && needsPageCount && (
        <div className="card">
          <h2>Количество страниц</h2>
          <p className="meta">Сколько страниц ориентировочно нужно для сайта?</p>
          {pageCountOptions.map((option) => (
            <label key={option.id} className="checkbox-row">
              <input
                type="radio"
                name="pageCount"
                checked={pageCountRange === option.label}
                onChange={() => setPageCountRange(option.label)}
              />
              {option.label}
            </label>
          ))}
          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={() => setStep(3)}>Назад</button>
            <button onClick={() => setStep(5)} disabled={!pageCountRange}>Далее</button>
          </div>
        </div>
      )}

      {step === 5 && selectedTemplate && (
        <div className="card">
          <h2>Обязательные функции</h2>
          <p className="meta">Без этих функций сайт по шаблону «{selectedTemplate.name}» не будет работать корректно — они добавляются автоматически:</p>
          <ul style={{marginTop: "8px"}}>
            {selectedTemplate.requiredFeatureIds.map((id) => {
              const feature = features.find((f) => f.id === id);
              return <li key={id} className="meta">✓ {feature?.name ?? id}</li>;
            })}
          </ul>
          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={goBackFromRequiredFeatures}>Назад</button>
            <button onClick={() => setStep(6)}>Далее</button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="card">
          <h2>{selectedTemplate ? structureStepTitles[selectedTemplate.id] ?? "Структура сайта" : "Структура сайта"}</h2>
          <p className="meta">Какие разделы должны быть на сайте?</p>
          {siteSectionOptions.map((option) => (
            <label key={option.id} className="checkbox-row">
              <input
                type="checkbox"
                checked={siteSections.includes(option.label)}
                onChange={() => toggleSiteSection(option.label)}
              />
              {option.label}
            </label>
          ))}
          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={() => setStep(5)}>Назад</button>
            <button onClick={() => setStep(7)}>Далее</button>
          </div>
        </div>
      )}

      {step === 7 && selectedTemplate && (
        <div className="card">
          <h2>Дополнительные функции</h2>
          {selectedTemplate.optionalFeatureIds.map((id) => {
            const feature = features.find((f) => f.id === id);
            if (!feature) return null;

            return (
              <label key={id} className="checkbox-row">
                <input
                  type="checkbox"
                  checked={optionalFeatureIds.includes(id)}
                  onChange={() => toggleOptionalFeature(id)}
                />
                {feature.name}
              </label>
            );
          })}

          {suggestedFeatureIds.length > 0 && (
            <div className="card" style={{marginTop: "16px", borderColor: "var(--color-included)"}}>
              <p className="meta">Рекомендуем также добавить:</p>
              {suggestedFeatureIds.map((id) => {
                const feature = features.find((f) => f.id === id);
                if (!feature) return null;

                return (
                  <p key={id} className="meta" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    {feature.name}
                    <button type="button" onClick={() => toggleOptionalFeature(id)}>Добавить</button>
                  </p>
                );
              })}
            </div>
          )}

          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={() => setStep(6)}>Назад</button>
            <button onClick={() => setStep(8)}>Далее</button>
          </div>
        </div>
      )}

      {step === 8 && (
        <div className="card">
          <h2>Материалы</h2>
          <p className="meta">Что уже подготовлено у клиента?</p>
          {materialOptions.map((option) => (
            <label key={option.id} className="checkbox-row">
              <input
                type="checkbox"
                checked={materials.includes(option.label)}
                onChange={() => toggleMaterial(option.label, false)}
              />
              {option.label}
            </label>
          ))}
          {exclusiveMaterialOption && (
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={materials.includes(exclusiveMaterialOption.label)}
                onChange={() => toggleMaterial(exclusiveMaterialOption.label, true)}
              />
              {exclusiveMaterialOption.label}
            </label>
          )}
          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={() => setStep(7)}>Назад</button>
            <button onClick={() => setStep(9)}>Далее</button>
          </div>
        </div>
      )}

      {step === 9 && (
        <div className="card">
          <h2>Наполнение сайта</h2>
          <p className="meta">Кто будет размещать тексты, фотографии и новости на сайте?</p>
          {([
            {value: "client", label: "Клиент"},
            {value: "site2u", label: "SITE2U"},
            {value: "together", label: "Совместно"},
          ] as const).map((option) => (
            <label key={option.value} className="checkbox-row">
              <input
                type="radio"
                name="contentOwner"
                checked={contentOwner === option.value}
                onChange={() => setContentOwner(option.value)}
              />
              {option.label}
            </label>
          ))}
          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={() => setStep(8)}>Назад</button>
            <button onClick={() => setStep(10)}>Далее</button>
          </div>
        </div>
      )}

      {step === 10 && (
        <div className="card">
          <h2>Срок выполнения</h2>
          <p className="meta">Желаемый срок запуска</p>
          {deadlineOptions.map((option) => (
            <label key={option.id} className="checkbox-row">
              <input
                type="radio"
                name="deadlineType"
                checked={deadlineType === option.label}
                onChange={() => {
                  setDeadlineType(option.label);
                  if (!option.requiresText) setDesiredDeadline(option.label);
                  else setDesiredDeadline("");
                }}
              />
              {option.label}
            </label>
          ))}
          {deadlineOptions.find((o) => o.label === deadlineType)?.requiresText && (
            <input
              type="text"
              value={desiredDeadline}
              onChange={(e) => setDesiredDeadline(e.target.value)}
              placeholder="Например: до 1 сентября"
              style={{width: "100%", padding: "8px", marginTop: "8px"}}
            />
          )}
          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={() => setStep(9)}>Назад</button>
            <button
              onClick={() => setStep(11)}
              disabled={Boolean(deadlineOptions.find((o) => o.label === deadlineType)?.requiresText) && !desiredDeadline}
            >
              Далее
            </button>
          </div>
        </div>
      )}

      {step === 11 && (
        <div className="card">
          <h2>Дополнительные пожелания</h2>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Например: подключение стороннего API, интеграция с CRM, особенности реализации"
            rows={4}
            style={{width: "100%", padding: "8px", marginTop: "8px", fontFamily: "inherit"}}
          />
          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={() => setStep(10)}>Назад</button>
            <button onClick={handleCreateProject}>Создать проект</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function NewProjectPage() {
  return (
    <Suspense fallback={<main><p className="meta">Загрузка...</p></main>}>
      <NewProjectPageContent />
    </Suspense>
  );
}