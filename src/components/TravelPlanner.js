import React, { useState } from "react";
import axios from "axios";

function TravelPlanner() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [forecast, setForecast] = useState(null);

  const getWeather = async () => {
    // For demo: fake a route, fetch weather at "from" and "to"
    const resFrom = await axios.get(`http://localhost:5000/weather?city=${encodeURIComponent(from)}`);
    const resTo = await axios.get(`http://localhost:5000/weather?city=${encodeURIComponent(to)}`);
    setForecast({
      from: resFrom.data,
      to: resTo.data
    });
  };

  return (
    <div className="card-section shadow-soft p-3 mb-3 bg-glass" style={{ borderRadius: 18 }}>
      <h6>Travel Planner</h6>
      <div className="mb-2">
        <input value={from} onChange={e => setFrom(e.target.value)} placeholder="From" className="form-control mb-1" />
        <input value={to} onChange={e => setTo(e.target.value)} placeholder="To" className="form-control mb-1" />
        <button className="btn btn-primary btn-sm" onClick={getWeather} disabled={!from || !to}>
          Get Route Weather
        </button>
      </div>
      {forecast && (
        <div>
          <b>{from}:</b> {forecast.from?.weather?.[0]?.description}, {forecast.from?.main?.temp}°
          <br />
          <b>{to}:</b> {forecast.to?.weather?.[0]?.description}, {forecast.to?.main?.temp}°
        </div>
      )}
    </div>
  );
}

export default TravelPlanner;
