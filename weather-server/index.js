const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = '4b0e5c819d20ef8ce7d385775c4ac437'; // Store in .env for production!
const NEWS_API_KEY = 'your_newsapi_key_here'; // Set in env for real use

app.use(cors({
  origin: ['http://localhost:3000'],
}));
app.use(express.json());

// Utility
function getTargetQuery({ city, lat, lon }) {
  if (lat && lon) return `lat=${lat}&lon=${lon}`;
  if (city) return `q=${encodeURIComponent(city)}`;
  return 'q=Lahore';
}

// --- Current Weather ---
app.get('/weather', async (req, res) => {
  const { city, lat, lon, units = 'metric' } = req.query;
  const target = getTargetQuery({ city, lat, lon });
  const url = `https://api.openweathermap.org/data/2.5/weather?${target}&appid=${API_KEY}&units=${units}`;
  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

// --- 5-Day Forecast ---
app.get('/forecast', async (req, res) => {
  const { city, lat, lon, units = 'metric' } = req.query;
  const target = getTargetQuery({ city, lat, lon });
  const url = `https://api.openweathermap.org/data/2.5/forecast?${target}&appid=${API_KEY}&units=${units}`;
  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch forecast' });
  }
});

// --- Air Quality Index (AQI) ---
app.get('/air', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'Latitude and longitude are required for air quality.' });
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch air quality.' });
  }
});

// --- UV Index ---
app.get('/uv', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'Latitude and longitude are required for UV index.' });
  const url = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch UV index.' });
  }
});

// --- Alerts ---
app.get('/alerts', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'Latitude and longitude required.' });
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const { data } = await axios.get(url);
    res.json({ alerts: data.alerts || [] });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch weather alerts.' });
  }
});

// --- Sun & Moon Data ---
app.get('/sunmoon', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'Latitude and longitude required.' });
  try {
    // Sunrise Sunset API (free, UTC)
    const sunUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;
    const { data } = await axios.get(sunUrl);
    // Simple moon phase: Use open-meteo (or implement a moon phase algo)
    const moonUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=moon_phase&timezone=auto`;
    const moonRes = await axios.get(moonUrl);
    res.json({
      sun: data.results,
      moon: moonRes.data.daily || {}
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch sun/moon info.' });
  }
});

// --- Radar Tiles ---
app.get('/radar', (req, res) => {
  // Example for precipitation radar layer using OWM: pass to frontend for map
  // Frontend will construct tile URLs e.g. https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=API_KEY
  res.json({
    tiles: [
      {
        name: 'Precipitation',
        template: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        attribution: 'Map data © OpenWeatherMap'
      },
      {
        name: 'Clouds',
        template: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        attribution: 'Map data © OpenWeatherMap'
      }
    ]
  });
});

// --- Feels Like / Health Indices ---
app.get('/feelslike', (req, res) => {
  const { temp, humidity, wind, units = 'metric' } = req.query;
  if (!temp || !humidity || !wind) return res.status(400).json({ error: 'Missing params' });
  const T = parseFloat(temp);
  const RH = parseFloat(humidity);
  const V = parseFloat(wind);

  // Heat index (F) formula (for demo, should use C or F accordingly)
  let heatIndex = null;
  if (T > 26 && RH > 40) {
    // Heat index in C: Rothfusz regression (converted)
    heatIndex = -8.784695 + 1.61139411 * T + 2.338549 * RH - 0.14611605 * T * RH - 0.012308094 * T * T - 0.016424828 * RH * RH + 0.002211732 * T * T * RH + 0.00072546 * T * RH * RH - 0.000003582 * T * T * RH * RH;
  }
  // Wind chill (C) formula
  let windChill = null;
  if (T <= 10 && V >= 4.8) {
    windChill = 13.12 + 0.6215 * T - 11.37 * Math.pow(V, 0.16) + 0.3965 * T * Math.pow(V, 0.16);
  }
  // Dew point (C)
  let dewPoint = null;
  if (RH && T) {
    const a = 17.27, b = 237.7;
    const alpha = ((a * T) / (b + T)) + Math.log(RH / 100);
    dewPoint = (b * alpha) / (a - alpha);
  }
  res.json({ heatIndex, windChill, dewPoint });
});

// --- Health/Wellness Risk ---
app.get('/health', (req, res) => {
  // Dummy: Use inputs, decide risk
  const { uv = 0, aqi = 1, temp = 22, pollen = 0 } = req.query;
  const risk = [];
  if (uv > 6) risk.push('High UV risk');
  if (aqi > 3) risk.push('Poor air quality');
  if (temp > 35) risk.push('Heatstroke risk');
  if (temp < 0) risk.push('Frostbite risk');
  if (pollen > 2) risk.push('High pollen risk');
  res.json({ risk });
});

// --- Weather News (NewsAPI example, use your key) ---
app.get('/news', async (req, res) => {
  const { city = '' } = req.query;
  try {
    const url = `https://newsapi.org/v2/everything?q=weather+${encodeURIComponent(city)}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}&language=en`;
    const { data } = await axios.get(url);
    res.json(data.articles || []);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch news.' });
  }
});

// --- Pollen Data (Open-Meteo) ---
app.get('/pollen', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'Latitude and longitude required.' });
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=pollen_grass&pollen_tree&pollen_weed&timezone=auto`;
    const { data } = await axios.get(url);
    res.json(data.daily || {});
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch pollen data.' });
  }
});

// --- Tips (context-aware) ---
app.get('/tips', (req, res) => {
  const { temp = 22, aqi = 1, uv = 3, alerts = '' } = req.query;
  const tips = [];
  if (temp > 32) tips.push('Stay hydrated and avoid outdoor activity at peak heat.');
  if (uv > 7) tips.push('Use sunscreen and wear a hat!');
  if (aqi > 2) tips.push('Sensitive groups should reduce time outdoors.');
  if (alerts.includes('storm')) tips.push('Stay inside during severe storms.');
  res.json({ tips });
});

// --- Historical weather (Open-Meteo, basic free, or use paid OWM) ---
app.get('/history', async (req, res) => {
  const { lat, lon, date } = req.query;
  if (!lat || !lon || !date) return res.status(400).json({ error: 'lat/lon/date required' });
  try {
    const url = `https://archive-api.open-meteo.com/v1/era5?latitude=${lat}&longitude=${lon}&start_date=${date}&end_date=${date}&hourly=temperature_2m,precipitation&timezone=auto`;
    const { data } = await axios.get(url);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch historical weather.' });
  }
});

// --- Shareable string (demo) ---
app.get('/share', (req, res) => {
  const { city, temp, desc } = req.query;
  const str = city && temp && desc
    ? `Weather for ${city}: ${temp}°, ${desc}. Powered by WeatherProApp!`
    : 'WeatherProApp: share feature. (Missing data)';
  res.json({ share: str });
});

// --- Reverse Geocode ---
app.get('/location-reverse', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'lat/lon required' });
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const { data } = await axios.get(url);
    res.json({ name: data.display_name || '' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to reverse geocode.' });
  }
});

// --- Health Check ---
app.get('/', (req, res) => {
  res.json({ status: 'Weather API running!', time: new Date().toISOString() });
});

// --- Catch-all ---
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ========== Start server ==========
app.listen(PORT, () => {
  console.log(`🌐 Weather server running at http://localhost:${PORT}`);
});
