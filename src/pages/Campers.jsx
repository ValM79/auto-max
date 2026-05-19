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
    title: 'Camper van',
    description: 'Ford-based camper, fully equipped kitchen, cozy sleeping area.',
    timeAgo: '9 hours',
    location: 'Warrenpoint, Down',
    price: '€21,000',
    photos: 20,
    image: 'https://images.unsplash.com/photo-1527519335468-447f819ea228?w=600&q=80',
  },
  {
    id: 2,
    dealer: null,
    sellerType: 'Private Seller',
    sellerRating: null,
    spotlight: true,
    title: 'Camper van',
    description: 'Mercedes-based, automatic gearbox, modern interior design.',
    timeAgo: '1 day',
    location: 'Roscrea, Tipperary',
    price: '€18,500',
    photos: 18,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
  },
  {
    id: 3,
    dealer: 'Premium Campers IE',
    sellerType: 'Dealership',
    sellerRating: 4.7,
    spotlight: false,
    title: '2020 Hymer Camper – Luxury 4-Berth',
    description: 'Shower, toilet, full kitchen, heating system. Immaculate condition.',
    timeAgo: '2 days',
    location: 'Dublin, Dublin',
    price: '€32,500',
    photos: 25,
    image: 'https://images.unsplash.com/photo-1558618047-f4e90b0a0d0f?w=600&q=80',
  },
  {
    id: 4,
    dealer: null,
    sellerType: 'Private Seller',
    sellerRating: 3.9,
    spotlight: false,
    title: 'VW T4 Camper Conversion',
    description: 'DIY conversion, pop-up roof, sleeping for 2. Great weekend getaway.',
    timeAgo: '3 days',
    location: 'Cork City, Cork',
    price: '€7,800',
    photos: 15,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
  },
  {
    id: 5,
    dealer: 'Motorhome & Camper Center',
    sellerType: 'Dealership',
    sellerRating: 4.9,
    spotlight: false,
    title: '2019 Fiat Ducato Motorhome – 6-Berth',
    description: 'Diesel, central heating, large storage, satellite TV included.',
    timeAgo: '1 day',
    location: 'Galway, Galway',
    price: '€28,900',
    photos: 22,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
  },
  {
    id: 6,
    dealer: null,
    sellerType: 'Private Seller',
    sellerRating: 4.2,
    spotlight: false,
    title: 'Renault Master Camper – Compact',
    description: 'Ideal for couples, 2-burner stove, compact bathroom. Low mileage.',
    timeAgo: '4 days',
    location: 'Limerick, Limerick',
    price: '€11,200',
    photos: 17,
    image: 'https://images.unsplash.com/photo-1527519335468-447f819ea228?w=600&q=80',
  },
];



export default function Campers() {
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
          <span className="text-foreground font-medium">Campers</span>
        </div>

        {/* Title + Search */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Campers in Ireland</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Campers"
              className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="mb-6 rounded-xl overflow-hidden h-36 sm:h-44">
          <img src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/2106e76f6_generated_image.png" alt="Campers Banner" className="w-full h-full object-cover" />
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
                <span className="font-bold">1,786</span> ads for Campers in Ireland
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
                  <p className="text-lg font-medium">No campers found</p>
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