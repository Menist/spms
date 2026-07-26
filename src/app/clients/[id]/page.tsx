"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {useRouter} from "next/navigation";
import type {Client} from "@/entities/client/model";
import type {Project} from "@/entities/project/model";
import Link from "next/link";

interface ClientPageProps {
  params: Promise<{ id: string }>;
}

export default function ClientPage({params}: ClientPageProps) {
  const {id} = use(params);
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [clientProjects, setClientProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/clients/${id}`);
      const foundClient = res.ok ? await res.json() : null;

      setClient(foundClient);

      if (foundClient) {
        const allProjects = await fetch("/api/projects").then((r) => r.json());
        setClientProjects(allProjects.filter((p: Project) => p.clientId === foundClient.id));
      }

      setIsLoaded(true);
    }

    load();
  }, [id]);

  if (!isLoaded) {
    return <main><p className="meta">Загрузка...</p></main>;
  }

  if (!client) {
    return (
      <main>
        <h1>Клиент не найден</h1>
        <p className="meta"><Link href="/clients">Вернуться к списку клиентов</Link></p>
      </main>
    );
  }

  async function handleDeleteClient() {
    if (!client) return;

    if (clientProjects.length > 0) {
      window.alert(
        `Нельзя удалить клиента «${client.name}»: у него есть ${clientProjects.length} проект(ов). Сначала перепривяжите или удалите эти проекты.`
      );
      return;
    }

    const confirmed = window.confirm(
      `Удалить клиента «${client.name}» без возможности восстановления?`
    );

    if (confirmed) {
      await fetch(`/api/clients/${client.id}`, {method: "DELETE"});
      router.push("/clients");
    }
  }

  return (
    <main>
      <h1>{client.name}</h1>

      <p className="meta back-link"><Link href="/clients">← Все клиенты</Link></p>

      <p className="meta">
        <Link className='toggle-button toggle-button--active' href={`/clients/${client.id}/edit`}>Редактировать клиента</Link>
        {" "}
        <button onClick={handleDeleteClient} className="danger-button">
          Удалить клиента
        </button>
      </p>

      <div className="card">
        <p className="meta">Контактное лицо: {client.contactPerson}</p>
        <p className="meta">Телефон: {client.phone}</p>
        <p className="meta">Дата обращения: {client.contactDate}</p>
        <p className="meta">Причина обращения: {client.contactReason}</p>
      </div>

      <h2 style={{marginTop: "20px"}}>Проекты клиента</h2>

      <p className="meta">
        <Link href={`/projects/new?clientId=${client.id}`}>+ Создать проект</Link>
      </p>

      {clientProjects.length === 0 && <p className="meta">Пока нет проектов.</p>}
      <ul>
        {clientProjects.map((project) => (
          <li key={project.id} className="card">
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
            <div className="meta">
              <span className={`tag tag--${project.status === "active" ? "included" : "notRequired"}`}>
                {project.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}