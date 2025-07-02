import React from "react";
import MainDashboard from "./MainDashboard";
import SevereWeatherTimeline from "../components/SevereWeatherTimeline";
import AnimatedRadarMap from "../components/AnimatedRadarMap";
import WeatherComparison from "../components/WeatherComparison";
import ActivityPlanner from "../components/ActivityPlanner";
import StormTracker from "../components/StormTracker";
import PrecipitationChart from "../components/PrecipitationChart";
import ModelComparison from "../components/ModelComparison";
import LiveLightningMap from "../components/LiveLightningMap";
import AirQuality from "../components/AirQuality";
import Alerts from "../components/Alerts";
import SunAndMoonInfo from "../components/SunAndMoonInfo";
import WeatherCard from "../components/WeatherCard";
import FeelsLikeAndHealth from "../components/FeelsLikeAndHealth";
import ForecastCard from "../components/ForecastCard";
import HourlyChart from "../components/HourlyChart";
import MapView from "../components/MapView";

const HomePage = ({
  city, setCity, weather, forecast, unit, darkMode, loading, error, lastUpdated,
  favorites, toggleFavorite, aqi, alerts, coords, fetchWeather, fetchForecast, fetchByCoords
}) => (
  <>
    <MainDashboard
      coords={coords}
      city={city}
      unit={unit}
      setCity={setCity}
      fetchWeather={fetchWeather}
      fetchForecast={fetchForecast}
    />
    <div className="row g-3 mb-2">
      <div className="col-12">
        <SevereWeatherTimeline alerts={alerts} forecast={forecast} />
      </div>
      <div className="col-12">
        <AnimatedRadarMap coords={coords} />
      </div>
    </div>
    {/* Analytics Row */}
    <div className="row g-3 mb-2">
      <div className="col-12 col-md-6">
        <WeatherComparison today={weather} coords={coords} />
        <ActivityPlanner forecast={forecast} aqi={aqi} alerts={alerts} />
        <StormTracker />
        <PrecipitationChart forecast={forecast} />
      </div>
      <div className="col-12 col-md-6">
        <ModelComparison forecast={forecast} />
        <LiveLightningMap coords={coords} />
        {/* ...more widgets */}
      </div>
    </div>
    {/* Search bar, favorites, and info cards can be included here as before */}
    {/* ... */}
    {/* AirQuality, Alerts, SunAndMoonInfo, WeatherCard, FeelsLikeAndHealth, ForecastCard, HourlyChart, MapView, etc */}
  </>
);

export default HomePage;
