import { useState, useEffect } from 'react';
import axios from 'axios';
const KEY = process.env.REACT_APP_OWM_KEY;

export default function useAlerts({ lat, lon, city }) {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    const q = lat && lon
      ? `lat=${lat}&lon=${lon}`
      : `q=${encodeURIComponent(city)}`;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?${q}&exclude=current,minutely,hourly,daily&appid=${KEY}`
      )
      .then(res => setAlerts(res.data.alerts || []))
      .catch(() => {});
  }, [lat, lon, city]);
  return alerts;
}
