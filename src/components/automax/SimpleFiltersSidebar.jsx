import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

const counties = ['All Ireland', 'Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kerry', 'Wexford', 'Wicklow', 'Meath', 'Kildare'];
const radii = ['+5km', '+10km', '+20km', '+50km', 'Nationwide'];
const priceRanges = ['Any', 'Under €5,000', '€5,000 - €10,000', '€10,000 - €20,000', '€20,000 - €40,000', '€40,000+'];
const sellerTypes = ['Dealership', 'Private Seller', 'Trusted Dealer'];
const adTypes = ['All', 'For Sale', 'Wanted'];

function Section({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border py-3">
      <button onClick={() => setOpen(v => !v)} className="flex items-center justify-between w-full text-sm font-semibold text-foreground">
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function SimpleFiltersSidebar({ onFilterChange }) {
  const [county, setCounty] = useState('All Ireland');
  const [radius, setRadius] = useState('+5km');
  const [price, setPrice] = useState('Any');
  const [seller, setSeller] = useState([]);
  const [rating, setRating] = useState(0);
  const [adType, setAdType] = useState('All');

  const handleReset = () => {
    setCounty('All Ireland'); setRadius('+5km'); setPrice('Any');
    setSeller([]); setRating(0); setAdType('All');
    if (onFilterChange) onFilterChange({});
  };

  const toggleSeller = (s) => setSeller(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  return (
    <div className="bg-white rounded-xl p-4 text-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-foreground">Filters</span>
        <button onClick={handleReset} className="flex items-center gap-1 text-xs text-primary hover:underline">
          <RotateCcw className="w-3 h-3" /> Reset All
        </button>
      </div>

      <Section title="Location">
        <div className="flex flex-col gap-2">
          <select value={county} onChange={e => setCounty(e.target.value)} className="w-full appearance-none border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none pr-7 text-foreground">
            {counties.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={radius} onChange={e => setRadius(e.target.value)} className="w-full appearance-none border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none pr-7 text-foreground">
            {radii.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </Section>

      <Section title="Price" defaultOpen={false}>
        <div className="flex flex-col gap-1.5">
          {priceRanges.map(p => (
            <label key={p} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="price" checked={price === p} onChange={() => setPrice(p)} className="w-3.5 h-3.5 accent-primary" />
              <span className="text-sm text-foreground">{p}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Seller Type" defaultOpen={false}>
        <div className="flex flex-col gap-1.5">
          {sellerTypes.map(s => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={seller.includes(s)} onChange={() => toggleSeller(s)} className="w-3.5 h-3.5 accent-primary" />
              <span className="text-sm text-foreground">{s}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Star Rating" defaultOpen={false}>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(r => (
            <button key={r} onClick={() => setRating(r === rating ? 0 : r)} className={`w-8 h-8 rounded-full border text-sm transition-colors ${rating >= r ? 'bg-yellow-400 border-yellow-400 text-white' : 'border-border text-muted-foreground hover:bg-secondary'}`}>
              ★
            </button>
          ))}
        </div>
        {rating > 0 && <p className="text-xs text-muted-foreground mt-2">{rating}+ stars</p>}
      </Section>

      <Section title="Ad Type" defaultOpen={false}>
        <div className="flex flex-col gap-1.5">
          {adTypes.map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="adType" checked={adType === t} onChange={() => setAdType(t)} className="w-3.5 h-3.5 accent-primary" />
              <span className="text-sm text-foreground">{t}</span>
            </label>
          ))}
        </div>
      </Section>
    </div>
  );
}