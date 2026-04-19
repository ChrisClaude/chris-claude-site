'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { AdminUpdatePostStatusDocument, PostStatus } from '@/_lib/graphql/__generated__/graphql';
import { PostDto } from '@/_lib/graphql/types';
import { Button } from '@heroui/react';

type Props = {
  post: PostDto;
  onClose: () => void;
  onSaved: () => void;
};

const STATUS_OPTIONS: Array<{ label: string; value: PostStatus }> = [
  { label: 'Draft', value: PostStatus.Draft },
  { label: 'Published', value: PostStatus.Published },
  { label: 'Archived', value: PostStatus.Archived },
];

const PostStatusModal = ({ post, onClose, onSaved }: Props) => {
  const [status, setStatus] = useState<PostStatus>(post.status);
  const [error, setError] = useState<string | null>(null);

  const [adminUpdatePostStatus, { loading }] = useMutation(AdminUpdatePostStatusDocument);

  const handleSave = async () => {
    setError(null);
    try {
      const result = await adminUpdatePostStatus({
        variables: {
          input: {
            postId: post.id,
            status,
          },
        },
      });

      const errors = result.data?.adminUpdatePostStatus?.errors;
      if (errors?.length) {
        setError(errors[0].message ?? 'An error occurred.');
        return;
      }

      onSaved();
    } catch {
      setError('Failed to update status. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Change Article Status
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Article</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {post.title}
            </p>
            {post.author && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                by {post.author.name} {post.author.surname}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as PostStatus)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <Button variant="outline" size="sm" onPress={onClose}>
            Cancel
          </Button>
          <Button size="sm" isDisabled={loading} onPress={handleSave}>
            {loading ? 'Saving...' : 'Update status'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostStatusModal;
