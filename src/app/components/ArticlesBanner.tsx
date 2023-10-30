"use client";
import { ArticleContent } from '@/AppTypes';
import { ROOT_URL, S3_HOME_MAX_KEYS } from '@/config';
import { useEffect, useState } from 'react';
import ArticlesBannerItem from './ArticlesBannerItem';

const ArticlesBanner = () => {

  const [articles, setArticles] = useState<ArticleContent[]>([]);

  useEffect(() => {
    fetch(`${ROOT_URL}/api/articles?page=1&maxKeyCount=${S3_HOME_MAX_KEYS}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.status.toString());
        }
        return res.json();
      })
      .then(res => {
        console.log(res.data);
        setArticles(res.data.articles);
      })
      .catch(err => console.error('There was an error fetching articles', err));
  }, []);

  return (
    <section className="mb-36">
      <div className="flex items-center flex-col mb-14">
        <span className="block uppercase mb-3">Recent Posts Of</span>
        <h1 className="text-4xl md:text-5xl">
          The <span className="text-blue-500">Dev</span> Weekly
        </h1>
      </div>
      <div className="grid grid-cols-1 max-w-screen-xl mx-auto gap-y-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <ArticlesBannerItem article={article} key={index} />
        ))}
      </div>
    </section>
  );
};
export default ArticlesBanner;
