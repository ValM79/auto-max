import { useState, useEffect } from 'react';

const STORAGE_KEY = 'automax_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => favorites.some(f => f.id === id);

  const toggleFavorite = (item) => {
    setFavorites(prev =>
      prev.some(f => f.id === item.id)
        ? prev.filter(f => f.id !== item.id)
        : [...prev, item]
    );
  };

  const removeFavorite = (id) => setFavorites(prev => prev.filter(f => f.id !== id));

  return { favorites, isFavorite, toggleFavorite, removeFavorite };
}