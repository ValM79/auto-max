import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Camera, ChevronDown, Star, LayoutList, LayoutGrid, ArrowLeft, ShieldCheck, Phone } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import FiltersSidebar from '../components/automarket/FiltersSidebar';

const dealerListings = [
  {
    id: 1,
    dealerName: 'O Brien Autos',
    dealerLogo: 'https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?w=80&q=80',
    dealerType: 'Independent Dealership',
    dealerRating: 5,
    spotlight: true,
    title: 'BMW 1-Series 118I AUTO M-SPORT',
    year: 2021,
    fuel: '1.5 Petrol',
    mileage: '77,200 km',
    location: 'Meath',
    price: 24900,
    monthly: 420,
    photos: 21,
    badge: '3 Month Warranty (AI Extracted)',
    badgeColor: 'text-blue-700 bg-blue-50',
    priceNote: 'Below avg.',
    priceNoteColor: 'text-green-600',
    phone: '087-7489847',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
  },
  {
    id: 2,
    dealerName: 'Kearys Renault, Dacia and Nissan Cork',
    dealerLogo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=80&q=80',
    dealerType: 'Trusted Independent Dealership',
    dealerRating: 4.8,
    spotlight: true,
    title: 'Renault Clio 1.0 TCe 90 Evolution',
    year: 2023,
    fuel: '1.0 Petrol',
    mileage: '12,400 km',
    location: 'Cork',
    price: 19950,
    monthly: 340,
    photos: 18,
    badge: 'Full Service History',
    badgeColor: 'text-green-700 bg-green-50',
    priceNote: 'Great price',
    priceNoteColor: 'text-green-600',
    phone: '021-4965000',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
  },
  {
    id: 3,
    dealerName: 'Castle Motors Swords',
    dealerLogo: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=80&q=80',
    dealerType: 'Trusted Independent Dealership',
    dealerRating: 4.6,
    spotlight: false,
    title: 'Toyota Corolla 1.8 Hybrid GR Sport',
    year: 2022,
    fuel: '1.8 Hybrid',
    mileage: '28,600 km',
    location: 'Dublin',
    price: 27500,
    monthly: 465,
    photos: 24,
    badge: 'Verified Seller',
    badgeColor: 'text-purple-700 bg-purple-50',
    priceNote: 'Below avg.',
    priceNoteColor: 'text-green-600',
    phone: '01-8950000',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80',
  },
  {
    id: 4,
    dealerName: 'Premier Motors Cork',
    dealerLogo: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=80&q=80',
    dealerType: 'Independent Dealership',
    dealerRating: 4.4,
    spotlight: false,
    title: 'Volkswagen Golf 2.0 TDI R-Line',
    year: 2020,
    fuel: '2.0 Diesel',
    mileage: '54,100 km',
    location: 'Cork',
    price: 22900,
    monthly: 388,
    photos: 15,
    badge: 'CARTELL Checked',
    badgeColor: 'text-orange-700 bg-orange-50',
    priceNote: null,
    priceNoteColor: '',
    phone: '021-4312000',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80',
  },
  {
    id: 5,
    dealerName: 'AutoVision Limerick',
    dealerLogo: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=80&q=80',
    dealerType: 'Trusted Independent Dealership',
    dealerRating: 4.9,
    spotlight: false,
    title: 'Audi A3 Sportback 35 TFSI S-Line',
    year: 2022,
    fuel: '1.5 Petrol',
    mileage: '19,800 km',
    location: 'Limerick',
    price: 31500,
    monthly: 530,
    photos: 20,
    badge: '12 Month Warranty',
    badgeColor: 'text-blue-700 bg-blue-50',
    priceNote: 'Great price',
    priceNoteColor: 'text-green-600',
    phone: '061-4120000',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80',
  },
  {
    id: 6,
    dealerName: 'Galway Motor House',
    dealerLogo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=80&q=80',
    dealerType: 'Independent Dealership',
    dealerRating: 4.2,
    spotlight: false,
    title: 'Ford Focus 1.5 EcoBlue ST-Line',
    year: 2021,
    fuel: '1.5 Diesel',
    mileage: '43,500 km',
    location: 'Galway',
    price: 18750,
    monthly: 318,
    photos: 12,
    badge: 'Full Service History',
    badgeColor: 'text-green-700 bg-green-50',
    priceNote: null,
    priceNoteColor: '',
    phone: '091-5600000',
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

export default function DealershipCars() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [viewMode, setViewMode] = useState('list');

  const toggleSave = (id) => setSavedIds(prev =>
    prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
  );

  const filtered = dealerListings.filter(c =>
    !search ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase()) ||
    c.dealerName.toLowerCase().includes(search.toLowerCase())
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
          <span className="text-foreground font-medium">Cars from Dealerships</span>
        </div>

        {/* Title + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Cars from Dealerships</h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Cars"
              className="w-full border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="mb-6 rounded-xl overflow-hidden h-36 sm:h-44">
          <img src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/25ca0801c_generated_image.png" alt="Promo" className="w-full h-full object-cover" />
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
                <span className="font-bold">72,297</span> cars in Ireland
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
                    <option>Lowest Mileage</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {filtered.map(car => (
                <div key={car.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Dealer header */}
                  <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-secondary/20">
                    <img src={car.dealerLogo} alt={car.dealerName} className="w-9 h-9 rounded object-cover border border-border" />
                    <span className="text-sm font-semibold text-foreground">{car.dealerName}</span>
                    {car.dealerType.includes('Trusted') && (
                      <span className="ml-auto flex items-center gap-1 text-xs text-green-700 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Trusted
                      </span>
                    )}
                  </div>

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
                      {car.phone && (
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                          <Phone className="w-3 h-3" /> {car.phone}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">{car.dealerType}</span>
                          <StarRating rating={car.dealerRating} />
                          <span className="text-xs text-muted-foreground">{car.dealerRating}</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{car.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {car.year} · {car.fuel} · {car.mileage} · {car.location}
                        </p>
                        {car.badge && (
                          <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${car.badgeColor}`}>
                            {car.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-end justify-between mt-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold text-foreground">€{car.price.toLocaleString()}</p>
                            {car.priceNote && (
                              <span className={`text-xs font-semibold flex items-center gap-1 ${car.priceNoteColor}`}>
                                ● {car.priceNote}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">From €{car.monthly}/mo</p>
                        </div>
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
                  <p className="text-lg font-medium">No dealership cars found</p>
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