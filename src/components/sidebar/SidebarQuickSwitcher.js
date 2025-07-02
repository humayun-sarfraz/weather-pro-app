export default function SidebarQuickSwitcher({ onSelect }) {
  const cities = ['Lahore', 'Karachi', 'London', 'Paris', 'New York'];
  return (
    <section>
      <h6 className="sidebar-heading">Quick Switch</h6>
      <div className="d-flex flex-wrap gap-1">
        {cities.map(city => (
          <button
            key={city}
            className="btn btn-outline-dark btn-sm"
            onClick={() => onSelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}
