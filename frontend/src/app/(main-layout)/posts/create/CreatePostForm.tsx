'use client';

import { useState, useRef, useCallback, KeyboardEvent } from 'react';
import { useMutation } from '@apollo/client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { useRouter } from 'next/navigation';
import { CREATE_POST } from '@/_lib/graphql/mutations/post';
import {
  ArrowLeftIcon,
  XMarkIcon,
  PlusIcon,
  PhotoIcon,
  TagIcon,
  Cog6ToothIcon,
  LinkIcon,
  CodeBracketIcon,
  ListBulletIcon,
  MinusIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  Bars3BottomLeftIcon,
  Bars3Icon,
  Bars3BottomRightIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

// ─── Types ───────────────────────────────────────────────────────────────────

type Metadata = { thumbnail: string; excerpt: string; tags: string[] };

type CreatePostPayload = {
  createPost: {
    postDto: { id: string; slug: string } | null;
    errors: Array<{ message: string; code?: string }>;
  };
};

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none transition focus:border-gray-400 dark:focus:border-gray-600 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-600';

// ─── Toolbar ─────────────────────────────────────────────────────────────────

type TBtnProps = {
  onClick: () => void;
  isActive?: boolean;
  title: string;
  children: React.ReactNode;
};

const TBtn = ({ onClick, isActive, title, children }: TBtnProps) => (
  <button
    type="button"
    onMouseDown={e => {
      e.preventDefault(); // keep editor focused
      onClick();
    }}
    title={title}
    className={`flex h-7 min-w-[28px] items-center justify-center rounded px-1.5 text-[13px] transition-colors ${
      isActive
        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`}
  >
    {children}
  </button>
);

const TDivider = () => (
  <span className="mx-1 h-5 w-px shrink-0 self-center bg-gray-200 dark:bg-gray-700" />
);

type ToolbarProps = { editor: ReturnType<typeof useEditor> };

const Toolbar = ({ editor }: ToolbarProps) => {
  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('URL', prev ?? 'https://');
    if (url === null) return;
    if (!url) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-1.5">
      {/* Undo / Redo */}
      <TBtn
        onClick={() => editor.chain().focus().undo().run()}
        title="Undo (⌘Z)"
      >
        <ArrowUturnLeftIcon className="h-3.5 w-3.5" />
      </TBtn>
      <TBtn
        onClick={() => editor.chain().focus().redo().run()}
        title="Redo (⌘⇧Z)"
      >
        <ArrowUturnRightIcon className="h-3.5 w-3.5" />
      </TBtn>

      <TDivider />

      {/* Headings */}
      {([1, 2, 3] as const).map(level => (
        <TBtn
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          isActive={editor.isActive('heading', { level })}
          title={`Heading ${level}`}
        >
          <span className="font-bold">H{level}</span>
        </TBtn>
      ))}

      <TDivider />

      {/* Marks */}
      <TBtn
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold (⌘B)"
      >
        <span className="font-bold">B</span>
      </TBtn>
      <TBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic (⌘I)"
      >
        <span className="italic">I</span>
      </TBtn>
      <TBtn
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
        title="Underline (⌘U)"
      >
        <span className="underline">U</span>
      </TBtn>
      <TBtn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
        title="Strikethrough"
      >
        <span className="line-through">S</span>
      </TBtn>
      <TBtn
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
        title="Inline Code"
      >
        <CodeBracketIcon className="h-3.5 w-3.5" />
      </TBtn>

      <TDivider />

      {/* Alignment */}
      <TBtn
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
        title="Align Left"
      >
        <Bars3BottomLeftIcon className="h-3.5 w-3.5" />
      </TBtn>
      <TBtn
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
        title="Align Center"
      >
        <Bars3Icon className="h-3.5 w-3.5" />
      </TBtn>
      <TBtn
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
        title="Align Right"
      >
        <Bars3BottomRightIcon className="h-3.5 w-3.5" />
      </TBtn>

      <TDivider />

      {/* Lists */}
      <TBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <ListBulletIcon className="h-3.5 w-3.5" />
      </TBtn>
      <TBtn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="Numbered List"
      >
        <span className="font-mono text-[11px] font-bold">1.</span>
      </TBtn>

      <TDivider />

      {/* Blocks */}
      <TBtn
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title="Blockquote"
      >
        <span className="text-base font-serif leading-none">&ldquo;</span>
      </TBtn>
      <TBtn
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
        title="Code Block"
      >
        <span className="font-mono text-[10px] font-bold">{'</>'}</span>
      </TBtn>
      <TBtn
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Divider"
      >
        <MinusIcon className="h-3.5 w-3.5" />
      </TBtn>

      <TDivider />

      {/* Link & Image */}
      <TBtn
        onClick={setLink}
        isActive={editor.isActive('link')}
        title="Add Link"
      >
        <LinkIcon className="h-3.5 w-3.5" />
      </TBtn>
      <TBtn onClick={addImage} title="Insert Image">
        <PhotoIcon className="h-3.5 w-3.5" />
      </TBtn>
    </div>
  );
};

// ─── Tag input (shared) ───────────────────────────────────────────────────────

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

// ─── Step 1: Metadata gate ────────────────────────────────────────────────────

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

// ─── Sidebar ─────────────────────────────────────────────────────────────────

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

// ─── Step 2: Document editor ──────────────────────────────────────────────────

type DocumentEditorProps = {
  initialMetadata: Metadata;
  onBack: () => void;
};

const DocumentEditor = ({ initialMetadata, onBack }: DocumentEditorProps) => {
  const router = useRouter();

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

  const [createPost] = useMutation<CreatePostPayload>(CREATE_POST);

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

// ─── Main export ─────────────────────────────────────────────────────────────

const CreatePostForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<'metadata' | 'editor'>('metadata');
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  if (step === 'metadata') {
    return (
      <MetadataStep
        onStart={data => {
          setMetadata(data);
          setStep('editor');
        }}
      />
    );
  }

  return (
    <DocumentEditor
      initialMetadata={metadata!}
      onBack={() => router.push('/posts')}
    />
  );
};

export default CreatePostForm;
