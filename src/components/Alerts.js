import React from 'react';

function Alerts({ alerts }) {
  if (!alerts || alerts.length === 0) return null;
  return (
    <div className="mb-3">
      {alerts.map((alert, idx) => (
        <div key={idx} className="alert-card-main mb-2 p-3">
          <div className="fw-bold text-danger">{alert.event || 'Weather Alert'}</div>
          <div className="small">
            <b>{new Date(alert.start * 1000).toLocaleString()}</b> &rarr; <b>{new Date(alert.end * 1000).toLocaleString()}</b>
          </div>
          <div>{alert.description}</div>
          <div className="small text-muted">{alert.sender_name}</div>
        </div>
      ))}
    </div>
  );
}

export default Alerts;
