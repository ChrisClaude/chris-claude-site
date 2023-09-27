'use client';
import { ArticleContent } from '@/AppTypes';
import Article from '@/components/Article';
import { ARTICLES_PER_PAGE as ARTICLES_PER_PAGE } from '@/config';
import { getArticles } from '@/lib/articles';
import fs from 'fs';
import path from 'path';
import { useSearchParams } from 'next/navigation'

type BlogContent = {
  articles: ArticleContent[];
  numPages: number;
  currentPage: number;
  categories: any[];
};

export default function Page() {

  const searchParams = useSearchParams();
  const pageNumber = searchParams.get('page') ?? 1;
  // const { articles } = getPaginatedArticles();
  console.log(pageNumber);
  // console.log(articles);

  return (
    <>
      <section>
        <p>Blog</p>
        {/* {articles.map((article, index) => (
          <Article key={index} article={article} />
        ))} */}
      </section>
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