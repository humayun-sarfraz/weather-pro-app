import React from "react";

function PrecipitationChart({ forecast = [] }) {
  // Show next 12 hours of precipitation as a bar chart
  const hours = forecast.slice(0, 12);
  return (
    <div className="card-section shadow-soft p-3 mb-3 bg-glass" style={{ borderRadius: 18 }}>
      <h6>Rain Forecast</h6>
      <div style={{ display: "flex", alignItems: "flex-end", height: 60 }}>
        {hours.map((h, i) => (
          <div key={i} style={{ flex: 1, margin: "0 1px", textAlign: "center" }}>
            <div
              style={{
                height: `${(h.rain?.["3h"] || 0) * 12}px`,
                background: "#80cbc4",
                width: "100%",
                minHeight: 3,
                borderRadius: 3
              }}
              title={`${h.dt_txt?.slice(11, 16) || ""}: ${h.rain?.["3h"] || 0} mm`}
            />
            <small style={{ fontSize: 10 }}>
              {h.dt_txt?.slice(11, 13) || ""}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrecipitationChart;
