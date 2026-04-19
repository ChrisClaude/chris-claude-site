'use client';

import { useCallback } from 'react';
import { useEditor } from '@tiptap/react';
import {
  PhotoIcon,
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
import TBtn from './TBtn';
import TDivider from './TDivider';

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

export default Toolbar;
