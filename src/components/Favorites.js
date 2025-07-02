import React, { useContext } from 'react';
import { PrefsContext } from '../contexts/PrefsContext';

export default function Favorites({ onSelect }) {
  const { favorites } = useContext(PrefsContext);
  return favorites.length ? (
    <div className="mb-3">
      Favorites:{' '}
      {favorites.map(c => (
        <button key={c} className="btn btn-sm btn-outline-info me-1" onClick={() => onSelect(c)}>
          {c}
        </button>
      ))}
    </div>
  ) : null;
}
