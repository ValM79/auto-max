import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, LayoutList, LayoutGrid, ArrowLeft } from 'lucide-react';
import ListingCard from '../components/automarket/ListingCard';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import SimpleFiltersSidebar from '../components/automarket/SimpleFiltersSidebar';

const listings = [
  {
    id: 1,
    dealer: null,
    sellerType: 'Private Seller',
    sellerRating: null,
    spotlight: true,
    title: 'Ford minibus',
    description: 'Red minibus, 2.4 diesel engine. Perfect for group transport and events.',
    year: '2006',
    fuel: '2.4 Diesel',
    mileage: '136,000 km',
    timeAgo: '12 hours',
    location: 'Malahide, Dublin',
    price: '€6,450',
    photos: 9,
    image: 'https://images.unsplash.com/photo-1559373514-cda40629303d?w=600&q=80',
  },
  {
    id: 2,
    dealer: null,
    sellerType: 'Private Seller',
    sellerRating: 5,
    spotlight: true,
    title: 'Iveco Daily 2013',
    description: 'Excellent condition, automatic gearbox. Ideal for transport business.',
    year: '2013',
    fuel: '3.0 Diesel',
    mileage: '138,403 km',
    timeAgo: '7 days',
    location: 'Waterford City, Waterford',
    price: '€8,900',
    photos: 12,
    image: 'https://images.unsplash.com/photo-1527519335468-447f819ea228?w=600&q=80',
  },
  {
    id: 3,
    dealer: 'Coach Travel Solutions',
    sellerType: 'Dealership',
    sellerRating: 4.8,
    spotlight: false,
    title: '2015 Mercedes-Benz Sprinter Coach – 50 Seater',
    description: 'Euro 6 compliant, air suspension, recently serviced. Perfect for tours.',
    year: '2015',
    fuel: 'Diesel',
    mileage: '245,000 km',
    timeAgo: '3 days',
    location: 'Cork City, Cork',
    price: '€24,500',
    photos: 15,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80',
  },
  {
    id: 4,
    dealer: null,
    sellerType: 'Private Seller',
    sellerRating: 4.2,
    spotlight: false,
    title: 'Volvo Bus B10M – 49 Seater',
    description: 'Full-size coach, excellent for long-distance routes. Full MOT included.',
    year: '2008',
    fuel: 'Diesel',
    mileage: '320,500 km',
    timeAgo: '5 days',
    location: 'Dublin, Dublin',
    price: '€9,200',
    photos: 14,
    image: 'https://images.unsplash.com/photo-1558618047-f4e90b0a0d0f?w=600&q=80',
  },
  {
    id: 5,
    dealer: 'Premium Coach Hire',
    sellerType: 'Dealership',
    sellerRating: 4.9,
    spotlight: false,
    title: '2018 Scania K440 Touring Coach – 55 Seater',
    description: 'Modern comfort, Euro 6 engine, air conditioning. Perfect for charter service.',
    year: '2018',
    fuel: 'Diesel',
    mileage: '185,000 km',
    timeAgo: '2 days',
    location: 'Galway, Galway',
    price: '€32,800',
    photos: 18,
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80',
  },
  {
    id: 6,
    dealer: null,
    sellerType: 'Private Seller',
    sellerRating: 3.7,
    spotlight: false,
    title: 'Hyundai County Bus – 30 Seater',
    description: 'Compact size, great for shuttle services. Recently repaired transmission.',
    year: '2010',
    fuel: 'Diesel',
    mileage: '215,600 km',
    timeAgo: '4 days',
    location: 'Limerick, Limerick',
    price: '€5,800',
    photos: 11,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
  },
];



export default function CoachesBuses() {
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
          <span className="text-foreground font-medium">Coaches & Buses</span>
        </div>

        {/* Title + Search */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Coaches & Buses in Ireland</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Coaches & Buses"
              className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Banner */}
        <div className="mb-6 rounded-xl overflow-hidden border border-border h-36 sm:h-44">
          <img
            src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/b9c3a0c85_generated_image.png"
            alt="Coaches & Buses Banner"
            className="w-full h-full object-cover"
          />
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
                <span className="font-bold">480</span> ads for Coaches & Buses in Ireland
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
                <ListingCard
                  key={item.id}
                  item={item}
                  saved={savedIds.includes(item.id)}
                  onToggleSave={toggleSave}
                  viewMode={viewMode}
                />
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground col-span-2">
                  <p className="text-lg font-medium">No coaches & buses found</p>
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