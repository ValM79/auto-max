import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PromoBanner from '../components/automarket/PromoBanner';
import { Search, Heart, Camera, ChevronDown, Star, LayoutList, LayoutGrid, ArrowLeft } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import FiltersSidebar from '../components/automarket/FiltersSidebar';

const listings = [
  {
    id: 1,
    dealer: null,
    dealerLogo: null,
    sellerType: 'Private Seller',
    sellerRating: 3.3,
    spotlight: true,
    title: 'Turbo Turbocharger Turbo',
    description: 'FREE NATIONWIDE DELIVERY — 0877006300',
    hoursAgo: '11 hours',
    location: 'Limerick City, Limerick',
    price: '€200',
    photos: 1,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80',
  },
  {
    id: 2,
    dealer: 'Boss Car Parts',
    dealerLogo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=80&q=80',
    sellerType: 'Independent Dealership',
    sellerRating: null,
    spotlight: true,
    title: 'BMW E46 M3 Engine Complete S54 – Low Mileage',
    description: 'Full S54 engine removed from a 2003 E46 M3 with 62k miles. Starts and runs perfectly.',
    hoursAgo: '3 hours',
    location: 'Dublin',
    price: '€4,500',
    photos: 8,
    image: 'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=600&q=80',
  },
  {
    id: 3,
    dealer: null,
    dealerLogo: null,
    sellerType: 'Private Seller',
    sellerRating: 4.2,
    spotlight: false,
    title: 'Alloy Wheels 18" 5x112 – Set of 4',
    description: 'BBS-style alloys, 18 inch, 5x112 PCD. Fit Audi, VW, Mercedes. Good condition, light kerb marks.',
    hoursAgo: '1 day',
    location: 'Cork',
    price: '€380',
    photos: 6,
    image: 'https://images.unsplash.com/photo-1558618047-f4e90b0a0d0f?w=600&q=80',
  },
  {
    id: 4,
    dealer: 'AutoSpares Galway',
    dealerLogo: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=80&q=80',
    sellerType: 'Independent Dealership',
    sellerRating: 4.7,
    spotlight: false,
    title: 'Ford Focus MK3 Front Bumper – Panther Black',
    description: 'Genuine Ford front bumper, removed from a 2014 Focus. Minor scuff on left side.',
    hoursAgo: '2 days',
    location: 'Galway',
    price: '€120',
    photos: 4,
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80',
  },
  {
    id: 5,
    dealer: null,
    dealerLogo: null,
    sellerType: 'Private Seller',
    sellerRating: 3.8,
    spotlight: false,
    title: 'Recaro Sport Bucket Seats – Pair',
    description: 'Genuine Recaro Sport seats in black leather. Removed from 2009 Seat Leon Cupra. Great condition.',
    hoursAgo: '4 days',
    location: 'Waterford',
    price: '€650',
    photos: 10,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
  },
  {
    id: 6,
    dealer: 'Parts Direct Ireland',
    dealerLogo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=80&q=80',
    sellerType: 'Independent Dealership',
    sellerRating: 4.5,
    spotlight: false,
    title: 'Toyota Corolla 2019-2023 Headlight – Right Side OEM',
    description: 'OEM right-side headlight, perfect working order. Removed after a front-end repair.',
    hoursAgo: '5 days',
    location: 'Dublin',
    price: '€290',
    photos: 5,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
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

export default function CarParts() {
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
          <span className="text-foreground font-medium">Car Parts</span>
        </div>

        {/* Title + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Car Parts in Ireland</h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Car Parts"
              className="w-full border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <PromoBanner image="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80" />

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 self-start sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <FiltersSidebar />
          </aside>

          {/* Listings */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-foreground font-medium">
                <span className="font-bold">2,375</span> ads for Car Parts in Ireland
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
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {filtered.map(item => (
                <div key={item.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Dealer header */}
                  {item.dealer && (
                    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-secondary/20">
                      <img src={item.dealerLogo} alt={item.dealer} className="w-9 h-9 rounded object-cover border border-border" />
                      <span className="text-sm font-semibold text-foreground">{item.dealer}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative sm:w-56 h-44 sm:h-auto flex-shrink-0">
                      {item.spotlight && (
                        <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-0.5 rounded z-10">Spotlight</span>
                      )}
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                        <Camera className="w-3 h-3" /> {item.photos}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs text-muted-foreground">{item.sellerType}</span>
                          {item.sellerRating ? (
                            <>
                              <StarRating rating={item.sellerRating} />
                              <span className="text-xs text-muted-foreground">{item.sellerRating}</span>
                            </>
                          ) : (
                            <span className="text-xs text-muted-foreground">No rating</span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-1 hover:text-primary cursor-pointer transition-colors">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mb-1 line-clamp-2">{item.description}</p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {item.hoursAgo} · {item.location}
                        </p>
                      </div>
                      <div className="flex items-end justify-between mt-4">
                        <p className="text-2xl font-bold text-foreground">{item.price}</p>
                        <button
                          onClick={() => toggleSave(item.id)}
                          className={`p-2 rounded-full border transition-colors ${savedIds.includes(item.id) ? 'border-destructive text-destructive' : 'border-border text-muted-foreground hover:text-destructive hover:border-destructive'}`}>
                          <Heart className={`w-5 h-5 ${savedIds.includes(item.id) ? 'fill-destructive' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="text-lg font-medium">No car parts found</p>
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