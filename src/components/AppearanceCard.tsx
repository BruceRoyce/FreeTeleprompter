import { Card } from "./Card";
import { SettingItemsGroup, SettingItem } from "./settings/index";
import { TeleprompterSettings } from "../types";

interface AppearanceCardProps {
  settings: TeleprompterSettings;
  onSettingsChange: (settings: TeleprompterSettings) => void;
}

export function AppearanceCard({
  settings,
  onSettingsChange,
}: AppearanceCardProps) {
  const handleFlipModeChange = (mode: TeleprompterSettings["flipMode"]) => {
    onSettingsChange({
      ...settings,
      flipMode: mode,
    });
  };

  return (
    <Card cardTitle="Mirroring">
        <div className="radio-group">
      <SettingItemsGroup legend="Mirroring">
          <SettingItem>
            <label>No Mirroring</label>
            <input
              type="radio"
              name="flipMode"
              value="none"
              checked={settings.flipMode === "none"}
              onChange={() => handleFlipModeChange("none")}
            />
          </SettingItem>
          <SettingItem>
            <label>Flip Horizontally</label>
            <input
              type="radio"
              name="flipMode"
              value="horizontal"
              checked={settings.flipMode === "horizontal"}
              onChange={() => handleFlipModeChange("horizontal")}
            />
          </SettingItem>
          
          <SettingItem>
            <label>
           Flip Vertically
            </label>
            <input
              type="radio"
              name="flipMode"
              value="vertical"
              checked={settings.flipMode === "vertical"}
              onChange={() => handleFlipModeChange("vertical")}
            />
            </SettingItem>
            <SettingItem>
          <label>
           Flip Both <span className="tiny">(Horizontally & Vertically)</span>
            </label>  
            <input
              type="radio"
              name="flipMode"
              value="both"
              checked={settings.flipMode === "both"}
              onChange={() => handleFlipModeChange("both")}
            />
          </SettingItem>
      </SettingItemsGroup>
        </div>
    </Card>
  );
}
