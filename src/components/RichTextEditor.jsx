// // RichTextEditor.jsx
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import React from 'react';

// export default function RichTextEditor() {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: '<p>Hello, world!</p>',
//   });

//   if (!editor) return null;

//   return (
//     <div className="border rounded-xl p-4 space-y-4 bg-white shadow-sm">
//       {/* Toolbar */}
//       <div className="flex gap-2 flex-wrap">
//         <button onClick={() => editor.chain().focus().toggleBold().run()}
//                 className={editor.isActive('bold') ? 'font-bold text-blue-600' : ''}>
//           Bold
//         </button>
//         <button onClick={() => editor.chain().focus().toggleItalic().run()}
//                 className={editor.isActive('italic') ? 'italic text-blue-600' : ''}>
//           Italic
//         </button>
//         <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                 className={editor.isActive('heading', { level: 1 }) ? 'text-xl font-bold text-blue-600' : ''}>
//           H1
//         </button>
//         <button onClick={() => editor.chain().focus().toggleBulletList().run()}
//                 className={editor.isActive('bulletList') ? 'text-blue-600' : ''}>
//           Bullet List
//         </button>
//       </div>

//       {/* Editor Content */}
//       <div className="min-h-[150px] border p-3 rounded-md">
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// }
// ;
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';


const RichTextEditor = ({ input, setInput }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: input.description || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setInput({ ...input, description: html });
    },
  });

  // Sync TipTap content with external changes to input.description
  useEffect(() => {
    if (editor && input.description !== editor.getHTML()) {
      editor.commands.setContent(input.description || '');
    }
  }, [input.description]);

  if (!editor) return null;

  return (
    <div className="editor-wrapper">
      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}>Italic</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'active' : ''}>• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'active' : ''}>1. List</button>
        <button onClick={() => {
          const url = window.prompt('Enter a URL');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}>🔗 Link</button>
        <button onClick={() => editor.chain().focus().unsetLink().run()}>❌ Unlink</button>
      </div>

      <EditorContent
  editor={editor}
  className="min-h-[150px] border border-gray-300 p-3 rounded-md bg-white mt-2"
/>
    </div>
  );
};

export default RichTextEditor;
