import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import ListingCard from '../components/automarket/ListingCard';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';

const counties = ['All Ireland', 'Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kerry', 'Wexford', 'Wicklow', 'Meath', 'Kildare'];
const radii = ['+5km', '+10km', '+20km', '+50km', '+100km', 'Nationwide'];
const vanMakes = ['All makes', 'Ford', 'Renault', 'Volkswagen', 'Mercedes', 'Peugeot', 'Citroën', 'Fiat', 'Vauxhall', 'Toyota', 'Nissan', 'MAN', 'Iveco'];
const vanModels = ['All models', 'Transit', 'Master', 'Sprinter', 'Crafter', 'Boxer', 'Jumper', 'Ducato', 'Movano', 'Proace', 'NV400', 'TGE'];
const years = ['', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014 & older'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', 'LPG', 'Other'];
const transmissions = ['Manual', 'Automatic', 'Semi-Automatic'];
const bodyTypes = ['Panel Van', 'Crew Van', 'Luton Van', 'Dropside', 'Tipper', 'Refrigerated', 'Minibus', 'Box Van'];
const colours = ['Any', 'Black', 'White', 'Silver', 'Grey', 'Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Brown'];
const regCountries = ['Any', 'Ireland', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Other'];
const adTypes = ['All', 'For Sale', 'Wanted'];

const listings = [
{
  id: 1,
  dealer: 'Dennehy Renault Pro+',
  dealerLogo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=50&q=80',
  dealerType: 'Franchise Dealership',
  dealerRating: 4.8,
  spotlight: true,
  title: 'Renault Master Leasing or contract hire',
  year: 2025,
  engine: '2.0 Diesel',
  mileage: '0 km',
  daysAgo: '3 days',
  location: 'Dublin',
  price: '€1',
  photos: 1,
  saved: false,
  image: 'https://images.unsplash.com/photo-1586191180000-5df15b3eef4a?w=400&q=80',
  badge: 'IN RENTAL',
  badgeDesc: 'BEST CONTRACT HIRE RATES AVAILABLE\n12-month Minimum Lease\nNo Commercial Insurance Provided'
},
{
  id: 2,
  dealer: 'Kylemore Cars',
  dealerLogo: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=50&q=80',
  dealerType: 'Trusted Dealer',
  dealerRating: 4.6,
  spotlight: false,
  title: 'Ford Transit Custom L2 Panel Van',
  year: 2023,
  engine: '2.0 EcoBlue',
  mileage: '24,500 km',
  daysAgo: '1 day',
  location: 'Cork',
  price: '€28,950',
  photos: 8,
  saved: false,
  image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&q=80',
  badge: null
},
{
  id: 3,
  dealer: 'Van Centre Dublin',
  dealerLogo: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=50&q=80',
  dealerType: 'Dealership',
  dealerRating: 4.3,
  spotlight: false,
  title: 'Mercedes-Benz Sprinter 314 CDI LWB',
  year: 2022,
  engine: '2.1 CDI',
  mileage: '61,200 km',
  daysAgo: '5 days',
  location: 'Dublin',
  price: '€34,500',
  photos: 12,
  saved: false,
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  badge: null
},
{
  id: 4,
  dealer: 'Galway Commercial Vehicles',
  dealerLogo: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=50&q=80',
  dealerType: 'Private Seller',
  dealerRating: null,
  spotlight: false,
  title: 'Volkswagen Crafter 35 TDI High Roof',
  year: 2021,
  engine: '2.0 TDI',
  mileage: '88,000 km',
  daysAgo: '2 days',
  location: 'Galway',
  price: '€22,000',
  photos: 6,
  saved: false,
  image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80',
  badge: null
},
{
  id: 5,
  dealer: 'Murphy Commercial',
  dealerLogo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=50&q=80',
  dealerType: 'Dealership',
  dealerRating: 4.5,
  spotlight: false,
  title: 'Peugeot Expert 1000 1.5 BlueHDi',
  year: 2023,
  engine: '1.5 Diesel',
  mileage: '15,300 km',
  daysAgo: '4 days',
  location: 'Limerick',
  price: '€26,750',
  photos: 9,
  saved: false,
  image: 'https://images.unsplash.com/photo-1517994112540-009c47ea476b?w=400&q=80',
  badge: null
},
{
  id: 6,
  dealer: 'Dublin Van Sales',
  dealerLogo: 'https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?w=50&q=80',
  dealerType: 'Trusted Dealer',
  dealerRating: 4.7,
  spotlight: false,
  title: 'Fiat Ducato 35 Maxi XL Dropside',
  year: 2022,
  engine: '2.3 Multijet',
  mileage: '47,000 km',
  daysAgo: '1 week',
  location: 'Dublin',
  price: '€31,200',
  photos: 7,
  saved: false,
  image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=400&q=80',
  badge: null
}];


function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) =>
      <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
      )}
    </div>);

}

function FilterSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border py-3">
      <button onClick={() => setOpen((v) => !v)} className="flex items-center justify-between w-full text-sm font-semibold text-foreground">
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>);

}

function Sel({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary/40 pr-7 text-foreground">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
    </div>);

}

export default function Commercials() {
  const [search, setSearch] = useState('');
  const [county, setCounty] = useState('All Ireland');
  const [radius, setRadius] = useState('+5km');
  const [make, setMake] = useState('All makes');
  const [model, setModel] = useState('All models');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [sellerTypes, setSellerTypes] = useState([]);
  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');
  const [fuelSelected, setFuelSelected] = useState([]);
  const [transSelected, setTransSelected] = useState([]);
  const [bodySelected, setBodySelected] = useState([]);
  const [colour, setColour] = useState('Any');
  const [regCountry, setRegCountry] = useState('Any');
  const [reserveOnline, setReserveOnline] = useState(false);
  const [adType, setAdType] = useState('All');
  const [savedIds, setSavedIds] = useState([]);

  const toggleSaved = (id) => setSavedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleArr = (setter) => (val) => setter((prev) => prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]);

  const handleReset = () => {
    setCounty('All Ireland');setRadius('+5km');
    setMake('All makes');setModel('All models');
    setYearFrom('');setYearTo('');
    setPriceFrom('');setPriceTo('');
    setSellerTypes([]);
    setMileageFrom('');setMileageTo('');
    setFuelSelected([]);setTransSelected([]);setBodySelected([]);
    setColour('Any');setRegCountry('Any');
    setReserveOnline(false);setAdType('All');
  };

  const filtered = listings.filter((l) => {
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase());
    const matchCounty = county === 'All Ireland' || l.location === county;
    const matchMake = make === 'All makes' || l.title.toLowerCase().includes(make.toLowerCase());
    return matchSearch && matchCounty && matchMake;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span>›</span>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-foreground font-medium">Commercials</span>
        </div>

        {/* Header row */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-foreground mb-3">Commercials</h1>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Commercials"
              className="w-full bg-secondary/60 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none border-0 outline-none" />
            
          </div>
        </div>

        <div className="mb-6 rounded-xl overflow-hidden border border-border h-36 sm:h-44">
          <img src="https://media.base44.com/images/public/69ceb6b4f41f5a2cee0c7016/37b29cbc7_generated_image.png" alt="Commercials Banner" className="w-full h-full object-cover" />
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0 self-start sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <div className="bg-white rounded-xl p-4 text-sm">
              <button className="flex items-center gap-2 w-full border border-border rounded-lg px-4 py-2.5 hover:bg-secondary transition-colors mb-4 text-foreground">
                <Star className="w-4 h-4 text-muted-foreground" /> Save Search
              </button>

              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-foreground">Filters</span>
                <button onClick={handleReset} className="text-xs text-primary hover:underline">Reset All</button>
              </div>

              <button className="flex items-center gap-2 w-full border border-border rounded-lg px-4 py-2.5 hover:bg-secondary transition-colors mb-3 text-muted-foreground">
                <Search className="w-4 h-4" /> View your previous searches
              </button>

              <FilterSection title="Location">
                <div className="flex flex-col gap-2">
                  <Sel value={county} onChange={setCounty} options={counties} />
                  <Sel value={radius} onChange={setRadius} options={radii} />
                </div>
              </FilterSection>

              <FilterSection title="Make / Model" defaultOpen={false}>
                <div className="flex flex-col gap-2">
                  <Sel value={make} onChange={setMake} options={vanMakes} />
                  <Sel value={model} onChange={setModel} options={vanModels} />
                </div>
              </FilterSection>

              <FilterSection title="Year" defaultOpen={false}>
                <div className="grid grid-cols-2 gap-2">
                  <Sel value={yearFrom} onChange={setYearFrom} options={years} placeholder="From" />
                  <Sel value={yearTo} onChange={setYearTo} options={years} placeholder="To" />
                </div>
              </FilterSection>

              <FilterSection title="Price" defaultOpen={false}>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} placeholder="From €" className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
                  <input type="number" value={priceTo} onChange={(e) => setPriceTo(e.target.value)} placeholder="To €" className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
                </div>
              </FilterSection>

              <FilterSection title="Seller type" defaultOpen={false}>
                <div className="flex flex-col gap-1.5">
                  {[['Dealership', '8,420'], ['Private seller', '4,790']].map(([label, count]) =>
                  <label key={label} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={sellerTypes.includes(label)} onChange={() => toggleArr(setSellerTypes)(label)} className="w-3.5 h-3.5 accent-primary" />
                      <span className="text-sm text-foreground">{label} <span className="text-muted-foreground">({count})</span></span>
                    </label>
                  )}
                </div>
              </FilterSection>

              <FilterSection title="Mileage" defaultOpen={false}>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" value={mileageFrom} onChange={(e) => setMileageFrom(e.target.value)} placeholder="From km" className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
                  <input type="number" value={mileageTo} onChange={(e) => setMileageTo(e.target.value)} placeholder="To km" className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 w-full" />
                </div>
              </FilterSection>

              <FilterSection title="Fuel type" defaultOpen={false}>
                <div className="flex flex-col gap-1.5">
                  {fuelTypes.map((f) =>
                  <label key={f} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={fuelSelected.includes(f)} onChange={() => toggleArr(setFuelSelected)(f)} className="w-3.5 h-3.5 accent-primary" />
                      <span className="text-sm text-foreground">{f}</span>
                    </label>
                  )}
                </div>
              </FilterSection>

              <FilterSection title="Transmission" defaultOpen={false}>
                <div className="flex flex-wrap gap-2">
                  {transmissions.map((t) =>
                  <button key={t} onClick={() => toggleArr(setTransSelected)(t)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${transSelected.includes(t) ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}>
                      {t}
                    </button>
                  )}
                </div>
              </FilterSection>

              <FilterSection title="Body type" defaultOpen={false}>
                <div className="flex flex-col gap-1.5">
                  {bodyTypes.map((b) =>
                  <label key={b} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={bodySelected.includes(b)} onChange={() => toggleArr(setBodySelected)(b)} className="w-3.5 h-3.5 accent-primary" />
                      <span className="text-sm text-foreground">{b}</span>
                    </label>
                  )}
                </div>
              </FilterSection>

              <FilterSection title="Colour" defaultOpen={false}>
                <div className="flex flex-wrap gap-2">
                  {colours.map((c) =>
                  <button key={c} onClick={() => setColour(c)}
                  className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${colour === c ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'}`}>
                      {c}
                    </button>
                  )}
                </div>
              </FilterSection>

              <FilterSection title="Current country of reg." defaultOpen={false}>
                <Sel value={regCountry} onChange={setRegCountry} options={regCountries} />
              </FilterSection>

              <FilterSection title="Reserve online" defaultOpen={false}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={reserveOnline} onChange={(e) => setReserveOnline(e.target.checked)} className="w-3.5 h-3.5 accent-primary" />
                  <span className="text-sm text-foreground">Reserve online only</span>
                </label>
              </FilterSection>

              <FilterSection title="Ad type" defaultOpen={false}>
                <div className="flex flex-col gap-1.5">
                  {adTypes.map((t) =>
                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="commercialAdType" checked={adType === t} onChange={() => setAdType(t)} className="w-3.5 h-3.5 accent-primary" />
                      <span className="text-sm text-foreground">{t}</span>
                    </label>
                  )}
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* Listings */}
          <div className="flex-1 min-w-0">
            {/* Results bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length.toLocaleString()}</span> ads for <span className="font-semibold text-foreground">Commercials in Ireland</span>
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Sort by: <span className="font-semibold text-foreground">Best match</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {filtered.map((listing) =>
              <ListingCard
                key={listing.id}
                item={{
                  ...listing,
                  sellerType: listing.dealerType,
                  sellerRating: listing.dealerRating,
                  timeAgo: listing.daysAgo
                }}
                saved={savedIds.includes(listing.id)}
                onToggleSave={toggleSaved}
                viewMode="list" />

              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>);

}