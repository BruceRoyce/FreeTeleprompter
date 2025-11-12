import { useState } from 'react';
import { SetupPage } from './pages/SetupPage';
import { PrompterPage } from './pages/PrompterPage';
import { EditorPage } from './pages/EditorPage';
import { Page, TeleprompterProject, TeleprompterSettings } from './types';
import './styles/index.css';

const defaultSettings: TeleprompterSettings = {
  fontSize: 8,
  autoScroll: false,
  scrollSpeed: 50,
  fontColor: '#d3d3d3', // light gray
  flipMode: 'none',
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('setup');
  const [text, setText] = useState<string>('');
  const [settings, setSettings] = useState<TeleprompterSettings>(defaultSettings);

  const handleLoadProject = (project: TeleprompterProject) => {
    setText(project.text);
    setSettings(project.settings);
  };

  const handleUpdateText = (newText: string) => {
    setText(newText);
  };

  const handleUpdateSettings = (newSettings: TeleprompterSettings) => {
    setSettings(newSettings);
  };

  return (
    <div className="app">
      {currentPage === 'setup' && (
        <SetupPage
          text={text}
          settings={settings}
          onTextChange={handleUpdateText}
          onSettingsChange={handleUpdateSettings}
          onLoadProject={handleLoadProject}
          onNavigate={(page) => setCurrentPage(page)}
        />
      )}
      {currentPage === 'prompter' && (
        <PrompterPage
          text={text}
          settings={settings}
          onNavigate={(page) => setCurrentPage(page)}
        />
      )}
      {currentPage === 'editor' && (
        <EditorPage
          text={text}
          onTextChange={handleUpdateText}
          onNavigate={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default App;

