import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView({ coords, city }) {
  if (!coords || !coords.lat || !coords.lon) return null;
  const position = [coords.lat, coords.lon];

  return (
    <div style={{ minHeight: 220, borderRadius: 12, overflow: 'hidden' }}>
      <MapContainer center={position} zoom={11} style={{ height: '220px', width: '100%' }}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{city || 'Current location'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;
