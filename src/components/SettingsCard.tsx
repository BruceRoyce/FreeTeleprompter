import React from 'react';
import { TeleprompterSettings } from '../types';

interface SettingsCardProps {
  settings: TeleprompterSettings;
  onSettingsChange: (settings: TeleprompterSettings) => void;
}

export function SettingsCard({ settings, onSettingsChange }: SettingsCardProps) {
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      fontSize: parseFloat(e.target.value),
    });
  };

  const handleAutoScrollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      autoScroll: e.target.checked,
    });
  };

  const handleScrollSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      scrollSpeed: parseInt(e.target.value, 10),
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      fontColor: e.target.value,
    });
  };

  return (
    <div className="card">
      <h3>Settings</h3>
      <div className="card-content">
        <div className="setting-item">
          <label htmlFor="fontSize">
            Font Size: {settings.fontSize.toFixed(1)}rem
          </label>
          <input
            id="fontSize"
            type="range"
            min="5"
            max="15"
            step="0.5"
            value={settings.fontSize}
            onChange={handleFontSizeChange}
            className="slider"
          />
        </div>

        <div className="setting-item">
          <label htmlFor="autoScroll" className="checkbox-label">
            <input
              id="autoScroll"
              type="checkbox"
              checked={settings.autoScroll}
              onChange={handleAutoScrollChange}
            />
            <span>Auto Scroll</span>
          </label>
        </div>

        {settings.autoScroll && (
          <div className="setting-item">
            <label htmlFor="scrollSpeed">
              Scroll Speed: {settings.scrollSpeed}%
            </label>
            <input
              id="scrollSpeed"
              type="range"
              min="0"
              max="100"
              step="1"
              value={settings.scrollSpeed}
              onChange={handleScrollSpeedChange}
              className="slider"
            />
          </div>
        )}

        <div className="setting-item">
          <label htmlFor="fontColor">Font Color</label>
          <div className="color-picker-container">
            <input
              id="fontColor"
              type="color"
              value={settings.fontColor}
              onChange={handleColorChange}
              className="color-picker"
            />
            <span className="color-value">{settings.fontColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

