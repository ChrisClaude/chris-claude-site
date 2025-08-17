import { ArticleContent } from '@/AppTypes';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';

const ArticlesBannerItem = ({
  article: { slug, frontmatter },
}: {
  article: ArticleContent;
}) => {
  return (
    <Link href={`/blog/${slug}`} className="bloc flex-1">
      <Image
        src={frontmatter.cover_image}
        alt={slug}
        width={384}
        height={384}
        className="rounded-lg mb-3 w-full"
      />
      <div className="flex justify-between items-center">
        <h2>{frontmatter.excerpt}</h2>
        <button className="text-4xl transition ease-in duration-150 hover:translate-x-1 hover:text-blue-600">
          <BsArrowRightShort />
        </button>
      </div>
    </Link>
  );
};

export default ArticlesBannerItem;
