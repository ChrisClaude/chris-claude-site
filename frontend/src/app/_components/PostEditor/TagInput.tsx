'use client';

import { useRef, KeyboardEvent, useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@apollo/client';
import { SEARCH_TAGS } from '@/_lib/graphql/queries/tag';

type TagSuggestion = { id: string; name: string };

type TagInputProps = {
  tags: string[];
  tagInput: string;
  setTagInput: (v: string) => void;
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
  isAdmin?: boolean;
};

const TagInput = ({
  tags,
  tagInput,
  setTagInput,
  onAdd,
  onRemove,
  isAdmin = false,
}: TagInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { data } = useQuery<{ tags: { nodes: TagSuggestion[] } }>(SEARCH_TAGS, {
    variables: { first: 8, search: tagInput || undefined },
    skip: tagInput.length < 1,
    fetchPolicy: 'cache-and-network',
  });

  const suggestions = (data?.tags?.nodes ?? []).filter(
    s => !tags.includes(s.name),
  );

  useEffect(() => {
    setOpen(tagInput.length > 0 && suggestions.length > 0);
    setActiveIndex(-1);
  }, [tagInput, suggestions.length]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (open && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(i => Math.min(i + 1, suggestions.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(i => Math.max(i - 1, -1));
        return;
      }
      if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        onAdd(suggestions[activeIndex].name);
        setOpen(false);
        return;
      }
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
    }

    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (isAdmin && tagInput.trim()) {
        onAdd(tagInput);
        setOpen(false);
      }
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      onRemove(tags[tags.length - 1]);
    }
  };

  const handleSelect = (name: string) => {
    onAdd(name);
    setOpen(false);
    ref.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
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
          onFocus={() =>
            tagInput.length > 0 && suggestions.length > 0 && setOpen(true)
          }
          onBlur={() => {
            // Delay close so click on suggestion registers first
            setTimeout(() => setOpen(false), 150);
            if (isAdmin && tagInput) onAdd(tagInput);
          }}
          placeholder={tags.length === 0 ? 'Search tags…' : ''}
          className="flex-1 min-w-25 bg-transparent text-sm outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
        />
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg overflow-hidden text-sm">
          {suggestions.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onMouseDown={e => e.preventDefault()}
                onClick={() => handleSelect(s.name)}
                className={`w-full text-left px-3 py-2 transition-colors ${
                  i === activeIndex
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {s.name}
              </button>
            </li>
          ))}
          {isAdmin &&
            tagInput.trim() &&
            !suggestions.some(
              s => s.name === tagInput.trim().toLowerCase(),
            ) && (
              <li>
                <button
                  type="button"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => {
                    onAdd(tagInput);
                    setOpen(false);
                    ref.current?.focus();
                  }}
                  className="w-full text-left px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-t border-gray-100 dark:border-gray-700"
                >
                  Create &ldquo;{tagInput.trim().toLowerCase()}&rdquo;
                </button>
              </li>
            )}
        </ul>
      )}

      {!isAdmin && tagInput.trim() && !open && (
        <p className="mt-1 text-[11px] text-amber-600 dark:text-amber-400">
          Only existing tags can be used. Select from the suggestions.
        </p>
      )}
    </div>
  );
};

export default TagInput;
