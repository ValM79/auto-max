import React, { useState } from 'react';
import { Search, Star, ChevronDown, ChevronUp, Plus } from 'lucide-react';

const makes = ['All makes', 'Audi', 'BMW', 'Ford', 'Hyundai', 'Nissan', 'Renault', 'Toyota', 'Volkswagen'];
const models = ['All models', 'Corolla', 'Golf', 'Focus', 'IX20', 'A4', '3 Series'];
const trims = ['All trims', 'SE', 'Sport', 'Executive', 'Comfort', 'Premium'];
const years = ['', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014 & older'];
const counties = ['All Ireland', 'Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kerry', 'Wexford', 'Wicklow', 'Meath', 'Kildare'];
const radii = ['+5km', '+10km', '+20km', '+50km', '+100km', 'Nationwide'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', 'LPG', 'Other'];
const transmissions = ['Manual', 'Automatic', 'Semi-Automatic'];
const bodyTypes = ['Saloon', 'Hatchback', 'SUV', 'Estate', 'Coupe', 'Convertible', 'MPV', 'Van', 'Pickup'];
const engineSizes = ['Any', 'Under 1.0L', '1.0–1.4L', '1.4–1.8L', '1.8–2.0L', '2.0–2.5L', '2.5–3.0L', '3.0L+'];
const enginePowers = ['Any', 'Under 75hp', '75–100hp', '100–150hp', '150–200hp', '200–300hp', '300hp+'];
const seatOptions = ['Any', '2', '4', '5', '6', '7', '8+'];
const doorOptions = ['Any', '2', '3', '4', '5'];
const colours = ['Any', 'Black', 'White', 'Silver', 'Grey', 'Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Brown'];
const bootSpaces = ['Any', 'Under 300L', '300–400L', '400–500L', '500–600L', '600L+'];
const roadTaxOptions = ['Any', 'Under €200', '€200–€400', '€400–€600', '€600+'];
const warrantyOptions = ['Any duration or none', 'Under warranty', '1 year+', '2 years+', '3 years+'];
const adTypes = ['All', 'For Sale', 'Wanted'];

function Sel({ options, placeholder }) {
  return (
    <div className="relative">
      <select className="w-full appearance-none border border-border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary/40 pr-7 text-foreground">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
    </div>
  );
}

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

function CheckGroup({ items }) {
  return (
    <div className="flex flex-col gap-1.5">
      {items.map(([label, count]) => (
        <label key={label} className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-3.5 h-3.5 accent-primary rounded" />
          <span className="text-sm text-foreground">{label}{count && <span className="text-muted-foreground ml-1">({count})</span>}</span>
        </label>
      ))}
    </div>
  );
}

function StarFilterRow({ stars }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" className="w-3.5 h-3.5 accent-primary" />
      <div className="flex items-center gap-0.5">
        {[1,2,3,4,5].map(s => (
          <Star key={s} className={`w-3 h-3 ${s <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">{stars}+</span>
    </label>
  );
}

function BodyTypeGrid() {
  const [selected, setSelected] = useState([]);
  const toggle = (t) => setSelected(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const icons = { Saloon: '🚗', Hatchback: '🚙', SUV: '🚕', Estate: '🚐', Coupe: '🏎️', Convertible: '🚘', MPV: '🚌', Van: '🚚', Pickup: '🛻' };
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {bodyTypes.map(t => (
        <button key={t} onClick={() => toggle(t)}
          className={`flex flex-col items-center gap-1 border rounded-lg py-2 px-1 text-xs transition-colors ${selected.includes(t) ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}>
          <span className="text-base">{icons[t]}</span>
          <span className="leading-tight text-center">{t}</span>
        </button>
      ))}
    </div>
  );
}

export default function FiltersSidebar() {
  const [vehicles, setVehicles] = useState([{ make: '', model: '', trim: '' }]);
  const [priceTab, setPriceTab] = useState('total');
  const [fuelSelected, setFuelSelected] = useState([]);
  const [transSelected, setTransSelected] = useState([]);

  const toggleFuel = (f) => setFuelSelected(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  const toggleTrans = (t) => setTransSelected(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-4 text-sm">
      {/* Save Search */}
      <button className="flex items-center gap-2 w-full border border-border rounded-lg px-4 py-2.5 hover:bg-secondary transition-colors mb-4 text-foreground">
        <Star className="w-4 h-4 text-muted-foreground" /> Save Search
      </button>

      {/* Filters header */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-foreground">Filters</span>
        <button className="text-xs text-primary hover:underline">Reset All</button>
      </div>

      {/* Previous searches */}
      <button className="flex items-center gap-2 w-full border border-border rounded-lg px-4 py-2.5 hover:bg-secondary transition-colors mb-4 text-muted-foreground">
        <Search className="w-4 h-4" /> View your previous searches
      </button>

      {/* Seller type */}
      <Section title="Seller type">
        <CheckGroup items={[['Dealership', '72,285'], ['Private seller', '23,082']]} />
      </Section>

      {/* Rating */}
      <Section title="Rating">
        <div className="flex flex-col gap-1.5">
          {[5,4,3,2,1].map(s => <StarFilterRow key={s} stars={s} />)}
        </div>
      </Section>

      {/* Make, Model & Trim */}
      <Section title="Make, Model & Trim">
        <div className="flex flex-col gap-3">
          {vehicles.map((v, i) => (
            <div key={i} className="flex flex-col gap-2">
              {i > 0 && <div className="border-t border-border pt-2" />}
              <Sel options={makes} placeholder="All makes" />
              <Sel options={models} placeholder="All models" />
              <Sel options={trims} placeholder="All trims" />
            </div>
          ))}
          <button
            onClick={() => setVehicles(prev => [...prev, { make: '', model: '', trim: '' }])}
            className="flex items-center gap-1.5 text-primary text-xs font-medium hover:underline mt-1">
            <Plus className="w-3.5 h-3.5" /> Add another vehicle
          </button>
        </div>
      </Section>

      {/* Year */}
      <Section title="Year">
        <div className="grid grid-cols-2 gap-2">
          <Sel options={years} placeholder="From" />
          <Sel options={years} placeholder="To" />
        </div>
      </Section>

      {/* Warranty & Verification */}
      <Section title="Warranty & Verification" defaultOpen={false}>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Warranty duration</p>
            <Sel options={warrantyOptions} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Verifications</p>
            <CheckGroup items={[['Verified seller', null], ['CARTELL checked', null], ['Full service history', null]]} />
          </div>
        </div>
      </Section>

      {/* Price */}
      <Section title="Price">
        <div className="flex border border-border rounded-lg overflow-hidden mb-3 text-xs font-medium">
          {['total', 'monthly'].map(tab => (
            <button key={tab} onClick={() => setPriceTab(tab)}
              className={`flex-1 py-1.5 transition-colors ${priceTab === tab ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-secondary'}`}>
              {tab === 'total' ? 'Total Price' : 'Per month'}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-2">€ EUR</p>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="From" className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
          <input type="number" placeholder="To" className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
        </div>
      </Section>

      {/* Mileage */}
      <Section title="Mileage">
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="From" className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
          <input type="number" placeholder="To" className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
        </div>
      </Section>

      {/* Location */}
      <Section title="Location">
        <div className="flex flex-col gap-2">
          <Sel options={counties} />
          <Sel options={radii} placeholder="+5km" />
        </div>
      </Section>

      {/* Fuel type */}
      <Section title="Fuel type">
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2 cursor-pointer mb-1">
            <input type="checkbox" className="w-3.5 h-3.5 accent-primary" defaultChecked />
            <span className="text-sm text-foreground">Show all fuel types</span>
          </label>
          {fuelTypes.map(f => (
            <label key={f} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={fuelSelected.includes(f)} onChange={() => toggleFuel(f)} className="w-3.5 h-3.5 accent-primary" />
              <span className="text-sm text-foreground">{f}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Transmission */}
      <Section title="Transmission">
        <div className="flex flex-wrap gap-2">
          {transmissions.map(t => (
            <button key={t} onClick={() => toggleTrans(t)}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${transSelected.includes(t) ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}>
              {t}
            </button>
          ))}
        </div>
      </Section>

      {/* Body type */}
      <Section title="Body type">
        <BodyTypeGrid />
      </Section>

      {/* Engine size */}
      <Section title="Engine size" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <Sel options={engineSizes} placeholder="From" />
          <Sel options={engineSizes} placeholder="To" />
        </div>
      </Section>

      {/* Engine power */}
      <Section title="Engine power" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <Sel options={enginePowers} placeholder="From" />
          <Sel options={enginePowers} placeholder="To" />
        </div>
      </Section>

      {/* Battery range */}
      <Section title="Battery range" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="From (km)" className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
          <input type="number" placeholder="To (km)" className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
        </div>
      </Section>

      {/* Seats */}
      <Section title="Seats" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {seatOptions.map(s => (
            <button key={s} className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground hover:bg-secondary hover:border-primary transition-colors">{s}</button>
          ))}
        </div>
      </Section>

      {/* Doors */}
      <Section title="Doors" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {doorOptions.map(d => (
            <button key={d} className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground hover:bg-secondary hover:border-primary transition-colors">{d}</button>
          ))}
        </div>
      </Section>

      {/* Colour */}
      <Section title="Colour" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {colours.map(c => (
            <button key={c} className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground hover:bg-secondary hover:border-primary transition-colors">{c}</button>
          ))}
        </div>
      </Section>

      {/* Boot space */}
      <Section title={<span>Boot space <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded ml-1 font-semibold">NEW</span></span>} defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <Sel options={bootSpaces} placeholder="From" />
          <Sel options={bootSpaces} placeholder="To" />
        </div>
      </Section>

      {/* Ownership & History */}
      <Section title="Ownership & History" defaultOpen={false}>
        <CheckGroup items={[['1 owner', null], ['2 owners', null], ['3+ owners', null], ['Full service history', null], ['No accidents', null]]} />
      </Section>

      {/* Road tax yearly */}
      <Section title="Road tax yearly" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <Sel options={roadTaxOptions} placeholder="From" />
          <Sel options={roadTaxOptions} placeholder="To" />
        </div>
      </Section>

      {/* Reserve online */}
      <Section title="Reserve online" defaultOpen={false}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-3.5 h-3.5 accent-primary" />
          <span className="text-sm text-foreground">Reserve online only</span>
        </label>
      </Section>

      {/* Ad type */}
      <Section title="Ad type" defaultOpen={false}>
        <div className="flex flex-col gap-1.5">
          {adTypes.map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="adType" className="w-3.5 h-3.5 accent-primary" defaultChecked={t === 'All'} />
              <span className="text-sm text-foreground">{t}</span>
            </label>
          ))}
        </div>
      </Section>
    </div>
  );
}