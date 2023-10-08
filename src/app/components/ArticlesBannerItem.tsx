import React from 'react';
import Image from 'next/image';
import { BsArrowRightShort } from 'react-icons/bs';
import { Article as ArticleProps } from '@/AppTypes';
import Link from 'next/link';

export default function ArticlesBannerItem({ article: {id, src, alt, description} }
  : {article: ArticleProps}) {
  return (
    <Link href={`/blog/${id}`} className="bloc flex-1">
      <Image
        src={src}
        alt={alt}
        width={384}
        height={384}
        className="rounded-lg mb-3 w-full"
      />
      <div className="flex justify-between items-center">
        <h2>{description}</h2>
        <button className="text-4xl transition ease-in duration-150 hover:translate-x-1 hover:text-blue-600">
          <BsArrowRightShort />
        </button>
      </div>
    </Link>
  );
}
