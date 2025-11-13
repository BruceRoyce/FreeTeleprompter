import React from "react";
import { TeleprompterSettings } from "../types";
import { Card } from "./Card";
import { SettingItem, SettingItemsGroup } from "./settings/index";

interface SettingsCardProps {
  settings: TeleprompterSettings;
  onSettingsChange: (settings: TeleprompterSettings) => void;
}

export function SettingsCard({
  settings,
  onSettingsChange,
}: SettingsCardProps) {
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

  const handleShowPlacemarkerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    <Card cardTitle="Settings">
      <SettingItemsGroup legend="Font">
        <SettingItem>
          <label htmlFor="fontSize">Size</label>
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
          <span className="tiny">
            {settings.fontSize.toFixed(1).padStart(4, "0")}rem
          </span>
        </SettingItem>
      </SettingItemsGroup>

      <SettingItemsGroup legend="Scroll">
        <SettingItem>
          <label htmlFor="autoScroll" className="checkbox-label">
            <span>Auto Scroll</span>
          </label>
 
          <input
            id="autoScroll"
            type="checkbox"
            checked={settings.isAutoScrollSelected}
            onChange={handleAutoScrollChange}
          />
        </SettingItem>
        <SettingItem>
          <label htmlFor="scrollSpeed">
            Speed
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
          <span className="tiny">{settings.scrollSpeed.toString().padStart(3, "0")}%</span>
        </SettingItem>
      </SettingItemsGroup>

      

      <SettingItemsGroup legend="Colors">
      <SettingItem>
        <label htmlFor="fontColor">Font</label>
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
        <label htmlFor="backgroundColor">Background</label>
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
      <SettingItem>
        <label htmlFor="backgroundColor">Instructions</label>
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
      </SettingItemsGroup>
      

      <SettingItemsGroup legend="Other">
        <SettingItem>
        <label htmlFor="showPlacemarker" className="checkbox-label">
            <span>Show Place Marker</span>
            </label>
          <input
            id="showPlacemarker"
            type="checkbox"
            checked={settings.isShowingPlacemarker}
            onChange={handleShowPlacemarkerChange}
          />
      </SettingItem>
      </SettingItemsGroup>
    </Card>
  );
}
