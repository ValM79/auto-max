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
  title: 'Honda CB500F 2022 – 3,200 miles',
  year: '2022',
  fuel: 'Petrol',
  mileage: '3,200 km',
  timeAgo: '2 hours',
  location: 'Dublin, Dublin',
  price: '€5,200',
  photos: 12,
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
},
{
  id: 2,
  sellerType: 'Dealership',
  sellerRating: 4.9,
  spotlight: true,
  title: 'Yamaha MT-07 2021 – Excellent condition',
  year: '2021',
  fuel: 'Petrol',
  mileage: '8,500 km',
  timeAgo: '1 day',
  location: 'Cork, Cork',
  price: '€6,800',
  photos: 15,
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
},
{
  id: 3,
  sellerType: 'Private Seller',
  sellerRating: 4.5,
  spotlight: false,
  title: 'Kawasaki Ninja 400 2020',
  year: '2020',
  fuel: 'Petrol',
  mileage: '12,300 km',
  timeAgo: '3 days',
  location: 'Galway, Galway',
  price: '€3,900',
  photos: 9,
  image: 'https://images.unsplash.com/photo-1537350994076-726c6e5e0e7d?w=600&q=80'
},
{
  id: 4,
  sellerType: 'Trader',
  sellerRating: 4.7,
  spotlight: false,
  title: 'BMW S1000RR 2019 – Racing bike',
  year: '2019',
  fuel: 'Petrol',
  mileage: '15,600 km',
  timeAgo: '5 days',
  location: 'Limerick, Limerick',
  price: '€8,500',
  photos: 14,
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
},
{
  id: 5,
  sellerType: 'Private Seller',
  sellerRating: 4.2,
  spotlight: false,
  title: 'Ducati Monster 2018',
  year: '2018',
  fuel: 'Petrol',
  mileage: '18,900 km',
  timeAgo: '1 week',
  location: 'Waterford, Waterford',
  price: '€4,600',
  photos: 11,
  image: 'https://images.unsplash.com/photo-1539860381487-90123d64bd32?w=600&q=80'
},
{
  id: 6,
  sellerType: 'Dealership',
  sellerRating: 4.8,
  spotlight: false,
  title: 'Royal Enfield Classic 350 2023',
  year: '2023',
  fuel: 'Petrol',
  mileage: '2,100 km',
  timeAgo: '2 days',
  location: 'Donegal, Donegal',
  price: '€3,400',
  photos: 10,
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
}];




export default function Motorbikes() {
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
          <span className="text-foreground font-medium">Motorbikes</span>
        </div>
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-foreground mb-3">Motorbikes</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Motorbikes" className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none border-0 outline-none" />
          </div>
        </div>
        <div className="mb-6 rounded-xl overflow-hidden border border-border h-36 sm:h-44">
          <img src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/34aa93463_generated_image.png" alt="Motorbikes Banner" className="w-full h-full object-cover" />
        </div>
        <div className="flex gap-6">
          <aside className="hidden lg:block w-80 flex-shrink-0 self-start sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <SimpleFiltersSidebar />
          </aside>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{filtered.length.toLocaleString()}</span> ads for Motorbikes in Ireland</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Sort by: <span className="font-semibold text-foreground">Best match</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {filtered.map((item) =>
              <ListingCard
                key={item.id}
                item={item}
                saved={savedIds.includes(item.id)}
                onToggleSave={toggleSave}
                viewMode="list" />

              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>);

}