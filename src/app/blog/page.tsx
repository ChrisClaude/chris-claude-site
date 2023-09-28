'use client';
import { useEffect, useState } from 'react';
import { PaginatedArticles } from '@/AppTypes';
import { ROOT_URL } from '@/config';
import Article from '@/components/Article';

const Page = () => {
  const [paginatedArticles, setPagedArticles] = useState<PaginatedArticles | null>(null);

  useEffect(() => {
    fetch(`${ROOT_URL}/blog/api/articles`).then((res) => {
      if (res.status !== 200) {
        throw new Error(res.status.toString());
      }

      return res.json();
    })
    .then(res => setPagedArticles(res.data))
    .catch(err => console.error("There was an error fetching articles", err));
  }, []);

  return (
    <section>
      <p>Blog</p>
      {
        paginatedArticles &&
        <div className='grid grid-cols-1 gap-3 px-4 md:grid-cols-2 lg:grid-cols-3'>
          {paginatedArticles.articles.map((article, index) => <Article key={index} article={article} />)}
        </div>
      }
    </section>
  );
}

export default Page;