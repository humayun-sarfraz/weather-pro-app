// src/components/SunAndMoonInfo.js
import React from 'react';

function formatTime(ts) {
  if (!ts) return '--';
  return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function getDayLength(sunrise, sunset) {
  if (!sunrise || !sunset) return '--';
  const ms = (sunset - sunrise) * 1000;
  const hours = Math.floor(ms / 3600000);
  const mins = Math.round((ms % 3600000) / 60000);
  return `${hours}h ${mins}m`;
}
function moonIcon(phase) {
  // 0 new, 0.5 full, 1 new
  if (phase < 0.03 || phase > 0.97) return '🌑';
  if (phase < 0.25) return '🌒';
  if (phase < 0.27) return '🌓';
  if (phase < 0.47) return '🌔';
  if (phase < 0.53) return '🌕';
  if (phase < 0.73) return '🌖';
  if (phase < 0.77) return '🌗';
  return '🌘';
}

export default function SunAndMoonInfo({ sys = {}, moon = {} }) {
  if (!sys.sunrise) return null;
  return (
    <section className="card-section shadow-soft mb-4 p-3 bg-glass">
      <h6 className="mb-2">Sun & Moon</h6>
      <div className="d-flex flex-wrap gap-3">
        <div><b>🌅 Sunrise:</b> {formatTime(sys.sunrise)}</div>
        <div><b>🌇 Sunset:</b> {formatTime(sys.sunset)}</div>
        <div><b>🕗 Day Length:</b> {getDayLength(sys.sunrise, sys.sunset)}</div>
        <div><b>🌙 Moon:</b> {moonIcon(moon.phase)} {moon.phase ? (Math.round(moon.phase*100)+'%') : '--'}</div>
      </div>
    </section>
  );
}
