import {NextResponse} from "next/server";
import {getProjects, createProject} from "@/entities/project/repository";
export const dynamic = "force-dynamic";
export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const project = await request.json();
  await createProject(project);
  return NextResponse.json({success: true});
}