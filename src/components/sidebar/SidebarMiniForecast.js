export default function SidebarMiniForecast({ forecast = [] }) {
  if (!forecast.length) return null;
  return (
    <section>
      <h6 className="sidebar-heading">Next 12h</h6>
      <div className="d-flex flex-wrap gap-1">
        {forecast.slice(0, 6).map(f => (
          <div key={f.dt} className="text-center small px-2">
            <div>{new Date(f.dt * 1000).getHours()}:00</div>
            <img
              src={`https://openweathermap.org/img/wn/${f.weather?.[0]?.icon}@2x.png`}
              alt={f.weather?.[0]?.main || ''}
              style={{ width: 32, height: 32 }}
            />
            <div>{Math.round(f.main?.temp)}°</div>
          </div>
        ))}
      </div>
    </section>
  );
}
