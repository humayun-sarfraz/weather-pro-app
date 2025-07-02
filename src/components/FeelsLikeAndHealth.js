// src/components/FeelsLikeAndHealth.js
import React from 'react';

function healthWarning({ temp, humidity, wind, uv }) {
  if (temp >= 38) return "🌡️ Heatstroke Risk";
  if (temp <= 0 && wind > 10) return "❄️ Frostbite Risk";
  if (humidity > 80 && temp > 30) return "🦠 Asthma/Allergy Risk";
  if (uv > 6) return "☀️ High UV — Wear sunscreen!";
  return null;
}

export default function FeelsLikeAndHealth({ weather, uvIndex }) {
  if (!weather) return null;
  const { main, wind } = weather;
  const warning = healthWarning({
    temp: main.feels_like,
    humidity: main.humidity,
    wind: wind.speed,
    uv: uvIndex
  });

  return (
    <section className="card-section mb-3 shadow-soft p-3 bg-glass">
      <h6 className="mb-2">Comfort & Health</h6>
      <div className="row g-2">
        <div className="col">
          <strong>Feels Like:</strong> {Math.round(main.feels_like)}°
        </div>
        <div className="col">
          <strong>Humidity:</strong> {main.humidity}%
        </div>
        <div className="col">
          <strong>Dew Point:</strong> {main.dew_point || '—'}
        </div>
        <div className="col">
          <strong>Wind Chill:</strong> {main.feels_like < main.temp ? Math.round(main.feels_like) + '°' : '—'}
        </div>
        <div className="col">
          <strong>UV Index:</strong> {uvIndex ?? '—'}
        </div>
      </div>
      {warning && (
        <div className="alert alert-warning py-2 mt-3">{warning}</div>
      )}
    </section>
  );
}
