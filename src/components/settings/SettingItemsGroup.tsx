

export function SettingItemsGroup({ legend, children }: { legend: string, children: React.ReactNode }) {
  return (
    <fieldset className="setting-items-group">
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}