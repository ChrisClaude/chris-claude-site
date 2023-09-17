import React from 'react';
import Image from 'next/image';
import { BsArrowRightShort } from 'react-icons/bs';
import { Article as ArticleProps } from '@/AppTypes';

export default function Article({src, alt, description}: ArticleProps) {
  return (
    <article className="flex-1">
      <Image
        src={src}
        alt={alt}
        width={384}
        height={384}
        className="rounded-lg mb-3 w-full"
      />
      <div className="flex justify-between items-center">
        <h2>{description}</h2>
        <BsArrowRightShort className="text-4xl" />
      </div>
    </article>
  );
}
