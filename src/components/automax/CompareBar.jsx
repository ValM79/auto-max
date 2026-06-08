import React from 'react';
import { X, ArrowLeftRight } from 'lucide-react';

export default function CompareBar({ items, onRemove, onCompare, onClear }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-xl z-40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-4 flex-wrap">
        <span className="text-sm font-semibold text-foreground">Compare ({items.length}/3):</span>
        <div className="flex gap-3 flex-1 flex-wrap">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-1.5">
              <span className="text-sm text-foreground truncate max-w-36">{item.title}</span>
              <button onClick={() => onRemove(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={onClear} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 border border-border rounded-lg">
            Clear
          </button>
          <button
            onClick={onCompare}
            disabled={items.length < 2}
            className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <ArrowLeftRight className="w-4 h-4" /> Compare
          </button>
        </div>
      </div>
    </div>
  );
}