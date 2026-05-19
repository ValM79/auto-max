import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, LayoutList, LayoutGrid, ArrowLeft } from 'lucide-react';
import ListingCard from '../components/automarket/ListingCard';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import FiltersSidebar from '../components/automarket/FiltersSidebar';

const listings = [
  {
    id: 1,
    dealer: 'DPF Service Ireland',
    dealerLogo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=80&q=80',
    sellerType: 'Independent Dealership',
    sellerRating: 5,
    spotlight: true,
    title: 'Factory DPF CLEANING 2 years warranty',
    description: 'One of the first companies to offer a DPF cleaning service with nationwide collection',
    daysAgo: '4 days',
    location: 'Swords, Dublin',
    price: '€180',
    photos: 7,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    badge: 'OPEN 7 DAYS A WEEK',
  },
  {
    id: 2,
    dealer: null,
    dealerLogo: null,
    sellerType: 'Private Seller',
    sellerRating: 5,
    spotlight: true,
    title: '2006 Subaru Impreza WRX STI Type UK',
    description: 'Full service history, Stage 2 tune, Brembo brakes, Cusco suspension',
    daysAgo: '2 days',
    location: 'Naas, Kildare',
    price: '€18,500',
    photos: 21,
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&q=80',
    badge: null,
  },
  {
    id: 3,
    dealer: 'Performance Cars Dublin',
    dealerLogo: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=80&q=80',
    sellerType: 'Trusted Independent Dealership',
    sellerRating: 4.8,
    spotlight: false,
    title: '2015 Ford Focus RS MK3 – Stage 1 Remap',
    description: 'Stage 1 Remap 380bhp, Mountune exhaust, custom lowering springs',
    daysAgo: '1 day',
    location: 'Dublin',
    price: '€29,950',
    photos: 18,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80',
    badge: null,
  },
  {
    id: 4,
    dealer: null,
    dealerLogo: null,
    sellerType: 'Private Seller',
    sellerRating: 4.5,
    spotlight: false,
    title: '2009 Honda Civic Type R FN2 – Full Track Build',
    description: 'Recaro seats, roll cage, Brembo big brake kit, Öhlins suspension',
    daysAgo: '3 days',
    location: 'Cork',
    price: '€12,750',
    photos: 13,
    image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&q=80',
    badge: null,
  },
  {
    id: 5,
    dealer: 'Turbo Specialists Galway',
    dealerLogo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=80&q=80',
    sellerType: 'Independent Dealership',
    sellerRating: 4.6,
    spotlight: false,
    title: '2011 BMW 335i E92 – Turbo Upgrade 450bhp',
    description: 'Upgraded turbos, intercooler, downpipe, full remap by Evolve Automotive',
    daysAgo: '5 days',
    location: 'Galway',
    price: '€21,000',
    photos: 9,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80',
    badge: null,
  },
  {
    id: 6,
    dealer: null,
    dealerLogo: null,
    sellerType: 'Private Seller',
    sellerRating: 4.0,
    spotlight: false,
    title: '2004 Mitsubishi Lancer Evo VIII – Rally Spec',
    description: 'Full Cusco roll cage, ARC strut brace, 6-point harness, fire suppression system',
    daysAgo: '1 week',
    location: 'Limerick',
    price: '€16,200',
    photos: 11,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80',
    badge: null,
  },
];



export default function ModifiedCars() {
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
          <span className="text-foreground font-medium">Modified Cars</span>
        </div>

        {/* Title + Search */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Modified Cars in Ireland</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Modified Cars"
              className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="mb-6 rounded-xl overflow-hidden h-36 sm:h-44">
          <img src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/7b875ae82_generated_image.png" alt="Promo" className="w-full h-full object-cover" />
        </div>

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
                <span className="font-bold">53</span> ads for Modified Cars in Ireland
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
              {filtered.map(car => (
                <ListingCard
                  key={car.id}
                  item={car}
                  saved={savedIds.includes(car.id)}
                  onToggleSave={toggleSave}
                  viewMode={viewMode}
                />
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="text-lg font-medium">No modified cars found</p>
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