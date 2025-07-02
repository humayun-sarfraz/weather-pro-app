import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

function HourlyChart({ forecast, unit }) {
  if (!forecast || forecast.length === 0) return null;

  const labels = forecast.map(f => new Date(f.dt * 1000).getHours() + ':00');
  const temps = forecast.map(f => f.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: `Temp (${unit === 'metric' ? '°C' : '°F'})`,
        data: temps,
        fill: true,
        backgroundColor: 'rgba(13,110,253,0.1)',
        borderColor: '#0d6efd',
        tension: 0.4
      }
    ]
  };

  return (
    <div style={{ minHeight: 180 }}>
      <Line data={data} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false } } }} />
    </div>
  );
}

export default HourlyChart;
