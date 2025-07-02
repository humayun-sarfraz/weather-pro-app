import React from 'react';

function ForecastCard({ data, unit }) {
  if (!data) return null;
  const dt = new Date(data.dt * 1000);
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0]?.main || '';
  const icon = data.weather[0]?.icon || '01d';

  return (
    <div className="forecast-card-main shadow-soft p-2 text-center">
      <div className="mb-1">{dt.toLocaleDateString(undefined, { weekday: 'short' })}</div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={desc} style={{ width: 48 }} />
      <div className="fw-semibold">{temp}°{unit === 'metric' ? 'C' : 'F'}</div>
      <small className="text-muted">{desc}</small>
    </div>
  );
}

export default ForecastCard;
