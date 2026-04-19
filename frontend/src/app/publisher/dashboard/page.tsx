'use client';

import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_MY_POSTS } from '@/_lib/graphql/queries/post';
import { ConnectionDto, PostDto } from '@/_lib/graphql/types';
import { useAuth } from '@/_hooks/useAuth';
import { PostStatus } from '@/_lib/graphql/__generated__/graphql';

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    Draft:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Published:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
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

const StatCard = ({
  label,
  value,
  href,
}: {
  label: string;
  value: number | string;
  href: string;
}) => (
  <Link
    href={href}
    className="block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
  >
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
      {value}
    </p>
  </Link>
);

const PublisherDashboardPage = () => {
  const { userProfile } = useAuth();

  const { data } = useQuery<{ myPosts: ConnectionDto<PostDto> }>(GET_MY_POSTS, {
    variables: { first: 100 },
    fetchPolicy: 'cache-and-network',
  });

  const allPosts = data?.myPosts?.nodes ?? [];
  const totalCount = data?.myPosts?.totalCount ?? 0;
  const publishedCount = allPosts.filter(
    p => p.status === PostStatus.Published,
  ).length;
  const draftCount = allPosts.filter(p => p.status === PostStatus.Draft).length;
  const recentPosts = allPosts.slice(0, 5);

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back, {userProfile?.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Here&apos;s an overview of your articles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard
          label="Total Articles"
          value={totalCount}
          href="/publisher/my-articles"
        />
        <StatCard
          label="Published"
          value={publishedCount}
          href="/publisher/my-articles"
        />
        <StatCard
          label="Drafts"
          value={draftCount}
          href="/publisher/my-articles"
        />
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Articles
          </h2>
          <Link
            href="/publisher/my-articles"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            View all
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No articles yet.
            </p>
            <Link
              href="/posts/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create your first article
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">
                    Title
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentPosts.map(post => (
                  <tr
                    key={post.id}
                    className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default PublisherDashboardPage;
