'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { TagIcon, PlusIcon } from '@heroicons/react/24/outline';
import { GET_ALL_TAGS } from '@/_lib/graphql/queries/tag';
import { CREATE_TAG } from '@/_lib/graphql/mutations/tag';

type TagNode = { id: string; name: string; createdAt: string };
type TagsConnection = { totalCount: number; pageInfo: { hasNextPage: boolean; endCursor?: string | null }; nodes: TagNode[] };

const AdminTagsPage = () => {
  const [name, setName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { data, loading, refetch } = useQuery<{ tags: TagsConnection }>(GET_ALL_TAGS, {
    variables: { first: 50 },
    fetchPolicy: 'cache-and-network',
  });

  const [createTag, { loading: creating }] = useMutation(CREATE_TAG);

  const tags = data?.tags?.nodes ?? [];
  const totalCount = data?.tags?.totalCount ?? 0;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    const trimmed = name.trim().toLowerCase();
    if (!trimmed) return setFormError('Tag name is required.');

    try {
      const { data: result } = await createTag({ variables: { input: { name: trimmed } } });
      const errors = result?.createTag?.errors;
      if (errors?.length) {
        setFormError(errors[0].message);
        return;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create tag.';
      setFormError(message);
      return;
    }

    setSuccessMsg(`Tag "${trimmed}" created.`);
    setName('');
    refetch();
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tags</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage tags that publishers can use when creating posts.
        </p>
      </div>

      {/* Create form */}
      <div className="mb-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Create new tag
        </h2>
        <form onSubmit={handleCreate} className="flex gap-3">
          <div className="flex-1">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. typescript"
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none transition focus:border-gray-400 dark:focus:border-gray-600 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-800 placeholder:text-gray-400"
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            {creating ? 'Creating…' : 'Create'}
          </button>
        </form>
        {formError && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formError}</p>
        )}
        {successMsg && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">{successMsg}</p>
        )}
      </div>

      {/* Tags list */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <TagIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              All tags
            </span>
          </div>
          <span className="text-xs text-gray-400">{totalCount} total</span>
        </div>

        {loading && tags.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-gray-400">Loading…</div>
        ) : tags.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-gray-400">No tags yet.</div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {tags.map(tag => (
              <li
                key={tag.id}
                className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                  {tag.name}
                </span>
                <span className="text-xs text-gray-400">
                  {tag.createdAt ? new Date(tag.createdAt).toLocaleDateString() : '—'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminTagsPage;
