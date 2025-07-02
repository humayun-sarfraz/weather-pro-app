// src/components/AnimatedRadarMap.js
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function AnimatedRadarMap({ coords }) {
  const lat = coords?.lat || 31.5497;
  const lon = coords?.lon || 74.3436;

  return (
    <section className="card-section shadow-soft mb-4 p-3 bg-glass" style={{minHeight:240}}>
      <h6 className="mb-2">Live Weather Radar</h6>
      <MapContainer center={[lat, lon]} zoom={7} style={{ height: 200, borderRadius: 12 }}>
        {/* Basemap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Radar overlay — RainViewer free tiles, or OpenWeatherMap if you have API */}
        <TileLayer
          url="https://tilecache.rainviewer.com/v2/radar/{z}/{x}/{y}/6/1_1.png"
          opacity={0.6}
        />
      </MapContainer>
    </section>
  );
}
