export default function SidebarLocationButton({ fetchByCoords }) {
  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => fetchByCoords(coords.latitude, coords.longitude)
    );
  };
  return (
    <section>
      <button className="btn btn-success btn-sm w-100" onClick={handleLocation}>
        📍 Use My Location
      </button>
    </section>
  );
}
