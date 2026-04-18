'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS_ADMIN } from '@/_lib/graphql/queries/post';
import { ConnectionDto, PostDto } from '@/_lib/graphql/types';
import { Button } from '@heroui/react';
import PostStatusModal from './PostStatusModal';
import { useAuth } from '@/_hooks/useAuth';
import EditPostModal from './EditPostModal';

const PAGE_SIZE = 10;

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    Draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Archived: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] ?? colors['Draft']}`}
    >
      {status}
    </span>
  );
};

const AllArticlesTable = () => {
  const [cursorStack, setCursorStack] = useState<string[]>([]);
  const [statusPost, setStatusPost] = useState<PostDto | null>(null);
  const [editingPost, setEditingPost] = useState<PostDto | null>(null);

  const { userProfile } = useAuth();
  const after = cursorStack.at(-1) ?? null;
  const page = cursorStack.length;

  const { data, loading, error, refetch } = useQuery<{
    allPostsAdmin: ConnectionDto<PostDto>;
  }>(GET_ALL_POSTS_ADMIN, {
    variables: { first: PAGE_SIZE, after },
    fetchPolicy: 'cache-and-network',
  });

  const posts = data?.allPostsAdmin;

  const handleNext = () => {
    if (posts?.pageInfo.endCursor) {
      setCursorStack(prev => [...prev, posts.pageInfo.endCursor!]);
    }
  };

  const handlePrevious = () => {
    setCursorStack(prev => prev.slice(0, -1));
  };

  const isOwnPost = (post: PostDto) => post.authorId === userProfile?.id;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">All Articles</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View all articles across the site. You can change the status of any article, and fully
          edit your own.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mb-4">
          Failed to load articles. Please try again.
        </p>
      )}

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Title</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Author</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Status</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Created</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {loading && !posts && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            )}
            {!loading && !error && posts?.nodes.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No articles found.
                </td>
              </tr>
            )}
            {posts?.nodes.map(post => (
              <tr
                key={post.id}
                className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">
                    {post.title}
                  </p>
                  {post.slug && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate max-w-xs">
                      /{post.slug}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3">
                  {post.author ? (
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                        {post.author.image ? (
                          <Image
                            src={post.author.image}
                            alt={`${post.author.name} ${post.author.surname}`}
                            fill
                            className="object-cover"
                            unoptimized={post.author.image.includes('127.0.0.1')}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-gray-500 dark:text-gray-300">
                            {post.author.name[0]?.toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-xs">
                        {post.author.name} {post.author.surname}
                        {isOwnPost(post) && (
                          <span className="ml-1 text-blue-500 dark:text-blue-400">(you)</span>
                        )}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={post.status} />
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {isOwnPost(post) && (
                      <Button size="sm" variant="outline" onPress={() => setEditingPost(post)}>
                        Edit
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onPress={() => setStatusPost(post)}>
                      Status
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {posts && (posts.pageInfo.hasPreviousPage || posts.pageInfo.hasNextPage) && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page {page + 1} &middot; {posts.totalCount} articles
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              isDisabled={!posts.pageInfo.hasPreviousPage}
              onPress={handlePrevious}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              isDisabled={!posts.pageInfo.hasNextPage}
              onPress={handleNext}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {statusPost && (
        <PostStatusModal
          post={statusPost}
          onClose={() => setStatusPost(null)}
          onSaved={() => {
            setStatusPost(null);
            refetch();
          }}
        />
      )}

      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSaved={() => {
            setEditingPost(null);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default AllArticlesTable;
