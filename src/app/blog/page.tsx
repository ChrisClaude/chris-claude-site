'use client';
import { PaginatedArticles } from '@/AppTypes';
import { GridBgWrapper, Newsletter, Pagination, YouTubeChannelBanner } from '@/components';
import Article from '@/components/Article';
import { ROOT_URL } from '@/config';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [paginatedArticles, setPagedArticles] = useState<PaginatedArticles | null>(null);
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    console.log("running in use effect");

    fetch(`${ROOT_URL}/api/articles?page=${page}`).then((res) => {
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
    <GridBgWrapper bgType={2}>
        <div className="hero relative">
          <section className="pb-28 px-6 lg:px-16">
          <h1 className='text-4xl py-16 text-center lg:text-6xl' id='articles'>Articles of the <span className='text-blue-500'>Dev</span> Weekly</h1>
          </section>
        </div>
        {
        paginatedArticles &&
        <>
            <div className='grid grid-cols-1 px-6 lg:gap-3 lg:px-14 pb-20 lg:grid-cols-3'>
              <section className='flex flex-col gap-y-10 lg:col-span-2 lg:pr-10 lg:border-r-2 lg:border-dashed lg:border-r-slate-800'>
                {paginatedArticles.articles.map((article, index) => <Article key={index} article={article} />)}
                <Pagination currentPage={paginatedArticles.currentPage} numPages={paginatedArticles.numPages} />
              </section>
              <aside className='pl-5 hidden lg:flex lg:flex-col'>
                <YouTubeChannelBanner compact={true} />
                <Newsletter compact={true} />
              </aside>
            </div>
        </>
      }
      </GridBgWrapper>
    </>
  );
}

export default Page;