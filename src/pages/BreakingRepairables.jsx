import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Camera, ChevronDown, Star, LayoutList, LayoutGrid, ArrowLeft } from 'lucide-react';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';
import SimpleFiltersSidebar from '../components/automarket/SimpleFiltersSidebar';

const listings = [
{
  id: 1,
  dealer: null,
  sellerType: 'Private Seller',
  sellerRating: 2.4,
  spotlight: true,
  title: '2014 Nissan Qashqai 1.5 dci',
  description: 'Engine damage, gearbox issues. Excellent parts car. Mot until May 2025.',
  timeAgo: '1 day',
  location: 'Dublin',
  price: '€2,500',
  originalPrice: '€2,850',
  photos: 7,
  image: 'https://images.unsplash.com/photo-1558618047-f4e90b0a0d0f?w=600&q=80'
},
{
  id: 2,
  dealer: null,
  sellerType: 'Private Seller',
  sellerRating: null,
  spotlight: true,
  title: '740d msport (LWB) + 151 mondeo auto sport',
  description: 'Both for breaking. Full mechanical specs available. Parts in high demand.',
  timeAgo: '1 day',
  location: 'Carlow',
  price: '€1,800',
  photos: 9,
  image: 'https://images.unsplash.com/photo-1550617931-7ee4d3190498?w=600&q=80'
},
{
  id: 3,
  dealer: null,
  sellerType: 'Private Seller',
  sellerRating: 3.8,
  spotlight: false,
  title: '2018 Ford Focus – Cat D Salvage',
  description: 'Frame damage, engine runs well. Ideal for parts or repair. Clear history.',
  timeAgo: '2 days',
  location: 'Cork City, Cork',
  price: '€3,200',
  photos: 11,
  image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80'
},
{
  id: 4,
  dealer: null,
  sellerType: 'Private Seller',
  sellerRating: null,
  spotlight: false,
  title: '2010 Peugeot 308 – Engine Rebuild',
  description: 'Seized engine, excellent body and interior. Good for breaking.',
  timeAgo: '3 days',
  location: 'Galway City, Galway',
  price: '€1,500',
  photos: 8,
  image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80'
},
{
  id: 5,
  dealer: null,
  sellerType: 'Private Seller',
  sellerRating: 4.1,
  spotlight: false,
  title: '2015 Volkswagen Golf – Water Damaged',
  description: 'Flood damage, engine not tested. Gearbox and interior parts good.',
  timeAgo: '4 days',
  location: 'Limerick City, Limerick',
  price: '€2,100',
  photos: 10,
  image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80'
},
{
  id: 6,
  dealer: null,
  sellerType: 'Private Seller',
  sellerRating: null,
  spotlight: false,
  title: '2012 BMW 3 Series – Accident Damage',
  description: 'Front end collision, engine and transmission intact. Parts available.',
  timeAgo: '5 days',
  location: 'Waterford City, Waterford',
  price: '€2,400',
  photos: 12,
  image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=600&q=80'
}];


function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) =>
      <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
      )}
    </div>);

}

export default function BreakingRepairables() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [viewMode, setViewMode] = useState('list');

  const toggleSave = (id) => setSavedIds((prev) =>
  prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  );

  const filtered = listings.filter((c) =>
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
          <span className="text-foreground font-medium">Breaking & Repairables</span>
        </div>

        {/* Title + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Breaking & Repairables in Ireland</h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Breaking & Repairables"
              className="w-full border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30" />
            
          </div>
        </div>

        {/* Banner */}
        <div className="mb-6 rounded-xl overflow-hidden border border-border h-36 sm:h-44">
          <img
            src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/a6206e6da_generated_image.png"
            alt="Breaking & Repairables Banner"
            className="w-full h-full object-cover" />
          
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
                <span className="font-bold">7,734</span> ads for Breaking & Repairables in Ireland
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
              {filtered.map((item) =>
              <div key={item.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className={viewMode === 'grid' ? 'flex flex-col' : 'flex flex-col sm:flex-row'}>
                    <div className={`relative flex-shrink-0 ${viewMode === 'grid' ? 'h-44 w-full' : 'sm:w-56 h-44 sm:h-auto'}`}>
                      {item.spotlight &&
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-0.5 rounded z-10">Spotlight</span>
                    }
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                        <Camera className="w-3 h-3" /> {item.photos}
                      </div>
                    </div>

                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs text-muted-foreground">{item.sellerType}</span>
                          {item.sellerRating ?
                        <>
                              <StarRating rating={item.sellerRating} />
                              <span className="text-xs text-muted-foreground">{item.sellerRating}</span>
                            </> :

                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Star className="w-3 h-3 text-gray-300 fill-gray-300" /> No rating
                            </span>
                        }
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-1 hover:text-primary cursor-pointer transition-colors">{item.title}</h3>
                        {item.description &&
                      <p className="text-sm text-muted-foreground mb-1 line-clamp-2">{item.description}</p>
                      }
                        <p className="text-sm text-muted-foreground">{item.timeAgo} · {item.location}</p>
                      </div>
                      <div className="flex items-end justify-between mt-4">
                        <div>
                          {item.originalPrice &&
                        <p className="text-xs text-muted-foreground line-through">{item.originalPrice}</p>
                        }
                          <p className="text-2xl font-bold text-foreground">{item.price}</p>
                        </div>
                        <button
                        onClick={() => toggleSave(item.id)}
                        className={`p-2 rounded-full border transition-colors ${savedIds.includes(item.id) ? 'border-destructive text-destructive' : 'border-border text-muted-foreground hover:text-destructive hover:border-destructive'}`}>
                          <Heart className={`w-5 h-5 ${savedIds.includes(item.id) ? 'fill-destructive' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {filtered.length === 0 &&
              <div className="text-center py-16 text-muted-foreground col-span-2">
                  <p className="text-lg font-medium">No breaking & repairables found</p>
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