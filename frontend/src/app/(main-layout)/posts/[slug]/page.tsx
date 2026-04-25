'use client';

import { useQuery } from '@apollo/client';
import { GET_POST_BY_SLUG } from '@/_lib/graphql/queries/post';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import { ArrowLeftIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { TagIcon } from '@heroicons/react/24/solid';
import BookmarkButton from '@/_components/BookmarkButton';

type Tag = { id: string; name: string };
type Author = { id: string; name: string; surname: string; image: string | null };
type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  content: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  author: Author;
  postTags: { tag: Tag }[];
};

const PostReaderPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, loading, error } = useQuery<{
    posts: { nodes: Post[] };
  }>(GET_POST_BY_SLUG, {
    variables: { slug },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-full w-3/4" />
        <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-full w-1/2" />
        <div className="h-72 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full" style={{ width: `${70 + Math.random() * 30}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">Failed to load post.</p>
        <Link href="/posts" className="mt-4 inline-block text-sm underline">Back to posts</Link>
      </div>
    );
  }

  const post = data?.posts?.nodes?.[0];
  if (!post) return notFound();

  const date = post.publishedAt ?? post.createdAt;
  const safeContent = typeof window !== 'undefined'
    ? DOMPurify.sanitize(post.content)
    : post.content;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Back link */}
      <Link
        href="/posts"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-8"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        All Posts
      </Link>

      {/* Tags */}
      {post.postTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.postTags.map(({ tag }) => (
            <span
              key={tag.id}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              <TagIcon className="w-3 h-3" />
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
        {post.title}
      </h1>

      {/* Excerpt */}
      <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-6 border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic">
        {post.excerpt}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <span className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
            {post.author.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-4 h-4 m-1.5 text-gray-500" />
            )}
          </div>
          <span>{post.author.name} {post.author.surname}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4" />
          {format(new Date(date), 'MMMM d, yyyy')}
        </span>
        <span className="ml-auto">
          <BookmarkButton postId={post.id} />
        </span>
      </div>

      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-10 bg-gray-100 dark:bg-gray-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={e => (e.currentTarget.style.display = 'none')}
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:rounded prose-code:px-1 prose-blockquote:border-l-gray-300 dark:prose-blockquote:border-l-gray-600"
        dangerouslySetInnerHTML={{ __html: safeContent }}
      />
    </article>
  );
};

export default PostReaderPage;
