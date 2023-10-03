import Link from 'next/link'
import Image from 'next/image'
import CategoryLabel from './CategoryLabel';
import { ArticleContent } from '@/AppTypes';

export default function Article({ article, compact = false }: { article: ArticleContent, compact?: boolean }) {
  return (
    <div className='w-full px-10 py-6 bg-slate-200 rounded-lg shadow-md'>
      {!compact && (
        <Image
          src={article.frontmatter.cover_image}
          alt=''
          height={420}
          width={600}
          className='mb-4 rounded'
        />
      )}
      <div className='flex justify-between items-center'>
        <span className='font-light text-gray-600'>
          {article.frontmatter.date}
        </span>
        <CategoryLabel category={article.frontmatter.category} />
      </div>

      <div className='mt-2'>
        <Link href={`/blog/${article.slug}`} className='text-2xl text-gray-700 font-bold hover:underline'>
          {article.frontmatter.title}
        </Link>
        <p className='mt-2 text-gray-600'>{article.frontmatter.excerpt}</p>
      </div>

      {!compact && (
        <div className='flex justify-between items-center mt-6'>
          <Link href={`/blog/${article.slug}`} className='text-gray-900 hover:text-blue-600'>
            Read More
          </Link>
          <div className='flex items-center'>
            <img
              src={article.frontmatter.author_image}
              alt=''
              className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block'
            />
            <h3 className='text-gray-700 font-bold'>
              {article.frontmatter.author}
            </h3>
          </div>
        </div>
      )}
    </div>
  )
}
