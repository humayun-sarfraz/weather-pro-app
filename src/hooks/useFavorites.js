import { useContext } from 'react';
import { PrefsContext } from '../contexts/PrefsContext';

export default function useFavorites() {
  const { favorites, addFav, removeFav } = useContext(PrefsContext);
  return { favorites, addFav, removeFav };
}
