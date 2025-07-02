import React from "react";

function LiveLightningMap({ coords }) {
  // For demo, generate random "strikes" nearby
  const strikes = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    lat: coords ? coords.lat + (Math.random() - 0.5) * 0.5 : 0,
    lon: coords ? coords.lon + (Math.random() - 0.5) * 0.5 : 0,
    time: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString()
  }));

  return (
    <div className="card-section shadow-soft p-3 mb-3 bg-glass" style={{ borderRadius: 18 }}>
      <h6>Live Lightning Map <span className="text-muted small">(Demo)</span></h6>
      {coords ? (
        <ul className="mb-0 small">
          {strikes.map(s => (
            <li key={s.id}>
              Strike at ({s.lat.toFixed(3)}, {s.lon.toFixed(3)}) — {s.time}
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-muted">Enable geolocation for real data.</span>
      )}
    </div>
  );
}

export default LiveLightningMap;
