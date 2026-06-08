import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { popularModelsByMake } from './modelsData';

export default function ModelSelector({ make, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const models = make ? (popularModelsByMake[make] || []) : [];
  const filtered = search ? models.filter(m => m.toLowerCase().includes(search.toLowerCase())) : models;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => make && setOpen(v => !v)}
        disabled={!make}
        className={`w-full flex items-center justify-between border border-border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none transition-colors ${make ? 'hover:border-primary/50' : 'opacity-50 cursor-not-allowed'}`}
      >
        <span className={value ? 'text-foreground' : 'text-muted-foreground'}>{value || 'Any model'}</span>
        <div className="flex items-center gap-1">
          {value && <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" onClick={e => { e.stopPropagation(); onChange(''); }} />}
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </button>
      {open && models.length > 0 && (
        <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-2 border-b border-border">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search models..."
              className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
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