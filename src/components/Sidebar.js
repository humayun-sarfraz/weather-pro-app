import React from 'react';

function Sidebar({ recent, onSelect, darkMode }) {
  return (
    <div>
      <h5 className="mb-3 fw-semibold">Recent Searches</h5>
      {recent.length === 0 ? (
        <div className="text-muted small">No recent cities.</div>
      ) : (
        <ul className="list-group list-group-flush">
          {recent.map((city, idx) => (
            <li key={city + idx} className="list-group-item bg-transparent px-0 py-1 border-0 d-flex align-items-center">
              <button
                className={`btn btn-link p-0 fw-medium ${darkMode ? 'text-light' : 'text-dark'}`}
                style={{ textDecoration: 'underline dotted' }}
                onClick={() => onSelect(city)}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
      <hr className="my-3" />
      <div className="small text-muted">
        <span role="img" aria-label="info">ℹ️</span> Click a city to reload its weather!
      </div>
    </div>
  );
}

export default Sidebar;
