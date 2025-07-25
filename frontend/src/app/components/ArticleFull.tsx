"use client";
import { ArticleContent } from '@/AppTypes';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { Source_Serif_4 } from 'next/font/google';
import CategoryLabel from './CategoryLabel';

const sourceSerif = Source_Serif_4({
  weight: '300',
  subsets: ['latin'],
});

const ArticleFull = ({
  article,
}: {
  article: ArticleContent;
}) => {

  return (
    <div className='py-6 lg:px-6'>
      <div className="w-full px-6 py-6 bg-gray-900 rounded-lg shadow-md mt-6 lg:px-10">
        <div className="flex mt-4 flex-col mb-7 md:justify-between md:items-center md:flex-row">
          <h1 className="text-5xl mb-4 md:mb-0">{article.frontmatter.title}</h1>
          <div className='w-24 md:w-auto'>
            <CategoryLabel category={article.frontmatter.category} />
          </div>
        </div>
        <img
          src={article.frontmatter.cover_image}
          alt=""
          className="w-full rounded"
        />

        <div className="flex justify-between items-center bg-gray-700 p-2 my-8 rounded-lg">
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
          <div className={`blog-text mt-2 text-lg overflow-hidden ${sourceSerif.className}`}>
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
