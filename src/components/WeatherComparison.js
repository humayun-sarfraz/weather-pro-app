import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherComparison({ today, coords }) {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    if (coords && today) {
      const now = new Date();
      const lastYear = new Date(now);
      lastYear.setFullYear(now.getFullYear() - 1);
      const dateStr = lastYear.toISOString().slice(0, 10);
      axios
        .get(`http://localhost:5000/history?lat=${coords.lat}&lon=${coords.lon}&date=${dateStr}`)
        .then(res => setHistory(res.data))
        .catch(() => setHistory(null));
    }
  }, [coords, today]);

  if (!today || !history) return null;

  const currentTemp = today.main?.temp;
  const lastYearTemp = history.hourly?.temperature_2m?.[12] || null; // noon value

  return (
    <div className="card-section shadow-soft p-3 mb-3 bg-glass" style={{ borderRadius: 18 }}>
      <h6>Today vs. Last Year</h6>
      <div>
        <span>Current: <b>{currentTemp ? Math.round(currentTemp) + "°" : "--"}</b></span>{" "}
        <span style={{ marginLeft: 16 }}>Last Year: <b>{lastYearTemp ? Math.round(lastYearTemp) + "°" : "--"}</b></span>
        <span style={{ marginLeft: 16, color: currentTemp > lastYearTemp ? "#e57373" : "#64b5f6" }}>
          {lastYearTemp !== null && currentTemp !== null ? (
            currentTemp > lastYearTemp ? `+${Math.round(currentTemp - lastYearTemp)}° warmer` :
            `${Math.round(lastYearTemp - currentTemp)}° cooler`
          ) : ""}
        </span>
      </div>
    </div>
  );
}

export default WeatherComparison;
