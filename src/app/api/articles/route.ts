import { getPaginatedArticles } from '@/lib/articles';
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, res: NextApiResponse) {

  if (request.method !== 'GET') {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const pageParam = request.nextUrl.searchParams.get('page');
  const page = pageParam !== null ? parseInt(pageParam.toString()) : 1;

  const data = await getPaginatedArticles(page);

  return NextResponse.json({ data });
}