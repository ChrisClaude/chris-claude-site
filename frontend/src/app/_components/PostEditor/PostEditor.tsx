'use client';

/**
 * Standalone PostEditor — for read-only or simple embed use.
 * The full document-editor experience lives in CreatePostForm.tsx.
 */
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

type PostEditorProps = {
  content?: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

const PostEditor = ({
  content = '',
  onChange,
  placeholder = 'Start writing…',
}: PostEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert max-w-none min-h-[400px] px-6 py-5 focus:outline-none',
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
      <EditorContent editor={editor} />
    </div>
  );
};

export default PostEditor;
