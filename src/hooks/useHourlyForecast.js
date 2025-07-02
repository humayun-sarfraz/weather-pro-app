import { useState, useEffect } from 'react';
import { getForecast } from '../services/weatherAPI';

export default function useHourlyForecast({ city, units }) {
  const [hourly, setHourly] = useState([]);
  useEffect(() => {
    if (!city) return;
    getForecast({ city, units }).then(data => {
      setHourly(data.list.slice(0, 12)); // next 12 entries
    }).catch(() => setHourly([]));
  }, [city, units]);
  return hourly;
}
