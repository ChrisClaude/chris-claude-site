'use client';
import { useEffect, useState } from 'react';
import { PaginatedArticles } from '@/AppTypes';
import { ROOT_URL } from '@/config';
import Article from '@/components/Article';
import { Newsletter, YouTubeChannelBanner } from '@/components';

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
    <>
      <Newsletter />
      {
        paginatedArticles &&
        <>
            <h1 className='text-4xl py-16 text-center'>Articles of the <span className='text-blue-500'>Dev</span> Weekly</h1>
            <div className='grid grid-cols-1 gap-3 px-20 pb-28 md:grid-cols-2 lg:grid-cols-3'>
              <section className='grid grid-cols-1 gap-y-10 col-span-2 pr-10 border-r-2 border-dashed border-r-slate-800'>
                {paginatedArticles.articles.map((article, index) => <Article key={index} article={article} compact={true} />)}
              </section>
              <aside className='pl-5'>
                <YouTubeChannelBanner compact={true} />
              </aside>
            </div>
        </>
      }
    </>
  );
}

export default Page;