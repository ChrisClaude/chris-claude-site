"use client";
import { useEffect, useState } from 'react'
import { ROOT_URL } from '@/config';
import { ArticleContent } from '@/AppTypes';
import { ArticleFull } from '@/components';

const Page = ({ params }: { params: { slug: string } }) => {

  const [article, setArticle] = useState<ArticleContent | undefined>(undefined);

  useEffect(() => {
    fetch(`${ROOT_URL}/api/articles/${params.slug}`).then((res) => {
      if (res.status !== 200) {
        throw new Error(res.status.toString());
      }

      return res.json();
    })
    .then(res => {
      setArticle(res.data);
    })
    .catch(err => console.error("There was an error fetching the article", err));
  }, []);

  return (
    article &&(
      <ArticleFull article={article} />
    )
  )
}

export default Page