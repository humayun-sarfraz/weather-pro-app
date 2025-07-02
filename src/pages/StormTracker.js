import React from "react";
import StormTrackerWidget from "../components/StormTracker";

export default function StormTracker({ coords, alerts }) {
  return (
    <div>
      <h2 className="mb-3">Storm Tracker</h2>
      <StormTrackerWidget coords={coords} alerts={alerts} />
      <p className="mt-3 text-muted">Live map of hurricanes, cyclones, and severe storms.</p>
    </div>
  );
}
