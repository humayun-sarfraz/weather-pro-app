import React, { useState } from "react";
import axios from "axios";

function EventWeather({ coords }) {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState(null);

  const getEventWeather = async () => {
    if (!coords || !date) return;
    // Use your /history endpoint for demo. (Could use paid OWM "timemachine" for real)
    const res = await axios.get(
      `http://localhost:5000/history?lat=${coords.lat}&lon=${coords.lon}&date=${date}`
    );
    setWeather(res.data);
  };

  return (
    <div className="card-section shadow-soft p-3 mb-3 bg-glass" style={{ borderRadius: 18 }}>
      <h6>Event Weather</h6>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="form-control mb-2"
      />
      <button
        className="btn btn-primary btn-sm"
        onClick={getEventWeather}
        disabled={!coords || !date}
      >
        Get Weather
      </button>
      {weather && weather.hourly && (
        <div className="mt-2 small">
          <b>Noon Temp:</b> {weather.hourly.temperature_2m?.[12]}°<br />
          <b>Rain:</b> {weather.hourly.precipitation?.[12]} mm
        </div>
      )}
    </div>
  );
}

export default EventWeather;
