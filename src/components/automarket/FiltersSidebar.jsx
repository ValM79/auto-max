import React, { useState } from 'react';
import { Search, Star, ChevronDown, ChevronUp, Plus, ShieldCheck, Info, Clock } from 'lucide-react';

const makes = ['All makes', 'Audi', 'BMW', 'Ford', 'Hyundai', 'Nissan', 'Renault', 'Toyota', 'Volkswagen'];
const models = ['All models', 'Corolla', 'Golf', 'Focus', 'IX20', 'A4', '3 Series'];
const trims = ['All trims', 'SE', 'Sport', 'Executive', 'Comfort', 'Premium'];
const years = ['', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014 & older'];
const counties = ['All Ireland', 'Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kerry', 'Wexford', 'Wicklow', 'Meath', 'Kildare'];
const radii = ['+5km', '+10km', '+20km', '+50km', '+100km', 'Nationwide'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', 'LPG', 'Other'];
const transmissions = ['Manual', 'Automatic', 'Semi-Automatic'];
const bodyTypes = ['Saloon', 'Hatchback', 'SUV', 'Estate', 'Coupe', 'Convertible', 'MPV', 'Van', 'Pickup'];
const bodyIcons = { Saloon: '🚗', Hatchback: '🚙', SUV: '🚕', Estate: '🚐', Coupe: '🏎️', Convertible: '🚘', MPV: '🚌', Van: '🚚', Pickup: '🛻' };
const engineSizes = ['Any', 'Under 1.0L', '1.0–1.4L', '1.4–1.8L', '1.8–2.0L', '2.0–2.5L', '2.5–3.0L', '3.0L+'];
const enginePowers = ['Any', 'Under 75hp', '75–100hp', '100–150hp', '150–200hp', '200–300hp', '300hp+'];
const seatOptions = ['Any', '2', '4', '5', '6', '7', '8+'];
const doorOptions = ['Any', '2', '3', '4', '5'];
const colours = ['Any', 'Black', 'White', 'Silver', 'Grey', 'Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Brown'];
const bootSpaces = ['Any', 'Under 300L', '300–400L', '400–500L', '500–600L', '600L+'];
const roadTaxOptions = ['Any', 'Under €200', '€200–€400', '€400–€600', '€600+'];
const warrantyOptions = ['Any duration or none', 'Under warranty', '1 year+', '2 years+', '3 years+'];
const adTypes = ['All', 'For Sale', 'Wanted'];

function Section({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border py-4">
      <button onClick={() => setOpen(v => !v)} className="flex items-center justify-between w-full text-base font-semibold text-foreground">
        {title}
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function Sel({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full appearance-none border border-border rounded-lg px-4 py-3 text-base bg-white focus:outline-none focus:ring-1 focus:ring-primary/40 pr-8 text-foreground">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}

export default function FiltersSidebar() {
  const [resetKey, setResetKey] = useState(0);
  const [sellerTypes, setSellerTypes] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [vehicles, setVehicles] = useState([{ make: '', model: '', trim: '' }]);
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [warranty, setWarranty] = useState('');
  const [verifications, setVerifications] = useState([]);
  const [priceTab, setPriceTab] = useState('total');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');
  const [county, setCounty] = useState('All Ireland');
  const [radius, setRadius] = useState('+5km');
  const [showAllFuel, setShowAllFuel] = useState(true);
  const [fuelSelected, setFuelSelected] = useState([]);
  const [transSelected, setTransSelected] = useState([]);
  const [bodySelected, setBodySelected] = useState([]);
  const [engineSizeFrom, setEngineSizeFrom] = useState('');
  const [engineSizeTo, setEngineSizeTo] = useState('');
  const [enginePowerFrom, setEnginePowerFrom] = useState('');
  const [enginePowerTo, setEnginePowerTo] = useState('');
  const [batteryFrom, setBatteryFrom] = useState('');
  const [batteryTo, setBatteryTo] = useState('');
  const [seatsSelected, setSeatsSelected] = useState([]);
  const [doorsSelected, setDoorsSelected] = useState([]);
  const [coloursSelected, setColoursSelected] = useState([]);
  const [bootFrom, setBootFrom] = useState('');
  const [bootTo, setBootTo] = useState('');
  const [ownership, setOwnership] = useState([]);
  const [roadTaxFrom, setRoadTaxFrom] = useState('');
  const [roadTaxTo, setRoadTaxTo] = useState('');
  const [reserveOnline, setReserveOnline] = useState(false);
  const [adType, setAdType] = useState('All');
  const [trusted, setTrusted] = useState(false);

  const handleReset = () => {
    setSellerTypes([]);
    setRatings([]);
    setVehicles([{ make: '', model: '', trim: '' }]);
    setYearFrom(''); setYearTo('');
    setWarranty(''); setVerifications([]);
    setPriceTab('total'); setPriceFrom(''); setPriceTo('');
    setMileageFrom(''); setMileageTo('');
    setCounty('All Ireland'); setRadius('+5km');
    setShowAllFuel(true); setFuelSelected([]);
    setTransSelected([]); setBodySelected([]);
    setEngineSizeFrom(''); setEngineSizeTo('');
    setEnginePowerFrom(''); setEnginePowerTo('');
    setBatteryFrom(''); setBatteryTo('');
    setSeatsSelected([]); setDoorsSelected([]);
    setColoursSelected([]); setBootFrom(''); setBootTo('');
    setOwnership([]); setRoadTaxFrom(''); setRoadTaxTo('');
    setReserveOnline(false); setAdType('All'); setTrusted(false);
    setResetKey(k => k + 1);
  };

  const toggleArr = (setter) => (val) => setter(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  return (
    <div className="text-base">
      {/* Save Search */}
      <button className="flex items-center justify-center gap-2 w-full bg-primary text-white rounded-lg px-4 py-3 hover:bg-primary/90 transition-colors mb-5 font-semibold text-base">
        <Star className="w-5 h-5" /> Save Search
      </button>

      {/* Filters header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-lg text-foreground">Filters</span>
        <button onClick={handleReset} className="text-sm text-primary hover:underline">Reset All</button>
      </div>

      {/* Previous searches */}
      <button className="flex items-center gap-2 w-full border border-border rounded-lg px-4 py-3 hover:bg-secondary transition-colors mb-4 text-muted-foreground text-base">
        <Clock className="w-5 h-5" /> View your previous searches
      </button>

      <div key={resetKey}>

      {/* Make, Model & Trim */}
      <Section title="Make, Model & Trim">
        <div className="flex flex-col gap-3">
          {vehicles.map((v, i) => (
            <div key={i} className="flex flex-col gap-2">
              {i > 0 && <div className="border-t border-border pt-2" />}
              <Sel value={v.make} onChange={val => setVehicles(prev => prev.map((x, idx) => idx === i ? { ...x, make: val } : x))} options={makes} placeholder="All makes" />
              <Sel value={v.model} onChange={val => setVehicles(prev => prev.map((x, idx) => idx === i ? { ...x, model: val } : x))} options={models} placeholder="All models" />
              <Sel value={v.trim} onChange={val => setVehicles(prev => prev.map((x, idx) => idx === i ? { ...x, trim: val } : x))} options={trims} placeholder="All trims" />
            </div>
          ))}
          <button onClick={() => setVehicles(prev => [...prev, { make: '', model: '', trim: '' }])}
            className="flex items-center gap-2 text-primary text-sm font-medium hover:underline mt-1">
            <Plus className="w-4 h-4" /> Add another vehicle
          </button>
        </div>
      </Section>

      {/* Year */}
      <Section title="Year">
        <div className="grid grid-cols-2 gap-2">
          <Sel value={yearFrom} onChange={setYearFrom} options={years} placeholder="From" />
          <Sel value={yearTo} onChange={setYearTo} options={years} placeholder="To" />
        </div>
      </Section>

      {/* Price */}
      <Section title="Price">
        <div className="flex border border-border rounded-lg overflow-hidden mb-4 text-sm font-medium">
          {['total', 'monthly'].map(tab => (
            <button key={tab} onClick={() => setPriceTab(tab)}
              className={`flex-1 py-2.5 transition-colors ${priceTab === tab ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-secondary'}`}>
              {tab === 'total' ? 'Total Price' : 'Per month'}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-2">€ EUR</p>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" value={priceFrom} onChange={e => setPriceFrom(e.target.value)} placeholder="From" className="border border-border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
          <input type="number" value={priceTo} onChange={e => setPriceTo(e.target.value)} placeholder="To" className="border border-border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
        </div>
      </Section>

      {/* Mileage */}
      <Section title="Mileage">
        <div className="grid grid-cols-2 gap-2">
          <input type="number" value={mileageFrom} onChange={e => setMileageFrom(e.target.value)} placeholder="From" className="border border-border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
          <input type="number" value={mileageTo} onChange={e => setMileageTo(e.target.value)} placeholder="To" className="border border-border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
        </div>
      </Section>

      {/* Fuel type */}
      <Section title="Fuel type">
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-3 cursor-pointer mb-1">
            <input type="checkbox" checked={showAllFuel} onChange={e => { setShowAllFuel(e.target.checked); if (e.target.checked) setFuelSelected([]); }} className="w-4.5 h-4.5 accent-primary w-5 h-5" />
            <span className="text-base text-foreground">Show all fuel types</span>
          </label>
          {fuelTypes.map(f => (
            <label key={f} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={fuelSelected.includes(f)} onChange={() => { toggleArr(setFuelSelected)(f); setShowAllFuel(false); }} className="w-5 h-5 accent-primary" />
              <span className="text-base text-foreground">{f}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Engine size */}
      <Section title="Engine size" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <Sel value={engineSizeFrom} onChange={setEngineSizeFrom} options={engineSizes} placeholder="From" />
          <Sel value={engineSizeTo} onChange={setEngineSizeTo} options={engineSizes} placeholder="To" />
        </div>
      </Section>

      {/* Transmission */}
      <Section title="Transmission">
        <div className="flex flex-wrap gap-2">
          {transmissions.map(t => (
            <button key={t} onClick={() => toggleArr(setTransSelected)(t)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${transSelected.includes(t) ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}>
              {t}
            </button>
          ))}
        </div>
      </Section>

      {/* Location */}
      <Section title="Location">
        <div className="flex flex-col gap-2">
          <Sel value={county} onChange={setCounty} options={counties} />
          <Sel value={radius} onChange={setRadius} options={radii} />
        </div>
      </Section>

      {/* Body type */}
      <Section title="Body type">
        <div className="grid grid-cols-3 gap-2">
          {bodyTypes.map(t => (
            <button key={t} onClick={() => toggleArr(setBodySelected)(t)}
              className={`flex flex-col items-center gap-1.5 border rounded-lg py-3 px-1 text-sm transition-colors ${bodySelected.includes(t) ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}>
              <span className="text-xl">{bodyIcons[t]}</span>
              <span className="leading-tight text-center">{t}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Seller type */}
      <Section title="Seller type">
        <div className="flex flex-col gap-3">
          {[['Dealership', '72,285'], ['Private seller', '23,082']].map(([label, count]) => (
            <label key={label} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={sellerTypes.includes(label)} onChange={() => toggleArr(setSellerTypes)(label)} className="w-5 h-5 accent-primary" />
              <span className="text-base text-foreground">{label} <span className="text-muted-foreground">({count})</span></span>
            </label>
          ))}
        </div>
      </Section>

      {/* Warranty & Verification */}
      <Section title="Warranty & Verification" defaultOpen={false}>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Warranty duration</p>
            <Sel value={warranty} onChange={setWarranty} options={warrantyOptions} placeholder="Any duration or none" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Verifications</p>
            <div className="flex flex-col gap-3">
              {['Verified seller', 'CARTELL checked', 'Full service history'].map(v => (
                <label key={v} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={verifications.includes(v)} onChange={() => toggleArr(setVerifications)(v)} className="w-5 h-5 accent-primary" />
                  <span className="text-base text-foreground">{v}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Trusted dealers */}
      <div className="border-b border-border py-4">
        <div className="flex items-center gap-3">
          <input type="checkbox" id="trusted" checked={trusted} onChange={e => setTrusted(e.target.checked)} className="w-5 h-5 accent-primary" />
          <label htmlFor="trusted" className="text-base text-foreground flex items-center gap-2 cursor-pointer flex-1">
            <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" /> Trusted dealers only <span className="text-muted-foreground">(4,270)</span>
          </label>
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </div>
      </div>

      {/* Rating */}
      <Section title="Rating">
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={ratings.includes(4)} onChange={() => toggleArr(setRatings)(4)} className="w-5 h-5 accent-primary" />
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />)}
            </div>
            <span className="text-base text-muted-foreground">4+ rated sellers only (6,117)</span>
          </label>
        </div>
      </Section>

      {/* Engine power */}
      <Section title="Engine power" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <Sel value={enginePowerFrom} onChange={setEnginePowerFrom} options={enginePowers} placeholder="From" />
          <Sel value={enginePowerTo} onChange={setEnginePowerTo} options={enginePowers} placeholder="To" />
        </div>
      </Section>

      {/* Battery range */}
      <Section title="Battery range" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" value={batteryFrom} onChange={e => setBatteryFrom(e.target.value)} placeholder="From (km)" className="border border-border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
          <input type="number" value={batteryTo} onChange={e => setBatteryTo(e.target.value)} placeholder="To (km)" className="border border-border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
        </div>
      </Section>

      {/* Seats */}
      <Section title="Seats" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {seatOptions.map(s => (
            <button key={s} onClick={() => toggleArr(setSeatsSelected)(s)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${seatsSelected.includes(s) ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}>{s}</button>
          ))}
        </div>
      </Section>

      {/* Doors */}
      <Section title="Doors" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {doorOptions.map(d => (
            <button key={d} onClick={() => toggleArr(setDoorsSelected)(d)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${doorsSelected.includes(d) ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}>{d}</button>
          ))}
        </div>
      </Section>

      {/* Colour */}
      <Section title="Colour" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {colours.map(c => (
            <button key={c} onClick={() => toggleArr(setColoursSelected)(c)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${coloursSelected.includes(c) ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}>{c}</button>
          ))}
        </div>
      </Section>

      {/* Boot space */}
      <Section title={<span>Boot space <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded ml-1 font-semibold">NEW</span></span>} defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <Sel value={bootFrom} onChange={setBootFrom} options={bootSpaces} placeholder="From" />
          <Sel value={bootTo} onChange={setBootTo} options={bootSpaces} placeholder="To" />
        </div>
      </Section>

      {/* Ownership & History */}
      <Section title="Ownership & History" defaultOpen={false}>
        <div className="flex flex-col gap-3">
          {['1 owner', '2 owners', '3+ owners', 'Full service history', 'No accidents'].map(v => (
            <label key={v} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={ownership.includes(v)} onChange={() => toggleArr(setOwnership)(v)} className="w-5 h-5 accent-primary" />
              <span className="text-base text-foreground">{v}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Road tax yearly */}
      <Section title="Road tax yearly" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <Sel value={roadTaxFrom} onChange={setRoadTaxFrom} options={roadTaxOptions} placeholder="From" />
          <Sel value={roadTaxTo} onChange={setRoadTaxTo} options={roadTaxOptions} placeholder="To" />
        </div>
      </Section>

      {/* Reserve online */}
      <Section title="Reserve online" defaultOpen={false}>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={reserveOnline} onChange={e => setReserveOnline(e.target.checked)} className="w-5 h-5 accent-primary" />
          <span className="text-base text-foreground">Reserve online only</span>
        </label>
      </Section>

      {/* Ad type */}
      <Section title="Ad type" defaultOpen={false}>
        <div className="flex flex-col gap-3">
          {adTypes.map(t => (
            <label key={t} className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="adType" checked={adType === t} onChange={() => setAdType(t)} className="w-5 h-5 accent-primary" />
              <span className="text-base text-foreground">{t}</span>
            </label>
          ))}
        </div>
      </Section>
      </div>
    </div>
  );
}