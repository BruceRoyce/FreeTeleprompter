import React from 'react';

interface FileOperationsCardProps {
  onLoadText: () => void;
  onSaveText: () => void;
  onSaveProject: () => void;
  onLoadProject: () => void;
}

export function FileOperationsCard({
  onLoadText,
  onSaveText,
  onSaveProject,
  onLoadProject,
}: FileOperationsCardProps) {
  return (
    <div className="card">
      <h3>File Operations</h3>
      <div className="card-content">
        <div className="button-group">
          <button className="btn" onClick={onLoadText}>
            Load Text File
          </button>
          <button className="btn" onClick={onSaveText}>
            Save Text File
          </button>
        </div>
        <div className="button-group">
          <button className="btn" onClick={onSaveProject}>
            Save Project
          </button>
          <button className="btn" onClick={onLoadProject}>
            Load Project
          </button>
        </div>
      </div>
    </div>
  );
}

