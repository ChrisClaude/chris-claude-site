'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  UpdatePostDocument,
  PostStatus,
} from '@/_lib/graphql/__generated__/graphql';
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

const EditPostModal = ({ post, onClose, onSaved }: Props) => {
  const [title, setTitle] = useState(post.title);
  const [excerpt, setExcerpt] = useState(post.excerpt ?? '');
  const [thumbnail, setThumbnail] = useState(post.thumbnail ?? '');
  const [content, setContent] = useState(post.content ?? '');
  const [status, setStatus] = useState<PostStatus>(post.status);
  const [error, setError] = useState<string | null>(null);

  const [updatePost, { loading }] = useMutation(UpdatePostDocument);

  const handleSave = async () => {
    setError(null);
    try {
      const result = await updatePost({
        variables: {
          input: {
            postId: post.id,
            title,
            thumbnail,
            content,
            excerpt,
            status,
          },
        },
      });

      const errors = result.data?.updatePost?.errors;
      if (errors?.length) {
        setError(errors[0].message ?? 'An error occurred.');
        return;
      }

      onSaved();
    } catch {
      setError('Failed to update post. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Edit Article
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Thumbnail URL
            </label>
            <input
              type="text"
              value={thumbnail}
              onChange={e => setThumbnail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content (HTML/Markdown)
            </label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={10}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y font-mono"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <Button variant="outline" size="sm" onPress={onClose}>
            Cancel
          </Button>
          <Button size="sm" isDisabled={loading} onPress={handleSave}>
            {loading ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
