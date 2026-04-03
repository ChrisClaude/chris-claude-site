'use client';
import { Suspense } from 'react';
import ArticleList from '@/_components/Article/ArticleList';

const Page = () => {
  return (
    <Suspense>
      <ArticleList />
    </Suspense>
  );
};

export default Page;
