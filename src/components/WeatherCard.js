import React from 'react';

function WeatherCard({ weather, unit }) {
  if (!weather) return null;

  const temp = Math.round(weather.main.temp);
  const feels = Math.round(weather.main.feels_like);
  const desc = weather.weather[0]?.description ?? '';
  const icon = weather.weather[0]?.icon ?? '01d';
  const wind = weather.wind?.speed;
  const pressure = weather.main?.pressure;
  const humidity = weather.main?.humidity;

  return (
    <section className="weather-card-main text-center mb-3">
      <div className="mb-2">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={desc}
          className="weather-icon-main"
        />
      </div>
      <h2 className="fw-bold mb-1">
        {weather.name}, {weather.sys?.country}
      </h2>
      <div className="weather-temp-main">{temp}°{unit === 'metric' ? 'C' : 'F'}</div>
      <div className="weather-desc-main text-capitalize">{desc}</div>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <span className="badge rounded-pill bg-secondary">Feels: {feels}°</span>
        <span className="badge rounded-pill bg-info">Humidity: {humidity}%</span>
        <span className="badge rounded-pill bg-light text-dark">Wind: {wind} {unit === 'metric' ? 'm/s' : 'mph'}</span>
        <span className="badge rounded-pill bg-light text-dark">Pressure: {pressure} hPa</span>
      </div>
    </section>
  );
}

export default WeatherCard;
