import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Camera, ChevronDown, ChevronUp, Star, SlidersHorizontal, LayoutList, LayoutGrid, ArrowLeft } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';

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

const makes = ['All Makes', 'Audi', 'BMW', 'Ford', 'Hyundai', 'Nissan', 'Renault', 'Toyota', 'Volkswagen'];
const years = ['Any Year', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014 & older'];
const prices = ['Any Price', 'Under €5,000', '€5,000–€10,000', '€10,000–€20,000', '€20,000–€40,000', '€40,000+'];
const counties = ['All Counties', 'Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kerry', 'Wexford', 'Wicklow'];

function FilterSelect({ label, options }) {
  return (
    <div className="relative">
      <select className="w-full appearance-none border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 pr-8">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
    </div>
  );
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border py-4">
      <button onClick={() => setOpen(v => !v)} className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-2">
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && children}
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
      ))}
    </div>
  );
}

export default function CarsForSale() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);

  const toggleSave = (id) => setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const filtered = carListings.filter(c =>
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
          <span className="text-foreground font-medium">New Cars</span>
        </div>

        {/* Title + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">New & Used Cars For Sale</h1>
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

        {/* Banner */}
        <div className="mb-6 rounded-xl overflow-hidden h-32 bg-orange-500 flex items-center justify-between px-8">
          <div className="text-white">
            <p className="text-xs font-semibold uppercase tracking-wider mb-1">Members</p>
            <p className="text-3xl font-extrabold leading-tight">FLEXIBLE<br />MORTGAGE</p>
          </div>
          <img src="https://images.unsplash.com/photo-1560472355-536de3962603?w=300&q=80" alt="Banner" className="h-full object-cover rounded-lg opacity-80" />
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-border p-4 shadow-sm mb-4">
              <button className="flex items-center gap-2 w-full text-sm text-foreground border border-border rounded-lg px-4 py-2.5 hover:bg-secondary transition-colors mb-4">
                <Star className="w-4 h-4 text-muted-foreground" /> Save Search
              </button>

              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-foreground">Filters</h3>
                <button className="text-xs text-primary hover:underline">Reset All</button>
              </div>

              <button className="flex items-center gap-2 w-full text-sm text-muted-foreground border border-border rounded-lg px-4 py-2.5 hover:bg-secondary transition-colors mb-4">
                <Search className="w-4 h-4" /> View your previous searches
              </button>

              <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" id="trusted" className="w-4 h-4 accent-primary" />
                <label htmlFor="trusted" className="text-sm text-foreground flex items-center gap-1.5 cursor-pointer">
                  <span className="text-green-600">✓</span> Trusted dealers only <span className="text-muted-foreground">(33,485)</span>
                </label>
              </div>

              <FilterSection title="Seller type">
                <div className="flex flex-col gap-2">
                  {[['Dealership', '72,285'], ['Private seller', '23,082']].map(([label, count]) => (
                    <label key={label} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-primary" />
                      <span className="text-sm text-foreground">{label} <span className="text-muted-foreground">({count})</span></span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Make">
                <FilterSelect options={makes} />
              </FilterSection>

              <FilterSection title="Year">
                <div className="grid grid-cols-2 gap-2">
                  <FilterSelect options={['From', ...years.slice(1)]} />
                  <FilterSelect options={['To', ...years.slice(1)]} />
                </div>
              </FilterSection>

              <FilterSection title="Price">
                <div className="grid grid-cols-2 gap-2">
                  <FilterSelect options={['Min', '€5,000', '€10,000', '€20,000', '€30,000', '€50,000']} />
                  <FilterSelect options={['Max', '€10,000', '€20,000', '€30,000', '€50,000', '€100,000']} />
                </div>
              </FilterSection>

              <FilterSection title="County">
                <FilterSelect options={counties} />
              </FilterSection>
            </div>
          </aside>

          {/* Listings */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-foreground font-medium"><span className="font-bold">95,367</span> cars in Ireland</p>
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
                      {car.trusted && <span className="ml-auto text-xs text-green-700 font-medium flex items-center gap-1"><span className="text-green-600">✓</span> Trusted Independent Dealership <StarRating rating={car.sellerRating} /></span>}
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