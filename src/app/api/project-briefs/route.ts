import {NextResponse} from "next/server";
import {createProjectBrief} from "@/entities/project-brief/repository";

export async function POST(request: Request) {
  const brief = await request.json();
  await createProjectBrief(brief);
  return NextResponse.json({success: true});
}