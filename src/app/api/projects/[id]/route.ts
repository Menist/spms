import {NextResponse} from "next/server";
import {getProjectById, updateProject, deleteProject} from "@/entities/project/repository";

interface RouteParams {
  params: Promise<{ id: string }>;
}
export const dynamic = "force-dynamic";
export async function GET(request: Request, {params}: RouteParams) {
  const {id} = await params;
  const project = await getProjectById(id);

  if (!project) {
    return NextResponse.json({error: "Not found"}, {status: 404});
  }

  return NextResponse.json(project);
}

export async function PATCH(request: Request, {params}: RouteParams) {
  const {id} = await params;
  const updates = await request.json();
  await updateProject(id, updates);
  return NextResponse.json({success: true});
}

export async function DELETE(request: Request, {params}: RouteParams) {
  const {id} = await params;
  await deleteProject(id);
  return NextResponse.json({success: true});
}