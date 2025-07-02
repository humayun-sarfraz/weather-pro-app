import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import Header from './components/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/Footer';

// Home Dashboard & Widget Components
import MainDashboard from './pages/MainDashboard';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import Spinner from './components/Spinner';
import AirQuality from './components/AirQuality';
import Alerts from './components/Alerts';
import HourlyChart from './components/HourlyChart';
import MapView from './components/MapView';
import SevereWeatherTimeline from './components/SevereWeatherTimeline';
import AnimatedRadarMap from './components/AnimatedRadarMap';
import FeelsLikeAndHealth from './components/FeelsLikeAndHealth';
import SunAndMoonInfo from './components/SunAndMoonInfo';
import WeatherComparison from './components/WeatherComparison';
import ActivityPlanner from './components/ActivityPlanner';
import PrecipitationChart from './components/PrecipitationChart';
import ModelComparison from './components/ModelComparison';
import LiveLightningMap from './components/LiveLightningMap';

// Pages
import HomePage from './pages/HomePage';
import StormTracker from './pages/StormTracker';
import TravelPlanner from './pages/TravelPlanner';
import EventWeather from './pages/EventWeather';
import ModelComparisonPage from './pages/ModelComparison';
import ActivityPlannerPage from './pages/ActivityPlanner';
import WeatherHistory from './pages/WeatherHistory';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  // State management
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState('metric');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [recent, setRecent] = useState(() => JSON.parse(localStorage.getItem('recentCities') || '[]'));
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
  const [coords, setCoords] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Favorite toggle logic
  const toggleFavorite = cityName => {
    setFavorites(favs => {
      let updated;
      if (favs.includes(cityName)) {
        updated = favs.filter(f => f !== cityName);
      } else {
        updated = [cityName, ...favs].slice(0, 10);
      }
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  // Data fetching logic
  const fetchAQI = async (lat, lon) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/air?lat=${lat}&lon=${lon}`);
      setAqi(data.list[0]?.main.aqi);
    } catch {
      setAqi(null);
    }
  };

  const fetchAlerts = async (lat, lon) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/alerts?lat=${lat}&lon=${lon}`);
      setAlerts(data.alerts || []);
    } catch {
      setAlerts([]);
    }
  };

  const fetchWeather = async (qCity, qUnit, notify = false) => {
    if (!qCity) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(
        `http://localhost:5000/weather?city=${encodeURIComponent(qCity)}&units=${qUnit}`
      );
      setWeather(data);
      setLastUpdated(new Date());
      setCoords(data.coord ? { lat: data.coord.lat, lon: data.coord.lon } : null);
      if (data.coord) {
        fetchAQI(data.coord.lat, data.coord.lon);
        fetchAlerts(data.coord.lat, data.coord.lon);
      }
      if (notify) toast.info(`Auto-refreshed: ${qCity}`);
      setRecent(r => [qCity, ...r.filter(c => c !== qCity)].slice(0, 15));
      fetchForecast(qCity, qUnit);
    } catch {
      setError('Could not fetch weather.');
      setWeather(null);
      setForecast([]);
      setAqi(null);
      setAlerts([]);
    }
    setLoading(false);
  };

  const fetchByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(
        `http://localhost:5000/weather?lat=${lat}&lon=${lon}&units=${unit}`
      );
      setCity(data.name);
      setCoords({ lat, lon });
      setWeather(data);
      setLastUpdated(new Date());
      fetchAQI(lat, lon);
      fetchAlerts(lat, lon);
      fetchForecast(data.name, unit);
    } catch {
      setError('Could not fetch weather.');
      setWeather(null);
      setForecast([]);
      setAqi(null);
      setAlerts([]);
    }
    setLoading(false);
  };

  const fetchForecast = async (qCity, qUnit) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/forecast?city=${encodeURIComponent(qCity)}&units=${qUnit}`
      );
      setForecast(data.list.filter((_, i) => i % 1 === 0));
    } catch {
      setForecast([]);
    }
  };

  // Side effects
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        fetchByCoords(coords.latitude, coords.longitude);
      },
      () => {}
    );
    // eslint-disable-next-line
  }, [unit]);

  useEffect(() => {
    const iv = setInterval(() => {
      if (city) fetchWeather(city, unit, true);
    }, 30000);
    return () => clearInterval(iv);
    // eslint-disable-next-line
  }, [city, unit]);

  useEffect(() => {
    localStorage.setItem('recentCities', JSON.stringify(recent));
  }, [recent]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    document.body.classList.toggle('bg-dark', darkMode);
    document.body.classList.toggle('text-light', darkMode);
  }, [darkMode]);

  // --- PAGE ROUTER STARTS HERE ---
  return (
    <Router>
      <div className={darkMode ? 'bg-dark text-light min-vh-100 d-flex flex-column' : 'bg-gradient-weather min-vh-100 d-flex flex-column'}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} unit={unit} setUnit={setUnit} />
        <main className="flex-grow-1 d-flex align-items-stretch">
          <div className="container-xxl py-4 flex-grow-1">
            <div className="row modern-weather-layout gx-4 gy-4">
              {/* Main content: pages/routes */}
              <section className="col-12 col-xl-9 px-0 px-xl-2 mb-4 mb-xl-0 order-xl-1" style={{ minWidth: 0 }}>
                <Routes>
                  <Route path="/" element={
                    <HomePage
                      city={city}
                      setCity={setCity}
                      weather={weather}
                      forecast={forecast}
                      unit={unit}
                      darkMode={darkMode}
                      loading={loading}
                      error={error}
                      lastUpdated={lastUpdated}
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                      aqi={aqi}
                      alerts={alerts}
                      coords={coords}
                      fetchWeather={fetchWeather}
                      fetchForecast={fetchForecast}
                      fetchByCoords={fetchByCoords}
                    />
                  } />
                  <Route path="/storm-tracker" element={<StormTracker coords={coords} alerts={alerts} />} />
                  <Route path="/travel-planner" element={<TravelPlanner coords={coords} forecast={forecast} />} />
                  <Route path="/event-weather" element={<EventWeather coords={coords} />} />
                  <Route path="/model-comparison" element={<ModelComparisonPage forecast={forecast} />} />
                  <Route path="/activity-planner" element={<ActivityPlannerPage forecast={forecast} aqi={aqi} alerts={alerts} />} />
                  <Route path="/weather-history" element={<WeatherHistory coords={coords} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer position="top-right" autoClose={3000} />
              </section>
              {/* Sidebar Always Right */}
              <aside className="col-12 col-xl-3 sidebar-panel px-0 px-xl-2 order-xl-2">
                <div className="card-section bg-glass sidebar-main h-100 d-flex flex-column align-items-stretch shadow-soft" style={{ borderRadius: 18, minHeight: "100%" }}>
                  <Sidebar
                    recent={recent}
                    favorites={favorites}
                    onSelect={city => fetchWeather(city, unit)}
                    weather={weather}
                    coords={coords}
                    city={city}
                    fetchByCoords={fetchByCoords}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    unit={unit}
                    setUnit={setUnit}
                    alerts={alerts}
                    forecast={forecast}
                  />
                </div>
              </aside>
            </div>
          </div>
        </main>
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;
