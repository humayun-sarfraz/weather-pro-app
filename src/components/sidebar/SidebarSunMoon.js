export default function SidebarSunMoon({ weather }) {
  if (!weather) return null;
  const { sys } = weather;
  if (!sys?.sunrise || !sys?.sunset) return null;
  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <section>
      <h6 className="sidebar-heading">Sun & Moon</h6>
      <div>
        🌅 Sunrise: {sunrise}<br />
        🌇 Sunset: {sunset}
      </div>
    </section>
  );
}
