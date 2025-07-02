import { useState, useEffect } from 'react';

export default function useGeolocation() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation unsupported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => setCoords(pos.coords),
      err => setError(err.message)
    );
  }, []);

  return { coords, error };
}
