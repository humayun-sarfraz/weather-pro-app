// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { query, validationResult } = require('express-validator');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY || '4b0e5c819d20ef8ce7d385775c4ac437';
const NEWS_API_KEY = process.env.NEWS_API_KEY || 'your_newsapi_key_here';

// --- Security: Helmet headers
app.use(helmet());
// --- Logging
app.use(morgan('dev'));
// --- JSON body parsing
app.use(express.json());

// --- CORS (restrict to only known origins)
app.use(cors({
  origin: ['http://localhost:3000'], // Add your prod frontend domains!
}));

// --- Rate limit (basic, 60 req/min per IP)
app.use(rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
}));

// --- UTILITY ---
function getTargetQuery({ city, lat, lon }) {
  if (lat && lon) return `lat=${lat}&lon=${lon}`;
  if (city) return `q=${encodeURIComponent(city)}`;
  return 'q=Lahore';
}

// --- Weather endpoints with validation and error handling ---
// --- 1. Current Weather ---
app.get('/weather', [
  query('city').optional().isString().trim().isLength({ min: 1, max: 64 }),
  query('lat').optional().isFloat({ min: -90, max: 90 }),
  query('lon').optional().isFloat({ min: -180, max: 180 }),
  query('units').optional().isIn(['metric', 'imperial']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

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

// --- 2. 5-Day Forecast ---
app.get('/forecast', [
  query('city').optional().isString().trim().isLength({ min: 1, max: 64 }),
  query('lat').optional().isFloat({ min: -90, max: 90 }),
  query('lon').optional().isFloat({ min: -180, max: 180 }),
  query('units').optional().isIn(['metric', 'imperial']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

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

// --- 3. Air Quality ---
app.get('/air', [
  query('lat').exists().isFloat({ min: -90, max: 90 }),
  query('lon').exists().isFloat({ min: -180, max: 180 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch air quality.' });
  }
});

// --- 4. UV Index ---
app.get('/uv', [
  query('lat').exists().isFloat({ min: -90, max: 90 }),
  query('lon').exists().isFloat({ min: -180, max: 180 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch UV index.' });
  }
});

// --- 5. Alerts ---
app.get('/alerts', [
  query('lat').exists().isFloat({ min: -90, max: 90 }),
  query('lon').exists().isFloat({ min: -180, max: 180 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const { data } = await axios.get(url);
    res.json({ alerts: data.alerts || [] });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch weather alerts.' });
  }
});

// --- 6. Sun & Moon Data ---
app.get('/sunmoon', [
  query('lat').exists().isFloat({ min: -90, max: 90 }),
  query('lon').exists().isFloat({ min: -180, max: 180 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  const { lat, lon } = req.query;
  try {
    const sunUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;
    const { data } = await axios.get(sunUrl);
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

// --- 7. Radar Tiles (static, frontend uses tile templates) ---
app.get('/radar', (req, res) => {
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

// --- 8. Feels Like / Health Indices ---
app.get('/feelslike', [
  query('temp').exists().isFloat(),
  query('humidity').exists().isFloat(),
  query('wind').exists().isFloat(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

  const { temp, humidity, wind, units = 'metric' } = req.query;
  const T = parseFloat(temp);
  const RH = parseFloat(humidity);
  const V = parseFloat(wind);

  let heatIndex = null, windChill = null, dewPoint = null;
  if (T > 26 && RH > 40) {
    heatIndex = -8.784695 + 1.61139411 * T + 2.338549 * RH - 0.14611605 * T * RH
      - 0.012308094 * T * T - 0.016424828 * RH * RH
      + 0.002211732 * T * T * RH + 0.00072546 * T * RH * RH
      - 0.000003582 * T * T * RH * RH;
  }
  if (T <= 10 && V >= 4.8) {
    windChill = 13.12 + 0.6215 * T - 11.37 * Math.pow(V, 0.16) + 0.3965 * T * Math.pow(V, 0.16);
  }
  if (RH && T) {
    const a = 17.27, b = 237.7;
    const alpha = ((a * T) / (b + T)) + Math.log(RH / 100);
    dewPoint = (b * alpha) / (a - alpha);
  }
  res.json({ heatIndex, windChill, dewPoint });
});

// --- 9. Health/Wellness Risk ---
app.get('/health', [
  query('uv').optional().isFloat(),
  query('aqi').optional().isInt(),
  query('temp').optional().isFloat(),
  query('pollen').optional().isInt(),
], (req, res) => {
  const { uv = 0, aqi = 1, temp = 22, pollen = 0 } = req.query;
  const risk = [];
  if (uv > 6) risk.push('High UV risk');
  if (aqi > 3) risk.push('Poor air quality');
  if (temp > 35) risk.push('Heatstroke risk');
  if (temp < 0) risk.push('Frostbite risk');
  if (pollen > 2) risk.push('High pollen risk');
  res.json({ risk });
});

// --- 10. Weather News ---
app.get('/news', [
  query('city').optional().isString().trim().isLength({ max: 64 }),
], async (req, res) => {
  const { city = '' } = req.query;
  try {
    const url = `https://newsapi.org/v2/everything?q=weather+${encodeURIComponent(city)}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}&language=en`;
    const { data } = await axios.get(url);
    res.json(data.articles || []);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch news.' });
  }
});

// --- 11. Pollen Data ---
app.get('/pollen', [
  query('lat').exists().isFloat({ min: -90, max: 90 }),
  query('lon').exists().isFloat({ min: -180, max: 180 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  const { lat, lon } = req.query;
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=pollen_grass,pollen_tree,pollen_weed&timezone=auto`;
    const { data } = await axios.get(url);
    res.json(data.daily || {});
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch pollen data.' });
  }
});

// --- 12. Tips ---
app.get('/tips', [
  query('temp').optional().isFloat(),
  query('aqi').optional().isInt(),
  query('uv').optional().isFloat(),
  query('alerts').optional().isString(),
], (req, res) => {
  const { temp = 22, aqi = 1, uv = 3, alerts = '' } = req.query;
  const tips = [];
  if (temp > 32) tips.push('Stay hydrated and avoid outdoor activity at peak heat.');
  if (uv > 7) tips.push('Use sunscreen and wear a hat!');
  if (aqi > 2) tips.push('Sensitive groups should reduce time outdoors.');
  if (alerts.includes('storm')) tips.push('Stay inside during severe storms.');
  res.json({ tips });
});

// --- 13. Historical Weather ---
app.get('/history', [
  query('lat').exists().isFloat({ min: -90, max: 90 }),
  query('lon').exists().isFloat({ min: -180, max: 180 }),
  query('date').exists().isISO8601(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  const { lat, lon, date } = req.query;
  try {
    const url = `https://archive-api.open-meteo.com/v1/era5?latitude=${lat}&longitude=${lon}&start_date=${date}&end_date=${date}&hourly=temperature_2m,precipitation&timezone=auto`;
    const { data } = await axios.get(url);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch historical weather.' });
  }
});

// --- 14. Shareable String ---
app.get('/share', [
  query('city').optional().isString().trim().isLength({ max: 64 }),
  query('temp').optional().isFloat(),
  query('desc').optional().isString().trim().isLength({ max: 128 }),
], (req, res) => {
  const { city, temp, desc } = req.query;
  const str = city && temp && desc
    ? `Weather for ${city}: ${temp}°, ${desc}. Powered by WeatherProApp!`
    : 'WeatherProApp: share feature. (Missing data)';
  res.json({ share: str });
});

// --- 15. Reverse Geocode ---
app.get('/location-reverse', [
  query('lat').exists().isFloat({ min: -90, max: 90 }),
  query('lon').exists().isFloat({ min: -180, max: 180 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  const { lat, lon } = req.query;
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

// --- 404 & Error handling ---
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
