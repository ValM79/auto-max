import React from 'react';
import { Star, MapPin, Car } from 'lucide-react';

const dealer = {
  name: 'Premier Motors Dublin',
  logo: 'https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?w=80&q=80',
  rating: 4.8,
  reviews: 312,
  location: 'Dublin City Centre',
  stock: 84,
  description: 'Ireland\'s most trusted dealership for premium used cars. All vehicles CARTELL checked.',
};

export default function FeaturedDealer() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Featured Dealer</h2>
      <div className="bg-white rounded-xl border border-border shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6">
        <img src={dealer.logo} alt={dealer.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary mb-1">{dealer.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            {[1,2,3,4,5].map(s => (
              <Star key={s} className={`w-4 h-4 ${s <= Math.round(dealer.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
            ))}
            <span className="text-sm font-semibold">{dealer.rating}</span>
            <span className="text-sm text-muted-foreground">({dealer.reviews} reviews)</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{dealer.description}</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{dealer.location}</span>
            <span className="flex items-center gap-1"><Car className="w-4 h-4" />{dealer.stock} in stock</span>
          </div>
        </div>
        <button className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm flex-shrink-0">
          View Dealership
        </button>
      </div>
    </div>
  );
}