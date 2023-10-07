import { NextRequest, NextResponse } from 'next/server';
import { getArticleById } from '@/lib/articles';


export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {

  if (request.method !== 'GET') {
    return NextResponse.json({
      message: "Method not allowed",
    });
  }

  const slug = params.slug;
  const article = getArticleById(slug);

  return NextResponse.json({ data: article })
}