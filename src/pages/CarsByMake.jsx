import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, ChevronDown, ArrowLeft } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import FiltersSidebar from '../components/automarket/FiltersSidebar';
import ListingCard from '../components/automarket/ListingCard';
import Pagination from '../components/automarket/Pagination';

const ITEMS_PER_PAGE = 10;

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

export default function CarsByMake() {
  const { make } = useParams();
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const makeDisplay = make?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Cars';
  const listings = carsByMake[make] || [
    { id: 1, spotlight: true, sellerType: 'Dealership', sellerRating: 4.5, dealerName: 'Premier Motors', title: `${makeDisplay} Model`, year: 2021, fuel: '2.0 Petrol', mileage: '35,000 km', location: 'Dublin', price: 28900, monthly: 490, photos: 18, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', trusted: true },
  ];

  const toggleSave = (id) => setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const allFiltered = listings.filter(c =>
    !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(allFiltered.length / ITEMS_PER_PAGE);
  const filtered = allFiltered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const handlePageChange = (page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span>›</span>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-foreground font-medium">{makeDisplay}</span>
        </div>

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-foreground mb-3">{makeDisplay} Cars For Sale</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder={`Search ${makeDisplay}`}
              className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none border-0 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-80 flex-shrink-0 self-start sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <FiltersSidebar />
          </aside>

          {/* Listings */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{allFiltered.length.toLocaleString()}</span> {makeDisplay} cars in Ireland
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Sort by: <span className="font-semibold text-foreground">Best match</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {filtered.map(car => (
                <ListingCard
                  key={car.id}
                  item={{
                    ...car,
                    image: car.image,
                    images: [],
                    dealer: car.dealerName,
                    price: `€${car.price.toLocaleString()}`,
                    monthly: car.monthly,
                    engine: car.fuel,
                  }}
                  saved={savedIds.includes(car.id)}
                  onToggleSave={toggleSave}
                  viewMode="list"
                />
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}