import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, LayoutList, LayoutGrid, ArrowLeft } from 'lucide-react';
import ListingCard from '../components/automarket/ListingCard';
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
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Cars from Dealerships</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Cars"
              className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
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
                <ListingCard
                  key={car.id}
                  item={{
                    ...car,
                    dealer: car.dealerName,
                    sellerType: car.dealerType,
                    sellerRating: car.dealerRating,
                    trusted: car.dealerType.includes('Trusted'),
                    price: `€${car.price.toLocaleString()}`,
                  }}
                  saved={savedIds.includes(car.id)}
                  onToggleSave={toggleSave}
                  viewMode="list"
                />
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