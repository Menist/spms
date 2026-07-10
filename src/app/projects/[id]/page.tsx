import {getProjects} from "@/entities/project/repository";
import {getFeatures} from "@/entities/feature/repository";
import {getClients} from "@/entities/client/repository";
import {notFound} from "next/navigation";
import Link from "next/link";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({params}: ProjectPageProps) {
  const {id} = await params;
  const project = getProjects().find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const client = getClients().find((c) => c.id === project.clientId);
  const projectFeatures = getFeatures().filter((f) =>
    project.featureIds.includes(f.id)
  );

  return (
    <main>
      <h1>{project.name}</h1>

      {client && (
        <p>
          Клиент: <Link href={`/clients/${client.id}`}>{client.name}</Link>
        </p>
      )}

      <p>
        <Link href={`/projects/${project.id}/proposal`}>Коммерческое предложение</Link>
        {" | "}
        <Link href={`/projects/${project.id}/tech-spec`}>Техническое задание</Link>
      </p>

      <h2>Фичи проекта</h2>
      <ul>
        {projectFeatures.map((feature) => (
          <li key={feature.id}>
            <Link href={`/features/${feature.id}`}>{feature.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}