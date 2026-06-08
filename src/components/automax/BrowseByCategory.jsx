import React from 'react';
import { useNavigate } from 'react-router-dom';

const categoryImages = {
  'Cars': 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=80&q=80',
  'New Cars': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=80&q=80',
  'Commercials': 'https://images.unsplash.com/photo-1586191180000-5df15b3eef4a?w=80&q=80',
  'Motorbikes': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80',
  'Trucks': 'https://images.unsplash.com/photo-1533473359331-0ac8cc627c34?w=80&q=80',
  'Boats': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=80&q=80',
  'Campers': 'https://images.unsplash.com/photo-1527519335468-447f819ea228?w=80&q=80',
  'Caravans': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=80&q=80',
  'Quads': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80',
};

const categories = [
  [
    { label: 'New Cars', route: '/new-cars' },
    { label: 'Cars', route: '/cars-for-sale' },
    { label: 'Cars from Dealerships', route: '/dealership-cars' },
    { label: 'Vintage Cars', route: '/vintage-cars' },
    { label: 'Modified Cars', route: '/modified-cars' },
    { label: 'Car Parts', route: '/car-parts' },
    { label: 'Car Extras', route: '/car-extras' },
    { label: 'Rally Cars', route: '/rally-cars' },
    { label: 'Breaking & Repairables', route: '/breaking-repairables' },
  ],
  [
    { label: 'Trucks', route: '/trucks' },
    { label: 'Commercials', route: '/commercials' },
    { label: 'Trailers', route: '/trailers' },
    { label: 'Campers', route: '/campers' },
    { label: 'Coaches & Buses', route: '/coaches-buses' },
    { label: 'Plant Machinery', route: '/plant-machinery' },
    { label: 'Motorbike Extras', route: '/motorbike-extras' },
    { label: 'Caravans', route: '/caravans' },
    { label: 'Bikes & Bicycles', route: '/bikes-bicycles' },
  ],
  [
    { label: 'Motorbikes', route: '/motorbikes' },
    { label: 'Vintage Bikes', route: '/vintage-bikes' },
    { label: 'Scooters', route: '/scooters' },
    { label: 'Quads', route: '/quads' },
    { label: 'Boats & Jet Skis', route: '/boats' },
    { label: 'Boat Extras', route: '/boat-extras' },
    { label: 'Other', route: '/other-motor' },
  ],
];

export default function BrowseByCategory() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-foreground mb-5">Browse by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1">
            {col.map((cat) => (
              <button
                key={cat.label}
                onClick={() => navigate(cat.route)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left group"
              >
                {categoryImages[cat.label] ? (
                  <img src={categoryImages[cat.label]} alt={cat.label} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs font-bold">{cat.label.charAt(0)}</span>
                  </div>
                )}
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{cat.label}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}