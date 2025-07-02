import React from 'react';

// Accepts props from App.js so you can use coords, city, etc.
export default function MainDashboard({
  coords,
  city,
  unit,
  setCity,
  fetchWeather,
  fetchForecast,
}) {
  // Example: display coordinates, or build out custom widgets here!
  return (
    <div className="mt-4">
      {/* Example dashboard info for expansion */}
      {coords && (
        <div className="alert alert-secondary">
          <strong>Your location:</strong> {coords.lat.toFixed(3)}, {coords.lon.toFixed(3)}
        </div>
      )}
      {/* Future: Map, Air Quality, Alerts, Voice, Favorites, etc */}
      {/* Drop in more custom components here */}
    </div>
  );
}
