import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  XMarkIcon,
  PhotoIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import TagInput from './TagInput';
import { inputClass, Metadata } from './shared';

type MetadataStepProps = {
  onStart: (data: Metadata) => void;
};

const MetadataStep = ({ onStart }: MetadataStepProps) => {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addTag = (v: string) => {
    const t = v.trim().toLowerCase();
    if (t && !tags.includes(t) && tags.length < 10)
      setTags(prev => [...prev, t]);
    setTagInput('');
  };
  const removeTag = (t: string) => setTags(prev => prev.filter(x => x !== t));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!thumbnail.trim()) return setError('Thumbnail URL is required.');
    if (!excerpt.trim()) return setError('Excerpt is required.');
    if (tags.length === 0) return setError('Add at least one tag.');
    onStart({ thumbnail: thumbnail.trim(), excerpt: excerpt.trim(), tags });
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-6">
      <div className="w-full max-w-lg">
        {/* Back */}
        <button
          type="button"
          onClick={() => router.push('/posts')}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Posts
        </button>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900 p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            New Post
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Set up a few details before you start writing.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                <XMarkIcon className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Thumbnail */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <PhotoIcon className="h-3.5 w-3.5" />
                Cover image URL <span className="text-red-500">*</span>
              </label>
              <input
                value={thumbnail}
                onChange={e => setThumbnail(e.target.value)}
                placeholder="https://example.com/cover.jpg"
                className={inputClass}
              />
              {thumbnail && (
                <div className="relative mt-2 h-40 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnail}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                    onError={e => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="A short summary shown in the post listing…"
                rows={3}
                maxLength={500}
                className={`${inputClass} resize-none`}
              />
              <p className="text-right text-[11px] text-gray-400">
                {excerpt.length}/500
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <TagIcon className="h-3.5 w-3.5" />
                Tags <span className="text-red-500">*</span>
              </label>
              <TagInput
                tags={tags}
                tagInput={tagInput}
                setTagInput={setTagInput}
                onAdd={addTag}
                onRemove={removeTag}
              />
              <p className="text-[11px] text-gray-400">
                Press Enter or comma to add. Max 10.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gray-900 dark:bg-white py-3 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
            >
              Start Writing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MetadataStep;
