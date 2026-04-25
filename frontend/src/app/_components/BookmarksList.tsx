'use client';

import { useQuery, useMutation } from '@apollo/client';
import { GET_MY_BOOKMARKS } from '@/_lib/graphql/queries/bookmark';
import { REMOVE_BOOKMARK } from '@/_lib/graphql/mutations/bookmark';
import { BookmarkWithPostDto } from '@/_lib/graphql/types';
import Link from 'next/link';
import { format } from 'date-fns';
import { BookmarkSlashIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline';

const BookmarksList = () => {
  const { data, loading, error } = useQuery<{ myBookmarks: BookmarkWithPostDto[] }>(
    GET_MY_BOOKMARKS,
    { fetchPolicy: 'cache-and-network' }
  );

  const [removeBookmark] = useMutation(REMOVE_BOOKMARK, {
    refetchQueries: [{ query: GET_MY_BOOKMARKS }],
  });

  const bookmarks = data?.myBookmarks ?? [];

  if (loading && !data) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="w-24 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-full" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Failed to load bookmarks. Please try again.
      </p>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-16">
        <BookmarkSlashIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">No bookmarks yet.</p>
        <Link
          href="/posts"
          className="mt-3 inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Browse posts
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookmarks.map(bookmark => {
        const post = bookmark.post;
        if (!post) return null;
        const date = post.publishedAt ?? post.createdAt;

        return (
          <div
            key={bookmark.postId}
            className="flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            {post.thumbnail && (
              <Link href={`/posts/${post.slug}`} className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-24 h-20 object-cover rounded-lg"
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
              </Link>
            )}

            <div className="flex-1 min-w-0">
              {post.postTags && post.postTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-1">
                  {post.postTags.slice(0, 2).map(({ tag }) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    >
                      <TagIcon className="w-2.5 h-2.5" />
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href={`/posts/${post.slug}`}
                className="block text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 line-clamp-2 transition-colors"
              >
                {post.title}
              </Link>

              {post.excerpt && (
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-3 mt-2">
                {post.author && (
                  <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      {post.author.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="w-3 h-3 m-0.5 text-gray-400" />
                      )}
                    </div>
                    {post.author.name} {post.author.surname}
                  </span>
                )}
                {date && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {format(new Date(date), 'MMM d, yyyy')}
                  </span>
                )}
                <button
                  onClick={() => removeBookmark({ variables: { input: { postId: bookmark.postId } } })}
                  className="ml-auto text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  title="Remove bookmark"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookmarksList;
