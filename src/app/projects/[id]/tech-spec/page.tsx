import {getProjects} from "@/entities/project/repository";
import {getFeatures} from "@/entities/feature/repository";
import {notFound} from "next/navigation";

interface TechSpecPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectTechSpecPage({params}: TechSpecPageProps) {
  const {id} = await params;
  const project = getProjects().find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const projectFeatures = getFeatures()
    .filter((f) => project.featureIds.includes(f.id))
    .filter((f) => f.status === "included");

  return (
    <main>
      <h1>Техническое задание: {project.name}</h1>

      {projectFeatures.map((feature) => (
        <section key={feature.id}>
          <h2>{feature.name}</h2>
          <p>{feature.description}</p>

          {feature.comment && <p>Примечание: {feature.comment}</p>}

          {feature.estimatedHours && (
            <p>
              Трудоёмкость: {feature.estimatedHours.min}–{feature.estimatedHours.max} ч.
            </p>
          )}
        </section>
      ))}
    </main>
  );
}