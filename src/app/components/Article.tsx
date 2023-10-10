import Link from 'next/link';
import Image from 'next/image';
import CategoryLabel from './CategoryLabel';
import { ArticleContent } from '@/AppTypes';

export default function Article({
  article,
}: {
  article: ArticleContent;
}) {
  return (
    <div className="w-full bg-slate-200 rounded-lg shadow-md overflow-hidden flex-grow-0">
      <div className="md:hidden">
        <Image
          src={article.frontmatter.cover_image}
          alt=""
          height={420}
          width={600}
        />
      </div>
      <div className="px-10 py-6">
        <div className="flex justify-between items-center">
          <span className="font-light text-gray-600">
            {article.frontmatter.date}
          </span>
          <CategoryLabel category={article.frontmatter.category} />
        </div>

        <div className="mt-2">
          <Link
            href={`/blog/${article.slug}`}
            className="text-xl text-gray-700 font-bold line-clamp-2 hover:underline md:text-xl">
            {article.frontmatter.title}
          </Link>
          <p className="mt-2 text-gray-600 line-clamp-3">{article.frontmatter.excerpt}</p>
        </div>

        <Link
          href={`/blog/${article.slug}`}
          className="text-gray-900 hover:text-blue-600 mt-6 block md:hidden">
          Read More
        </Link>
      </div>
    </div>
  );
}
