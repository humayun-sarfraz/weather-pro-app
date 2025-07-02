import React, { createContext, useState, useEffect } from 'react';

export const PrefsContext = createContext();
export function PrefsProvider({ children }) {
  const [unit, setUnit] = useState('metric');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('prefs') || '{}');
    if (saved.unit) setUnit(saved.unit);
    if (saved.favorites) setFavorites(saved.favorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('prefs', JSON.stringify({ unit, favorites }));
  }, [unit, favorites]);

  const toggleUnit = () => setUnit(u => (u === 'metric' ? 'imperial' : 'metric'));
  const addFav = city => setFavorites(f => Array.from(new Set([city, ...f])));
  const removeFav = city => setFavorites(f => f.filter(c => c !== city));

  return (
    <PrefsContext.Provider value={{ unit, toggleUnit, favorites, addFav, removeFav }}>
      {children}
    </PrefsContext.Provider>
  );
}
