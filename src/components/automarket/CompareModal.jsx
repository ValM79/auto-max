import React from 'react';
import { X, Check, Minus } from 'lucide-react';

const SPECS = [
  { label: 'Price', key: 'price' },
  { label: 'Year', key: 'year' },
  { label: 'Mileage', key: 'km' },
  { label: 'Fuel Type', key: 'fuel' },
  { label: 'Transmission', key: 'transmission' },
  { label: 'Body Type', key: 'bodyType' },
  { label: 'Engine', key: 'engine' },
  { label: 'Colour', key: 'color' },
  { label: 'Owners', key: 'owners' },
  { label: 'NCT Expiry', key: 'nct' },
];

export default function CompareModal({ cars, onClose }) {
  if (!cars || cars.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-5xl mt-8 mb-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Car Comparison</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="grid border-b border-border" style={{ gridTemplateColumns: `200px repeat(${cars.length}, 1fr)` }}>
          <div className="p-4 bg-secondary/50" />
          {cars.map((car) => (
            <div key={car.id} className="p-4 text-center border-l border-border">
              <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              </div>
              <p className="font-bold text-foreground text-sm leading-tight">{car.year} {car.name}</p>
              <p className="text-primary font-bold text-lg mt-1">{car.price}</p>
            </div>
          ))}
        </div>

        {SPECS.map((spec, i) => (
          <div
            key={spec.key}
            className="grid border-b border-border last:border-0"
            style={{ gridTemplateColumns: `200px repeat(${cars.length}, 1fr)` }}
          >
            <div className={`px-5 py-3.5 flex items-center text-sm font-semibold text-muted-foreground ${i % 2 === 0 ? 'bg-secondary/30' : ''}`}>
              {spec.label}
            </div>
            {cars.map((car) => {
              const val = car[spec.key];
              const isHighlight = spec.key === 'price'
                ? val === cars.reduce((best, c) => {
                    const n = parseFloat(c.price.replace(/[^0-9.]/g, ''));
                    const bn = parseFloat(best.replace(/[^0-9.]/g, ''));
                    return n < bn ? c.price : best;
                  }, cars[0].price)
                : false;

              return (
                <div
                  key={car.id}
                  className={`px-5 py-3.5 text-sm border-l border-border flex items-center ${i % 2 === 0 ? 'bg-secondary/30' : ''} ${isHighlight ? 'text-accent font-bold' : 'text-foreground'}`}
                >
                  {val || <Minus className="w-4 h-4 text-muted-foreground" />}
                  {isHighlight && <Check className="w-3.5 h-3.5 ml-1.5 text-accent" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}