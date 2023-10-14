import { ARTICLES_PER_PAGE } from '@/config';
import { getArticles } from '@/lib/articles';
import fs from 'fs';
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';


export async function GET(request: NextRequest, res: NextApiResponse) {

  if (request.method !== 'GET') {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const pageParam = searchParams.get('page');
  const page = pageParam !== null ? parseInt(pageParam.toString()) : 1;

  const files = fs.readdirSync(path.join('data/articles'));

  const articles = await getArticles();

  // Get categories for sidebar
  const categories = articles.map(article => article.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  const numPages = Math.ceil(files.length / ARTICLES_PER_PAGE);
  const pageIndex = page - 1;
  const orderedArticles = articles.slice(
    pageIndex * ARTICLES_PER_PAGE,
    (pageIndex + 1) * ARTICLES_PER_PAGE
  );

  const data = {
    articles: orderedArticles,
    numPages,
    currentPage: page,
    categories: uniqueCategories,
  };

  return NextResponse.json({ data });
}