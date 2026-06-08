import React from 'react';
import { Link } from 'react-router-dom';

const carMakes = [
  { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/40px-Toyota_carlogo.svg.png' },
  { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/40px-Ford_logo_flat.svg.png' },
  { name: 'Volkswagen', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/40px-Volkswagen_logo_2019.svg.png' },
  { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/40px-BMW.svg.png' },
  { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/80px-Audi-Logo_2016.svg.png' },
  { name: 'Mercedes-Benz', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/40px-Mercedes-Logo.svg.png' },
  { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Hyundai_Motor_Company_logo.svg/80px-Hyundai_Motor_Company_logo.svg.png' },
  { name: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_logo.svg/80px-Nissan_logo.svg.png' },
  { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/40px-Honda.svg.png' },
  { name: 'Renault', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Renault_2021_Text.svg/80px-Renault_2021_Text.svg.png' },
  { name: 'Skoda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/SKODA_LOGO_BLACK.svg/80px-SKODA_LOGO_BLACK.svg.png' },
  { name: 'Peugeot', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Peugeot_2021_Logo.svg/40px-Peugeot_2021_Logo.svg.png' },
];

function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

function MakeRow({ makes }) {
  return (
    <div className="flex gap-4">
      {makes.map((make) => (
        <Link
          key={make.name}
          to={`/cars-by-make/${make.name.toLowerCase().replace(/[\s-]+/g, '-')}`}
          className="flex items-center gap-3 flex-1 border border-border rounded-xl px-4 py-3 bg-white hover:bg-secondary hover:border-primary/30 transition-all group min-w-0"
        >
          <img
            src={make.logo}
            alt={make.name}
            className="w-8 h-8 object-contain flex-shrink-0"
            onError={e => { e.target.style.display = 'none'; }}
          />
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{make.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default function CarListings() {
  const rows = chunk(carMakes, 4);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-foreground mb-5">Browse by Make</h2>
      <div className="flex flex-col gap-3">
        {rows.map((row, i) => (
          <MakeRow key={i} makes={row} />
        ))}
      </div>
    </div>
  );
}