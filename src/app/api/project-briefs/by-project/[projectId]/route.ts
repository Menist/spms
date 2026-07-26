import {NextResponse} from "next/server";
import {getProjectBriefByProjectId} from "@/entities/project-brief/repository";

interface RouteParams {
  params: Promise<{ projectId: string }>;
}

export async function GET(request: Request, {params}: RouteParams) {
  const {projectId} = await params;
  const brief = await getProjectBriefByProjectId(projectId);

  if (!brief) {
    return NextResponse.json({error: "Not found"}, {status: 404});
  }

  return NextResponse.json(brief);
}