import React from "react";
import EventWeatherWidget from "../components/EventWeather";

export default function EventWeather({ coords }) {
  return (
    <div>
      <h2 className="mb-3">Event Weather</h2>
      <EventWeatherWidget coords={coords} />
      <p className="mt-3 text-muted">Check weather for your upcoming events or custom dates.</p>
    </div>
  );
}
