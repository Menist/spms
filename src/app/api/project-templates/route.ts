import {NextResponse} from "next/server";
import {getProjectTemplates} from "@/entities/project-template/repository";
export const dynamic = "force-dynamic";
export async function GET() {
  const templates = await getProjectTemplates();
  return NextResponse.json(templates);
}