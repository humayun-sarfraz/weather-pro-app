import React, { useEffect, useState } from "react";

function StormTracker() {
  const [storms, setStorms] = useState([]);

  useEffect(() => {
    // Replace with a real storm API if available!
    fetch("https://www.nhc.noaa.gov/CurrentStorms.json")
      .then(res => res.json())
      .then(data => setStorms(data?.storms || []))
      .catch(() => setStorms([]));
  }, []);

  return (
    <div className="card-section shadow-soft p-3 mb-3 bg-glass" style={{ borderRadius: 18, minHeight: 160 }}>
      <h6>Storm Tracker</h6>
      {storms.length === 0 ? (
        <div>No active tropical storms detected.</div>
      ) : (
        <ul className="small mb-0">
          {storms.map(storm => (
            <li key={storm.id}>
              <b>{storm.name}</b> — {storm.status} ({storm.basin})<br />
              <span style={{ fontSize: "90%", color: "#888" }}>
                {storm.latitude}°, {storm.longitude}°
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StormTracker;
