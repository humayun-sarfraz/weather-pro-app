import React from 'react';

const getUVLevel = (uv) => {
  if (uv < 3) return { label: 'Low', color: 'success' };
  if (uv < 6) return { label: 'Moderate', color: 'warning' };
  if (uv < 8) return { label: 'High', color: 'danger' };
  if (uv < 11) return { label: 'Very High', color: 'danger' };
  return { label: 'Extreme', color: 'dark' };
};

export default function UVIndex({ uv }) {
  if (uv == null) return null;
  const info = getUVLevel(uv);
  return (
    <div className={`alert alert-${info.color} text-center mb-2`}>
      <b>UV Index:</b> {uv} <span className="badge bg-light text-dark ms-2">{info.label}</span>
    </div>
  );
}
