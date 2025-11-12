import React from 'react';
import { TeleprompterSettings } from '../types';

interface AppearanceCardProps {
  settings: TeleprompterSettings;
  onSettingsChange: (settings: TeleprompterSettings) => void;
}

export function AppearanceCard({ settings, onSettingsChange }: AppearanceCardProps) {
  const handleFlipModeChange = (mode: TeleprompterSettings['flipMode']) => {
    onSettingsChange({
      ...settings,
      flipMode: mode,
    });
  };

  return (
    <div className="card">
      <h3>Mirroring</h3>
      <div className="card-content">
        <div className="setting-item">
          <label>Flip/Mirror Mode</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="flipMode"
                value="none"
                checked={settings.flipMode === 'none'}
                onChange={() => handleFlipModeChange('none')}
              />
              <span>Normal</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="flipMode"
                value="horizontal"
                checked={settings.flipMode === 'horizontal'}
                onChange={() => handleFlipModeChange('horizontal')}
              />
              <span>Flip Horizontally</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="flipMode"
                value="vertical"
                checked={settings.flipMode === 'vertical'}
                onChange={() => handleFlipModeChange('vertical')}
              />
              <span>Flip Vertically</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="flipMode"
                value="both"
                checked={settings.flipMode === 'both'}
                onChange={() => handleFlipModeChange('both')}
              />
              <span>Flip Both</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

