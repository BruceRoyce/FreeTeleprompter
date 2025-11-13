import { useState } from 'react';
import { Page, TeleprompterSettings, TeleprompterProject } from '../types';
import { FileOperationsCard } from '../components/FileOperationsCard';
import { SettingsCard } from '../components/SettingsCard';
import { AppearanceCard } from '../components/AppearanceCard';
import * as fileService from '../services/fileService';

interface SetupPageProps {
  script: string;
  settings: TeleprompterSettings;
  onTextChange: (text: string) => void;
  onSettingsChange: (settings: TeleprompterSettings) => void;
  onLoadProject: (project: TeleprompterProject) => void;
  onNavigate: (page: Page) => void;
}

export function SetupPage({
  script,
  settings,
  onTextChange,
  onSettingsChange,
  onLoadProject,
  onNavigate,
}: SetupPageProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLoadText = async () => {
    try {
      setError(null);
      const content = await fileService.loadTextFile();
      onTextChange(content);
      setSuccess('Text file loaded successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load text file');
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleSaveText = async () => {
    if (!script.trim()) {
      setError('No text to save');
      setTimeout(() => setError(null), 3000);
      return;
    }
    try {
      setError(null);
      const filename = await fileService.promptForFilename();
      if (filename) {
        await fileService.saveTextFile(filename, script);
        setSuccess('Text file saved successfully');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save text file');
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleSaveProject = async () => {
    try {
      setError(null);
      const filename = await fileService.promptForFilename('teleprompter-project');
      if (filename) {
        const project: TeleprompterProject = {
          text: script,
          settings,
        };
        await fileService.saveProjectFile(filename, project);
        setSuccess('Project saved successfully');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleLoadProject = async () => {
    try {
      setError(null);
      const project = await fileService.loadProjectFile();
      onLoadProject(project);
      setSuccess('Project loaded successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project');
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleRun = () => {
    if (!script.trim()) {
      setError('Please add some text before running the prompter');
      setTimeout(() => setError(null), 3000);
      return;
    }
    onNavigate('prompter');
  };

  return (
    <div className="setup-page">
      <header className="setup-header">
        <h1>Jinni's Teleprompter</h1>
        <p>Configure your teleprompter settings</p>
      </header>

      {(error || success) && (
        <div className={`message ${error ? 'error' : 'success'}`}>
          {error || success}
        </div>
      )}

      <div className="cards-container">
        <FileOperationsCard
          onLoadText={handleLoadText}
          onSaveText={handleSaveText}
          onSaveProject={handleSaveProject}
          onLoadProject={handleLoadProject}
        />

        <SettingsCard
          settings={settings}
          onSettingsChange={onSettingsChange}
        />

        <AppearanceCard
          settings={settings}
          onSettingsChange={onSettingsChange}
        />
      </div>

      <div className="setup-actions">
        <button className="btn btn-secondary" onClick={() => onNavigate('editor')}>
          Edit Script
        </button>
        <button className="btn btn-primary" onClick={handleRun}>
          Run Teleprompter
        </button>
      </div>
    </div>
  );
}

