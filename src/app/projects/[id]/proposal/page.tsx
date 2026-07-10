"use client";

import {useState} from "react";
import {use} from "react";
import {getProjects} from "@/entities/project/repository";
import {getFeatures} from "@/entities/feature/repository";
import {notFound} from "next/navigation";

interface ProposalPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectProposalPage({params}: ProposalPageProps) {
  const {id} = use(params);
  const project = getProjects().find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const projectFeatures = getFeatures().filter((f) =>
    project.featureIds.includes(f.id)
  );

  const [selectedIds, setSelectedIds] = useState<string[]>(
    projectFeatures.filter((f) => f.status === "included").map((f) => f.id)
  );

  function toggleFeature(featureId: string) {
    if (selectedIds.includes(featureId)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== featureId));
    } else {
      setSelectedIds([...selectedIds, featureId]);
    }
  }

  const selectedFeatures = projectFeatures.filter((f) => selectedIds.includes(f.id));

  let totalHoursMin = 0;
  let totalHoursMax = 0;
  let totalPriceMin = 0;
  let totalPriceMax = 0;

  for (const feature of selectedFeatures) {
    if (feature.estimatedHours) {
      totalHoursMin += feature.estimatedHours.min;
      totalHoursMax += feature.estimatedHours.max;
    }
    if (feature.priceRange) {
      totalPriceMin += feature.priceRange.min;
      totalPriceMax += feature.priceRange.max;
    }
  }

  return (
    <main>
      <h1>Коммерческое предложение: {project.name}</h1>

      <ul>
        {projectFeatures.map((feature) => (
          <li key={feature.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedIds.includes(feature.id)}
                onChange={() => toggleFeature(feature.id)}
              />
              {feature.name}
            </label>
          </li>
        ))}
      </ul>

      <p>Общая трудоёмкость: {totalHoursMin}–{totalHoursMax} ч.</p>
      <p>Стоимость: {totalPriceMin}–{totalPriceMax} BYN</p>
    </main>
  );
}