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
    dealer: 'Commercial Fleet Sales',
    sellerType: 'Dealership',
    sellerRating: 4.6,
    spotlight: true,
    title: '2019 Volvo FH16 540 Euro 6 Tractor Unit',
    description: 'Low mileage, full service history, 6x2 configuration. Excellent working condition.',
    timeAgo: '1 day',
    location: 'Dublin, Dublin',
    price: '€48,500',
    photos: 12,
    image: 'https://images.unsplash.com/photo-1533473359331-0ac8cc627c34?w=600&q=80',
  },
  {
    id: 2,
    dealer: null,
    sellerType: 'Private Seller',
    sellerRating: 4.2,
    spotlight: true,
    title: '2017 MAN TGX 26.480 – Perfect for Logistics',
    description: '6x2 truck, Euro 6 engine, recently serviced. Ready for work.',
    timeAgo: '2 days',
    location: 'Cork City, Cork',
    price: '€42,000',
    photos: 10,
    image: 'https://images.unsplash.com/photo-1579587413632-23ceb9fc402f?w=600&q=80',
  },
  {
    id: 3,
    dealer: 'Heavy Duty Vehicles IE',
    sellerType: 'Dealership',
    sellerRating: 4.8,
    spotlight: false,
    title: '2020 Scania R450 LA4X2MNA – Euro 6',
    description: 'Low kilometers, dual tanks, air suspension. Certificate of origin included.',
    timeAgo: '3 days',
    location: 'Limerick, Limerick',
    price: '€55,000',
    photos: 14,
    image: 'https://images.unsplash.com/photo-1558618047-f4e90b0a0d0f?w=600&q=80',
  },
  {
    id: 4,
    dealer: null,
    sellerType: 'Private Seller',
    sellerRating: null,
    spotlight: false,
    title: '2015 DAF CF85.430 8x4 Tipper Truck',
    description: 'Tipper body, excellent for construction. Full MOT, regular maintenance.',
    timeAgo: '4 days',
    location: 'Galway, Galway',
    price: '€38,500',
    photos: 11,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80',
  },
  {
    id: 5,
    dealer: 'Premium Commercial Fleet',
    sellerType: 'Dealership',
    sellerRating: 4.4,
    spotlight: false,
    title: '2018 Mercedes-Benz Actros 2551 – Refrigerated',
    description: 'Thermoking fridge unit, Euro 6, perfect for food distribution.',
    timeAgo: '5 days',
    location: 'Waterford, Waterford',
    price: '€52,000',
    photos: 13,
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80',
  },
  {
    id: 6,
    dealer: null,
    sellerType: 'Private Seller',
    sellerRating: 3.9,
    spotlight: false,
    title: '2016 Iveco Stralis 450 – Long Distance Ready',
    description: 'Auto gearbox, cruise control, bunk cab. Ideal for haulage.',
    timeAgo: '6 days',
    location: 'Wexford, Wexford',
    price: '€41,500',
    photos: 9,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
  },
];



export default function Trucks() {
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
          <span className="text-foreground font-medium">Trucks</span>
        </div>

        {/* Title + Search */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Trucks in Ireland</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Trucks"
              className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Banner */}
        <div className="mb-6 rounded-xl overflow-hidden border border-border h-36 sm:h-44">
          <img
            src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/cd2b5117c_generated_image.png"
            alt="Trucks Banner"
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
                <span className="font-bold">2,456</span> ads for Trucks in Ireland
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
                  <p className="text-lg font-medium">No trucks found</p>
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