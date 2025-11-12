



export function SettingsCard({cardTitle, children}: {cardTitle: string, children: React.ReactNode}) {
  return (
    <div className="card">
      <h3>{cardTitle}</h3>
      <div className="card-content">

            {children}
        </div>
    </div>
  );
}
