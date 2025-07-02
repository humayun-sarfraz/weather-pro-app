Weather Pro App
===============

Weather Pro is a modern, full-featured weather dashboard and forecast application built with React and Node.js.
It offers real-time weather data, severe weather alerts, air quality, sunrise/sunset, radar, advanced analytics, and more in a slick, responsive UI.

------------------------------------------------------------
FEATURES
------------------------------------------------------------
- Current Weather & 5-Day Forecast for any city or location
- Air Quality & Health Index (AQI, feels-like, health tips)
- Severe Weather Alerts & Timelines
- Animated Radar & (optional) Lightning Maps
- Sun & Moon Data (sunrise, sunset, moon phase)
- Weather Analytics (today vs. average, model comparison, precipitation)
- Outdoor Activity & Travel Planners
- Favorites & Recent Search (one-click switch)
- Responsive, Mobile-friendly Design
- Dark/Light Mode Toggle

------------------------------------------------------------
TECH STACK
------------------------------------------------------------
Frontend:   React, Bootstrap 5, Axios, React Toastify
Backend:    Node.js (Express), Axios, CORS
APIs:       OpenWeatherMap, Open-Meteo, NewsAPI
Extras:     Modular components, sidebar widgets, advanced planners

------------------------------------------------------------
FOLDER STRUCTURE
------------------------------------------------------------
/src
  /components
    /sidebar
    WeatherCard.js
    ForecastCard.js
    ...
  /pages
    HomePage.js
    StormTracker.js
    TravelPlanner.js
    ...
  App.js
  index.js
/server
  index.js

------------------------------------------------------------
GETTING STARTED
------------------------------------------------------------
1. Clone the Repository

   git clone https://github.com/yourusername/weather-pro-app.git
   cd weather-pro-app

2. Install Dependencies

   # For React app
   npm install

   # For backend server
   cd server
   npm install

3. API Keys Setup

   - Get your API key from https://openweathermap.org/api
   - (Optional) NewsAPI key for weather news
   - Add keys to /server/index.js or (recommended) in a .env file:
         API_KEY=your_openweathermap_api_key_here
         NEWS_API_KEY=your_newsapi_key_here

4. Run Backend Server

   cd server
   node index.js
   # Or use nodemon for hot reload:
   # npx nodemon index.js

5. Run React Frontend

   cd ..
   npm start

   - The app runs at http://localhost:3000
   - The backend server runs at http://localhost:5000

------------------------------------------------------------
ENVIRONMENT VARIABLES
------------------------------------------------------------
- For local development, create a .env file in root:
    REACT_APP_API_URL=http://localhost:5000

------------------------------------------------------------
DEVELOPMENT NOTES
------------------------------------------------------------
- All weather/forecast/air quality requests are proxied via the backend for security
- Add/remove sidebar widgets or pages in /components/sidebar/ and /pages/
- New features/components are in separate files for modularity and easy scaling

------------------------------------------------------------
PRODUCTION BUILD
------------------------------------------------------------
npm run build

------------------------------------------------------------
CREDITS
------------------------------------------------------------
- OpenWeatherMap (https://openweathermap.org/)
- Open-Meteo (https://open-meteo.com/)
- React Toastify (https://fkhadra.github.io/react-toastify/)
- All open-source contributors and libraries

------------------------------------------------------------
CONTRIBUTING
------------------------------------------------------------
Pull requests welcome! Open issues for suggestions or bug reports.

------------------------------------------------------------
LICENSE
------------------------------------------------------------
MIT

Weather Pro App — Your professional weather dashboard!
