import React from "react";

function ModelComparison({ forecast = [] }) {
  // Example: Compare OWM vs. a fake "model" (demo purposes)
  // In real-world, you’d fetch multiple model APIs
  return (
    <div className="card-section shadow-soft p-3 mb-3 bg-glass" style={{ borderRadius: 18 }}>
      <h6>Weather Model Comparison</h6>
      <div>
        <b>Official Forecast:</b>{" "}
        {forecast[0]?.main?.temp ? `${Math.round(forecast[0].main.temp)}°` : "--"}
        <span style={{ margin: "0 10px" }}>|</span>
        <b>Model B:</b>{" "}
        {forecast[0]?.main?.temp
          ? `${Math.round(forecast[0].main.temp + (Math.random() * 4 - 2))}°`
          : "--"}
        <span className="text-muted ms-2 small">demo only</span>
      </div>
    </div>
  );
}

export default ModelComparison;
