import React, { useRef, useEffect } from 'react';
import { Page } from '../types';

interface EditorPageProps {
  text: string;
  onTextChange: (text: string) => void;
  onNavigate: (page: Page) => void;
}

export function EditorPage({ text, onTextChange, onNavigate }: EditorPageProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.textContent !== text) {
      editorRef.current.textContent = text;
    }
  }, [text]);

  const handleInput = () => {
    if (editorRef.current) {
      onTextChange(editorRef.current.textContent || '');
    }
  };

  return (
    <div className="editor-page" style={{ transform: 'none' }}>
      <div className="editor-header">
        <h2>Edit Script</h2>
        
        <button
          className="btn btn-primary"
          onClick={() => onNavigate('setup')}
        >
          ← Save & Go Back to Setup
        </button>
      </div>

      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning
        style={{ transform: 'none' }}
      >
        {text}
      </div>
    </div>
  );
}

