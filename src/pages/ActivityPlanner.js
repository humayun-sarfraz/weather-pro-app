import React from "react";
import ActivityPlannerWidget from "../components/ActivityPlanner";

export default function ActivityPlannerPage({ forecast, aqi, alerts }) {
  return (
    <div>
      <h2 className="mb-3">Activity Planner</h2>
      <ActivityPlannerWidget forecast={forecast} aqi={aqi} alerts={alerts} />
      <p className="mt-3 text-muted">Smart suggestions for outdoor activities based on real-time weather.</p>
    </div>
  );
}
