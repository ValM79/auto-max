import React from 'react';
import { Link } from 'react-router-dom';

const makes = [
  { name: 'Toyota', count: '8,234' },
  { name: 'Ford', count: '7,891' },
  { name: 'Volkswagen', count: '6,543' },
  { name: 'BMW', count: '5,432' },
  { name: 'Audi', count: '4,876' },
  { name: 'Hyundai', count: '4,321' },
  { name: 'Nissan', count: '3,987' },
  { name: 'Skoda', count: '3,654' },
  { name: 'Renault', count: '3,210' },
  { name: 'Opel', count: '2,987' },
  { name: 'Peugeot', count: '2,765' },
  { name: 'Mercedes-Benz', count: '2,543' },
];

export default function PopularMakes() {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4">
      <h2 className="text-xl font-bold text-foreground mb-4">Browse by Make</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {makes.map((make) => (
          <Link
            key={make.name}
            to={`/cars-by-make/${make.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex flex-col items-center justify-center border border-border rounded-xl p-3 hover:bg-secondary transition-colors text-center"
          >
            <span className="text-sm font-semibold text-foreground">{make.name}</span>
            <span className="text-xs text-muted-foreground">{make.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}