import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PromoBanner from '../components/automarket/PromoBanner';
import { Search, ChevronDown, ArrowLeft } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import FiltersSidebar from '../components/automarket/FiltersSidebar';
import ListingCard from '../components/automarket/ListingCard';
import Pagination from '../components/automarket/Pagination';

const ITEMS_PER_PAGE = 10;


const listings = [
{
  id: 1,
  dealer: 'Orangeworks Automotive',
  dealerLogo: 'https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?w=50&q=80',
  dealerType: 'Franchise Dealership',
  dealerRating: null,
  ratingLabel: 'No rating',
  spotlight: true,
  title: 'INEOS Grenadier 2-Seat Commercial (N1)',
  year: 2026,
  engine: '3.0 Diesel',
  mileage: '0 km',
  location: 'Kildare',
  price: '€59,995',
  badge: 'Warranty',
  photos: 10,
  images: [
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&q=80',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=120&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80']

},
{
  id: 2,
  dealer: 'Dublin City Motors',
  dealerLogo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=50&q=80',
  dealerType: 'Franchise Dealership',
  dealerRating: 4.7,
  ratingLabel: '4.7',
  spotlight: false,
  title: 'Toyota Corolla 1.8 Hybrid GR Sport',
  year: 2026,
  engine: '1.8 Hybrid',
  mileage: '0 km',
  location: 'Dublin',
  price: '€36,500',
  badge: 'New',
  photos: 8,
  images: [
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&q=80',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=120&q=80',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=120&q=80']

},
{
  id: 3,
  dealer: 'Cork Premium Cars',
  dealerLogo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=50&q=80',
  dealerType: 'Trusted Dealer',
  dealerRating: 4.9,
  ratingLabel: '4.9',
  spotlight: false,
  title: 'Volkswagen Golf 8 R-Line 2.0 TDI',
  year: 2025,
  engine: '2.0 TDI',
  mileage: '0 km',
  location: 'Cork',
  price: '€42,200',
  badge: null,
  photos: 12,
  images: [
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500&q=80',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=120&q=80',
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=120&q=80']

},
{
  id: 4,
  dealer: 'Galway Motor Park',
  dealerLogo: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=50&q=80',
  dealerType: 'Dealership',
  dealerRating: 4.3,
  ratingLabel: '4.3',
  spotlight: false,
  title: 'BMW 3 Series 320d M Sport Auto',
  year: 2025,
  engine: '2.0 Diesel',
  mileage: '0 km',
  location: 'Galway',
  price: '€55,750',
  badge: 'Warranty',
  photos: 15,
  images: [
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=120&q=80',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=120&q=80']

},
{
  id: 5,
  dealer: 'Limerick Auto Centre',
  dealerLogo: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=50&q=80',
  dealerType: 'Franchise Dealership',
  dealerRating: 4.5,
  ratingLabel: '4.5',
  spotlight: false,
  title: 'Hyundai Tucson 1.6 T-GDi Hybrid Premium',
  year: 2026,
  engine: '1.6 Hybrid',
  mileage: '0 km',
  location: 'Limerick',
  price: '€44,995',
  badge: 'New',
  photos: 9,
  images: [
  'https://images.unsplash.com/photo-1617469767698-a49e33d0bc2e?w=500&q=80',
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=120&q=80',
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=120&q=80']

}];



export default function NewCars() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ vehicles: [] });
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSaved = (id) => setSavedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const activeVehicles = (activeFilters.vehicles || []).filter(v => v.make);

  const matchesSearch = (l) => !search || l.title.toLowerCase().includes(search.toLowerCase());
  const matchesVehicle = (l, v) => {
    const makeMatch = !v.make || l.title.toLowerCase().includes(v.make.toLowerCase());
    const modelMatch = !v.model || l.title.toLowerCase().includes(v.model.toLowerCase());
    return makeMatch && modelMatch;
  };

  const allFiltered = activeVehicles.length > 0
    ? listings.filter(l => matchesSearch(l) && activeVehicles.some(v => matchesVehicle(l, v)))
    : listings.filter(matchesSearch);

  const totalPages = Math.ceil(allFiltered.length / ITEMS_PER_PAGE);
  const paginated = allFiltered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const groups = activeVehicles.length > 0
    ? activeVehicles.map(v => ({
        label: [v.make, v.model].filter(Boolean).join(' '),
        listings: paginated.filter(l => matchesVehicle(l, v)),
      }))
    : [{ label: null, listings: paginated }];

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
          <span className="text-foreground font-medium">New Cars</span>
        </div>

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-foreground mb-3">All Cars For Sale</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search Cars"
              className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none border-0 outline-none" />
          </div>
        </div>

        <PromoBanner image="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/b29eb1163_generated_image.png" />

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0 self-start sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <FiltersSidebar onFilterChange={setActiveFilters} />
          </aside>

          {/* Listings */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{allFiltered.length.toLocaleString()}</span> cars in Ireland
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Sort by: <span className="font-semibold text-foreground">Best match</span>
                <ChevronDown className="w-4 h-4" />
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
                    {group.listings.map((listing) => (
                      <ListingCard
                        key={listing.id}
                        item={{
                          ...listing,
                          dealer: listing.dealer,
                          dealerLogo: listing.dealerLogo,
                          image: listing.images[0],
                          images: [],
                          sellerType: listing.dealerType,
                          sellerRating: listing.dealerRating,
                        }}
                        saved={savedIds.includes(listing.id)}
                        onToggleSave={toggleSaved}
                        viewMode="list"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>);

}