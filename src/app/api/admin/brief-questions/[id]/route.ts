import {NextResponse} from "next/server";
import {updateBriefQuestionOption, deleteBriefQuestionOption} from "@/entities/brief-question/repository";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, {params}: RouteParams) {
  const {id} = await params;
  const updates = await request.json();
  await updateBriefQuestionOption(id, updates);
  return NextResponse.json({success: true});
}

export async function DELETE(request: Request, {params}: RouteParams) {
  const {id} = await params;
  await deleteBriefQuestionOption(id);
  return NextResponse.json({success: true});
}