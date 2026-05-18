import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Camera, ChevronDown, Star, LayoutList, LayoutGrid, ArrowLeft } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import SimpleFiltersSidebar from '../components/automarket/SimpleFiltersSidebar';

const listings = [
  {
    id: 1,
    sellerType: 'Private Seller',
    sellerRating: 5,
    spotlight: true,
    title: 'Klim pants & gloves. ABUS locks',
    description: 'High-quality motorbike protective gear with ABUS security locks included.',
    timeAgo: '6 hours',
    location: 'Cork City, Cork',
    price: '€90',
    photos: 5,
    images: [
      'https://images.unsplash.com/photo-1551453895-aceb63f6a5b7?w=300&q=80',
      'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&q=80',
      'https://images.unsplash.com/photo-1559163499-cf85e3e42efc?w=300&q=80',
      'https://images.unsplash.com/photo-1544441892-3a63f08fcf45?w=300&q=80',
      'https://images.unsplash.com/photo-1554260570-862e0c91d1cb?w=300&q=80',
    ],
  },
  {
    id: 2,
    sellerType: 'Trader',
    sellerRating: 5,
    spotlight: false,
    title: 'Bike it Cordura jacket armoured waterproof',
    description: 'Professional grade motorbike jacket with Cordura material and armor protection.',
    timeAgo: '1 min',
    location: 'Longford Town, Longford',
    price: '€65',
    photos: 8,
    images: [
      'https://images.unsplash.com/photo-1551553895-aceb63f6a5b7?w=300&q=80',
      'https://images.unsplash.com/photo-1544026613-b40a6ea02914?w=300&q=80',
      'https://images.unsplash.com/photo-1539185441766-cf0cbb3fcdf2?w=300&q=80',
      'https://images.unsplash.com/photo-1532089298610-248e5b007658?w=300&q=80',
    ],
  },
  {
    id: 3,
    sellerType: 'Private Seller',
    sellerRating: 4.8,
    spotlight: false,
    title: 'Oxford Bright helmet & gloves set',
    description: 'Safety certified helmet with integrated LED lights and matching gloves.',
    timeAgo: '2 hours',
    location: 'Dublin, Dublin',
    price: '€120',
    photos: 9,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80',
      'https://images.unsplash.com/photo-1544687325-ab127b536f6f?w=300&q=80',
      'https://images.unsplash.com/photo-1519311538147-e8d40a6c7475?w=300&q=80',
    ],
  },
  {
    id: 4,
    sellerType: 'Dealership',
    sellerRating: 4.9,
    spotlight: false,
    title: 'Bell Race Star helmet – Carbon fiber',
    description: 'Premium carbon fiber racing helmet with advanced aerodynamics.',
    timeAgo: '4 hours',
    location: 'Galway, Galway',
    price: '€450',
    photos: 11,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80',
      'https://images.unsplash.com/photo-1519311538147-e8d40a6c7475?w=300&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&q=80',
    ],
  },
  {
    id: 5,
    sellerType: 'Trader',
    sellerRating: 4.7,
    spotlight: false,
    title: 'Alpinestars leather jacket – Rideknit technology',
    description: 'Professional motorbike leather jacket with rideknit armor protection.',
    timeAgo: '8 hours',
    location: 'Limerick, Limerick',
    price: '€280',
    photos: 10,
    images: [
      'https://images.unsplash.com/photo-1551453895-aceb63f6a5b7?w=300&q=80',
      'https://images.unsplash.com/photo-1559163499-cf85e3e42efc?w=300&q=80',
      'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&q=80',
    ],
  },
  {
    id: 6,
    sellerType: 'Private Seller',
    sellerRating: 4.5,
    spotlight: false,
    title: 'TCX Street Ace boots – Waterproof',
    description: 'Comfortable and protective motorbike boots with waterproof lining.',
    timeAgo: '12 hours',
    location: 'Waterford, Waterford',
    price: '€95',
    photos: 7,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
      'https://images.unsplash.com/photo-1543163521-9efcc06814ee?w=300&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&q=80',
    ],
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

export default function MotorbikeExtras() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [viewMode, setViewMode] = useState('list');

  const toggleSave = (id) => setSavedIds(prev =>
    prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
  );

  const filtered = listings.filter(item =>
    !search ||
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase())
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
          <span className="text-foreground font-medium">Motorbike Extras</span>
        </div>

        {/* Title + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Motorbike Extras in Ireland</h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Motorbike Extras"
              className="w-full border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="mb-6 rounded-xl overflow-hidden h-36 sm:h-44">
          <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&q=80" alt="Promo" className="w-full h-full object-cover" />
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 self-start sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <SimpleFiltersSidebar />
          </aside>

          {/* Listings */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-foreground font-medium">
                <span className="font-bold">479</span> ads for Motorbike Extras in Ireland
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

            <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-4'}>
              {filtered.map(item => (
                <div key={item.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className={viewMode === 'grid' ? 'flex flex-col' : 'flex flex-col sm:flex-row'}>
                    {/* Images Grid */}
                    <div className={`relative flex-shrink-0 ${viewMode === 'grid' ? 'w-full' : 'sm:w-56'}`}>
                      <div className="grid grid-cols-3 gap-0.5 bg-gray-100">
                        {item.images.slice(0, 4).map((img, i) => (
                          <div key={i} className={`${i === 3 ? 'col-span-3 sm:col-span-1 h-20 sm:h-auto' : 'h-20'} relative overflow-hidden`}>
                            {i === 3 && item.images.length > 4 && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                                <span className="text-white text-sm font-semibold">+{item.images.length - 4}</span>
                              </div>
                            )}
                            <img src={img} alt={`${item.title} ${i}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      {item.spotlight && (
                        <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-0.5 rounded z-10">Spotlight</span>
                      )}
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                        <Camera className="w-3 h-3" /> {item.photos}
                      </div>
                    </div>

                    {/* Content */}
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
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Star className="w-3 h-3 text-gray-300 fill-gray-300" /> No rating
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-1 hover:text-primary cursor-pointer transition-colors">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mb-1 line-clamp-2">{item.description}</p>
                        )}
                        <p className="text-sm text-muted-foreground">{item.timeAgo} · {item.location}</p>
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
                <div className="text-center py-16 text-muted-foreground col-span-2">
                  <p className="text-lg font-medium">No motorbike extras found</p>
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