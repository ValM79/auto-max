import React, { useState } from 'react';

export default function CarValuationSection() {
  const [registration, setRegistration] = useState('');
  const [odometer, setOdometer] = useState('');
  const [unit, setUnit] = useState('km');

  const handleSubmit = () => {
    console.log('Valuation request:', { registration, odometer, unit });
  };

  return (
    <div className="bg-secondary/40 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">In partnership with Allianz</p>
          <h2 className="text-2xl font-bold text-foreground mb-2">Value My Car</h2>
          <p className="text-muted-foreground text-sm">Enter your vehicle registration to get an instant valuation</p>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="text"
            value={registration}
            onChange={e => setRegistration(e.target.value)}
            placeholder="e.g. 201D0123"
            className="flex-1 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="text"
            value={odometer}
            onChange={e => setOdometer(e.target.value)}
            placeholder="Odometer reading"
            className="flex-1 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="border border-border rounded-lg px-3 py-3 text-sm bg-white focus:outline-none"
          >
            <option value="km">km</option>
            <option value="miles">miles</option>
          </select>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm whitespace-nowrap"
          >
            Get Valuation
          </button>
        </div>
      </div>
    </div>
  );
}