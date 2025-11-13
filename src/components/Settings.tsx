import React from 'react';
import { TeleprompterSettings } from '../types';

import { SettingItem, SettingsCard } from './settings/index';

interface SettingsCardProps {
  settings: TeleprompterSettings;
  onSettingsChange: (settings: TeleprompterSettings) => void;
}

export function Settings({ settings, onSettingsChange }: SettingsCardProps) {
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      fontSize: parseFloat(e.target.value),
    });
  };

  const handleAutoScrollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      isAutoScrollSelected: e.target.checked,
    });
  };

  const handleScrollSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      scrollSpeed: parseInt(e.target.value, 10),
    });
  };

  const handleShowPlacemarkerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      isShowingPlacemarker: e.target.checked,
    });
  };

  const handleFontColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      fontColor: e.target.value,
    });
  };

  const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      bgColor: e.target.value,
    });
  };

  return (
    <SettingsCard cardTitle="Settings">
    <SettingItem>
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
        </SettingItem>

        <SettingItem>
          <label htmlFor="autoScroll" className="checkbox-label">
            <input
              id="autoScroll"
              type="checkbox"
              checked={settings.isAutoScrollSelected}
              onChange={handleAutoScrollChange}
            />
            <span>Auto Scroll</span>
          </label>
        </SettingItem>

        {settings.isAutoScrollSelected && (
          <SettingItem>
            <label htmlFor="scrollSpeed">
              Scroll Speed: {settings.scrollSpeed}%
            </label>
            <input
            disabled={!settings.isAutoScrollSelected}
              id="scrollSpeed"
              type="range"
              min="0"
              max="100"
              step="1"
              value={settings.scrollSpeed}
              onChange={handleScrollSpeedChange}
              className="slider"
            />
          </SettingItem>
        )}

        <SettingItem>
          <label htmlFor="showPlacemarker" className="checkbox-label">
            <input
              id="showPlacemarker"
              type="checkbox"
              checked={settings.isShowingPlacemarker}
              onChange={handleShowPlacemarkerChange}
            />
            <span>Show Place Marker</span>
          </label>
        </SettingItem>

        <SettingItem>
          <label htmlFor="fontColor">Font Color</label>
          <div className="color-picker-container">
            <input
              id="fontColor"
              type="color"
              value={settings.fontColor}
              onChange={handleFontColorChange}
              className="color-picker"
            />
            <span className="color-value">{settings.fontColor}</span>
          </div>
        </SettingItem>

        <SettingItem>
          <label htmlFor="backgroundColor">Background Color</label>
          <div className="color-picker-container">
            <input
              id="backgroundColor"
              type="color"
              value={settings.bgColor}
              onChange={handleBgColorChange}
              className="color-picker"
            />
            <span className="color-value">{settings.bgColor}</span>
          </div>
        </SettingItem>
    </SettingsCard>
    
  );
}

