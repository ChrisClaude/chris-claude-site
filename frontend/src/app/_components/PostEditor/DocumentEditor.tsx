'use client';

import { useState, useRef, useContext, useEffect } from 'react';
import UIContext from '@/_hooks/UIContext';
import { useMutation } from '@apollo/client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { useRouter } from 'next/navigation';
import { CreatePostDocument } from '@/_lib/graphql/__generated__/graphql';
import {
  ArrowLeftIcon,
  XMarkIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';

type DocumentEditorProps = {
  initialMetadata: Metadata;
  onBack: () => void;
};

const DocumentEditor = ({ initialMetadata, onBack }: DocumentEditorProps) => {
  const router = useRouter();
  const { setUIState } = useContext(UIContext);

  useEffect(() => {
    setUIState?.(s => ({ ...s, isEditorPage: true }));
    return () => setUIState?.(s => ({ ...s, isEditorPage: false }));
  }, [setUIState]);

  // Document state
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(initialMetadata.thumbnail);
  const [excerpt, setExcerpt] = useState(initialMetadata.excerpt);
  const [tags, setTags] = useState<string[]>(initialMetadata.tags);
  const [tagInput, setTagInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saveStatus, setSaveStatus] = useState<
    'idle' | 'saving' | 'saved' | 'error'
  >('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const titleRef = useRef<HTMLTextAreaElement>(null);

  const [createPost] = useMutation(CreatePostDocument);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Start writing…' }),
    ],
    editorProps: {
      attributes: {
        class:
          'outline-none min-h-[400px] prose dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:rounded prose-code:px-1 prose-code:bg-gray-100 dark:prose-code:bg-gray-800',
      },
    },
    immediatelyRender: false,
  });

  // Auto-resize title textarea
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Tab in title → jump to editor
  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      editor?.commands.focus('start');
    }
  };

  const addTag = (v: string) => {
    const t = v.trim().toLowerCase();
    if (t && !tags.includes(t) && tags.length < 10)
      setTags(prev => [...prev, t]);
    setTagInput('');
  };
  const removeTag = (t: string) => setTags(prev => prev.filter(x => x !== t));

  const handleSave = async () => {
    setSubmitError(null);
    const content = editor?.getHTML() ?? '';

    if (!title.trim())
      return setSubmitError('Please add a title to your post.');
    if (!content || content === '<p></p>')
      return setSubmitError('Post content cannot be empty.');
    if (!thumbnail.trim()) return setSubmitError('Cover image URL is missing.');
    if (!excerpt.trim()) return setSubmitError('Excerpt is missing.');
    if (tags.length === 0) return setSubmitError('Add at least one tag.');

    setSaveStatus('saving');
    try {
      const { data } = await createPost({
        variables: {
          input: {
            title: title.trim(),
            thumbnail: thumbnail.trim(),
            excerpt: excerpt.trim(),
            content,
            tags,
          },
        },
      });

      const errs = data?.createPost?.errors;
      if (errs && errs.length > 0) {
        setSubmitError(errs[0].message);
        setSaveStatus('error');
        return;
      }

      setSaveStatus('saved');
      setTimeout(() => router.push('/posts'), 1500);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
      setSaveStatus('error');
    }
  };

  if (saveStatus === 'saved') {
    return (
      <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center gap-4">
        <CheckCircleIcon className="h-16 w-16 text-green-500" />
        <h2 className="text-2xl font-bold">Saved as draft!</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Redirecting to posts…
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden">
      {/* ── Editor top bar ── */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 px-4">
        {/* Left */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Posts
        </button>

        {/* Center — title preview */}
        <span className="max-w-xs truncate text-sm font-medium text-gray-400 dark:text-gray-500">
          {title || 'Untitled'}
        </span>

        {/* Right */}
        <div className="flex items-center gap-2">
          {submitError && (
            <span className="hidden text-xs text-red-500 sm:block">
              {submitError}
            </span>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen(o => !o)}
            title="Toggle settings"
            className={`rounded-lg p-1.5 transition-colors ${
              sidebarOpen
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400'
            }`}
          >
            <Cog6ToothIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="rounded-lg bg-gray-900 dark:bg-white px-4 py-1.5 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            {saveStatus === 'saving' ? 'Saving…' : 'Save Draft'}
          </button>
        </div>
      </div>

      {/* ── Toolbar ── */}
      {editor && (
        <div className="shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900">
          <Toolbar editor={editor} />
        </div>
      )}

      {/* ── Main area ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas (scrollable) */}
        <div className="flex-1 overflow-y-auto bg-neutral-100 dark:bg-[#141414]">
          {/* Inline error below toolbar */}
          {submitError && (
            <div className="mx-auto mt-4 flex max-w-195 items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-2.5 text-sm text-red-700 dark:text-red-400">
              <XMarkIcon className="h-4 w-4 shrink-0" />
              {submitError}
            </div>
          )}

          {/* Paper */}
          <div className="relative mx-auto my-8 max-w-195 min-h-[calc(100vh-12rem)] rounded-sm bg-white dark:bg-[#1e1e1e] px-16 py-12 shadow-md dark:shadow-none dark:border dark:border-gray-800">
            {/* Title */}
            <textarea
              ref={titleRef}
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleTitleKeyDown}
              placeholder="Untitled"
              rows={1}
              className="mb-2 w-full resize-none overflow-hidden bg-transparent text-[2.75rem] font-bold leading-tight text-gray-900 dark:text-gray-100 outline-none placeholder:text-gray-300 dark:placeholder:text-gray-700"
            />

            {/* Divider */}
            <div className="mb-8 h-px w-16 bg-gray-200 dark:bg-gray-700" />

            {/* Editor content */}
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <Sidebar
            thumbnail={thumbnail}
            excerpt={excerpt}
            tags={tags}
            tagInput={tagInput}
            onThumbnailChange={setThumbnail}
            onExcerptChange={setExcerpt}
            onTagInputChange={setTagInput}
            onTagAdd={addTag}
            onTagRemove={removeTag}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentEditor;
