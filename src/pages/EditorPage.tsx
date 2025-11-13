import { useRef, useEffect } from 'react';
import { Page } from '../types';

interface EditorPageProps {
  script: string;
  onTextChange: (text: string) => void;
  onNavigate: (page: Page) => void;
}

export function EditorPage({ script, onTextChange, onNavigate }: EditorPageProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== script) {
      editorRef.current.innerHTML = script;
    }
  }, [script]);

  const handleInput = () => {
    if (editorRef.current) {
      onTextChange(editorRef.current.innerHTML || '');
    }
  };

  const handleOnNavigate = () => {
    handleInput();
    onNavigate('setup');
  };

  return (
    <div className="editor-page" style={{ transform: 'none' }}>
      <div className="editor-header">
        <h2>Edit Script</h2>
        
        <button
          className="btn btn-primary"
          onClick={ handleOnNavigate}
        >
          ← Save & Go Back to Setup
        </button>
      </div>

      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        suppressContentEditableWarning
        style={{ transform: 'none' }}
        dangerouslySetInnerHTML={{ __html: script }}
      >
      </div>
    </div>
  );
}

