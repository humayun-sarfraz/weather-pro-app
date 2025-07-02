import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header({ darkMode, setDarkMode, unit, setUnit }) {
  return (
    <header className="header-main shadow-soft mb-2 d-flex flex-wrap justify-content-between align-items-center px-3 py-2">
      <div className="d-flex align-items-center gap-3">
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <span role="img" aria-label="weather" style={{ fontSize: '2rem' }}>🌦️</span>
          <span className="fs-3 fw-bold ms-2">Weather Pro</span>
        </Link>
        {/* Navigation links */}
        <nav className="ms-4 d-none d-md-flex gap-2">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Dashboard
          </NavLink>
          <NavLink to="/storm-tracker" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Storms
          </NavLink>
          <NavLink to="/travel-planner" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Travel
          </NavLink>
          <NavLink to="/activity-planner" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Activities
          </NavLink>
          <NavLink to="/weather-history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            History
          </NavLink>
          <NavLink to="/model-comparison" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Models
          </NavLink>
        </nav>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => setUnit(u => (u === 'metric' ? 'imperial' : 'metric'))}
        >
          {unit === 'metric' ? '°C → °F' : '°F → °C'}
        </button>
        <button
          className={`btn btn-sm ${darkMode ? 'btn-warning' : 'btn-dark'}`}
          onClick={() => setDarkMode(d => !d)}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
}

export default Header;
