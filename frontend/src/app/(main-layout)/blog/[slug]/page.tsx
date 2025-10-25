'use client';
import { ArticleContent } from '@/AppTypes';
import { ArticleFull } from '@/components';
import { ROOT_URL } from '@/config';
import { useEffect, useState } from 'react';

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [article, setArticle] = useState<ArticleContent | undefined>(undefined);
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(
    null,
  );

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    fetch(`${ROOT_URL}/api/articles/${resolvedParams.slug}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.status.toString());
        }

        return res.json();
      })
      .then(res => {
        setArticle(res.data);
      })
      .catch(err =>
        console.error('There was an error fetching the article', err),
      );
  }, [resolvedParams]);

  return article && <ArticleFull article={article} />;
};

export default Page;
