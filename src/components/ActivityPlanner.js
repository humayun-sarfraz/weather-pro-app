import React from "react";

function ActivityPlanner({ forecast = [], aqi = 1, alerts = [] }) {
  if (!forecast.length) return null;
  const goodHours = forecast.slice(0, 12).filter(
    f =>
      f.weather?.[0]?.main !== "Rain" &&
      f.main?.temp >= 18 &&
      f.main?.temp <= 30 &&
      aqi <= 2
  );
  const recommendation = goodHours.length
    ? "✅ Good time for outdoor activities in the next 12 hours."
    : "⚠️ Outdoor activities not recommended soon.";

  return (
    <div className="card-section shadow-soft p-3 mb-3 bg-glass" style={{ borderRadius: 18 }}>
      <h6>Activity Planner</h6>
      <div>{recommendation}</div>
      {alerts.length > 0 && (
        <div className="text-danger small mt-2">
          <b>Alert:</b> {alerts[0].event}
        </div>
      )}
    </div>
  );
}

export default ActivityPlanner;
