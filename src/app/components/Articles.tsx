import React from 'react';
import Image from 'next/image';
import { BsArrowRightShort } from 'react-icons/bs';
import { articles } from '@/data';
import Article from './Article';

const Articles = () => (
  <section className="mb-36">
    <div className="flex items-center flex-col mb-14">
      <span className="block uppercase mb-3">Recent Posts Of</span>
      <h1 className="text-4xl md:text-5xl">
        The <span className="text-blue-500">Dev</span> Weekly
      </h1>
    </div>
    <div className="grid grid-cols-1 max-w-screen-xl mx-auto gap-y-14 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <Article
          article={article}
          key={index}
        />
      ))}
    </div>
  </section>
);

export default Articles;
