import React from "react";
import { TeleprompterSettings } from "../types";
import { Card } from "./Card";
import { SettingItem, SettingItemsGroup } from "./settings/index";

interface SettingsCardProps {
  settings: TeleprompterSettings;
  onSettingsChange: (settings: TeleprompterSettings) => void;
}

type SettingKind = "numeric" | "boolean" | "string";
type SettingName = keyof TeleprompterSettings;
type SettingValue = string | number | boolean;

type ChangedSetting = {
  name: SettingName;
  kind: SettingKind;
};


export function SettingsCard({
  settings,
  onSettingsChange,
}: SettingsCardProps) {



  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>, setting: ChangedSetting) => {
    let value: SettingValue;
    
    switch (setting.kind) {
      case "numeric":
        value = parseFloat(e.target.value);
        break;
      case "boolean":
        value = e.target.checked;
        break;
      case "string":
        value = e.target.value;
        break;
    }

    onSettingsChange({
      ...settings,
      [setting.name]: value,
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
            onChange={(e) => handleSettingsChange(e, { name: 'fontSize', kind: 'numeric' })}
            className="slider"
          />
          <span className="tiny">
            {settings.fontSize.toFixed(1).padStart(4, "0")}rem
          </span>
        </SettingItem>
        <SettingItem>
          <label className="one-line-text" htmlFor="lineHeight">Line Height</label>
          <input
            id="lineHeight"
            type="range"
            min="1"
            max="2"
            step="0.1"
            value={settings.lineHeight}
            onChange={(e) => handleSettingsChange(e, { name: 'lineHeight', kind: 'numeric' })}
            className="slider"
          />
          <span className="tiny">
            {settings.lineHeight !== undefined && (settings.lineHeight * 100).toFixed(0).padStart(3, "0")}%
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
            onChange={(e) => handleSettingsChange(e, { name: 'isAutoScrollSelected', kind: 'boolean' })}
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
            onChange={(e) => handleSettingsChange(e, { name: 'scrollSpeed', kind: 'numeric' })}
            className="slider"
          />
          <span className="tiny">{settings.scrollSpeed.toString().padStart(3, "0")}%</span>
        </SettingItem>
      </SettingItemsGroup>

      

      <SettingItemsGroup legend="Colours">
      <SettingItem>
        <label htmlFor="fontColor">Font</label>
        <div className="color-picker-container">
          <input
            id="fontColor"
            type="color"
            value={settings.fontColor}
            onChange={(e) => handleSettingsChange(e, { name: 'fontColor', kind: 'string' })}
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
            onChange={(e) => handleSettingsChange(e, { name: 'bgColor', kind: 'string' })}
            className="color-picker"
          />
          <span className="color-value">{settings.bgColor}</span>
        </div>
        </SettingItem>
      <SettingItem>
        <label htmlFor="instructionsColor">Instructions</label>
        <div className="color-picker-container">
          <input
            id="instructionsColor"
            type="color"
            value={settings.instructionsColor}
            onChange={(e) => handleSettingsChange(e, { name: 'instructionsColor', kind: 'string' })}
            className="color-picker"
          />
          <span className="color-value">{settings.instructionsColor}</span>
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
            onChange={(e) => handleSettingsChange(e, { name: 'isShowingPlacemarker', kind: 'boolean' })}
          />
      </SettingItem>
      </SettingItemsGroup>
    </Card>
  );
}
