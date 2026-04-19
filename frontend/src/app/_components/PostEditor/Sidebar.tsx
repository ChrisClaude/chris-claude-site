'use client';

import {
  XMarkIcon,
  PhotoIcon,
  TagIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import TagInput from './TagInput';

type SidebarProps = {
  thumbnail: string;
  excerpt: string;
  tags: string[];
  tagInput: string;
  onThumbnailChange: (v: string) => void;
  onExcerptChange: (v: string) => void;
  onTagInputChange: (v: string) => void;
  onTagAdd: (v: string) => void;
  onTagRemove: (v: string) => void;
  onClose: () => void;
};

const Sidebar = ({
  thumbnail,
  excerpt,
  tags,
  tagInput,
  onThumbnailChange,
  onExcerptChange,
  onTagInputChange,
  onTagAdd,
  onTagRemove,
  onClose,
}: SidebarProps) => (
  <aside className="w-72 shrink-0 overflow-y-auto border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900">
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-neutral-900 px-4 py-3">
      <div className="flex items-center gap-2">
        <Cog6ToothIcon className="h-4 w-4 text-gray-400" />
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Post Settings
        </span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        title="Close sidebar"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>

    <div className="space-y-6 p-4">
      {/* Thumbnail */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          <PhotoIcon className="h-3.5 w-3.5" />
          Cover Image
        </label>
        <input
          value={thumbnail}
          onChange={e => onThumbnailChange(e.target.value)}
          placeholder="https://…"
          className={inputClass}
        />
        {thumbnail && (
          <div className="relative mt-1.5 h-32 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt="Cover"
              className="h-full w-full object-cover"
              onError={e => (e.currentTarget.style.display = 'none')}
            />
          </div>
        )}
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Excerpt
        </label>
        <textarea
          value={excerpt}
          onChange={e => onExcerptChange(e.target.value)}
          placeholder="Short summary…"
          rows={4}
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
          Tags
        </label>
        <TagInput
          tags={tags}
          tagInput={tagInput}
          setTagInput={onTagInputChange}
          onAdd={onTagAdd}
          onRemove={onTagRemove}
        />
      </div>
    </div>
  </aside>
);

export default Sidebar;
