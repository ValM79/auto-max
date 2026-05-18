import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Camera, ChevronDown, Star, LayoutList, LayoutGrid, ArrowLeft, ShieldCheck } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import FiltersSidebar from '../components/automarket/FiltersSidebar';

const listings = [
  {
    id: 1,
    sellerType: 'Private Seller',
    sellerRating: 3.5,
    spotlight: true,
    title: '1987 Ford Sierra rs500',
    year: 1987,
    daysAgo: '2 days',
    location: 'Kilkeel, Down',
    price: '£189,950',
    monthly: null,
    photos: 15,
    dealer: null,
    dealerLogo: null,
    trusted: false,
    image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?w=600&q=80',
  },
  {
    id: 2,
    sellerType: 'Trusted Independent Dealership',
    sellerRating: 4.8,
    spotlight: true,
    title: '1969 Ford Mustang Fastback',
    year: 1969,
    daysAgo: '1 day',
    location: 'Dublin',
    price: '€74,500',
    monthly: null,
    photos: 22,
    dealer: 'Karl Goodwin Motors Ltd',
    dealerLogo: 'https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?w=80&q=80',
    trusted: true,
    image: 'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=600&q=80',
  },
  {
    id: 3,
    sellerType: 'Private Seller',
    sellerRating: 4.0,
    spotlight: false,
    title: '1972 Jaguar E-Type Series 3 V12',
    year: 1972,
    daysAgo: '3 days',
    location: 'Cork',
    price: '€95,000',
    monthly: null,
    photos: 18,
    dealer: null,
    dealerLogo: null,
    trusted: false,
    image: 'https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=600&q=80',
  },
  {
    id: 4,
    sellerType: 'Trusted Independent Dealership',
    sellerRating: 4.6,
    spotlight: false,
    title: '1965 Austin-Healey 3000 BJ8',
    year: 1965,
    daysAgo: '5 days',
    location: 'Limerick',
    price: '€42,000',
    monthly: null,
    photos: 14,
    dealer: 'Classic Cars Ireland',
    dealerLogo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=80&q=80',
    trusted: true,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80',
  },
  {
    id: 5,
    sellerType: 'Private Seller',
    sellerRating: 4.2,
    spotlight: false,
    title: '1978 Mercedes-Benz 450SL Roadster',
    year: 1978,
    daysAgo: '1 week',
    location: 'Galway',
    price: '€28,500',
    monthly: null,
    photos: 11,
    dealer: null,
    dealerLogo: null,
    trusted: false,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
  },
  {
    id: 6,
    sellerType: 'Trusted Independent Dealership',
    sellerRating: 4.9,
    spotlight: false,
    title: '1961 Triumph TR4 Roadster',
    year: 1961,
    daysAgo: '2 days',
    location: 'Wexford',
    price: '€31,750',
    monthly: null,
    photos: 16,
    dealer: 'Heritage Autos Dublin',
    dealerLogo: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=80&q=80',
    trusted: true,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
      ))}
    </div>
  );
}

export default function VintageCars() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [viewMode, setViewMode] = useState('list');

  const toggleSave = (id) => setSavedIds(prev =>
    prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
  );

  const filtered = listings.filter(c =>
    !search ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f5f6]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span>›</span>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-foreground font-medium">Vintage Cars</span>
        </div>

        {/* Title + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Vintage Cars in Ireland</h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Vintage Cars"
              className="w-full border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="mb-6 rounded-xl overflow-hidden h-36 sm:h-44">
          <img src="https://images.unsplash.com/photo-1547744152-14d985cb937f?w=1200&q=80" alt="Promo" className="w-full h-full object-cover" />
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0 self-start sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <FiltersSidebar />
          </aside>

          {/* Listings */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-foreground font-medium">
                <span className="font-bold">1,612</span> ads for Vintage Cars in Ireland
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <button onClick={() => setViewMode('list')}>
                    <LayoutList className={`w-5 h-5 ${viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'}`} />
                  </button>
                  <button onClick={() => setViewMode('grid')}>
                    <LayoutGrid className={`w-5 h-5 ${viewMode === 'grid' ? 'text-primary' : 'text-muted-foreground'}`} />
                  </button>
                </div>
                <div className="relative">
                  <select className="appearance-none border border-border rounded-lg px-3 py-1.5 text-sm bg-white pr-8 focus:outline-none">
                    <option>Sort by: Best match</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Oldest First</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {filtered.map(car => (
                <div key={car.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Dealer header (only for dealerships) */}
                  {car.dealer && (
                    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-secondary/20">
                      <img src={car.dealerLogo} alt={car.dealer} className="w-9 h-9 rounded object-cover border border-border" />
                      <span className="text-sm font-semibold text-foreground">{car.dealer}</span>
                      {car.trusted && (
                        <span className="ml-auto flex items-center gap-1 text-xs text-green-700 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Trusted Independent Dealership
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0">
                      {car.spotlight && (
                        <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-0.5 rounded z-10">Spotlight</span>
                      )}
                      <img src={car.image} alt={car.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                        <Camera className="w-3 h-3" /> {car.photos}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">{car.sellerType}</span>
                          <StarRating rating={car.sellerRating} />
                          <span className="text-xs text-muted-foreground">{car.sellerRating}</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{car.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {car.daysAgo} · {car.location}
                        </p>
                      </div>
                      <div className="flex items-end justify-between mt-4">
                        <p className="text-2xl font-bold text-foreground">{car.price}</p>
                        <button
                          onClick={() => toggleSave(car.id)}
                          className={`p-2 rounded-full border transition-colors ${savedIds.includes(car.id) ? 'border-destructive text-destructive' : 'border-border text-muted-foreground hover:text-destructive hover:border-destructive'}`}>
                          <Heart className={`w-5 h-5 ${savedIds.includes(car.id) ? 'fill-destructive' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="text-lg font-medium">No vintage cars found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}