import React, { useState } from "react";
import WeatherHistoryWidget from "../components/WeatherHistory";

export default function WeatherHistory({ coords }) {
  const [date, setDate] = useState('');
  return (
    <div>
      <h2 className="mb-3">Weather History</h2>
      <form className="mb-3" onSubmit={e => e.preventDefault()}>
        <label>
          Select Date:&nbsp;
          <input
            type="date"
            value={date}
            max={new Date().toISOString().split('T')[0]}
            onChange={e => setDate(e.target.value)}
          />
        </label>
      </form>
      <WeatherHistoryWidget coords={coords} date={date} />
      <p className="mt-3 text-muted">See historical weather for any day and location.</p>
    </div>
  );
}
