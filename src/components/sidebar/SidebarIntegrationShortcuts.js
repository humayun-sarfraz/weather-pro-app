export default function SidebarIntegrationShortcuts() {
  return (
    <section>
      <h6 className="sidebar-heading">Integrations</h6>
      <div className="d-flex flex-column gap-1">
        <button className="btn btn-outline-secondary btn-sm w-100">Add to Home Screen</button>
        <button className="btn btn-outline-secondary btn-sm w-100">Google Calendar</button>
        <button className="btn btn-outline-secondary btn-sm w-100">Sync with Alexa</button>
      </div>
    </section>
  );
}
