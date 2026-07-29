import {NextResponse} from "next/server";
import {updateProjectTemplate} from "@/entities/project-template/repository";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, {params}: RouteParams) {
  const {id} = await params;
  const updates = await request.json();
  await updateProjectTemplate(id, updates);
  return NextResponse.json({success: true});
}