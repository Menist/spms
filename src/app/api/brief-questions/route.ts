import {NextResponse} from "next/server";
import {getBriefQuestionOptions, createBriefQuestionOption} from "@/entities/brief-question/repository";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const questionKey = searchParams.get("key") ?? undefined;
  const options = await getBriefQuestionOptions(questionKey);
  return NextResponse.json(options);
}

export async function POST(request: Request) {
  const data = await request.json();
  await createBriefQuestionOption(data);
  return NextResponse.json({success: true});
}