import { useState } from 'react';
import { SetupPage } from './pages/SetupPage';
import { PrompterPage } from './pages/PrompterPage';
import { EditorPage } from './pages/EditorPage';
import { Page, TeleprompterProject, TeleprompterSettings } from './types';
import './styles/index.css';

const defaultSettings: TeleprompterSettings = {
  fontSize: 8,
  isAutoScrollSelected: false,
  isShowingPlacemarker: false,
  scrollSpeed: 10,
  fontColor: '#d3d3d3', // light gray
  bgColor: '#000000', // black
  flipMode: 'none',
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('setup');
  const [script, setScript] = useState<string>('');
  const [settings, setSettings] = useState<TeleprompterSettings>(defaultSettings);

  const handleLoadProject = (project: TeleprompterProject) => {
    setScript(project.text);
    setSettings(project.settings);
  };

  const handleUpdateText = (newText: string) => {
    setScript(newText);
  };

  const handleUpdateSettings = (newSettings: TeleprompterSettings) => {
    setSettings(newSettings);
  };

  return (
    <div className="app">
      {currentPage === 'setup' && (
        <SetupPage
          script={script}
          settings={settings}
          onTextChange={handleUpdateText}
          onSettingsChange={handleUpdateSettings}
          onLoadProject={handleLoadProject}
          onNavigate={(page) => setCurrentPage(page)}
        />
      )}
      {currentPage === 'prompter' && (
        <PrompterPage
          script={script}
          settings={settings}
          onNavigate={(page) => setCurrentPage(page)}
        />
      )}
      {currentPage === 'editor' && (
        <EditorPage
          script={script}
          onTextChange={handleUpdateText}
          onNavigate={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default App;

