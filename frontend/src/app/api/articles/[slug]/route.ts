import { getArticleById } from '@/lib/articles';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const params = await context.params;

  if (request.method !== 'GET') {
    return NextResponse.json({
      message: "Method not allowed",
    });
  }

  const slug = params.slug;
  const article = await getArticleById(slug);

  return NextResponse.json({ data: article });
}