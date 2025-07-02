export default function SidebarRecentCities({ recent = [], onSelect }) {
  if (!recent.length) return null;
  return (
    <section>
      <h6 className="sidebar-heading">Recent Searches</h6>
      <div className="d-flex flex-wrap gap-1">
        {recent.map(city => (
          <button
            key={city}
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onSelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}
