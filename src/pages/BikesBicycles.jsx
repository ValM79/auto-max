import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ArrowLeft } from 'lucide-react';
import ListingCard from '../components/automax/ListingCard';
import Navbar from '../components/automax/Navbar';
import Footer from '../components/automax/Footer';
import SimpleFiltersSidebar from '../components/automax/SimpleFiltersSidebar';

const listings = [
{
  id: 1,
  sellerType: 'Private Seller',
  sellerRating: 4.8,
  spotlight: true,
  title: 'Trek Domane AL 3 Road Bike 2023 – Barely Used',
  year: '2023',
  mileage: '50 km',
  timeAgo: '2 hours',
  location: 'Dublin, Dublin',
  price: '€950',
  photos: 8,
  image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80'
},
{
  id: 2,
  sellerType: 'Dealership',
  sellerRating: 4.9,
  spotlight: true,
  title: 'Giant Defy Advanced 2 Road Bike 2022',
  year: '2022',
  mileage: '300 km',
  timeAgo: '1 day',
  location: 'Cork, Cork',
  price: '€1,800',
  photos: 12,
  image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80'
},
{
  id: 3,
  sellerType: 'Private Seller',
  sellerRating: 4.5,
  spotlight: false,
  title: 'Specialized Rockhopper Mountain Bike 2021',
  year: '2021',
  mileage: '1,200 km',
  timeAgo: '3 days',
  location: 'Galway, Galway',
  price: '€680',
  photos: 7,
  image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=600&q=80'
},
{
  id: 4,
  sellerType: 'Private Seller',
  sellerRating: 4.3,
  spotlight: false,
  title: 'Cannondale Synapse Carbon 105 2020',
  year: '2020',
  mileage: '2,500 km',
  timeAgo: '5 days',
  location: 'Limerick, Limerick',
  price: '€1,200',
  photos: 10,
  image: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?w=600&q=80'
},
{
  id: 5,
  sellerType: 'Dealership',
  sellerRating: 4.7,
  spotlight: false,
  title: 'Cube Attention SL Hardtail 2023',
  year: '2023',
  mileage: '100 km',
  timeAgo: '1 week',
  location: 'Waterford, Waterford',
  price: '€1,100',
  photos: 9,
  image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94946?w=600&q=80'
},
{
  id: 6,
  sellerType: 'Private Seller',
  sellerRating: 4.6,
  spotlight: false,
  title: 'Boardman SLR 8.9 Road Bike 2022',
  year: '2022',
  mileage: '800 km',
  timeAgo: '2 days',
  location: 'Kilkenny, Kilkenny',
  price: '€740',
  photos: 6,
  image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80'
}];


export default function BikesBicycles() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      const itemToSave = listings.find((item) => item.id === id);
      if (itemToSave && !prev.includes(id)) {
        const saved = JSON.parse(localStorage.getItem('automarket_saved_items') || '[]');
        saved.push({ ...itemToSave, savedAt: new Date().toISOString() });
        localStorage.setItem('automarket_saved_items', JSON.stringify(saved));
      } else if (prev.includes(id)) {
        const saved = JSON.parse(localStorage.getItem('automarket_saved_items') || '[]');
        const filtered = saved.filter((item) => item.id !== id);
        localStorage.setItem('automarket_saved_items', JSON.stringify(filtered));
      }
      return updated;
    });
  };

  const filtered = listings.filter((item) =>
  !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span>›</span>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-foreground font-medium">Bikes & Bicycles</span>
        </div>
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-foreground mb-3">Bikes & Bicycles</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Bikes & Bicycles" className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none border-0 outline-none" />
          </div>
        </div>
        <div className="mb-6 rounded-xl overflow-hidden border border-border h-36 sm:h-44">
          <img src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/8ded1f6ff_generated_image.png" alt="Bikes & Bicycles Banner" className="w-full h-full object-cover" />
        </div>
        <div className="flex gap-6">
          <aside className="hidden lg:block w-80 flex-shrink-0 self-start sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <SimpleFiltersSidebar />
          </aside>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{filtered.length.toLocaleString()}</span> ads for Bikes & Bicycles in Ireland</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Sort by: <span className="font-semibold text-foreground">Best match</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {filtered.map((item) =>
              <ListingCard key={item.id} item={item} saved={savedIds.includes(item.id)} onToggleSave={toggleSave} viewMode="list" />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>);

}