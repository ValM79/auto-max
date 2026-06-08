import React, { useState } from 'react';
import { Car, Truck, Bike, Sailboat, ChevronLeft, ChevronRight } from 'lucide-react';

const hubs = [
  { label: 'Cars', icon: Car, image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80' },
  { label: 'Trucks & Vans', icon: Truck, image: 'https://images.unsplash.com/photo-1586191180000-5df15b3eef4a?w=400&q=80' },
  { label: 'Motorbikes', icon: Bike, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { label: 'Boats', icon: Sailboat, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' },
];

export default function HubsSection() {
  const [start, setStart] = useState(0);
  const visible = hubs.slice(start, start + 3);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-foreground">AutoMax Hubs</h2>
        <div className="flex gap-2">
          <button onClick={() => setStart(Math.max(0, start - 1))} className="p-2 border border-border rounded-full hover:bg-secondary transition-colors" disabled={start === 0}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => setStart(Math.min(hubs.length - 3, start + 1))} className="p-2 border border-border rounded-full hover:bg-secondary transition-colors" disabled={start >= hubs.length - 3}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {visible.map((hub) => (
          <div key={hub.label} className="relative rounded-xl overflow-hidden cursor-pointer group h-40">
            <img src={hub.image} alt={hub.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
              <hub.icon className="w-7 h-7 text-white" />
              <span className="text-white font-bold text-sm">{hub.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}