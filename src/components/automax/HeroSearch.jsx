import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MakeSelector from './MakeSelector';
import ModelSelector from './ModelSelector';

const makes = ['Abarth', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Chevrolet', 'Chrysler', 'Citroën', 'Dacia', 'Ferrari', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jaguar', 'Jeep', 'Kia', 'Land Rover', 'Lexus', 'Mazda', 'Mercedes-Benz', 'MINI', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 'Seat', 'Skoda', 'Subaru', 'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'];
const bodyTypes = ['Any body type', 'Saloon', 'Hatchback', 'Estate', 'SUV', 'Coupe', 'Convertible', 'MPV', 'Van', 'Pickup'];
const years = ['Any year', ...Array.from({length: 26}, (_, i) => String(2025 - i))];
const prices = ['Any price', '€5,000', '€10,000', '€15,000', '€20,000', '€30,000', '€40,000', '€50,000', '€75,000', '€100,000+'];

const heroBg = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=80';

export default function HeroSearch() {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [bodyType, setBodyType] = useState('');
  const navigate = useNavigate();

  return (
    <div className="relative w-full" style={{ minHeight: 420 }}>
      <img src={heroBg} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 text-center drop-shadow-lg">Find Your Perfect Car</h1>
        <p className="text-white/80 text-lg mb-8 text-center">Ireland's largest car marketplace</p>
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
            <MakeSelector value={selectedMake} onChange={(v) => { setSelectedMake(v); setSelectedModel(''); }} />
            <ModelSelector make={selectedMake} value={selectedModel} onChange={setSelectedModel} />
            <div className="relative">
              <select value={bodyType} onChange={e => setBodyType(e.target.value)} className="w-full appearance-none border border-border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground pr-8">
                {bodyTypes.map(b => <option key={b} value={b === 'Any body type' ? '' : b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <select value={yearFrom} onChange={e => setYearFrom(e.target.value)} className="appearance-none border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none text-foreground">
              <option value="">Year from</option>
              {years.slice(1).map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <select value={yearTo} onChange={e => setYearTo(e.target.value)} className="appearance-none border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none text-foreground">
              <option value="">Year to</option>
              {years.slice(1).map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <select value={priceFrom} onChange={e => setPriceFrom(e.target.value)} className="appearance-none border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none text-foreground">
              <option value="">Price from</option>
              {prices.slice(1).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={priceTo} onChange={e => setPriceTo(e.target.value)} className="appearance-none border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none text-foreground">
              <option value="">Price to</option>
              {prices.slice(1).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <button onClick={() => navigate('/cars-for-sale')} className="w-full bg-primary text-white font-bold py-3 rounded-xl text-base hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Search className="w-5 h-5" /> Search Cars
          </button>
        </div>
      </div>
    </div>
  );
}