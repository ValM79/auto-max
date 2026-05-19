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
  sellerRating: 2.4,
  spotlight: true,
  title: '2014 Nissan Qashqai 1.5 dci',
  description: 'Engine damage, gearbox issues. Excellent parts car. Mot until May 2025.',
  timeAgo: '1 day',
  location: 'Dublin',
  price: '€2,500',
  originalPrice: '€2,850',
  photos: 7,
  image: 'https://images.unsplash.com/photo-1558618047-f4e90b0a0d0f?w=600&q=80'
},
{
  id: 2,
  dealer: null,
  sellerType: 'Private Seller',
  sellerRating: null,
  spotlight: true,
  title: '740d msport (LWB) + 151 mondeo auto sport',
  description: 'Both for breaking. Full mechanical specs available. Parts in high demand.',
  timeAgo: '1 day',
  location: 'Carlow',
  price: '€1,800',
  photos: 9,
  image: 'https://images.unsplash.com/photo-1550617931-7ee4d3190498?w=600&q=80'
},
{
  id: 3,
  dealer: null,
  sellerType: 'Private Seller',
  sellerRating: 3.8,
  spotlight: false,
  title: '2018 Ford Focus – Cat D Salvage',
  description: 'Frame damage, engine runs well. Ideal for parts or repair. Clear history.',
  timeAgo: '2 days',
  location: 'Cork City, Cork',
  price: '€3,200',
  photos: 11,
  image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80'
},
{
  id: 4,
  dealer: null,
  sellerType: 'Private Seller',
  sellerRating: null,
  spotlight: false,
  title: '2010 Peugeot 308 – Engine Rebuild',
  description: 'Seized engine, excellent body and interior. Good for breaking.',
  timeAgo: '3 days',
  location: 'Galway City, Galway',
  price: '€1,500',
  photos: 8,
  image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80'
},
{
  id: 5,
  dealer: null,
  sellerType: 'Private Seller',
  sellerRating: 4.1,
  spotlight: false,
  title: '2015 Volkswagen Golf – Water Damaged',
  description: 'Flood damage, engine not tested. Gearbox and interior parts good.',
  timeAgo: '4 days',
  location: 'Limerick City, Limerick',
  price: '€2,100',
  photos: 10,
  image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80'
},
{
  id: 6,
  dealer: null,
  sellerType: 'Private Seller',
  sellerRating: null,
  spotlight: false,
  title: '2012 BMW 3 Series – Accident Damage',
  description: 'Front end collision, engine and transmission intact. Parts available.',
  timeAgo: '5 days',
  location: 'Waterford City, Waterford',
  price: '€2,400',
  photos: 12,
  image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=600&q=80'
}];




export default function BreakingRepairables() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [viewMode, setViewMode] = useState('list');

  const toggleSave = (id) => setSavedIds((prev) =>
  prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  );

  const filtered = listings.filter((c) =>
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
          <span className="text-foreground font-medium">Breaking & Repairables</span>
        </div>

        {/* Title + Search */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Breaking & Repairables in Ireland</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Breaking & Repairables"
              className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>

        {/* Banner */}
        <div className="mb-6 rounded-xl overflow-hidden border border-border h-36 sm:h-44">
          <img
            src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/a6206e6da_generated_image.png"
            alt="Breaking & Repairables Banner"
            className="w-full h-full object-cover" />
          
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
                <span className="font-bold">7,734</span> ads for Breaking & Repairables in Ireland
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
              {filtered.map((item) => (
                <ListingCard
                  key={item.id}
                  item={item}
                  saved={savedIds.includes(item.id)}
                  onToggleSave={toggleSave}
                  viewMode={viewMode}
                />
              ))}
              {filtered.length === 0 &&
              <div className="text-center py-16 text-muted-foreground col-span-2">
                  <p className="text-lg font-medium">No breaking & repairables found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>);

}