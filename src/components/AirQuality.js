import React from 'react';

const AQI_LEVELS = [
  { min: 0, max: 1, label: 'Good', color: '#2ecc40' },
  { min: 2, max: 2, label: 'Fair', color: '#ffe066' },
  { min: 3, max: 3, label: 'Moderate', color: '#ffb347' },
  { min: 4, max: 4, label: 'Poor', color: '#ff6f61' },
  { min: 5, max: 5, label: 'Very Poor', color: '#b0413e' }
];

function getAqiLevel(aqi) {
  return AQI_LEVELS.find(lvl => aqi >= lvl.min && aqi <= lvl.max) || AQI_LEVELS[0];
}

function AirQuality({ aqi }) {
  if (!aqi) return null;
  const level = getAqiLevel(aqi);

  return (
    <div className="aqi-badge mb-2" style={{ background: level.color, color: '#fff', minWidth: 110 }}>
      <b>Air Quality:</b> {level.label} (AQI {aqi})
    </div>
  );
}

export default AirQuality;
