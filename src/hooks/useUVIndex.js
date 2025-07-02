import { useState, useEffect } from 'react';
import axios from 'axios';
const KEY = process.env.REACT_APP_OWM_KEY;

export default function useUVIndex({ lat, lon }) {
  const [uvi, setUvi] = useState(null);
  useEffect(() => {
    if (!lat || !lon) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${KEY}`
      )
      .then(res => setUvi(res.data.value))
      .catch(() => {});
  }, [lat, lon]);
  return uvi;
}
