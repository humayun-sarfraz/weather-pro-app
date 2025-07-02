import React from 'react';

function WeatherCard({ weather }) {
  const iconURL = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="card mx-auto mt-4 shadow" style={{ maxWidth: '400px' }}>
      <div className="card-body text-center">
        <h3 className="card-title">{weather.name}</h3>
        <img src={iconURL} alt={weather.weather[0].description} />
        <h4>{weather.main.temp}°C</h4>
        <p className="text-capitalize">{weather.weather[0].description}</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherCard;
