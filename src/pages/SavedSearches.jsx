import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Camera, ArrowLeft } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';

export default function SavedSearches() {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('automarket_saved_items');
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }
  }, []);

  const removeSaved = (id) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    localStorage.setItem('automarket_saved_items', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#f4f5f6]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span>›</span>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-foreground font-medium">Saved Searches</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Saved Searches</h1>

        {savedItems.length === 0 ? (
          <div className="bg-white rounded-xl border border-border shadow-sm p-12 text-center">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No saved items yet</p>
            <p className="text-sm text-muted-foreground mb-6">Heart your favourite listings to save them here</p>
            <Link to="/" className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              Browse Listings
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {savedItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative flex-shrink-0 sm:w-56 h-44 sm:h-auto">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                      <Camera className="w-3 h-3" /> {item.photos || 0}
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1 hover:text-primary cursor-pointer transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{item.location}</p>
                      {item.description && <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>}
                    </div>
                    <div className="flex items-end justify-between mt-4">
                      <p className="text-2xl font-bold text-foreground">{item.price}</p>
                      <button
                        onClick={() => removeSaved(item.id)}
                        className="p-2 rounded-full border border-destructive text-destructive hover:bg-destructive/10 transition-colors">
                        <Heart className="w-5 h-5 fill-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}