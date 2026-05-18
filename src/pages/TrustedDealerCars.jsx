import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, Camera, ChevronDown, Star, LayoutList, LayoutGrid, ArrowLeft } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import FiltersSidebar from '../components/automarket/FiltersSidebar';

const trustedDealerListings = [
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
  {
    id: 8,
    spotlight: false,
    sellerType: 'Dealership',
    sellerRating: 4.6,
    dealerName: 'Elite Motors Dublin',
    dealerLogo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=80&q=80',
    title: 'Opel Insignia',
    year: 2019,
    fuel: '1.6 Diesel',
    mileage: '72,900 km',
    location: 'Dublin',
    price: 19500,
    monthly: 330,
    photos: 15,
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&q=80',
    trusted: true,
  },
  {
    id: 9,
    spotlight: true,
    sellerType: 'Dealership',
    sellerRating: 4.8,
    dealerName: 'Prestige Auto Galway',
    dealerLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    title: 'Mercedes-Benz C-Class',
    year: 2021,
    fuel: '1.5 Petrol',
    mileage: '28,500 km',
    location: 'Galway',
    price: 45000,
    monthly: 760,
    photos: 20,
    image: 'https://images.unsplash.com/photo-1553882900-d174edf69254?w=600&q=80',
    trusted: true,
  },
  {
    id: 10,
    spotlight: false,
    sellerType: 'Dealership',
    sellerRating: 4.3,
    dealerName: 'Classic Cars Waterford',
    dealerLogo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    title: 'Volkswagen Passat',
    year: 2020,
    fuel: '2.0 TDI',
    mileage: '55,200 km',
    location: 'Waterford',
    price: 24800,
    monthly: 420,
    photos: 13,
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&q=80',
    trusted: true,
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

export default function TrustedDealerCars() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);

  const toggleSave = (id) => setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const filtered = trustedDealerListings.filter(c =>
    !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f5f6]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span>›</span>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-foreground font-medium">Trusted Dealer Cars</span>
        </div>

        {/* Title + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Trusted Dealer Cars</h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Trusted Dealers"
              className="w-full border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Banner */}
        <div className="mb-6 rounded-xl overflow-hidden h-32 bg-green-600 flex items-center justify-between px-8">
          <div className="text-white">
            <p className="text-xs font-semibold uppercase tracking-wider mb-1">Verified</p>
            <p className="text-3xl font-extrabold leading-tight">TRUSTED<br />DEALERS</p>
          </div>
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&q=80" alt="Banner" className="h-full object-cover rounded-lg opacity-80" />
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
              <p className="text-sm text-foreground font-medium"><span className="font-bold">{filtered.length}</span> trusted dealer cars in Ireland</p>
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

            <div className="flex flex-col gap-4">
              {filtered.map(car => (
                <div key={car.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {car.dealerName ? (
                    /* Dealer card header */
                    <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-secondary/30">
                      <img src={car.dealerLogo} alt={car.dealerName} className="w-8 h-8 rounded object-cover" />
                      <span className="text-sm font-semibold text-foreground">{car.dealerName}</span>
                      {car.trusted && <span className="ml-auto text-xs text-green-700 font-medium flex items-center gap-1"><span className="text-green-600">✓</span> Trusted Dealer <StarRating rating={car.sellerRating} /></span>}
                    </div>
                  ) : null}

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
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">{car.sellerType}</span>
                          <StarRating rating={car.sellerRating} />
                          {car.sellerRating}
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{car.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {car.year} · {car.fuel} · {car.mileage} · {car.location}
                        </p>
                      </div>
                      <div className="flex items-end justify-between mt-4">
                        <div>
                          <p className="text-2xl font-bold text-foreground">€{car.price.toLocaleString()}</p>
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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}