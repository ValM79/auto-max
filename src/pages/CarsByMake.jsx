import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Heart, Camera, ChevronDown, Star, ArrowLeft } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import FiltersSidebar from '../components/automarket/FiltersSidebar';

const carsByMake = {
  'abarth': [
    { id: 1, spotlight: true, sellerType: 'Dealership', sellerRating: 4.6, dealerName: 'Premier Motors', title: 'Abarth 595', year: 2021, fuel: '1.4 Turbo', mileage: '28,000 km', location: 'Dublin', price: 18500, monthly: 315, photos: 18, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', trusted: true },
  ],
  'alfa-romeo': [
    { id: 1, spotlight: true, sellerType: 'Dealership', sellerRating: 4.5, dealerName: 'AutoVision', title: 'Alfa Romeo Giulia', year: 2020, fuel: '2.0 Petrol', mileage: '35,000 km', location: 'Cork', price: 28900, monthly: 490, photos: 20, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80', trusted: true },
  ],
  'aston-martin': [
    { id: 1, spotlight: true, sellerType: 'Dealership', sellerRating: 4.8, dealerName: 'Luxury Motors', title: 'Aston Martin DB11', year: 2019, fuel: '5.2 V12', mileage: '15,200 km', location: 'Dublin', price: 185000, monthly: 3100, photos: 25, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80', trusted: true },
  ],
  'audi': [
    { id: 1, spotlight: true, sellerType: 'Dealership', sellerRating: 4.7, dealerName: 'Audi Centre', title: 'Audi A4', year: 2021, fuel: '2.0 TDI', mileage: '32,000 km', location: 'Dublin', price: 35900, monthly: 610, photos: 22, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', trusted: true },
  ],
  'bentley': [
    { id: 1, spotlight: true, sellerType: 'Dealership', sellerRating: 4.9, dealerName: 'Luxury Motors', title: 'Bentley Flying Spur', year: 2020, fuel: '6.0 W12', mileage: '18,500 km', location: 'Dublin', price: 225000, monthly: 3800, photos: 28, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80', trusted: true },
  ],
  'bmw': [
    { id: 1, spotlight: true, sellerType: 'Dealership', sellerRating: 4.6, dealerName: 'BMW Centre', title: 'BMW 3 Series', year: 2021, fuel: '2.0 Petrol', mileage: '28,200 km', location: 'Dublin', price: 42000, monthly: 710, photos: 20, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80', trusted: true },
  ],
  'volvo': [
    { id: 1, spotlight: true, sellerType: 'Trusted Independent Dealership', sellerRating: 4.5, dealerName: 'Premier Motors Dublin', title: 'Volvo XC90', year: 2020, fuel: '2.0 Hybrid', mileage: '45,000 km', location: 'Dublin', price: 38500, monthly: 650, photos: 20, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', trusted: true },
    { id: 2, spotlight: false, sellerType: 'Private Seller', sellerRating: 4.2, title: 'Volvo S90', year: 2019, fuel: '2.0 Petrol', mileage: '62,500 km', location: 'Cork', price: 32000, monthly: 540, photos: 15, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80', trusted: false },
    { id: 3, spotlight: true, sellerType: 'Dealership', sellerRating: 4.7, dealerName: 'AutoVision Limerick', title: 'Volvo V90', year: 2021, fuel: '2.0 TDI', mileage: '38,200 km', location: 'Limerick', price: 41900, monthly: 710, photos: 22, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80', trusted: true },
  ],
  'mercedes-benz': [
    { id: 1, spotlight: true, sellerType: 'Dealership', sellerRating: 4.8, dealerName: 'Mercedes Centre', title: 'Mercedes-Benz C-Class', year: 2021, fuel: '2.0 Petrol', mileage: '25,000 km', location: 'Dublin', price: 48000, monthly: 815, photos: 23, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', trusted: true },
  ],
  'ford': [
    { id: 1, spotlight: false, sellerType: 'Private Seller', sellerRating: 4.0, title: 'Ford Focus', year: 2019, fuel: '1.5 Diesel', mileage: '78,000 km', location: 'Galway', price: 12500, monthly: 212, photos: 10, image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80', trusted: false },
  ],
  'toyota': [
    { id: 1, spotlight: true, sellerType: 'Trusted Independent Dealership', sellerRating: 4.6, dealerName: 'Toyota Centre', title: 'Toyota Corolla', year: 2020, fuel: '1.8 Hybrid', mileage: '42,000 km', location: 'Dublin', price: 22500, monthly: 380, photos: 18, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', trusted: true },
  ],
  'volkswagen': [
    { id: 1, spotlight: false, sellerType: 'Private Seller', sellerRating: 4.2, title: 'Volkswagen Golf', year: 2018, fuel: '1.6 TDI', mileage: '88,500 km', location: 'Cork', price: 14900, monthly: 250, photos: 9, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80', trusted: false },
  ],
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
      ))}
    </div>
  );
}

export default function CarsByMake() {
  const { make } = useParams();
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);

  const makeDisplay = make?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Cars';
  const listings = carsByMake[make] || [
    { id: 1, spotlight: true, sellerType: 'Dealership', sellerRating: 4.5, dealerName: 'Premier Motors', title: `${makeDisplay} Model`, year: 2021, fuel: '2.0 Petrol', mileage: '35,000 km', location: 'Dublin', price: 28900, monthly: 490, photos: 18, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', trusted: true },
  ];

  const toggleSave = (id) => setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const filtered = listings.filter(c =>
    !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase())
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
          <span className="text-foreground font-medium">{makeDisplay}</span>
        </div>

        {/* Title + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{makeDisplay} Cars For Sale</h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`Search ${makeDisplay}`}
              className="w-full border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
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
              <p className="text-sm text-foreground font-medium"><span className="font-bold">{filtered.length}</span> {makeDisplay} cars in Ireland</p>
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

            <div className="flex flex-col gap-4">
              {filtered.map(car => (
                <div key={car.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {car.dealerName ? (
                    <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-secondary/30">
                      <img src={car.dealerLogo || 'https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?w=80&q=80'} alt={car.dealerName} className="w-8 h-8 rounded object-cover" />
                      <span className="text-sm font-semibold text-foreground">{car.dealerName}</span>
                      {car.trusted && <span className="ml-auto text-xs text-green-700 font-medium flex items-center gap-1"><span className="text-green-600">✓</span> Trusted <StarRating rating={car.sellerRating} /></span>}
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