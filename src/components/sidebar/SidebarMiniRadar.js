export default function SidebarMiniRadar({ coords }) {
  if (!coords) return null;
  // Replace src URL with your preferred tile/radar mini map provider.
  return (
    <section>
      <h6 className="sidebar-heading">Mini Radar</h6>
      <iframe
        title="Radar"
        src={`https://embed.windy.com/embed2.html?lat=${coords.lat}&lon=${coords.lon}&zoom=6&level=surface&overlay=radar`}
        width="100%"
        height="120"
        style={{ border: 0, borderRadius: 8 }}
        loading="lazy"
      />
    </section>
  );
}
