import React from 'react';

function Footer({ darkMode }) {
  return (
    <footer className="footer-main text-center shadow-soft mt-auto">
      <div className="small">
        &copy; {new Date().getFullYear()} Weather Pro —{' '}
        <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">
          Powered by OpenWeatherMap
        </a>
      </div>
    </footer>
  );
}

export default Footer;
