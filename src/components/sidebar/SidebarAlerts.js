export default function SidebarAlerts({ alerts = [] }) {
  if (!alerts.length) return null;
  return (
    <section>
      <h6 className="sidebar-heading">Alerts</h6>
      {alerts.map((alert, i) => (
        <div key={i} className="alert alert-warning p-2 mb-1 small">
          <strong>{alert.event}:</strong> {alert.description}
        </div>
      ))}
    </section>
  );
}
