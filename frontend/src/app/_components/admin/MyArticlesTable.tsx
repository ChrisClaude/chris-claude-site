'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_MY_POSTS } from '@/_lib/graphql/queries/post';
import { ConnectionDto, PostDto } from '@/_lib/graphql/types';
import { Button } from '@heroui/react';
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

const MyArticlesTable = () => {
  const [cursorStack, setCursorStack] = useState<string[]>([]);
  const [editingPost, setEditingPost] = useState<PostDto | null>(null);

  const after = cursorStack.at(-1) ?? null;
  const page = cursorStack.length;

  const { data, loading, error, refetch } = useQuery<{ myPosts: ConnectionDto<PostDto> }>(
    GET_MY_POSTS,
    {
      variables: { first: PAGE_SIZE, after },
      fetchPolicy: 'cache-and-network',
    },
  );

  const posts = data?.myPosts;

  const handleNext = () => {
    if (posts?.pageInfo.endCursor) {
      setCursorStack(prev => [...prev, posts.pageInfo.endCursor!]);
    }
  };

  const handlePrevious = () => {
    setCursorStack(prev => prev.slice(0, -1));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Articles</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your own articles — edit content, title, excerpt, and status.
          </p>
        </div>
        <Link
          href="/posts/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          New article
        </Link>
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
                  colSpan={4}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            )}
            {!loading && !error && posts?.nodes.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No articles yet.{' '}
                  <Link href="/posts/create" className="text-blue-600 hover:underline">
                    Create one
                  </Link>
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
                  <StatusBadge status={post.status} />
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant="outline" onPress={() => setEditingPost(post)}>
                    Edit
                  </Button>
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

export default MyArticlesTable;
