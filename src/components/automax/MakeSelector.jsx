import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

const popularMakes = [
  { name: 'Toyota', count: '8,234' }, { name: 'Ford', count: '7,891' },
  { name: 'Volkswagen', count: '6,543' }, { name: 'BMW', count: '5,432' },
  { name: 'Audi', count: '4,876' }, { name: 'Hyundai', count: '4,321' },
];

const allMakes = [
  'Abarth','Alfa Romeo','Aston Martin','Audi','Bentley','BMW','Chevrolet','Chrysler',
  'Citroën','Dacia','Ferrari','Fiat','Ford','Honda','Hyundai','Jaguar','Jeep','Kia',
  'Land Rover','Lexus','Mazda','Mercedes-Benz','MINI','Mitsubishi','Nissan','Opel',
  'Peugeot','Porsche','Renault','Seat','Skoda','Subaru','Suzuki','Tesla','Toyota',
  'Volkswagen','Volvo',
];

export default function MakeSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = search ? allMakes.filter(m => m.toLowerCase().includes(search.toLowerCase())) : allMakes;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between border border-border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none hover:border-primary/50 transition-colors"
      >
        <span className={value ? 'text-foreground' : 'text-muted-foreground'}>{value || 'Any make'}</span>
        <div className="flex items-center gap-1">
          {value && <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" onClick={e => { e.stopPropagation(); onChange(''); }} />}
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-2 border-b border-border">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search makes..."
              className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {!search && (
              <>
                <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Popular</div>
                {popularMakes.map(m => (
                  <button key={m.name} onClick={() => { onChange(m.name); setOpen(false); setSearch(''); }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-secondary transition-colors ${value === m.name ? 'bg-primary/5 text-primary font-semibold' : 'text-foreground'}`}>
                    <span>{m.name}</span>
                    <span className="text-xs text-muted-foreground">({m.count})</span>
                  </button>
                ))}
                <div className="border-t border-border my-1" />
                <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">All Makes</div>
              </>
            )}
            {filtered.map(m => (
              <button key={m} onClick={() => { onChange(m); setOpen(false); setSearch(''); }}
                className={`flex items-center w-full px-3 py-2 text-sm hover:bg-secondary transition-colors ${value === m ? 'bg-primary/5 text-primary font-semibold' : 'text-foreground'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}