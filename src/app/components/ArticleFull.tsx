"use client";
import React from 'react';
import { marked } from 'marked';
import Link from 'next/link';
import CategoryLabel from './CategoryLabel';
import { ArticleContent } from '@/AppTypes';
import * as DOMPurify from 'dompurify';

const ArticleFull = ({
  article,
}: {
  article: ArticleContent;
}) => {
  return (
    <div className='p-6'>
      <Link href="/blog">Go Back</Link>
      <div className="w-full px-10 py-6 bg-gray-900 rounded-lg shadow-md mt-6">
        <div className="flex mt-4 flex-col md:justify-between md:items-center md:flex-row">
          <h1 className="text-5xl mb-7">{article.frontmatter.title}</h1>
          <CategoryLabel category={article.frontmatter.category} />
        </div>
        <img
          src={article.frontmatter.cover_image}
          alt=""
          className="w-full rounded"
        />

        <div className="flex justify-between items-center bg-gray-700 p-2 my-8">
          <div className="flex items-center">
            <img
              src={article.frontmatter.author_image}
              alt=""
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h4>{article.frontmatter.author}</h4>
          </div>
          <div className="mr-4">{article.frontmatter.date}</div>
        </div>

        {article.content && (
          <div className="blog-text mt-2">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked.parse(article.content)),
              }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleFull;
