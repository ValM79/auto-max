import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Star } from 'lucide-react';
import MakeSelector from './MakeSelector';
import ModelSelector from './ModelSelector';

const counties = ['All Ireland', 'Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kerry', 'Wexford', 'Wicklow', 'Meath', 'Kildare'];
const radii = ['+5km', '+10km', '+20km', '+50km', 'Nationwide'];
const years = ['', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014 & older'];
const prices = ['', '€1,000', '€2,500', '€5,000', '€7,500', '€10,000', '€15,000', '€20,000', '€30,000', '€50,000', '€100,000+'];
const mileages = ['', '10,000 km', '30,000 km', '50,000 km', '75,000 km', '100,000 km', '150,000 km', '200,000 km+'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', 'LPG'];
const transmissions = ['Manual', 'Automatic', 'Semi-Automatic'];
const bodyTypes = ['Hatchback', 'Saloon', 'Estate', 'SUV', 'Coupe', 'Convertible', 'MPV', 'Pickup'];
const colours = ['Any', 'Black', 'White', 'Silver', 'Grey', 'Blue', 'Red', 'Green', 'Orange'];
const regCountries = ['Any', 'Ireland', 'United Kingdom', 'Germany', 'France', 'Spain'];

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

function Sel({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full appearance-none border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary/40 pr-7 text-foreground">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
    </div>
  );
}

const emptyVehicle = () => ({ make: '', model: '' });

export default function FiltersSidebar({ onFilterChange }) {
  const [vehicles, setVehicles] = useState([emptyVehicle()]);
  const [county, setCounty] = useState('All Ireland');
  const [radius, setRadius] = useState('+5km');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');
  const [fuelSelected, setFuelSelected] = useState([]);
  const [transSelected, setTransSelected] = useState([]);
  const [bodySelected, setBodySelected] = useState([]);
  const [colour, setColour] = useState('Any');
  const [regCountry, setRegCountry] = useState('Any');
  const [sellerTypes, setSellerTypes] = useState([]);
  const [rating, setRating] = useState(0);
  const [reserveOnline, setReserveOnline] = useState(false);
  const [adType, setAdType] = useState('All');

  const toggleArr = setter => val => setter(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const handleReset = () => {
    setVehicles([emptyVehicle()]); setCounty('All Ireland'); setRadius('+5km');
    setYearFrom(''); setYearTo(''); setPriceFrom(''); setPriceTo('');
    setMileageFrom(''); setMileageTo(''); setFuelSelected([]); setTransSelected([]);
    setBodySelected([]); setColour('Any'); setRegCountry('Any');
    setSellerTypes([]); setRating(0); setReserveOnline(false); setAdType('All');
    if (onFilterChange) onFilterChange({ vehicles: [emptyVehicle()] });
  };

  const emitChange = (patch) => {
    if (!onFilterChange) return;
    onFilterChange({ vehicles, yearFrom, yearTo, priceFrom, priceTo, mileageFrom, mileageTo, ...patch });
  };

  const setVehicleMake = (i, make) => {
    const next = vehicles.map((v, idx) => idx === i ? { make, model: '' } : v);
    setVehicles(next);
    if (onFilterChange) onFilterChange({ vehicles: next, yearFrom, yearTo, priceFrom, priceTo });
  };

  const setVehicleModel = (i, model) => {
    const next = vehicles.map((v, idx) => idx === i ? { ...v, model } : v);
    setVehicles(next);
    if (onFilterChange) onFilterChange({ vehicles: next, yearFrom, yearTo, priceFrom, priceTo });
  };

  return (
    <div className="bg-white rounded-xl p-4 text-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-foreground">Filters</span>
        <button onClick={handleReset} className="flex items-center gap-1 text-xs text-primary hover:underline">
          <RotateCcw className="w-3 h-3" /> Reset All
        </button>
      </div>

      <Section title="Make / Model">
        {vehicles.map((v, i) => (
          <div key={i} className="flex flex-col gap-2 mb-3">
            <MakeSelector value={v.make} onChange={make => setVehicleMake(i, make)} />
            <ModelSelector make={v.make} value={v.model} onChange={model => setVehicleModel(i, model)} />
          </div>
        ))}
      </Section>

      <Section title="Location" defaultOpen={false}>
        <div className="flex flex-col gap-2">
          <Sel value={county} onChange={v => { setCounty(v); emitChange({ county: v }); }} options={counties} />
          <Sel value={radius} onChange={setRadius} options={radii} />
        </div>
      </Section>

      <Section title="Year" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <Sel value={yearFrom} onChange={v => { setYearFrom(v); emitChange({ yearFrom: v }); }} options={years} placeholder="From" />
          <Sel value={yearTo} onChange={v => { setYearTo(v); emitChange({ yearTo: v }); }} options={years} placeholder="To" />
        </div>
      </Section>

      <Section title="Price" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <Sel value={priceFrom} onChange={v => { setPriceFrom(v); emitChange({ priceFrom: v }); }} options={prices} placeholder="From" />
          <Sel value={priceTo} onChange={v => { setPriceTo(v); emitChange({ priceTo: v }); }} options={prices} placeholder="To" />
        </div>
      </Section>

      <Section title="Mileage" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <Sel value={mileageFrom} onChange={v => { setMileageFrom(v); emitChange({ mileageFrom: v }); }} options={mileages} placeholder="From" />
          <Sel value={mileageTo} onChange={v => { setMileageTo(v); emitChange({ mileageTo: v }); }} options={mileages} placeholder="To" />
        </div>
      </Section>

      <Section title="Fuel Type" defaultOpen={false}>
        <div className="flex flex-col gap-1.5">
          {fuelTypes.map(f => (
            <label key={f} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={fuelSelected.includes(f)} onChange={() => toggleArr(setFuelSelected)(f)} className="w-3.5 h-3.5 accent-primary" />
              <span className="text-sm text-foreground">{f}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Transmission" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {transmissions.map(t => (
            <button key={t} onClick={() => toggleArr(setTransSelected)(t)}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${transSelected.includes(t) ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}>
              {t}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Body Type" defaultOpen={false}>
        <div className="flex flex-col gap-1.5">
          {bodyTypes.map(b => (
            <label key={b} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={bodySelected.includes(b)} onChange={() => toggleArr(setBodySelected)(b)} className="w-3.5 h-3.5 accent-primary" />
              <span className="text-sm text-foreground">{b}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Colour" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {colours.map(c => (
            <button key={c} onClick={() => setColour(c)}
              className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${colour === c ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}>
              {c}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Seller Type" defaultOpen={false}>
        <div className="flex flex-col gap-1.5">
          {[['Dealership', '62,400'], ['Private Seller', '21,500'], ['Trusted Dealer', '33,600']].map(([label, count]) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={sellerTypes.includes(label)} onChange={() => toggleArr(setSellerTypes)(label)} className="w-3.5 h-3.5 accent-primary" />
              <span className="text-sm text-foreground">{label} <span className="text-muted-foreground">({count})</span></span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Star Rating" defaultOpen={false}>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(r => (
            <button key={r} onClick={() => setRating(r === rating ? 0 : r)}
              className={`w-8 h-8 rounded-full border text-sm transition-colors ${rating >= r ? 'bg-yellow-400 border-yellow-400 text-white' : 'border-border text-muted-foreground hover:bg-secondary'}`}>
              ★
            </button>
          ))}
        </div>
      </Section>

      <Section title="Current Country of Reg." defaultOpen={false}>
        <Sel value={regCountry} onChange={setRegCountry} options={regCountries} />
      </Section>

      <Section title="Reserve Online" defaultOpen={false}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={reserveOnline} onChange={e => setReserveOnline(e.target.checked)} className="w-3.5 h-3.5 accent-primary" />
          <span className="text-sm text-foreground">Reserve online only</span>
        </label>
      </Section>

      <Section title="Ad Type" defaultOpen={false}>
        <div className="flex flex-col gap-1.5">
          {['All', 'For Sale', 'Wanted'].map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="adTypeSidebar" checked={adType === t} onChange={() => setAdType(t)} className="w-3.5 h-3.5 accent-primary" />
              <span className="text-sm text-foreground">{t}</span>
            </label>
          ))}
        </div>
      </Section>
    </div>
  );
}