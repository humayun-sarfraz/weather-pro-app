export default function SidebarSettings({ darkMode, setDarkMode, unit, setUnit }) {
  return (
    <section>
      <h6 className="sidebar-heading">Settings</h6>
      <div className="d-flex flex-column gap-2">
        <div>
          <label className="form-label me-2">Theme:</label>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setDarkMode(d => !d)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <div>
          <label className="form-label me-2">Unit:</label>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setUnit(u => (u === 'metric' ? 'imperial' : 'metric'))}>
            {unit === 'metric' ? '°C → °F' : '°F → °C'}
          </button>
        </div>
      </div>
    </section>
  );
}
