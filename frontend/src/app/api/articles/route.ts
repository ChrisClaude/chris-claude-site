import { getPaginatedArticles } from '@/lib/articles';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  if (request.method !== 'GET') {
    return NextResponse.json(
      {
        message: 'Method not allowed',
      },
      { status: 405 },
    );
  }

  const pageParam = request.nextUrl.searchParams.get('page');
  const maxKeyCountParam = request.nextUrl.searchParams.get('maxKeyCount');
  const page = pageParam !== null ? parseInt(pageParam.toString()) : 1;
  const maxKeyCount =
    maxKeyCountParam !== null ? parseInt(maxKeyCountParam.toString()) : null;

  const data = await getPaginatedArticles(page, maxKeyCount);

  return NextResponse.json({ data });
}
