export default function SidebarFavorites({ favorites = [], onSelect }) {
  if (!favorites.length) return null;
  return (
    <section>
      <h6 className="sidebar-heading">Favorites</h6>
      <div className="d-flex flex-wrap gap-1">
        {favorites.map(city => (
          <button
            key={city}
            className="btn btn-outline-primary btn-sm"
            onClick={() => onSelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}
