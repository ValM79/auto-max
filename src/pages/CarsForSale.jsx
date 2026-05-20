import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PromoBanner from '../components/automarket/PromoBanner';
import { Search, ChevronDown, LayoutList, LayoutGrid, ArrowLeft } from 'lucide-react';
import ListingCard from '../components/automarket/ListingCard';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import FiltersSidebar from '../components/automarket/FiltersSidebar';

const carListings = [
  {
    id: 1,
    spotlight: true,
    sellerType: 'Private Seller',
    sellerRating: 5,
    title: 'Hyundai IX20',
    year: 2015,
    fuel: '1.4 Diesel',
    mileage: '157,789 km',
    location: 'Wexford',
    price: 5150,
    monthly: 106,
    photos: 14,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    trusted: false,
  },
  {
    id: 2,
    spotlight: true,
    sellerType: 'Trusted Independent Dealership',
    sellerRating: 4.4,
    dealerName: 'Castle Motors Swords',
    dealerLogo: 'https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?w=80&q=80',
    title: 'Toyota Corolla',
    year: 2020,
    fuel: '1.8 Hybrid',
    mileage: '42,000 km',
    location: 'Dublin',
    price: 22500,
    monthly: 380,
    photos: 18,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80',
    trusted: true,
  },
  {
    id: 3,
    spotlight: false,
    sellerType: 'Private Seller',
    sellerRating: 4,
    title: 'Volkswagen Golf',
    year: 2018,
    fuel: '1.6 TDI',
    mileage: '88,500 km',
    location: 'Cork',
    price: 14900,
    monthly: 250,
    photos: 9,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    trusted: false,
  },
  {
    id: 4,
    spotlight: false,
    sellerType: 'Dealership',
    sellerRating: 4.7,
    dealerName: 'Premier Motors Cork',
    dealerLogo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=80&q=80',
    title: 'BMW 3 Series',
    year: 2021,
    fuel: '2.0 Petrol',
    mileage: '31,200 km',
    location: 'Cork',
    price: 34500,
    monthly: 590,
    photos: 22,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
    trusted: true,
  },
  {
    id: 5,
    spotlight: false,
    sellerType: 'Private Seller',
    sellerRating: 3,
    title: 'Ford Focus',
    year: 2016,
    fuel: '1.5 Diesel',
    mileage: '112,000 km',
    location: 'Galway',
    price: 8200,
    monthly: 140,
    photos: 7,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80',
    trusted: false,
  },
  {
    id: 6,
    spotlight: false,
    sellerType: 'Dealership',
    sellerRating: 4.5,
    dealerName: 'AutoVision Limerick',
    dealerLogo: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=80&q=80',
    title: 'Audi A4',
    year: 2019,
    fuel: '2.0 TDI',
    mileage: '64,800 km',
    location: 'Limerick',
    price: 27900,
    monthly: 470,
    photos: 16,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80',
    trusted: true,
  },
];



export default function CarsForSale() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ vehicles: [] });

  const toggleSave = (id) => setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const activeVehicles = (activeFilters.vehicles || []).filter(v => v.make);

  // Parse price string like "€14,900" -> 14900
  const parsePrice = (str) => str ? parseInt(str.replace(/[€,]/g, ''), 10) : null;
  // Parse mileage string like "88,500 km" -> 88500
  const parseMileage = (str) => str ? parseInt(str.replace(/[, km]/g, ''), 10) : null;

  const matchesSearch = (c) => !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase());

  const matchesRanges = (c) => {
    const { yearFrom, yearTo, priceFrom, priceTo, mileageFrom, mileageTo } = activeFilters;
    if (yearFrom && c.year < parseInt(yearFrom)) return false;
    if (yearTo && c.year > parseInt(yearTo)) return false;
    const cPrice = c.price;
    if (priceFrom && cPrice < parsePrice(priceFrom)) return false;
    if (priceTo && cPrice > parsePrice(priceTo)) return false;
    const cMileage = parseMileage(c.mileage);
    if (mileageFrom && cMileage < parseMileage(mileageFrom)) return false;
    if (mileageTo && cMileage > parseMileage(mileageTo)) return false;
    return true;
  };

  const matchesVehicle = (c, v) => {
    const makeMatch = !v.make || c.title.toLowerCase().includes(v.make.toLowerCase());
    const modelMatch = !v.model || c.title.toLowerCase().includes(v.model.toLowerCase());
    return makeMatch && modelMatch;
  };

  const groups = activeVehicles.length > 0
    ? activeVehicles.map(v => ({
        label: [v.make, v.model].filter(Boolean).join(' '),
        listings: carListings.filter(c => matchesSearch(c) && matchesRanges(c) && matchesVehicle(c, v)),
      }))
    : [{ label: null, listings: carListings.filter(c => matchesSearch(c) && matchesRanges(c)) }];

  const filtered = carListings.filter(c => matchesSearch(c) && matchesRanges(c));

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
          <span className="text-foreground font-medium">New Cars</span>
        </div>

        {/* Title + Search */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">New & Used Cars For Sale</h1>
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

        <PromoBanner image="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80" />

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0 self-start sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <FiltersSidebar onFilterChange={setActiveFilters} />
          </aside>

          {/* Listings */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-foreground font-medium">
                <span className="font-bold">{groups.reduce((acc, g) => acc + g.listings.length, 0)}</span> cars in Ireland
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <LayoutList className="w-5 h-5 text-primary" />
                  <LayoutGrid className="w-5 h-5 text-muted-foreground" />
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

            {groups.map((group, gi) => (
              <div key={gi} className="mb-6">
                {group.label && (
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-base font-bold text-foreground">{group.label}</h2>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{group.listings.length} result{group.listings.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
                {group.listings.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">No listings found for <span className="font-semibold">{group.label}</span>.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {group.listings.map(car => (
                      <ListingCard
                        key={car.id}
                        item={{ ...car, dealer: car.dealerName, price: `€${car.price.toLocaleString()}` }}
                        saved={savedIds.includes(car.id)}
                        onToggleSave={toggleSave}
                        viewMode="list"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}