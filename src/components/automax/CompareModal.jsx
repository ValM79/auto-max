import React from 'react';
import { X } from 'lucide-react';

export default function CompareModal({ items, onClose }) {
  if (!items || items.length === 0) return null;

  const specs = ['price', 'year', 'mileage', 'fuel', 'location'];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Compare Vehicles</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-muted-foreground font-medium py-2 pr-4 w-28">Spec</th>
                {items.map(item => (
                  <th key={item.id} className="text-left font-semibold text-foreground py-2 px-4">
                    <div className="w-40">
                      <img src={item.image} alt={item.title} className="w-full h-24 object-cover rounded-lg mb-2" />
                      <span className="line-clamp-2 text-xs">{item.title}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map(spec => (
                <tr key={spec} className="border-t border-border">
                  <td className="capitalize text-muted-foreground py-3 pr-4 font-medium">{spec}</td>
                  {items.map(item => (
                    <td key={item.id} className="py-3 px-4 text-foreground">{item[spec] || '—'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}