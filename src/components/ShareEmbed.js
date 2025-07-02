import React from 'react';
import copy from 'copy-to-clipboard';

export default function ShareEmbed({ city, unit }) {
  const url = `${window.location.origin}?city=${encodeURIComponent(city)}&unit=${unit}`;
  const onCopy = () => {
    copy(url);
    alert('Link copied!');
  };
  return <button className="btn btn-sm btn-outline-secondary" onClick={onCopy}>Share</button>;
}
