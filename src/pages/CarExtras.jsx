import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ArrowLeft } from 'lucide-react';
import ListingCard from '../components/automarket/ListingCard';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import FiltersSidebar from '../components/automarket/FiltersSidebar';

const listings = [
{
  id: 1,
  dealer: 'CM Wheels Ltd',
  dealerLogo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=80&q=80',
  sellerType: 'Independent Dealership',
  sellerRating: null,
  spotlight: true,
  title: '17" Alloy VW POLO SEAT IBIZA AUDI A1 FABIA…',
  description: 'Set of 4 alloy wheels, 17 inch, 5x100 PCD. Fit VW Polo, Seat Ibiza, Audi A1, Skoda Fabia. Free nationwide delivery.',
  hoursAgo: '11 days',
  location: 'Dungannon, Tyrone',
  category: 'Alloys & Wheels',
  price: '£430',
  photos: 9,
  image: 'https://images.unsplash.com/photo-1558618047-f4e90b0a0d0f?w=600&q=80'
},
{
  id: 2,
  dealer: null,
  dealerLogo: null,
  sellerType: 'Private Seller',
  sellerRating: null,
  spotlight: true,
  title: 'Brand New Continental ContiSportContact 5 Tyres – 225/45 R17',
  description: 'Set of 2 brand new Continental tyres, never fitted. 225/45 R17 91W. Great grip, perfect for performance cars.',
  hoursAgo: '2 days',
  location: 'Dublin',
  category: 'Tyres',
  price: '€220',
  photos: 3,
  image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&q=80'
},
{
  id: 3,
  dealer: 'Accessories Auto Ireland',
  dealerLogo: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=80&q=80',
  sellerType: 'Independent Dealership',
  sellerRating: 4.6,
  spotlight: false,
  title: 'Universal Roof Rack Cross Bars – Silver Aluminium',
  description: 'Aluminium roof rack bars, adjustable fit. Suitable for most hatchbacks and saloons. Load rating 75kg.',
  hoursAgo: '3 days',
  location: 'Cork',
  category: 'Car Accessories',
  price: '€85',
  photos: 5,
  image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80'
},
{
  id: 4,
  dealer: null,
  dealerLogo: null,
  sellerType: 'Private Seller',
  sellerRating: 4.1,
  spotlight: false,
  title: 'Thule Roof Box 430L – Black Aeroskin',
  description: 'Thule Motion XT XL roofbox, 430 litre capacity. Used twice, excellent condition. Fits most roof racks.',
  hoursAgo: '1 week',
  location: 'Galway',
  category: 'Car Accessories',
  price: '€350',
  photos: 7,
  image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80'
},
{
  id: 5,
  dealer: 'PerfomanceParts IE',
  dealerLogo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=80&q=80',
  sellerType: 'Independent Dealership',
  sellerRating: 4.8,
  spotlight: false,
  title: 'Universal Carbon Fibre Rear Spoiler – Hatchback',
  description: 'High quality carbon fibre rear spoiler, universal fit for hatchback. Easy fitment with included hardware.',
  hoursAgo: '5 days',
  location: 'Limerick',
  category: 'Styling & Exterior',
  price: '€149',
  photos: 6,
  image: 'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=600&q=80'
},
{
  id: 6,
  dealer: null,
  dealerLogo: null,
  sellerType: 'Private Seller',
  sellerRating: 3.9,
  spotlight: false,
  title: 'Dash Cam Front & Rear – Nextbase 522GW',
  description: 'Nextbase 522GW dual dashcam, front and rear. Alexa built-in, 1080p rear. Includes all mounts and cables.',
  hoursAgo: '4 days',
  location: 'Waterford',
  category: 'Electronics',
  price: '€110',
  photos: 4,
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
}];


const subsections = [
{ label: 'Car Extras', count: 8146 },
{ label: 'Alloys & Wheels', count: 5161 },
{ label: 'Tyres', count: 219 },
{ label: 'Car Accessories', count: 2766 },
{ label: 'Styling & Exterior', count: 312 },
{ label: 'Electronics', count: 488 }];




export default function CarExtras() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [activeSubsection, setActiveSubsection] = useState('Car Extras');

  const toggleSave = (id) => setSavedIds((prev) =>
  prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  );

  const filtered = listings.filter((c) => {
    const matchesSearch = !search ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase());
    const matchesSection = activeSubsection === 'Car Extras' || c.category === activeSubsection;
    return matchesSearch && matchesSection;
  });

  return (
    <div className="min-h-screen bg-background">
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
          <span className="text-foreground font-medium">Car Extras</span>
        </div>

        {/* Title + Search */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-foreground mb-3">Car Extras</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Car Extras"
              className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none border-0 outline-none" />
          </div>
        </div>

        {/* Banner */}
        <div className="mb-6 rounded-xl overflow-hidden border border-border h-36 sm:h-44">
          <img
            src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/86d0dd29e_generated_image.png"
            alt="Car Extras Banner"
            className="w-full h-full object-cover" />
          
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 self-start sticky top-4">
            {/* Section filter */}
            <div className="bg-white rounded-xl p-4 mb-4 text-sm">
              <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Section</p>
              <button className="flex items-center gap-1 text-primary text-sm mb-3 hover:underline">
                <ArrowLeft className="w-3.5 h-3.5" /> Cars &amp; Motor
              </button>
              <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Subsections</p>
              <div className="flex flex-col gap-1">
                {subsections.map((sub) =>
                <button
                  key={sub.label}
                  onClick={() => setActiveSubsection(sub.label)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeSubsection === sub.label ?
                  'border border-foreground bg-white font-semibold text-foreground' :
                  'text-muted-foreground hover:bg-secondary'}`
                  }>
                  
                    <span>{sub.label}</span>
                    <span className="text-muted-foreground text-xs">{sub.count.toLocaleString()}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filters sidebar */}
            <div className="max-h-[calc(100vh-2rem)] overflow-y-auto">
              <FiltersSidebar />
            </div>
          </aside>

          {/* Listings */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length.toLocaleString()}</span> ads for Car Extras in Ireland
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Sort by: <span className="font-semibold text-foreground">Best match</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {filtered.map((item) =>
              <ListingCard
                key={item.id}
                item={{ ...item, timeAgo: item.hoursAgo }}
                saved={savedIds.includes(item.id)}
                onToggleSave={toggleSave}
                viewMode="list" />

              )}

              {filtered.length === 0 &&
              <div className="text-center py-16 text-muted-foreground col-span-2">
                  <p className="text-lg font-medium">No car extras found</p>
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