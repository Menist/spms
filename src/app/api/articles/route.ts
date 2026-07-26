import {NextResponse} from "next/server";
import {getArticles} from "@/entities/article/repository";

export async function GET() {
  const articles = await getArticles();
  return NextResponse.json(articles);
}