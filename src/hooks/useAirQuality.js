import { useState, useEffect } from 'react';
import axios from 'axios';
const KEY = process.env.REACT_APP_OWM_KEY;

export default function useAirQuality({ lat, lon }) {
  const [aqi, setAqi] = useState(null);
  useEffect(() => {
    if (!lat || !lon) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${KEY}`
      )
      .then(res => setAqi(res.data.list[0].main.aqi))
      .catch(() => {});
  }, [lat, lon]);
  return aqi;
}
