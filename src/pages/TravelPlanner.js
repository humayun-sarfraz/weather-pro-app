import React from "react";
import TravelPlannerWidget from "../components/TravelPlanner";

export default function TravelPlanner({ coords, forecast }) {
  return (
    <div>
      <h2 className="mb-3">Travel Planner</h2>
      <TravelPlannerWidget coords={coords} forecast={forecast} />
      <p className="mt-3 text-muted">Get weather forecasts along your route or trip destination.</p>
    </div>
  );
}
