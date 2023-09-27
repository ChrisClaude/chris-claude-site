import { ArticleContent } from '@/AppTypes';
import Article from '@/components/Article';
import { ARTICLES_PER_PAGE as ARTICLES_PER_PAGE } from '@/config';
import { getArticles } from '@/lib/articles';
import fs from 'fs';
import path from 'path';

type BlogContent = {
  articles: ArticleContent[];
  numPages: number;
  currentPage: number;
  categories: any[];
};

export default function Layout({children}: {children: React.ReactNode}) {

  const { articles } = getPaginatedArticles();
  console.log(articles);

  return (
    <>
      {children}
    </>
  );
}

/*export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('data/articles'));

  const numPages = Math.ceil(files.length / ARTICLES_PER_PAGE);

  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { pageIndex: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}*/

const getPaginatedArticles = (): BlogContent => {
  const page = 1;

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

  return {
    articles: orderedArticles,
    numPages,
    currentPage: page,
    categories: uniqueCategories,
  };
};
