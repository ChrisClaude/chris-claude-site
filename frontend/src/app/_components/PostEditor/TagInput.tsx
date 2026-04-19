'use client';

import { useRef, KeyboardEvent } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type TagInputProps = {
  tags: string[];
  tagInput: string;
  setTagInput: (v: string) => void;
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
};

const TagInput = ({
  tags,
  tagInput,
  setTagInput,
  onAdd,
  onRemove,
}: TagInputProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      onAdd(tagInput);
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      onRemove(tags[tags.length - 1]);
    }
  };

  return (
    <div
      className="flex min-h-10 flex-wrap gap-1.5 cursor-text rounded-lg border border-gray-200 dark:border-gray-700 px-2.5 py-1.5 transition focus-within:border-gray-400 dark:focus-within:border-gray-600 focus-within:ring-2 focus-within:ring-gray-100 dark:focus-within:ring-gray-800"
      onClick={() => ref.current?.focus()}
    >
      {tags.map(tag => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300"
        >
          {tag}
          <button
            type="button"
            onClick={() => onRemove(tag)}
            className="hover:text-red-500 transition-colors"
          >
            <XMarkIcon className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        ref={ref}
        value={tagInput}
        onChange={e => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => tagInput && onAdd(tagInput)}
        placeholder={tags.length === 0 ? 'Add tags…' : ''}
        className="flex-1 min-w-25 bg-transparent text-sm outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
      />
    </div>
  );
};

export default TagInput;
