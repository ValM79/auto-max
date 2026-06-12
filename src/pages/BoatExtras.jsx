import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ArrowLeft } from 'lucide-react';
import ListingCard from '../components/automarket/ListingCard';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import SimpleFiltersSidebar from '../components/automarket/SimpleFiltersSidebar';
import Pagination from '../components/automarket/Pagination';

const ITEMS_PER_PAGE = 10;

const listings = [
{
  id: 1,
  sellerType: 'Private Seller',
  sellerRating: 4.8,
  spotlight: true,
  title: 'Garmin Fish Finder 800 – GPS Chartplotter',
  type: 'Electronics',
  timeAgo: '2 days',
  location: 'Dublin, Dublin',
  price: '€350',
  photos: 8,
  image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80'
},
{
  id: 2,
  sellerType: 'Dealership',
  sellerRating: 4.9,
  spotlight: true,
  title: 'Yamaha 4-Stroke Outboard Motor 200hp',
  type: 'Engine',
  timeAgo: '4 days',
  location: 'Cork, Cork',
  price: '€8,500',
  photos: 10,
  image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80'
},
{
  id: 3,
  sellerType: 'Private Seller',
  sellerRating: 4.5,
  spotlight: false,
  title: 'Marine Grade Anchor with Chain – 45kg',
  type: 'Accessories',
  timeAgo: '1 week',
  location: 'Galway, Galway',
  price: '€280',
  photos: 6,
  image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80'
},
{
  id: 4,
  sellerType: 'Trader',
  sellerRating: 4.6,
  spotlight: false,
  title: 'Custom Life Jackets Set (4 pieces)',
  type: 'Safety',
  timeAgo: '3 days',
  location: 'Limerick, Limerick',
  price: '€420',
  photos: 7,
  image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80'
}];


export default function BoatExtras() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      const itemToSave = listings.find((item) => item.id === id);
      if (itemToSave && !prev.includes(id)) {
        const saved = JSON.parse(localStorage.getItem('automarket_saved_items') || '[]');
        saved.push({ ...itemToSave, savedAt: new Date().toISOString() });
        localStorage.setItem('automarket_saved_items', JSON.stringify(saved));
      } else if (prev.includes(id)) {
        const saved = JSON.parse(localStorage.getItem('automarket_saved_items') || '[]');
        const updated2 = saved.filter((item) => item.id !== id);
        localStorage.setItem('automarket_saved_items', JSON.stringify(updated2));
      }
      return updated;
    });
  };

  const allFiltered = listings.filter((item) =>
  !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.location.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(allFiltered.length / ITEMS_PER_PAGE);
  const filtered = allFiltered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const handlePageChange = (page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span>›</span>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-foreground font-medium">Boat Extras</span>
        </div>
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-foreground mb-3">Boat Extras</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Boat Extras" className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none border-0 outline-none" />
          </div>
        </div>
        <div className="mb-6 rounded-xl overflow-hidden border border-border h-36 sm:h-44">
          <img src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/5687cde59_generated_image.png" alt="Boat Extras Banner" className="w-full h-full object-cover" />
        </div>
        <div className="flex gap-6">
          <aside className="hidden lg:block w-80 flex-shrink-0 self-start sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <SimpleFiltersSidebar />
          </aside>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{filtered.length.toLocaleString()}</span> ads for Boat Extras in Ireland</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Sort by: <span className="font-semibold text-foreground">Best match</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {filtered.map((item) =>
              <ListingCard key={item.id} item={item} saved={savedIds.includes(item.id)} onToggleSave={toggleSave} viewMode="list" />
              )}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
      <Footer />
    </div>);

}