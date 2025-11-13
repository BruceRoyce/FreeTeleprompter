import { Card } from "./Card";
import { SettingItemsGroup } from "./settings/index";
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
    <Card cardTitle="Load/Save">
      <SettingItemsGroup legend="File">

      <div className="button-group">
        <button className="btn" onClick={onLoadText}>
          Load File
        </button>
        <button className="btn" onClick={onSaveText}>
          Save File
        </button>
      </div>
      </SettingItemsGroup>
      
 <SettingItemsGroup legend="Project">
      <div className="button-group">
        <button className="btn" onClick={onLoadProject}>
          Load Project
        </button>
        <button className="btn" onClick={onSaveProject}>
          Save Project
        </button>
      </div>
      </SettingItemsGroup>
    </Card>
  );
}
