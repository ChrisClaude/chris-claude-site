'use client';

import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@/_lib/graphql/queries/post';
import Link from 'next/link';
import { useAuth } from '@/_hooks/useAuth';
import { ROLES } from '@/_lib/enums/constant';
import { format } from 'date-fns';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

type Tag = { id: string; name: string };
type Author = {
  id: string;
  name: string;
  surname: string;
  image: string | null;
};
type PostNode = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  author: Author | null;
  postTags: { tag: Tag }[];
};
type PostsData = {
  posts: {
    totalCount: number;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
      endCursor: string | null;
    };
    nodes: PostNode[];
  };
};

const PAGE_SIZE = 9;

const PostCard = ({ post }: { post: PostNode }) => {
  const date = post.publishedAt ?? post.createdAt;

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        {post.postTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.postTags.slice(0, 3).map(({ tag }) => (
              <span
                key={tag.id}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Author & date */}
        <div className="flex items-center gap-2.5 pt-1 mt-auto border-t border-gray-100 dark:border-gray-800">
          <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
            {post.author?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="w-full h-full flex items-center justify-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                {post.author?.name?.[0]}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {post.author?.name} {post.author?.surname}
          </span>
          <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
            {format(new Date(date), 'MMM d, yyyy')}
          </span>
        </div>
      </div>
    </Link>
  );
};

const PostsPage = () => {
  const { containsRoles } = useAuth();
  const canCreate = containsRoles([ROLES.ADMIN, ROLES.PUBLISHER]);

  const { data, loading, error, fetchMore } = useQuery<PostsData>(GET_POSTS, {
    variables: { first: PAGE_SIZE },
    fetchPolicy: 'cache-and-network',
  });

  const posts = data?.posts;
  const hasMore = posts?.pageInfo.hasNextPage;

  const loadMore = () => {
    if (!posts?.pageInfo.endCursor) return;
    fetchMore({
      variables: { first: PAGE_SIZE, after: posts.pageInfo.endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          posts: {
            ...fetchMoreResult.posts,
            nodes: [...prev.posts.nodes, ...fetchMoreResult.posts.nodes],
          },
        };
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Posts
          </h1>
          {posts && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {posts.totalCount} {posts.totalCount === 1 ? 'post' : 'posts'}{' '}
              published
            </p>
          )}
        </div>
        {canCreate && (
          <Link
            href="/posts/create"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
          >
            <PencilSquareIcon className="w-4 h-4" />
            New Post
          </Link>
        )}
      </div>

      {/* Loading state */}
      {loading && !data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-100 dark:bg-gray-800" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full w-1/3" />
                <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-full w-4/5" />
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-full" />
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          Failed to load posts. Please try again.
        </div>
      )}

      {/* Empty state */}
      {!loading && posts?.nodes.length === 0 && (
        <div className="text-center py-24">
          <p className="text-gray-400 dark:text-gray-500 text-lg mb-4">
            No posts published yet.
          </p>
          {canCreate && (
            <Link
              href="/posts/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
            >
              <PencilSquareIcon className="w-4 h-4" />
              Write the first post
            </Link>
          )}
        </div>
      )}

      {/* Posts grid */}
      {posts && posts.nodes.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.nodes.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Loading…' : 'Load more'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostsPage;
