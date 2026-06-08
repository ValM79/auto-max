import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import ListingCard from '../components/automarket/ListingCard';
import { useFavorites } from '../hooks/useFavorites';

export default function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span>›</span>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-foreground font-medium">Saved Ads</span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-destructive fill-destructive" />
          <h1 className="text-2xl font-bold text-foreground">Saved Ads</h1>
          <span className="text-sm text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full">{favorites.length}</span>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <Heart className="w-14 h-14 text-muted-foreground/30" />
            <h2 className="text-lg font-semibold text-foreground">No saved ads yet</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              Tap the heart icon on any listing to save it here for easy access later.
            </p>
            <Link to="/cars-for-sale" className="mt-2 text-sm font-semibold text-primary hover:underline">
              Browse cars for sale →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {favorites.map(item => (
              <ListingCard
                key={item.id}
                item={item}
                saved={isFavorite(item.id)}
                onToggleSave={() => toggleFavorite(item)}
                viewMode="list"
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}