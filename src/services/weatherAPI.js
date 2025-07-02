import axios from 'axios';
const KEY = process.env.REACT_APP_OWM_KEY;

export const getCurrentWeather = ({ city, lat, lon, units }) => {
  const q = lat && lon
    ? `lat=${lat}&lon=${lon}`
    : `q=${encodeURIComponent(city)}`;
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?${q}&appid=${KEY}&units=${units}`
  ).then(res => res.data);
};

export const getForecast = ({ city, units }) =>
  axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city
    )}&appid=${KEY}&units=${units}`
  ).then(res => res.data);
