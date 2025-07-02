// src/components/SevereWeatherTimeline.js
import React from 'react';

const eventColor = type =>
  type === 'warning' ? 'timeline-red'
  : type === 'watch' ? 'timeline-orange'
  : 'timeline-blue';

export default function SevereWeatherTimeline({ events = [] }) {
  if (!events.length) return null;

  return (
    <section className="card-section shadow-soft mb-4 p-3 bg-glass">
      <h6 className="mb-3">Severe Weather Timeline</h6>
      <div className="timeline-container">
        {events.map((ev, i) => (
          <div className={`timeline-item ${eventColor(ev.severity)}`} key={i}>
            <span className="timeline-time">
              {new Date(ev.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="timeline-icon">{ev.icon || '⚡'}</span>
            <span className="timeline-desc">
              <strong>{ev.title}</strong> — {ev.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
