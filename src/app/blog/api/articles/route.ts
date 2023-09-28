import { NextResponse } from 'next/server';
import { NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { ARTICLES_PER_PAGE } from '@/config';
import { getArticles } from '@/lib/articles';


export async function GET(request: Request, res: NextApiResponse) {

  if (request.method !== 'GET') {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const { searchParams } = new URL(request.url);
  const pageParam = searchParams.get('page');
  const page = pageParam !== null ? parseInt(pageParam.toString()) : 1;

  const files = fs.readdirSync(path.join('data/articles'));

  const articles = getArticles();

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

  return NextResponse.json({ data })
}